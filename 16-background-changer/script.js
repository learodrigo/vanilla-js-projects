document.addEventListener('DOMContentLoaded', () => {
    const $changeButton = document.querySelector('#changeButton')

    const randomBackground = () => {
        return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
    }

    $changeButton.addEventListener('click', () => {
        document.body.style.backgroundColor = randomBackground()
    })
})
