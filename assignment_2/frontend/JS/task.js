document.addEventListener('DOMContentLoaded', function () {
    const createTaskBtn = document.getElementById('createTaskBtn');

    // Add event listener for Save button click
    createTaskBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Collecting form data
        const taskName = document.getElementById('taskName').value.trim();
        const assignee = document.getElementById('assignee').value.trim();
        const assigned = document.getElementById('assigned').value.trim();
        const start_date = document.getElementById('startDate').value;
        const end_date = document.getElementById('dueDate').value;
        const project = document.getElementById('project').value;
        const priority = document.getElementById('priority').value;
        const description = document.getElementById('description').value.trim();

        if (!taskName || !assignee || !assigned || !startDate || !dueDate) {
            alert("Please fill in all required fields: Task Name, Assignee, Assign To, Start Date, and End Date.");
            return;
        }
    
        // Construct the task object to send to the backend
        const taskData = {
            taskName,
            assignee,
            assigned,
            start_date,
            end_date,
            description,
            project,
            priority
        };
        for (const [key, value] of Object.entries(taskData)) {
            if (!value) {
                alert(`${key} should not be empty`);
                return;
            }
        }
        try {
            // Send the task data to the backend via POST request
            const response = await fetch('http://localhost:3000/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            // Parse the response from the backend
            const result = await response.json();

            // Check if the task was created successfully
            if (response.ok) {
                alert(`${result.message} Task ID: ${result.taskId}`); 
                // document.getElementById("taskName").value = '';
                // document.getElementById("assignee").value = '';
                // document.getElementById("assigned").value = '';  // Make sure this ID matches the field
                // document.getElementById("start_date").value = '';
                // document.getElementById("end_date").value = '';
                // document.getElementById("project").value = '';
                // document.getElementById("priority").value = '';
                // document.getElementById("description").value = '';
                // Expected: "Task Created Successfully"
                window.location.href = "dashboard.html"; // Redirect to the task list page
            } else {
                alert('Error: ' + result.message);  // Display error message if task creation fails
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the task.');
        }
    });
});
