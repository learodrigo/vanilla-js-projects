const quizData = [
    {
        question: 'How are you doin?',
        a: 'Tomato',
        b: 12,
        c: 'Blue',
        d: 'Good',
        correct: 'd'
    }, {
        question: 'Which is the most used programming language in 2019?',
        a: 'Java',
        b: 'C',
        c: 'Javascript',
        d: 'R',
        correct: 'c'
    }, {
        question: 'Who is Mile Davis?',
        a: 'A painter',
        b: 'A musician',
        c: 'A writer',
        d: 'A football player',
        correct: 'b'
    }, {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Text Language',
        b: 'Hypotext Medium Text Language',
        c: 'Hypertext Medium Text Language',
        d: 'Hypertext Mix Technology Language',
        correct: 'a'
    }, {
        question: 'That year was JS launched?',
        a: '1994',
        b: '2000',
        c: '1996',
        d: 'Non of above',
        correct: 'd'
    }
]

let currentQuestion = 0
let score = 0

const deselectAnswers = () => {
    const $answers = document.querySelectorAll('input[name="answer"]')

    $answers.forEach($answer => $answer.checked = false)
}

const getSelected = () => {
    const $answers = document.querySelectorAll('input[name="answer"]')

    let a = undefined
    
    $answers.forEach($answer => {
        if ($answer.checked) {
            a = $answer.id
        }
    })

    return a
}

const loadQuiz = () => {
    deselectAnswers()
    
    const currentQuiz = quizData[currentQuestion]

    const $question = document.querySelector('#question')
    const $a_text = document.querySelector('#a_text')
    const $b_text = document.querySelector('#b_text')
    const $c_text = document.querySelector('#c_text')
    const $d_text = document.querySelector('#d_text')

    $question.textContent = currentQuiz.question
    $a_text.textContent = currentQuiz.a
    $b_text.textContent = currentQuiz.b
    $c_text.textContent = currentQuiz.c
    $d_text.textContent = currentQuiz.d
}

const $button = document.querySelector('#submitButton')

$button.addEventListener('click', () => {
    const answer = getSelected()

    if (answer) {
        if (answer === quizData[currentQuestion].correct) {
            score += 10
        }
    
        currentQuestion++
    
        if (currentQuestion < quizData.length) {
            return loadQuiz()
        }

        const $quiz = document.querySelector('#quiz')
        $quiz.innerHTML = `
            <h2 class="score-text">
                You score ${score / 10} out of ${quizData.length} questions. You got ${score} points!
            </h2>
            <button onclick="location.reload()">Reload</button>
        `
    }
})

loadQuiz()
