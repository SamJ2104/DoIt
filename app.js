document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.onclick = toggleTask;

        taskList.appendChild(taskItem);

        saveTasks();
        taskInput.value = '';
        updateClearButtonVisibility(); // Check if the clear button should be visible
    }
}

function toggleTask() {
    this.classList.toggle('completed');
    saveTasks();
    updateClearButtonVisibility(); // Check if the clear button should be visible
}

function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll('.completed');

    completedTasks.forEach(task => task.remove());
    saveTasks();
    updateClearButtonVisibility(); // Check if the clear button should be visible
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.childNodes.forEach(task => {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.onclick = toggleTask;

            taskList.appendChild(taskItem);
        });

        updateClearButtonVisibility(); // Check if the clear button should be visible
    }
}

function updateClearButtonVisibility() {
    const clearButton = document.getElementById('clearButton');
    const completedTasks = document.querySelectorAll('.completed');

    clearButton.style.display = completedTasks.length > 0 ? 'block' : 'none';
}
