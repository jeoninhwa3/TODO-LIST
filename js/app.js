const todoFrom = document.querySelector('.todo-form');
const todoInput = todoFrom.querySelector('input');
const todoList = document.querySelector('.todo-list');

const TODO_KEY = 'todo';

let todos = [];

function saveTodo(){
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function deleteTodo(event){
    const button = event.target.parentElement;
    const li = button.parentElement;
    li.remove();
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodo();
}

function paintTodo(newTodo){
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    const strong = document.createElement('strong');
    strong.innerHTML = '<i class="fa-solid fa-pen"></i>';
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    button.addEventListener('click', deleteTodo);
    li.appendChild(span);
    li.appendChild(strong);
    li.appendChild(button);
    todoList.appendChild(li);
}
 
function submitTodo(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = '';
    const newTodoObj = {
        text: newTodo,
        id : Date.now(),
    }
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodo();
}

todoFrom.addEventListener('submit', submitTodo);

const savedTodo = localStorage.getItem(TODO_KEY);

if(savedTodo !== null) {
    const parseTodo = JSON.parse(savedTodo);
    todos = parseTodo;
    parseTodo.forEach(paintTodo);   
}