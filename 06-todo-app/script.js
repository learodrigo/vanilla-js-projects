const addToDo = (todo = {}) => {
    const $input = document.querySelector('input')
    const $todos = document.querySelector('#todos')
    const $todo = document.createElement('li')

    $todo.addEventListener('click', () => {
        $todo.classList.toggle('completed')
        updateLocalStorage()
    })

    $todo.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        $todo.remove()
        updateLocalStorage()
    })

    const regex = /(<([^>]+)>)/gi
    const todoText = $input.value.replace(regex, "")
    $input.value = ''

    if (!todoText && !todo) return $input.value = ''

    $todo.innerText = todo.text ? todo.text : todoText

    if (todo && todo.completed) {
        $todo.classList.add('completed')
    }

    $todos.appendChild($todo)

    updateLocalStorage()
}

const updateLocalStorage = () => {
    const todos = []
    const $todos = document.querySelectorAll('li')

    $todos.forEach(todo => todos.push({
        text: todo.innerText,
        completed: todo.classList.contains('completed')
    }))

    localStorage.setItem('todos', JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector('#form')

    $form.addEventListener('submit', (e) => {
        e.preventDefault()
        addToDo()
    })

    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos) {
        todos.forEach(todo => addToDo(todo))
    }
})
