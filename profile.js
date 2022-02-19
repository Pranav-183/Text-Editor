const index = sessionStorage.getItem('Current User Index')
const users = JSON.parse(localStorage.getItem('users'))
const user = users[index]
const form1 = document.forms[0]

form1.name.value = user.name
form1.username.value = user.username
form1.password.value = user.password

form1.name.onblur = (e) => {
   user.name = e.target.value
}
form1.username.onblur = (e) => {
   user.username = e.target.value
}
form1.password.onblur = (e) => {
   user.password = e.target.value
}
form1.onsubmit = (e) => {
   e.preventDefault()
   console.log(user)
   users[index] = user
   localStorage.setItem('users', JSON.stringify(users))
}