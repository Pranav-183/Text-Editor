const index = sessionStorage.getItem('Current User Index')
const fileUpload = document.querySelector('#fileUpload')
const userImage = document.querySelector('#userImage')
const users = JSON.parse(localStorage.getItem('users'))
const user = users[index]
const form1 = document.forms[0]
const form2 = document.forms[1]
const form3 = document.forms[2]
const mssg1 = document.querySelector('.mssg1')
const mssg2 = document.querySelector('.mssg2')
const mssg3 = document.querySelector('.mssg3')

// Profile Pic

fileUpload.addEventListener('change', (e) => {
   // userImage.src = URL.createObjectURL(e.target.files[0])
   const fileReader = new FileReader()
   fileReader.onload = () => {
      user.logo = fileReader.result
      users[index] = user
      localStorage.setItem('users', JSON.stringify(users))
      fileUpload.setAttribute('src', fileReader.result)
      window.location.reload()
   }
   fileReader.readAsDataURL(e.target.files[0])
})

document.addEventListener('DOMContentLoaded', () => {
   const img = user.logo
   userImage.setAttribute('src', img)
})

// FORM 1

form1.name.value = user.name
form1.username.value = user.username

form1.name.onblur = (e) => {
   user.name = e.target.value
}
form1.username.onblur = (e) => {
   user.username = e.target.value
}
form1.onsubmit = (e) => {
   e.preventDefault()
   if (form1.password.value === user.password) {
      users[index] = user
      localStorage.setItem('users', JSON.stringify(users))
      mssg1.innerText = 'Succesfully changed user details ✔'
      mssg1.style.backgroundColor = '#54ac25'
   } else {
      mssg1.innerText = 'Wrong Password ✗'
      mssg1.style.backgroundColor = 'red'
   }
   mssg1.style.opacity = 1
}

// FORM 2

form2.onsubmit = (e) => {
   e.preventDefault()
   if (form2.currpw.value === user.password) {
      user.password = form2.newpw.value
      users[index] = user
      localStorage.setItem('users', JSON.stringify(users))
      mssg2.innerText = 'Succesfully changed your password ✔'
      mssg2.style.backgroundColor = '#54ac25'
      form2.currpw.value = ''
      form2.newpw.value = ''
   }
   mssg2.style.opacity = 1
}