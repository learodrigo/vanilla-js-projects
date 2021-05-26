document.addEventListener('DOMContentLoaded', () => {
    const $imageContainer = document.querySelector('#imageContainer')
    const $img = imageContainer.querySelector('img')

    $imageContainer.addEventListener('mousemove', (e) => {
        const x = e.clientX - e.target.offsetLeft
        const y = e.clientY - e.target.offsetTop

        $img.style.transformOrigin = `${x}px ${y}px`
        $img.style.transform = 'scale(2)'
    })

    $imageContainer.addEventListener('mouseleave', () => {
        $img.style.transformOrigin = 'center center'
        $img.style.transform = 'scale(1)'
    })
})
