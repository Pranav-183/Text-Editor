const allTabs = document.querySelector('#allTabs')
const tabs = Array.from(document.getElementsByClassName('tab'))
const form = document.querySelector('form')
const saveBtn = document.querySelector('.save')
const addTab = document.querySelector('#addTab')

let currTab
let areaInfo
let changeCount = 0

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
   form.textarea.value = data[0].body
   currTab = 0
}

function tabChange(data) {
   document.querySelectorAll('.tab').forEach((tab, i) => {
      tab.addEventListener('click', () => {
         form.textarea.value = data[i].body
         currTab = parseInt(i)
      })
   })
}

function changeDb(e) {
   e.preventDefault()
   changeCount = 0
   fetch('http://localhost:8000/tabsData/' + currTab, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         id: currTab,
         name: `Tab ${currTab+1}`,
         body: form.textarea.value
      })
   })
}

function addTabFunc(e) {
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
}

function textChange() {
   form.textarea.addEventListener('keyup', () => {
      changeCount ++
      checkForChanges()
   })
}

function checkForChanges() {
   if (changeCount === 0) {
      saveBtn.disabled = true
   }
}

fetch('http://localhost:8000/tabsData')
   .then(res => res.json())
   .then(data => {
      loadData(data)
      tabChange(data)
      textChange()
   })

saveBtn.addEventListener('click', changeDb)
addTab.addEventListener('click', addTabFunc)