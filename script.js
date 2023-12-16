document.addEventListener('DOMContentLoaded', function () {
  loadTasks();
});

function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Retrieve tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(function (task) {
      addTaskToList(task);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== '') {
      const newTask = { title: taskTitle, completed: false };

      // Retrieve tasks from localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      // Add the new task to the array
      tasks.push(newTask);

      // Save tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Add the task to the list
      addTaskToList(newTask);

      // Clear the input
      taskInput.value = '';
  }
}

function addTaskToList(task) {
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
      <button onclick="toggleTaskCompletion(this)">Toggle</button>
      <button onclick="removeTask(this)">Remove</button>
  `;
  taskList.appendChild(li);
}

function toggleTaskCompletion(button) {
  const li = button.parentElement;
  const span = li.querySelector('span');
  span.classList.toggle('completed');

  // Retrieve tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Find the task in the array and update its completion status
  const taskIndex = Array.from(li.parentNode.children).indexOf(li);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;

  // Save updated tasks to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(button) {
  const li = button.parentElement;

  // Retrieve tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Find the task in the array and remove it
  const taskIndex = Array.from(li.parentNode.children).indexOf(li);
  tasks.splice(taskIndex, 1);

  // Save updated tasks to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Remove the task from the list
  li.remove();
}
