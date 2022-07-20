const loginWrap = document.querySelector('.login-wrap');
const loginForm = document.querySelector('.login-form');
const loginInput = loginForm.querySelector('input');
const wrap = document.querySelector('.wrap');
const myPage = document.querySelector('.mypage');
const greeting = document.querySelector('.greeting');
const todoFrom = document.querySelector('.todo-form');
const todoInput = todoFrom.querySelector('input');
const todoList = document.querySelector('.todo-list');
const date = document.querySelector('.date'); 


//login
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function loginSubmit(event){
    event.preventDefault();
    const username = loginInput.value;
    loginInput.value = '';
    loginWrap.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, username);
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `WELCOME, ${username}`
    wrap.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
    loginWrap.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', loginSubmit);
} else {
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `WELCOME, ${savedUsername}`
    loginWrap.classList.add(HIDDEN_CLASSNAME);
    wrap.classList.remove(HIDDEN_CLASSNAME);
}

//logout 
function logout() {
    localStorage.removeItem(USERNAME_KEY);
    loginWrap.classList.remove(HIDDEN_CLASSNAME);
    wrap.classList.add(HIDDEN_CLASSNAME);
}

myPage.addEventListener('click', logout);


//todolist
const TODO_KEY = 'todo';

let todos = [];

function saveTodo(){
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function deleteTodo(event){
    const button = event.target.parentElement;
    const li = button.parentElement;
    console.log(li)
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


//date
const today = new Date();
const month = today.getMonth();
const day = today.getDate();
const monthName = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

date.innerText = `${monthName[month]} ${day}`