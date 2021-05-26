document.addEventListener('DOMContentLoaded', () => {
    const $toggleMode = document.querySelector('#toggleMode')

    $toggleMode.addEventListener('change', (e) => {
        document.body.classList.toggle('dark', e.target.checked)
    })
})
