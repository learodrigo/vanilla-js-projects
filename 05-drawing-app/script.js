document.addEventListener('DOMContentLoaded', () => {
    const $actualSize = document.querySelector('#actualSize')
    const $canvas = document.querySelector('#canvas')
    const $colorPicker = document.querySelector('#colorPicker')
    const $decreaseButton = document.querySelector('#decreaseButton')
    const $fillColor = document.querySelector('#fillColor')
    const $increaseButton = document.querySelector('#increaseButton')

    const ctx = $canvas.getContext('2d')

    $canvas.height = 600
    $canvas.width = 800

    const incDec = 5
    let color = $colorPicker.value
    let isFilled = $fillColor.checked
    let isPressed = false
    let size = 20

    const updateActualSize = () => {
        $actualSize.textContent = 
            size >= $canvas.height / 4 ||
            size <= incDec ?
            `limit ${size}` :
            size
    }

    const drawCircle = (x, y) => {
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)

        if (isFilled) {
            ctx.fillStyle = color
            ctx.fill()
            return
        }

        ctx.strokeStyle = color
        ctx.stroke()
    }

    const draw = () => {
        requestAnimationFrame(draw)
    }

    // Events
    $canvas.addEventListener('mousedown', () => {
        isPressed = true
    })
    $canvas.addEventListener('mouseup', () => {
        isPressed = false
    })
    $canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
        if (isPressed) {
            drawCircle(offsetX, offsetY)
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === "Space") {
            ctx.clearRect(0, 0, $canvas.width, $canvas.height)
        }

        if (e.code === "KeyS") {
            const link = document.createElement('a')
            const now = new Date()
            const date = now.getDay() + '-' + now.getMonth() + '-' + now.getFullYear()

            link.download = `drawepp_${date}.png`
            link.href = $canvas.toDataURL()
            link.click()

            link.delete
        }

        if (e.code === "KeyF") {
            $fillColor.checked = !$fillColor.checked
            isFilled = $fillColor.checked
        }
    })
    $decreaseButton.addEventListener('click', (e) => {
        e.preventDefault()
        size -= incDec

        if (size < incDec) {
            size = incDec
        }

        updateActualSize()
    })
    $increaseButton.addEventListener('click', (e) => {
        e.preventDefault()
        size += incDec

        if (size > $canvas.height / 4) {
            size = $canvas.height / 4
        }

        updateActualSize()
    })
    $colorPicker.addEventListener('change', (e) => {
        color = e.target.value
    })
    $fillColor.addEventListener('click', (e) => {
        isFilled = e.target.checked
    })

    // main
    updateActualSize()
    draw()
})
