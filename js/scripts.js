const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEdition = document.querySelector('#cancel-edit-btn');

let oldInputValue ;


todoForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const inputValue = todoInput.value ;
    if(inputValue){
       saveTodo(inputValue) 
    }
})

const saveTodo = (text) =>{
    const todo=document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);
    
    const doneBTN=document.createElement('button');
    doneBTN.classList.add('finish-todo');
    doneBTN.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBTN);

    const editBTN=document.createElement('button');
    editBTN.classList.add('edit-todo');
    editBTN.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBTN);

    const deleteBTN=document.createElement('button');
    deleteBTN.classList.add('remove-todo');
    deleteBTN.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBTN);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
}

document.addEventListener('click', (e) =>{
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');
    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerHTML;
    }

    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done');
    }

    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove();
    }
    if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

function toggleForms() {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');

}

cancelEdition.addEventListener('click', (e) =>{
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms()

})

function updateTodo (text) {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerHTML === oldInputValue){
            todoTitle.innerHTML = text;
        }
    })
}