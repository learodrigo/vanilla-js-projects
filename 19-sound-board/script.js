const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']

sounds.forEach(sound => {
    const $audio = document.createElement('audio')
    $audio.src = `sounds/${sound}.mp3`
    $audio.id = sound

    const $audioPlayer = document.createElement('button')
    $audioPlayer.classList.add('player')
    $audioPlayer.innerText = sound

    const stopAudios = () => {
        const $audios = document.querySelectorAll('audio')
        $audios.forEach(audio => {
            audio.pause()
            audio.currentTime = 0
        })
    }

    $audioPlayer.addEventListener('click', () => {
        stopAudios()
        $audio.play()
    })

    document.body.appendChild($audio)
    document.body.appendChild($audioPlayer)
})
