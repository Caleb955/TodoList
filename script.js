const inputElement = Array.from(document.getElementsByClassName('input-field'))[0];

const buttonElement = Array.from(document.getElementsByClassName('btn'))[0]

let todoArray = JSON.parse(localStorage.getItem('todo')) || [];
let counter = JSON.parse(localStorage.getItem('count')) || 0

buttonElement.addEventListener('click', () => {
    const input = inputElement.value;
    input === '' ? console.log('empty input') : AddToArray(input)
    inputElement.value = ''
});

function AddToArray(value) {
    counter += 1

    todoArray.unshift({
        id: String(counter),
        content: value,
        checked: false
    });

    saveToStorage('todo', todoArray)
    saveToStorage('count', counter)

    RenderTodo();
}

function saveToStorage(key, value) {
    // the key will always be a string

    localStorage.setItem(key, JSON.stringify(value))
}

function RenderTodo() {
    let todoHTML = ''

    todoArray.forEach((todo) => {
        
        todoHTML += `
            <div class="todo-grid">
                <div class="check-container">
                    <div class="marker" data-id=${todo.id} ${todo.checked ? 'checked' : ''}>
                        <svg class="check-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                    </div>
                </div>
                <p style="text-decoration: ${todo.checked ? 'line-through' : ''}" class="todo-idea-${todo.id}">${todo.content}</p>
                <div class="x-btn" data-id=${todo.id} title="Delete">
                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </div>
            </div>
        `
    })

    document.getElementById('todo')
        .innerHTML = todoHTML

    document.querySelectorAll('.x-btn')
        .forEach((button, index) => {
            button.addEventListener('click', () => {
                const {id} = button.dataset
                RemoveTodo(index)
            })
        });

    const checkElement = document.querySelectorAll('.marker');

    checkElement.forEach((element) => {
        element.addEventListener('click', () => {
            const {id} = element.dataset;

            const value = todoArray.find((data) => {
                return data.id === id
            });
                    
            if (value.checked) {
                document.querySelector(`.todo-idea-${id}`)
                    .style.textDecoration = '';
                
                value.checked = false;
                saveToStorage('todo', todoArray);
                element.removeAttribute('checked');

            } else {
                document.querySelector(`.todo-idea-${id}`)
                    .style.textDecoration = 'line-through';

                value.checked = true;
                saveToStorage('todo', todoArray);
                element.setAttribute('checked', '')
            }
        });
    });

    // document.querySelectorAll('.check')
    //     .forEach((link) => {
    //         link.addEventListener('click', () => {
    //             const {id} = link.dataset;

                
    //             if (link.checked) {
    //                 document.querySelector(`.todo-idea-${id}`)
    //                     .style.textDecoration = 'line-through';

    //                 const value = todoArray.find((data) => {
    //                     return data.id === id
    //                 })

    //                 value.checked = true;
    //                 saveToStorage('todo', todoArray)
    //             } else {
    //                 document.querySelector(`.todo-idea-${id}`)
    //                     .style.textDecoration = '';

    //                 const value = todoArray.find((data) => {
    //                     return data.id === id
    //                 })
                    
    //                 value.checked = false
    //                 saveToStorage('todo', todoArray)
    //             }
    //         })
    //     });
}

function RemoveTodo(index) {
    todoArray.splice(index, 1)
    ReorderIndex()
    RenderTodo()
}

function ReorderIndex() {
    counter = 0

    const newArray = todoArray.map(({content, checked}) => {
        counter += 1
        return {
            id: String(counter),
            content,
            checked
        }
    })

    todoArray = newArray;
    saveToStorage('todo', todoArray)
}

// function Strike() {

// }

// default callBacks

RenderTodo()

document.addEventListener('click', (event) => {
    if (event.target !== inputElement) {
        inputElement.blur()
    }
});