document.addEventListener('DOMContentLoaded', () => {
    // Thank you 🙏
    // https://github.com/robertoduessmann/weather-api
    const WEATHER_API = 'https://goweather.herokuapp.com/weather/'

    const $main = document.querySelector('#main')

    const getWeatherByLocation = async (city) => {
        try {
            const res = await fetch(WEATHER_API + city)
            const data = await res.json()

            // Assuming that temperature is the most important value
            if (data.message === "NOT_FOUND" || !data.temperature) throw new Error('Error 400: Bad request')
    
            return data
        }
        catch (e) {
            console.error(e.message)
        }
    }

    const getToday = (day = 0) => {
        const now = new Date()

        return (parseInt(day) + now.getDate()).toString() + '/' + (now.getMonth() + 1).toString()
    }

    // DOM
    const addWeaterInfo = ({
        description,
        forecast = [],
        temperature
    }) => {
        const $weather = document.createElement('div')
        const $forecast = document.createElement('ul')

        forecast.forEach(({
            day,
            temperature, 
            wind
        }) => {
            const $li = document.createElement('li')

            const date = getToday(day)

            $li.innerHTML = `
                <small>${date}</small><br>
                ${parseInt(temperature)}°C
            `

            $forecast.appendChild($li)
        })

        $weather.innerHTML = `
            <div class="weather__today">
                <small>${description}</small>
                <h2>${temperature}</h2>
            </div>
        `

        $weather.classList.add('weather')
        $forecast.classList.add('weather__forecast')

        $weather.appendChild($forecast)

        $main.innerHTML = ''
        $main.appendChild($weather)
    }

    const handleError = (msg) => {
        $main.innerHTML = `<p>${msg}</p>`
    }

    // Check weather
    const weatherInfo = async (e) => {
        e.preventDefault()
        
        const $searchWeather = document.querySelector('#searchWeather')

        const city = $searchWeather.value
        if (!city) return handleError('You forgot what to search, buddy')

        const weather = await getWeatherByLocation(city)
        if (!weather) return handleError('Invalid city')

        addWeaterInfo(weather)
    }

    // Events
    const $weatherForm = document.querySelector('#weatherForm')
    $weatherForm.addEventListener('submit', weatherInfo)
})
