'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const taskError = document.getElementById('taskError');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const totalCount = document.getElementById('totalCount');
  const completedCount = document.getElementById('completedCount');
  const remainingCount = document.getElementById('remainingCount');
  const allTabCount = document.getElementById('allTabCount');
  const progressLabel = document.getElementById('progressLabel');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const listSummary = document.getElementById('listSummary');
  const clearCompletedButton = document.getElementById('clearCompleted');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const todayLabel = document.getElementById('todayLabel');
  const toast = document.getElementById('toast');

  let tasks = [
    { id: createId(), title: 'Review internship task requirements', priority: 'high', completed: false },
    { id: createId(), title: 'Build the HTML page structure', priority: 'medium', completed: true },
    { id: createId(), title: 'Test responsive layout on mobile', priority: 'low', completed: false }
  ];
  let activeFilter = 'all';
  let toastTimer;

  todayLabel.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: 'short', month: 'short', day: 'numeric'
  }).format(new Date());

  function createId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function getVisibleTasks() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    return tasks.filter(task => {
      const matchesFilter = activeFilter === 'all'
        || (activeFilter === 'active' && !task.completed)
        || (activeFilter === 'completed' && task.completed);
      return matchesFilter && task.title.toLocaleLowerCase().includes(query);
    });
  }

  function renderTasks() {
    const visibleTasks = getVisibleTasks();
    taskList.replaceChildren();

    visibleTasks.forEach(task => {
      const row = document.createElement('article');
      row.className = `task-row${task.completed ? ' is-complete' : ''}`;

      const checkButton = document.createElement('button');
      checkButton.className = 'check-button';
      checkButton.type = 'button';
      checkButton.setAttribute('aria-label', `${task.completed ? 'Mark active' : 'Mark complete'}: ${task.title}`);
      checkButton.setAttribute('aria-pressed', String(task.completed));
      checkButton.textContent = task.completed ? '✓' : '';
      checkButton.addEventListener('click', () => toggleTask(task.id));

      const title = document.createElement('span');
      title.className = 'task-title';
      title.textContent = task.title;

      const priority = document.createElement('span');
      priority.className = `priority priority-${task.priority}`;
      priority.textContent = `${task.priority} priority`;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.type = 'button';
      deleteButton.setAttribute('aria-label', `Delete task: ${task.title}`);
      deleteButton.title = 'Delete task';
      deleteButton.textContent = '×';
      deleteButton.addEventListener('click', () => deleteTask(task.id));

      row.append(checkButton, title, priority, deleteButton);
      taskList.append(row);
    });

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    totalCount.textContent = total;
    completedCount.textContent = completed;
    remainingCount.textContent = remaining;
    allTabCount.textContent = total;
    progressLabel.textContent = `${percentage}% complete`;
    progressFill.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', String(percentage));
    clearCompletedButton.disabled = completed === 0;

    const hasVisibleTasks = visibleTasks.length > 0;
    emptyState.classList.toggle('visible', !hasVisibleTasks);
    if (!hasVisibleTasks && tasks.length > 0) {
      emptyState.querySelector('h3').textContent = 'No matching tasks';
      emptyState.querySelector('p').textContent = 'Try another filter or search term.';
    } else {
      emptyState.querySelector('h3').textContent = 'Your space is clear';
      emptyState.querySelector('p').textContent = 'Add a task above to turn your plans into progress.';
    }

    listSummary.textContent = `${visibleTasks.length} shown · ${remaining} remaining`;
    filterButtons.forEach(button => {
      const isActive = button.dataset.filter === activeFilter;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function addTask(title, priority) {
    tasks.unshift({ id: createId(), title, priority, completed: false });
    activeFilter = 'all';
    searchInput.value = '';
    renderTasks();
    showToast('Task added successfully');
  }

  function toggleTask(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;
    task.completed = !task.completed;
    renderTasks();
    showToast(task.completed ? 'Task completed' : 'Task moved back to active');
  }

  function deleteTask(id) {
    const originalLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    if (tasks.length !== originalLength) {
      renderTasks();
      showToast('Task deleted');
    }
  }

  taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = taskInput.value.trim();

    if (!title) {
      taskError.textContent = 'Please enter a task name.';
      taskInput.setAttribute('aria-invalid', 'true');
      taskInput.focus();
      return;
    }

    if (tasks.some(task => task.title.toLocaleLowerCase() === title.toLocaleLowerCase())) {
      taskError.textContent = 'That task already exists.';
      taskInput.setAttribute('aria-invalid', 'true');
      taskInput.focus();
      return;
    }

    taskError.textContent = '';
    taskInput.removeAttribute('aria-invalid');
    addTask(title, prioritySelect.value);
    taskForm.reset();
    prioritySelect.value = 'medium';
    taskInput.focus();
  });

  taskInput.addEventListener('input', () => {
    if (taskInput.value.trim()) {
      taskError.textContent = '';
      taskInput.removeAttribute('aria-invalid');
    }
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      renderTasks();
    });
  });

  searchInput.addEventListener('input', renderTasks);

  clearCompletedButton.addEventListener('click', () => {
    const completedBefore = tasks.length;
    tasks = tasks.filter(task => !task.completed);
    const removed = completedBefore - tasks.length;
    renderTasks();
    if (removed > 0) showToast(`${removed} completed task${removed === 1 ? '' : 's'} cleared`);
  });

  themeToggle.addEventListener('click', () => {
    const darkMode = document.body.classList.toggle('dark');
    themeIcon.textContent = darkMode ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
    showToast(`${darkMode ? 'Dark' : 'Light'} mode enabled`);
  });

  renderTasks();
});
