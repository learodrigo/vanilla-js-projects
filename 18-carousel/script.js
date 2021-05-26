document.addEventListener('DOMContentLoaded', () => {
    const $carouselImages = document.querySelector('#carouselImages')

    let index = 0

    const carousel = () => {
        if (index > $carouselImages.childElementCount - 1) {
            index = 0
        }

        $carouselImages.style.transform = `translateX(${-index * 500}px)`

        index++

        setTimeout(carousel, 1500)
    }

    carousel()
})
