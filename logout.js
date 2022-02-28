if (sessionStorage.getItem('Current User Index') === null) {
   window.location.replace('Text-Editor/login.html')
}

const logout = document.querySelector('.logout')

logout.addEventListener('click', () => {
   sessionStorage.removeItem('Current User Index')
   window.location.replace('login.html')
})