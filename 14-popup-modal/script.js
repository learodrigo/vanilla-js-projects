document.addEventListener('click', () => {
    const $closeButton = document.querySelector('#closeButton')
    const $openButton = document.querySelector('#openButton')
    const $modalContainer = document.querySelector('#modalContainer')

    $openButton.addEventListener('click', () => {
        $modalContainer.classList.add('active')
    })

    $closeButton.addEventListener('click', () => {
        $modalContainer.classList.remove('active')
    })
})
