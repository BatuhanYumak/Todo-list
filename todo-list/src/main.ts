const apiUrl = import.meta.env.VITE_API_URL

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Elements uit de DOM selecteren
const taskList = document.getElementById("task-list") as HTMLUListElement;
const newTaskInput = document.getElementById("new-task") as HTMLInputElement;
const addTaskBtn = document.getElementById("add-task-btn") as HTMLButtonElement;

// Functie om taken op te halen van de API
async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks: Task[] = await response.json();
    renderTasks(tasks);
}

// Functie om een nieuwe taak toe te voegen via de API
async function addTask() {
    const title = newTaskInput.value;
    if (!title) return;

    const newTask = { title: title, completed: false };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });

    if (response.ok) {
        const task = await response.json();
        renderTask(task);
        newTaskInput.value = "";  // Clear the input field
    }
}

// Functie om een taak te updaten (bijwerken van de title en de completed status)
async function updateTask(task: Task) {
    const response = await fetch(`${apiUrl}${task.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        console.error("Failed to update task");
    }
}

// Functie om een taak te verwijderen
async function deleteTask(id: number) {
    const response = await fetch(`${apiUrl}${id}/`, {
        method: "DELETE",
    });

    if (response.ok) {
        const taskElement = document.getElementById(`task-${id}`);
        taskElement?.remove();
    }
}

// Functie om taken te renderen in de lijst
function renderTasks(tasks: Task[]) {
    taskList.innerHTML = "";  // Clear the list first
    tasks.forEach(renderTask);
}

// Functie om één taak weer te geven in de DOM
function renderTask(task: Task) {
    const li = document.createElement("li");
    li.id = `task-${task.id}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        updateTask(task);  // Update de taak als het checkbox verandert
    });

    const taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.value = task.title;
    taskTitle.addEventListener("change", () => {
        task.title = taskTitle.value;
        updateTask(task);  // Update de taak als de titel verandert
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Verwijderen";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));  // Voeg event listener toe

    li.appendChild(checkbox);
    li.appendChild(taskTitle);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
window.onload = fetchTasks;
