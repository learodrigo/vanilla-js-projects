const $addButton = document.querySelector('#addNote')

const updateLocalStorate = () => {
    const notesText = document.querySelectorAll('textarea')
    
    const notes = []
    notesText.forEach(ele => notes.push(ele.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

const addNote = (text = '') => {
    const $note = document.createElement('div')
    $note.classList.add('note')

    $note.innerHTML = `
        <div class="tools">
            <button id="editButton">
                <i class="fas fa-edit"></i>
            </button>
            <button id="deleteButton">
                <i class="fas fa-trash"></i>
            </button>
        </div>

        <div class="main ${!text && 'hidden'}"></div>
        <textarea class="${text && 'hidden'}"></textarea>
    `

    const $notes = document.querySelector('.notes')

    const $textarea = $note.querySelector('textarea')
    const $main = $note.querySelector('.main')

    $textarea.value = text
    $main.innerHTML = marked(text)

    const $editButton = $note.querySelector('#editButton')
    const $deleteButton = $note.querySelector('#deleteButton')

    $editButton.addEventListener('click', () => {
        $main.classList.toggle('hidden')
        $textarea.classList.toggle('hidden')
    })

    $deleteButton.addEventListener('click', () => {
        $note.remove()

        updateLocalStorate()
    })
    
    $textarea.addEventListener('input', ({ target: { value } }) => {    
        $main.innerHTML = marked(value)

        updateLocalStorate()
    })

    $notes.appendChild($note)
}

document.addEventListener('DOMContentLoaded', () => {
    $addButton.addEventListener('click', () => {
        addNote()
    })

    const notes = JSON.parse(localStorage.getItem('notes'))

    if (notes) {
        notes.forEach(note => addNote(note))
    }
})
