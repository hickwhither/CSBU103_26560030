// app.js
const STORAGE_KEY = 'todo-app-items';

const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const list = document.querySelector('#todoList');

const countActive = document.querySelector('#cnt-active');
const filterButtons = document.querySelectorAll('#filter button');

// Load saved todos, or start with an empty array
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

let filter = 'all';
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = ''; // Clear the list, then rebuild it from the array

  todos.forEach((todo, index) => {
    // Hide todos that do not match the current filter
    if (filter === 'active' && todo.completed) return;
    if (filter === 'completed' && !todo.completed) return;

    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span></span>
      <button class="delete-btn">✕</button>
    `;

    // textContent shows user input as plain text, never as HTML
    li.querySelector('span').textContent = todo.text;

    // Toggle completed
    li.querySelector('input').addEventListener('change', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
      renderActiveCount();
    });

    // Delete this todo
    li.querySelector('.delete-btn').addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
      renderActiveCount();
    });

    list.appendChild(li);
  });
}

// Show how many todos are not completed
function renderActiveCount() {
  let count = 0;
  todos.forEach((todo) => {
    if (!todo.completed) count++;
  });
  countActive.textContent = count;
}

// Filter buttons
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle('active', b === button));
    renderTodos();
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop the page from reloading
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
  renderActiveCount();
  input.value = '';
});

renderTodos(); // Initial render on page load
renderActiveCount();
