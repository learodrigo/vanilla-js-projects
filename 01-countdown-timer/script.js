const target = '1 Jan 2022'

const formatTime = (time) => time < 10 ? `0${time}` : time

const countdown = () => {
    const currentDate = new Date()
    const targetDate = new Date(target)

    const seconds = Math.floor((targetDate - currentDate) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    const $days = document.querySelector('#days')
    const $hours = document.querySelector('#hours')
    const $minutes = document.querySelector('#minutes')
    const $seconds = document.querySelector('#seconds')

    $days.textContent = formatTime(days)
    $hours.textContent = formatTime(hours % 24)
    $minutes.textContent = formatTime(minutes % 60)
    $seconds.textContent = formatTime(seconds % 60)
}

const main = () => {
    countdown()
    setInterval(countdown, 1000)
}

main()
