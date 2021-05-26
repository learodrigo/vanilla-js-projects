document.addEventListener('DOMContentLoaded', () => {
    const text = 'This text in being written automatically with js'
    let index = 0

    const writeText = () => {
        document.body.innerHTML = text.slice(0, index)
        index++

        if (index > text.length + 5) {
            index = 0
        }
    }

    setInterval(writeText, 100)
})
