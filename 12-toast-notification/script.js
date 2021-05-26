document.addEventListener('DOMContentLoaded', () => {
    const $addButton = document.querySelector('#addButton')
    
    $addButton.addEventListener('click', () => {
        const $container = document.querySelector('#container')
        const $notification = document.createElement('div')

        $notification.classList.add('notification')

        $notification.innerText = 'This will disappear in 2 seconds'

        $container.appendChild($notification)

        setTimeout(() => $notification.remove(), 2000)
    })
})
