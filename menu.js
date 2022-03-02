const spans = document.querySelectorAll('.clickSpan')
const lists = document.querySelectorAll('.menuList')
const save = document.querySelector('.save').parentElement
const autoSave = document.querySelector('.autoSave').parentElement
const done = document.querySelector('.done')
const options = JSON.parse(localStorage.getItem('options')) || {}

options.autosave ? done.innerText = 'done' : done.innerText = 'close'
if (options.autosave) {
   save.classList.add('disabled')
}

// Functions

const getStyle = (element, property) => {
   return getComputedStyle(element).getPropertyValue(property)
}

const setStyle = (element, property, value) => {
   element.style.setProperty(property, value)
}

const saveOptionsFunc = () => {
   localStorage.setItem('options', JSON.stringify(options))
}

const checkForOtherMenuClick = (i, before) => {
   const check0 = before == 0 && lists[before].classList.contains('expand')
   const check1 = before == 1 && lists[before].classList.contains('expand')
   const check2 = before == 2 && lists[before].classList.contains('expand')

   const both = () => {
      lists[before].classList.remove('expand')
      spans[before].style.backgroundColor = 'rgb(177, 182, 250)'
   }

   if (i == 0) {
      if (check1 || check2) {
         both()
      }
   } else if (i == 1) {
      if (check0 || check2) {
         both()
      }
   } else if (i == 2) {
      if (check0 || check1) {
         both()
      }
   }
}

const menuExpand = (i) => {
   let list = lists[i]
   if (!list.classList.contains('expand')) {
      list.classList.add('expand')
      spans[i].style.backgroundColor = 'rgb(159, 164, 252)'
      checkForOtherMenuClick(i, options.currentMenu)
      options.currentMenu = i
      options.activeMenu = true
   } else {
      list.classList.remove('expand')
      spans[i].style.backgroundColor = null
      list.classList.add('contract')
      setTimeout(() => {
         list.classList.remove('contract')
      }, 200)
      options.currentMenu = null
      options.activeMenu = false
   }
}

const closeShortcut = () => {
   allTabs.children[user.recent].classList.add('animateContract')
}

const saveButtonFunc = () => {
   user.data[user.recent].text = area.innerText
   saveFunc()
   console.log('yess')
}

const autoSaveToggler = () => {
   let sign = autoSave.children[0].children[0]
   if (sign.innerText === 'done') {
      sign.innerText = 'close'
      options.autosave = false
      save.addEventListener('click', saveButtonFunc)
      save.classList.remove('disabled')
   } else if (sign.innerText === 'close') {
      sign.innerText = 'done'
      options.autosave = true
      save.removeEventListener('click', saveButtonFunc)
      save.classList.add('disabled')
   }
   saveOptionsFunc()
}

spans.forEach((span, i) => {
   span.addEventListener('click', () => {
      menuExpand(i)
   })
})

save.addEventListener('click', saveButtonFunc)
autoSave.addEventListener('click', autoSaveToggler)