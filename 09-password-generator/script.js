document.addEventListener('DOMContentLoaded', () => {
    const trackTime = (callback) => {
        const start = new Date().getMilliseconds()
        callback()
        const end = new Date().getMilliseconds()
        document.querySelector('#runTime').textContent = `run in ${end - start} milliseconds`
    }

    const copyToClipboard = () => {
        const $result = document.querySelector('#result')
        const text = $result.textContent

        if (!text) return

        if (!navigator.clipboard) {
            $result.select()
            document.execCommand('copy')
        }
        
        navigator.clipboard.writeText(text)
            .then(() => {
                $result.textContent = `${text} copied`
                $pw.classList.add('copied')
            })
            .catch((e) => console.error(e))
    }

    const returnRandomChar = (list) => {
        return list[Math.floor(Math.random() * list.length)]
    }

    const getRandomValue = () => {
        const output = []

        const uppercase = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
        const lowercase = 'abcdefghijklmnñopqrstuvwxyz'
        const numbers = '1234567890'
        const symbols = '`~!@#$%^&*()-_=+[{}:"<>?[]\'/.,\\'

        const includesUpper = $passgenForm.querySelector('#upperCase').checked
        const includesLower = $passgenForm.querySelector('#lowerCase').checked
        const includesNumber = $passgenForm.querySelector('#number').checked
        const includesSymbol = $passgenForm.querySelector('#symbol').checked

        if (includesUpper) output.push(returnRandomChar(uppercase))
        if (includesLower) output.push(returnRandomChar(lowercase))
        if (includesNumber) output.push(returnRandomChar(numbers))
        if (includesSymbol) output.push(returnRandomChar(symbols))

        return output.length > 0 ? output[Math.floor(Math.random() * output.length)] : ''
    }

    const passgen = (e) => {
        if (e) e.preventDefault()

        $pw.classList.remove('copied')

        trackTime(() => {
            const length = parseInt($passgenForm.querySelector('#passwordLength').value)
    
            const output = Array(length).fill(null).map(() => getRandomValue()).join('')
    
            document.querySelector('#result').textContent = output
        })
    }

    // Events
    const $passgenForm = document.querySelector('#passgenForm')
    $passgenForm.addEventListener('submit', passgen)

    const $pw = document.querySelector('#pw')
    $pw.addEventListener('click', copyToClipboard)

    // main
    passgen()
})
