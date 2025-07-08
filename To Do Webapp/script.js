let tasks = [];

function addTask() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  if (!title || !description) return alert('Please fill out both fields.');
  tasks.push({ id: Date.now(), title, description, completed: false });
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  renderTasks();
}

function renderTasks() {
  const pending = document.getElementById('pending');
  const completed = document.getElementById('completed');
  pending.innerHTML = '';
  completed.innerHTML = '';
  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <div class="text">
        <strong>${task.title}</strong>
        <span>${task.description}</span>
      </div>
      <div class="actions">
        <button class="checkmark" onclick="toggleTask(${task.id})">✓</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">X</button>
      </div>
    `;
    if (task.completed) completed.appendChild(div);
    else pending.appendChild(div);
  });
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit Title", task.title);
  const newDesc = prompt("Edit Description", task.description);
  if (newTitle && newDesc) {
    task.title = newTitle;
    task.description = newDesc;
    renderTasks();
  }
}
