'use strict'

const dataBook = []

const STORAGE_KEY = 'bookshelf';
const dataLocalStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))

const form = document.querySelector('.modal')
const btnReadModal = document.querySelector('.modal__btn-read')
const btnUnreadModal = document.querySelector('.modal__btn-unread')

function btnViewModal() {
    const btnInputAdd = document.querySelector('.btn-inputadd')
    const overlay = document.querySelector('.overlay')
    btnInputAdd.addEventListener('click', () => {
        console.dir(overlay)
        overlay.style.visibility = 'visible'
        form.style.visibility = 'visible'
    })

    btnCloseModal(overlay)
}
btnViewModal()

function btnCloseModal(overlay) {
    const btnClose = document.querySelector('.modal__btn-close')
    btnClose.addEventListener('click', () => {
        form.style.visibility = 'hidden'
        overlay.style.visibility = 'hidden'
    })
}

function id() {
    return +new Date()
}

function objectBook(id, title, author, year, dateBook, isCompleted) {
    return { id, title, author, year, dateBook, isCompleted }
}

function bookAdd(isCompleted) {
    const inputTitle = document.querySelector('.modal__input-titlebook').value
    const inputAuthor = document.querySelector('.modal__input-authorbook').value
    const inputYear = document.querySelector('.modal__input-yearbook').value
    const inputDate = document.querySelector('.modal__input-date').value

    const book = objectBook(id(), inputTitle, inputAuthor, inputYear, inputDate, isCompleted)
    dataBook.push(book)
}

const boxRead = document.querySelector('.box__box-read')
const boxUnread = document.querySelector('.box__box-unread')

function makeBook(dataObjectBook) {
    const boxBook = document.createElement('div')
    boxBook.classList.add('box-book')

    const boxBookIcon = document.createElement('div')
    boxBookIcon.classList.add('box-book__icon')
    boxBook.appendChild(boxBookIcon)

    if (dataObjectBook.isCompleted) {
        boxBookIcon.innerHTML = `
            <iconify-icon icon="emojione-v1:blue-book" style="color: #f3afd3;" width="100"></iconify-icon>
            `
    } else {
        boxBookIcon.innerHTML = `
            <iconify-icon icon="emojione-v1:closed-book" width="100"></iconify-icon>
            `
    }

    const boxText = document.createElement('div')
    boxBook.appendChild(boxText)
    boxText.classList.add('box-book__text')

    const title = document.createElement('h3')
    title.innerText = dataObjectBook.title

    const author = document.createElement('p')
    author.innerText = `Author: ${dataObjectBook.author}`

    const year = document.createElement('p')
    year.innerText = `Year: ${dataObjectBook.year}`

    const dateTodo = document.createElement('p')
    dateTodo.innerText = dataObjectBook.dateBook

    boxText.append(title, author, year, dateTodo)

    const boxBtn = document.createElement('div')
    boxBtn.classList.add('box-btn')
    boxText.appendChild(boxBtn)

    const btnMove = document.createElement('button')
    btnMove.classList.add('box-btn__btn-move')
    boxBtn.appendChild(btnMove)

    if (dataObjectBook.isCompleted) {
        btnMove.innerText = 'Unread'
    } else {
        btnMove.innerText = 'Read'
        btnMove.style.backgroundColor = '#739CF5'
    }

    btnMove.addEventListener('click', () => {
        moveBook(dataObjectBook.id)
    })

    const boxBtnDelete = document.createElement('div')
    boxBtn.appendChild(boxBtnDelete)

    const iconDel = document.createElement('iconify-icon')
    iconDel.classList.add("box-btn__btn-delete")
    iconDel.setAttribute("icon", "material-symbols:delete-forever-outline")
    iconDel.setAttribute("style", "color: #f3afd3;")
    iconDel.setAttribute("width", 24)
    boxBtn.appendChild(iconDel)

    iconDel.addEventListener('click', () => {
        delBook(dataObjectBook.id)
        boxBook.remove()
    })

    return boxBook
}

function moveBook(id) {
    const index = dataBook.findIndex((data) => data.id === id)
    dataBook[index].isCompleted = !dataBook[index].isCompleted

    render(dataBook)
}

function delBook(id) {
    const index = dataBook.findIndex((data) => data.id === id)
    dataBook.splice(index, 1)
    console.log(dataBook)

    synLocalStorage('DELETE')
}

function render(data) {
    boxRead.innerHTML = `
    <div class="box__box-title"><h2 class="box__title">Read</h2></div>
    `
    boxUnread.innerHTML = `
    <div class="box__box-title"><h2 class="box__title">Unread</h2></div>
    `
    for (let i = 0; i < data.length; i++) {
        const bookTodo = makeBook(data[i])

        if (data[i].isCompleted) {
            boxRead.append(bookTodo)

            synLocalStorage('ADD', data[i], true)
        } else {
            boxUnread.append(bookTodo)

            synLocalStorage('ADD', data[i], false)
        }
    }

    console.log(dataBook)
}

btnReadModal.addEventListener('click', (e) => {
    e.preventDefault()
    bookAdd(true)
    render(dataBook)
})

btnUnreadModal.addEventListener('click', (e) => {
    e.preventDefault()
    bookAdd(false)
    render(dataBook)
})

//cek local storage
function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function synLocalStorage(activity, item, status) {
    switch (activity) {
        case 'ADD':
            dataBook[item] = status
            break
        case 'DELETE':
            localStorage.getItem(STORAGE_KEY)
            break
        default:
            break
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBook))
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (let variabel of data) {
            dataBook.push(variabel);
        }
    }

    render(dataBook)
}

loadDataFromStorage()

function searchBook() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let itemBook = document.getElementsByClassName('box-book');
      
    for (let i = 0; i < itemBook.length; i++) { 
        if (!itemBook[i].innerHTML.toLowerCase().includes(input)) {
            itemBook[i].style.display="none";
        }
        else {
            itemBook[i].style.display="flex";                 
        }
    }
}