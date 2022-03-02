const form = document.forms[0]
const mssg = document.querySelector('.mssg')
let users = JSON.parse(localStorage.getItem('users')) || []

if (sessionStorage.getItem('Current User Index') !== null) {
   window.location.replace('index.html')
}

const empty = () => {
   mssg.innerText = 'Username and/or Password field cannot be empty ✗'
   mssg.style.backgroundColor = 'red'
   mssg.style.opacity = '1'
}

const loginIn = (un, pw) => {
   users.some((user, i) => {
      if (un === user.username && pw === user.password) {
         mssg.innerText = 'Logged In ✔'
         mssg.style.backgroundColor = '#54ac25'
         mssg.style.opacity = 1
         
         sessionStorage.setItem('Current User Index', JSON.stringify(i))
         
         setTimeout(() => {
            window.location.replace('index.html')
         }, 1500)
         return true
      } else {
         mssg.innerText = 'Incorrect Username or Password ✗'
         mssg.style.backgroundColor = 'red'
         mssg.style.opacity = 1
      }
   })
}

form.addEventListener('submit', (e) => {
   e.preventDefault()
   if (form.username.value === false || form.password.value === false) {
      empty()
   } else {
      loginIn(form.username.value, form.password.value)
   }
})