document.addEventListener('DOMContentLoaded', () => {
    const createHeart = () => {
        const $heart = document.createElement('div')
        $heart.classList.add('heart')

        $heart.style.left = 100 * Math.random() + 'vw'
        $heart.style.animationDuration = Math.random() * 2 + 3 + 's'

        $heart.innerText = '🖤'

        document.body.appendChild($heart)

        setTimeout(() => {
            $heart.remove()
        }, 5000)
    }

    setInterval(createHeart, 300)
})
