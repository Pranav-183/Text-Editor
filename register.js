const form = document.forms[0]
const mssg = document.querySelector('.mssg')
const users = JSON.parse(localStorage.getItem('users')) || []

if (sessionStorage.getItem('Current User Index') !== null) {
   window.location.replace('/index.html')
}

const empty = () => {
   mssg.innerText = 'Username and/or Password field cannot be empty ✗'
   mssg.style.backgroundColor = 'red'
   mssg.style.opacity = '1'
}

const success = (name, un, pw) => {
   mssg.innerText = 'You have successfully registered ✔'
   mssg.style.backgroundColor = '#54ac25'
   mssg.style.opacity = '1'

   users.push({name: name,username: un, password: pw, data: [{tabName: 'Tab 1', text: ''}], recent: 0, logo: 'Default Account Img.png'})
   localStorage.setItem('users', JSON.stringify(users))
   
   setTimeout(() => {
      window.location.replace('/login.html')
   }, 1500)
}

form.addEventListener('submit', (e) => {
   e.preventDefault()
   if (form.username.value === '' || form.password.value === '') {
      empty()
   } else {
      success(form.name.value, form.username.value, form.password.value)
   }
})