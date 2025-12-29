/*
let todos = JSON.parse(localStorage.getItem('todos')) || []

function addTodo() {
    const textTodo = document.querySelector('.js-textTodo').value;
    const dateTodo = document.querySelector('.js-dateTodo').value;

    if (!textTodo || !dateTodo) {
        alert("Please fill in both fields");
        return;
    }

    const li = document.createElement('li');
    li.classList.add('List');

    // Text and Date
    const textSpan = document.createElement('span');
    textSpan.classList.add('todo-text');
    textSpan.textContent = textTodo;

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('todo-date');
    dateSpan.textContent = dateTodo;

    // Buttons left group
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('button-group-left');

    
    
    
    
    
    // Buttons right group
    const rightDiv = document.createElement('div');
   //const rightDiv = document.querySelector('.js-last');
    rightDiv.classList.add('button-group-right');

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '✓';
    toggleBtn.onclick = () => {
        textSpan.style.textDecoration = textSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.onclick = () => li.remove();

    rightDiv.appendChild(toggleBtn);
    rightDiv.appendChild(deleteBtn);

    // Append everything to LI
    li.appendChild(textSpan);
    li.appendChild(dateSpan);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    // Append LI to UL
    document.querySelector('.js-todoContainer').appendChild(li);
    
    document.querySelector('.js-textTodo').value = '';
document.querySelector('.js-dateTodo').value = '';
}
function save(){
    
}
*/
// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render all todos
function renderTodos() {
    const container = document.querySelector('.js-todoContainer');
    container.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('List');

        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-text');
        textSpan.textContent = todo.text;

        if (todo.completed) {
            textSpan.style.textDecoration = 'line-through';
        }

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('todo-date');
        dateSpan.textContent = todo.date;

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('button-group-right');

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '✓';
        toggleBtn.onclick = () => {
            todos[index].completed = !todos[index].completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.onclick = () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        };

        rightDiv.append(toggleBtn, deleteBtn);
        li.append(textSpan, dateSpan, rightDiv);
        container.appendChild(li);
    });
}

// Add todo
function addTodo() {
    const textTodo = document.querySelector('.js-textTodo').value;
    const dateTodo = document.querySelector('.js-dateTodo').value;

    if (!textTodo || !dateTodo) {
        alert('Please fill in both fields');
        return;
    }

    todos.push({
        text: textTodo,
        date: dateTodo,
        completed: false
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();

    document.querySelector('.js-textTodo').value = '';
    document.querySelector('.js-dateTodo').value = '';
}

// Load todos on page refresh
renderTodos();