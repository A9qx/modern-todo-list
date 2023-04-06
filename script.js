const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!input.value) return;
  const todo = createTodoElement(input.value);
  todoList.appendChild(todo);
  input.value = '';
  todo.animate([
    { transform: 'translateX(-100%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
  ], {
    duration: 300,
    easing: 'ease-out'
  });
});

function createTodoElement(todoText) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.innerHTML = `
    <label class="checkbox">
      <input type="checkbox">
      <span>${todoText}</span>
    </label>
    <button class="delete-btn">Delete</button>
  `;
  const checkbox = li.querySelector('input[type="checkbox"]');
  const deleteBtn = li.querySelector('.delete-btn');
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
  });
  deleteBtn.addEventListener('click', () => {
    li.classList.add('deleting');
    li.animate([
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0.5)', opacity: 0 }
    ], {
      duration: 300,
      easing: 'ease-out'
    }).onfinish = () => {
      li.remove();
    };
  });
  return li;
}
