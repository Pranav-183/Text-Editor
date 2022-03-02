// Initialize

const index = JSON.parse(sessionStorage.getItem('Current User Index'))
let users = JSON.parse(localStorage.getItem('users'))
let user = users[index]
let tabNo = user.data.length
let nextTabNo = tabNo + 1
let img = user.logo
let area = document.querySelector('.area')
let allTabs = document.querySelector('.allTabs')
let addTab = document.querySelector('.addTab')
let tabs = document.querySelectorAll('.tab')
let navProfilePic = document.querySelector('.navProfilePic')

document.addEventListener('DOMContentLoaded', () => {
   navProfilePic.setAttribute('src', img)
   loadData()
   loadTabs()
})

// Functions

const createTab = (index) => {
   const tab = document.createElement('div')
   tab.classList.add('tab')
   tab.id = allTabs.childElementCount
   tab.innerHTML = `
      <span class="tabName">Tab ${index}</span>
      <span class="close">&#x2715</span>
   `
   tab.addEventListener('click', changeTab)
   tab.children[1].addEventListener('click', deleteTab)
   allTabs.append(tab)
}

const saveFunc = () => {
   users[index] = user
   localStorage.setItem('users', JSON.stringify(users))
}

const loadTabs = () => {
   allTabs.innerHTML = ''
   user.data.forEach((data,i) => {
      createTab(data.tabName.slice(-1))
   })
   tabs = document.querySelectorAll('.tab')
   tabs[user.recent].classList.add('active')
   area.innerText = user.data[user.recent].text
}

const loadData = () => {
   user.data.forEach((data,i) => {
      data.tabName = `Tab ${i+1}`
   })
   saveFunc()
}

const refreshData = () => {
   users = JSON.parse(localStorage.getItem('users'))
   user = users[index]
   nextTabNo = user.data.length + 1
}

const addTabFunc = () => {
   refreshData()
   createTab(nextTabNo)
   user.data.push({
      tabName: `Tab ${nextTabNo}`,
      text: ''
   })
   saveFunc()
   document.querySelectorAll('.close').forEach(close => {
      close.addEventListener('click', deleteTab)
   })
   tabs.forEach(tab => {
      tab.addEventListener('click', changeTab)
   })
   allTabs.children[allTabs.childElementCount-1].classList.add('animateExpand')
   setTimeout(() => { allTabs.children[allTabs.childElementCount-1].classList.remove('animateExpand') }, 250)
   tabs[user.recent].classList.remove('active')
   tabs = document.querySelectorAll('.tab')
   user.recent = tabs.length - 1
   saveFunc()
   tabs[user.recent].classList.add('active')
   area.innerText = user.data[user.recent].text
}

const deleteTab = (e) => {
   let currTab
   if (!e) {
      currTab = user.recent
   } else {
      currTab = e.target.parentElement.children[0].innerText.slice(-1) - 1
   }
   allTabs.children[currTab].classList.add('animateContract')
   setTimeout(() => {
      allTabs.children[currTab].classList.remove('animateContract')
      let filtered = user.data.filter(data => (data.tabName.slice(-1) - 1 != currTab))
      user.data = filtered
      user.recent = user.data.length - 1
      saveFunc()
      loadData()
      loadTabs()
   }, 120)
}

const changeTab = (e) => {
   tabs = document.querySelectorAll('.tab')
   let el = e.target
   if (e.target.classList[0] !== 'tab') {
      el = e.target.parentElement
   }
   tabs.forEach(tab => {
      if (tab.classList[1]) {
         tab.classList.remove('active')
      }
   })
   el.classList.add('active')
   user.recent = el.id
   saveFunc()
   area.innerText = user.data[user.recent].text
}

const switchTab = (symbol, e) => {
   if (e.shiftKey) return
   tabs = document.querySelectorAll('.tab')
   tabs[user.recent].classList.remove('active')
   if (symbol === '-') {
      if (Number(user.recent) === 0) {
         user.recent = tabs.length - 1
      } else {
         user.recent -= 1
      }
   } else if (symbol === '+') {
      if (Number(user.recent) === tabs.length - 1) {
         user.recent = 0
      } else {
         user.recent += 1
      }
   }
   tabs[user.recent].classList.add('active')
   saveFunc()
   area.innerText = user.data[user.recent].text
}

const updateTextData = () => {
   let text = area.innerText
   user.data[user.recent].text = text
   saveFunc()
}

const execCmd = (cmd, val) => {
   document.execCommand(cmd,false,val?val:null)
}

// Event Listeners

addTab.addEventListener('click', addTabFunc)
area.addEventListener('keyup', () => {
   if (options.autosave === true) {
      updateTextData()
   }
})

document.addEventListener('keyup', (e) => {
   if (e.altKey) {
      switch (e.key) {
         case 't':
            addTabFunc()
         break
         case 's':
            saveButtonFunc()
         break
         case 'w':
            deleteTab()
         break
         case 'a':
            autoSaveToggler()
         break
         case 'ArrowDown':
            execCmd('subscript')
         break
         case 'ArrowUp':
            execCmd('superscript')
         break
      }
   }
})

document.addEventListener('keydown', e => {
   if (e.altKey) {
      switch (e.key) {
         case 'ArrowLeft':
            switchTab('-', e)
         break
         case 'ArrowRight':
            switchTab('+', e)
         break
      }
   }
})

document.querySelector('.nextTab').parentElement.onclick = e => switchTab('+', e)
document.querySelector('.previousTab').parentElement.onclick = e => switchTab('-', e)
document.querySelector('.bold').parentElement.onclick = () => execCmd('bold')
document.querySelector('.italic').parentElement.onclick = () => execCmd('italic')
document.querySelector('.underline').parentElement.onclick = () => execCmd('underline')
document.querySelector('.subscript').parentElement.onclick = () => execCmd('subscript')
document.querySelector('.superscript').parentElement.onclick = () => execCmd('superscript')
document.querySelector('.decFontSize').parentElement.onclick = () => execCmd('decreaseFontSize')
document.querySelector('.incFontSize').parentElement.onclick = () => execCmd('increaseFontSize')