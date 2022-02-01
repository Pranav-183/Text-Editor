// INITIALIZE STUFF

let allTabs = document.getElementById('allTabs')
let textarea = document.querySelector('.area')
let data, text, currentTab

if (JSON.parse(localStorage.getItem('Text Editor Data')) === '' || JSON.parse(localStorage.getItem('Text Editor Data')) === undefined || JSON.parse(localStorage.getItem('Text Editor Data')) === null) {
   data = []
} else {
   data = JSON.parse(localStorage.getItem('Text Editor Data'))
}

const createTab = (data) => {
   const tab = document.createElement('div')
   tab.classList.add('tab')
   tab.innerHTML = `
      <span class="tabName">${data.name}</span>
      <span class="close">&#x2715</span>
   `
   allTabs.append(tab)
}

// FUNCTIONS

const loadData = () => {
   data.forEach(data => {
      createTab(data)
      if (data.recent === 'true') {
         text = data.body
         textarea.innerText = text
         currentTab = data.id
      } else return
   })
}
loadData()

const saveData = (data) => {
   localStorage.setItem('Text Editor Data', JSON.stringify(data))
}

// TAB CLICK TO CHANGE TAB

const changeText = () => {
   document.querySelector('textarea').addEventListener('input', (e) => {
      text = e.target.value
      data[currentTab].body = text
      allTabs.innerHTML = null
      saveData(data)
      loadData()
      changeTab()
      closeFunc()
      addTab()
   })
}
changeText()

const changeTab = () => {
   document.querySelectorAll('.tab').forEach((tab, i) => {
      tab.onclick = (e) => {
         if (e.target.classList[0] === 'close') return
         text = data[i].body
         document.querySelector('.area').value = text
         currentTab = i
         data.forEach(data => {
            if (data.id === i) {
               data.recent = 'true'
            } else {
               data.recent = 'false'
            }
         })
         saveData(data)
      }
   })
}
changeTab()

const addTab = () => {
   document.querySelector('#addTab').onclick = () => {
      data.forEach(data => {
         if (data.id != data.length) {
            data.recent = 'false'
         }
      })
      currentTab = data.length
      data.push({
         id: data.length,
         name: `Tab ${data.length + 1}`,
         body: '',
         recent: 'true'
      })
      allTabs.innerHTML = null
      saveData(data)
      loadData()
      closeFunc()
      changeTab()
      addTab()
   }
}
addTab()

const closeFunc = () => {
   document.querySelectorAll('.close').forEach((close, i) => {
      close.onclick = () => {
         data = data.filter(data => data.id != i)
         data.forEach((data, i) => {
            data.id = i
         })
         data[data.length - 1].recent = 'true'
         if (data.id != (data.length - 1)) {
            data.recent = 'false'
         }
         text = data[data.length - 1].body
         currentTab = data[data.length - 1].id
         allTabs.innerHTML = null
         saveData(data)
         loadData()
         closeFunc()
         changeTab()
         addTab()
      }
   })
}
closeFunc()