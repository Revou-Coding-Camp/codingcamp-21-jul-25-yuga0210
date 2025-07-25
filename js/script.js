let tasks = [];
let currentFilter = "all";

function addTask() {
  const todoInput = document.getElementById("todoInput").value.trim();
  const dateInput = document.getElementById("dateInput").value;

  if (!todoInput || !dateInput) {
    alert("Please fill in both task and date.");
    return;
  }

  const task = {
    id: Date.now(),
    text: todoInput,
    due: dateInput,
    done: false,
    editing: false,
  };

  tasks.push(task);
  renderTasks();
  clearForm();
}

function renderTasks() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "done") return task.done;
    if (currentFilter === "pending") return !task.done;
    return true;
  });

  if (filteredTasks.length === 0) {
    list.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
    return;
  }

  filteredTasks.forEach((task) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td contenteditable="${task.editing}" id="text-${task.id}">${
      task.text
    }</td>
      <td>
        <input type="date" value="${task.due}" id="date-${task.id}" ${
      task.editing ? "" : "disabled"
    } />
      </td>
      <td>${task.done ? "Done" : "Pending"}</td>
      <td>
        <button onclick="editTask(${task.id})">${
      task.editing ? "💾" : "✎"
    }</button>
        <button onclick="toggleDone(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">✖</button>
      </td>
    `;

    list.appendChild(row);
  });
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  const textEl = document.getElementById(`text-${id}`);
  const dateEl = document.getElementById(`date-${id}`);

  if (task.editing) {
    task.text = textEl.textContent.trim();
    task.due = dateEl.value;
  }

  task.editing = !task.editing;
  renderTasks();
}

function toggleDone(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

function deleteAll() {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

function clearForm() {
  document.getElementById("todoInput").value = "";
  document.getElementById("dateInput").value = "";
}

function filterTasks() {
  const select = document.getElementById("filterSelect");
  currentFilter = select.value;
  renderTasks();
}

// Scroll Buttons
window.onscroll = function () {
  const topBtn = document.getElementById("scrollTopBtn");
  const bottomBtn = document.getElementById("scrollBottomBtn");

  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollBottom =
    window.innerHeight + scrollTop < document.body.offsetHeight - 100;

  topBtn.style.display = scrollTop > 100 ? "block" : "none";
  bottomBtn.style.display = scrollBottom ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeButton");
  body.classList.toggle("light");

  btn.textContent = body.classList.contains("light") ? "☀️" : "🌙";
}
