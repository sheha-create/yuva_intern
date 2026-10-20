/* Lightweight client-side task logic. No libraries or network requests. */
"use strict";

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#task-priority");
const taskError = document.querySelector("#task-error");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const resultSummary = document.querySelector("#result-summary");
const taskSearch = document.querySelector("#task-search");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const progressBar = document.querySelector("#progress-bar");
const progressFill = document.querySelector("#progress-fill");

let tasks = [];
let activeFilter = "all";
let nextId = 1;

function setError(message) {
  taskError.textContent = message;
  taskError.hidden = !message;
  taskInput.setAttribute("aria-invalid", message ? "true" : "false");
}

function visibleTasks() {
  const query = taskSearch.value.trim().toLocaleLowerCase();
  return tasks.filter((task) => {
    const matchesFilter = activeFilter === "all" ||
      (activeFilter === "active" && !task.completed) ||
      (activeFilter === "completed" && task.completed);
    return matchesFilter && task.title.toLocaleLowerCase().includes(query);
  });
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.completed ? " is-complete" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.className = "task-check";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.id = `task-check-${task.id}`;
  checkbox.setAttribute("aria-label", `${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`);
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    render();
  });

  const content = document.createElement("div");
  const title = document.createElement("p");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.className = "task-meta";
  const priority = document.createElement("span");
  priority.className = `priority priority-${task.priority}`;
  priority.textContent = `${task.priority} priority`;
  const status = document.createElement("span");
  status.className = "status-label";
  status.textContent = task.completed ? "Completed" : "In progress";
  meta.append(priority, status);
  content.append(title, meta);

  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.type = "button";
  remove.textContent = "Delete";
  remove.setAttribute("aria-label", `Delete task: ${task.title}`);
  remove.addEventListener("click", () => {
    tasks = tasks.filter((entry) => entry.id !== task.id);
    render();
    taskInput.focus();
  });

  item.append(checkbox, content, remove);
  return item;
}

function render() {
  const filtered = visibleTasks();
  taskList.replaceChildren(...filtered.map(createTaskElement));
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = total - completed;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  document.querySelector("#total-count").textContent = total;
  document.querySelector("#completed-count").textContent = completed;
  document.querySelector("#remaining-count").textContent = remaining;
  document.querySelector("#remaining-label").textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
  document.querySelector("#progress-copy").textContent = `${percent}% complete`;
  progressBar.setAttribute("aria-valuenow", String(percent));
  progressFill.style.width = `${percent}%`;
  clearCompletedButton.disabled = completed === 0;

  const noTasks = total === 0;
  emptyState.hidden = !noTasks || taskSearch.value.trim() !== "" || activeFilter !== "all";
  if (noTasks) {
    resultSummary.textContent = "No tasks yet. Add one to get started.";
  } else if (filtered.length === 0) {
    resultSummary.textContent = "No matching tasks. Try another search or filter.";
  } else {
    resultSummary.textContent = `Showing ${filtered.length} of ${total} task${total === 1 ? "" : "s"}.`;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) {
    setError("Enter a task before adding it.");
    taskInput.focus();
    return;
  }
  if (tasks.some((task) => task.title.toLocaleLowerCase() === title.toLocaleLowerCase())) {
    setError("That task is already on your list.");
    taskInput.focus();
    return;
  }
  tasks.push({ id: nextId++, title, priority: priorityInput.value, completed: false });
  taskInput.value = "";
  setError("");
  activeFilter = "all";
  taskSearch.value = "";
  updateFilterButtons();
  render();
  taskInput.focus();
});

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateFilterButtons();
    render();
  });
});
taskSearch.addEventListener("input", render);
clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  render();
});

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#101522" : "#f5f7fb");
});

setError("");
render();
