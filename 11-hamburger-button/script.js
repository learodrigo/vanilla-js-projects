document.addEventListener('DOMContentLoaded', () => {
    const $hamburgerButton = document.querySelector('#hamburgerButton')
    const $navBar = document.querySelector('#navBar')

    $hamburgerButton.addEventListener('click', () => {
        $navBar.classList.toggle('active')
        $hamburgerButton.classList.toggle('active')
    })
})
