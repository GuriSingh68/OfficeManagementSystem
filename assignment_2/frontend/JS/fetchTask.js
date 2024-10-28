async function fetchTasks() {
    try {
        const response = await fetch("http://localhost:3000/task");
        if (!response.ok) {
            throw new Error(`Failed to load - ${response.statusText}`);
        }
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error(`Error fetching tasks - ${error}`);
    }
}

function displayTasks(tasks) {
    const taskContainer = document.getElementById("task-container");
     // Clear previous tasks
    if (Array.isArray(tasks) && tasks.length > 0) {
        console.log("Tasks Array:", tasks); // Log tasks array for debugging

        // Sort tasks by id in ascending order
        const sortedTasks = tasks.sort((a, b) => a.id - b.id);
        console.log("Sorted Tasks:", sortedTasks); // Log sorted tasks for debugging

        // Limit the number of tasks displayed
        const limitTask = sortedTasks.slice(0, 2);
        
    limitTask.forEach(task => {
        const taskElement = `
        <div class="bg-white p-4 rounded-lg shadow-md mt-4 mx-2 font-large w-80"> Tasks
            <h4 class="text-lg font-semibold bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded-lg">${task.taskName}</h4>
            <p class="text-gray-500 mt-2 text-lg font-semibold">Assigned to: ${task.assignee}</p>
            <p class="text-gray-500">Start Date: ${task.start_date}</p>
            <p class="text-gray-500">End Date: ${task.end_date}</p>
            <p class="text-gray-500">Project: ${task.project}</p>
            <p class="text-gray-500">Priority: ${task.priority}</p>
            <p class="mt-4">${task.description}</p>
        </div>`;
        taskContainer.innerHTML += taskElement; // Append each task to the container
    });
}}


window.onload = fetchTasks(); // Fetch tasks when the page loads
