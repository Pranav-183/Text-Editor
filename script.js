const allTabs = document.querySelector('#allTabs')
const tabs = Array.from(document.getElementsByClassName('tab'))
const form = document.querySelector('form')
const saveBtn = document.querySelector('.save')
const addTab = document.querySelector('#addTab')
let textarea = document.querySelector('.area')

let currTab
let recentTab = JSON.parse(localStorage.getItem('Recent Tab'))
let changeCount = 0

function saveRecentTab(value) {
   localStorage.setItem('Recent Tab', JSON.stringify(value))
}

function createTab(eachData) {
   const div = document.createElement('div')
   div.classList.add('tab')
   const tabName = document.createElement('span')
   tabName.classList.add('tabName')
   tabName.innerText = eachData.name
   div.append(tabName)
   const close = document.createElement('span')
   close.classList.add('close')
   close.innerText = '×'
   div.append(close)
   allTabs.append(div)
}

function loadData(data) {
   data.forEach(eachData => {
      createTab(eachData)
   })
   textarea.value = data[recentTab].body
   currTab = recentTab
}

function tabChange(data) {
   document.querySelectorAll('.tab').forEach((tab, i) => {
      tab.addEventListener('click', () => {
         saveRecentTab(currTab)
         textarea.value = data[i].body
         currTab = parseInt(i)
      })
   })

}

function saveFunc() {
   document.querySelector('.save').addEventListener('click', () => {
      changeCount = 0
      fetch('http://localhost:8000/tabsData/' + currTab, {
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            id: currTab,
            name: `Tab ${currTab+1}`,
            body: textarea.value
         })
      })
   })
}

function addTabFunc(data) {
   document.querySelector('#addTab').addEventListener('click', (e) => {
      e.preventDefault()
      let tab = {
         name: `Tab ${document.querySelectorAll('.tab').length + 1}`
      }
      currTab = parseInt(Number(tab.name.slice(-1)) - 1)
      createTab(tab)
      fetch('http://localhost:8000/tabsData', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            id: currTab,
            name: tab.name,
            body: ''
         })
      })
      textarea.value = data[currTab].body
   })
}

function closeFunc() {
   document.querySelectorAll('.close').forEach((close, i) => {
      close.addEventListener('click', () => {
         fetch('http://localhost:8000/tabsData/' + i, {
            method: 'DELETE'
         })
      })
   })
   currTab = 0
}

function textChange() {
   textarea.addEventListener('keyup', () => {
      changeCount ++
      window.onbeforeunload = () => {
         if (changeCount > 0) {
            return confirm()
         }
      }
      if (changeCount === 0) {
         saveBtn.disabled = true
      } else {
         saveBtn.disabled = false
      }
   })
}

document.addEventListener('DOMContentLoaded', () => {
   fetch('http://localhost:8000/tabsData')
   .then(res => res.json())
   .then(data => {
      loadData(data)
      tabChange(data)
      textChange()
      closeFunc()
      saveFunc()
      addTabFunc(data)
   })
})