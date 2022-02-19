const form = document.forms[0]
const mssg = document.querySelector('.mssg')
const users = JSON.parse(localStorage.getItem('users')) || []

// if (sessionStorage.getItem('Current User Index') !== null) {
//    window.location.replace('/index.html')
// }

const empty = () => {
   mssg.innerText = 'Username and/or Password field cannot be empty ✗'
   mssg.style.backgroundColor = 'red'
   mssg.style.opacity = '1'
}

const loginIn = (un, pw) => {
   users.forEach((user, i) => {
      if (user.username === un & user.password === pw) {
         // Message appearance
         mssg.innerText = 'Logged In ✔'
         mssg.style.backgroundColor = '#54ac25'
         mssg.style.opacity = 1

         // Store to sessionStorage
         sessionStorage.setItem('Current User Index', JSON.stringify(i))

         // Redirect
         setTimeout(() => {
            window.location.replace('/index.html')
         }, 1500)
      } else {
         // Message appearance
         mssg.innerText = 'Incorrect Username and/or Password ✗'
         mssg.style.backgroundColor = 'red'
         mssg.style.opacity = 1
      }
   })
}

form.addEventListener('submit', (e) => {
   e.preventDefault()
   loginIn(form.username.value, form.password.value)
})