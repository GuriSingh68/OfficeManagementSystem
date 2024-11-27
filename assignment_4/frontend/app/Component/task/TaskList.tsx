"use client";

import { getUserRole } from "@/app/api/auth/auth";
import { fetchTasks, deleteTask, updateTask, createTask, fetchTaskById } from "@/app/api/task/taskApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface TaskInterface {
  _id:string
  taskName: string,
  assignee: string,
  assigned: string,
  start_date: "",
  end_date: "",
  project: string,
  priority: "",
  description: string,
  status: ""
}

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<any>({
    taskName: "",
    assignee: "",
    assigned: "",
    start_date: "",
    end_date: "",
    project: "",
    priority: "",
    description: "",
    status: ""
  });
  const [editTask, setEditTask] = useState<any>({
    taskName: "",
    assignee: "",
    assigned: "",
    start_date: "",
    end_date: "",
    project: "",
    priority: "",
    description: "",
    status: ""
  });
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskData = await fetchTasks();
        setTasks(taskData);
        const userRole = await getUserRole();
        setRole(userRole);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Handle the task deletion
  const handleDelete = async (taskId: string) => {
    if (role !== "admin") {
      alert("Admin role required to delete tasks.");
      return;
    }

    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete the task.");
    }
  };

  // Handle the task update (Edit)
  const handleUpdate = async (taskId: string) => {
    const role=getUserRole();
    if(role==="user")
     { try {
        // Send the updated status to the backend
        await updateTask(taskId, { status: editTask.status });

        // Fetch the updated list of tasks from the backend
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks); // Update the task list in the state

        alert("Task updated successfully!");
      } catch (error) {
        console.error("Error updating task:", error);
        alert("Failed to update the task.");
      }
    }
    throw new Error("Not authorised") 
  };



  // Handle the task creation
  const handleCreateTask = async () => {
    if (!newTask.taskName || !newTask.description || !newTask.assignee || !newTask.priority || !newTask.start_date || !newTask.end_date || !newTask.project) {
      alert("Please fill in all the fields!");
      return;
    }

    try {
      await createTask(newTask);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
      setNewTask({
        taskName: "",
        assignee: "",
        assigned: "",
        start_date: "",
        end_date: "",
        project: "",
        priority: "",
        description: "",
        status: ""
      });
      alert("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create the task.");
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Task List</h2>

      {/* Create Task Section - Only for Admin */}
      {role === "admin" && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Create New Task</h3>
          <div className="mb-4">
            <label>Task Name
              <input
                type="text"
                placeholder="Task Name"
                value={newTask.taskName}
                onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Assigned To
              <input
                type="text"
                placeholder="Assigned To"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Assigned
              <input
                type="text"
                placeholder="Assigned"
                value={newTask.assigned}
                onChange={(e) => setNewTask({ ...newTask, assigned: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Start Date
              <input
                type="date"
                placeholder="Start Date"
                value={newTask.start_date}
                onChange={(e) => setNewTask({ ...newTask, start_date: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">End Date
              <input
                type="date"
                placeholder="End Date"
                value={newTask.end_date}
                onChange={(e) => setNewTask({ ...newTask, end_date: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              <input
                type="text"
                placeholder="Project"
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full mt-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-2"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-2"
            />
          </div>
          <div className="mb-4">
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full mt-2"
            >
              <option value="">Select status</option>
              <option value="done">Done</option>
              <option value="pending">Pending</option>
              </select>
          </div>

          <button
            onClick={handleCreateTask}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Create Task
          </button>
        </div>
      )}

      {/* Edit Task Section - Only for Admin */}
      {taskToEdit && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Edit Task</h3>

          {role === "admin" ? (
            <>
              {/* Admin fields */}
              <div className="mb-4">
                <label>Task Name
                  <input
                    type="text"
                    placeholder="Task Name"
                    value={editTask.taskName}
                    onChange={(e) => setEditTask({ ...editTask, taskName: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>Assigned To
                  <input
                    type="text"
                    placeholder="Assigned To"
                    value={editTask.assignee}
                    onChange={(e) => setEditTask({ ...editTask, assignee: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>Assigned
                  <input
                    type="text"
                    placeholder="Assigned"
                    value={editTask.assigned}
                    onChange={(e) => setEditTask({ ...editTask, assigned: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>Start Date
                  <input
                    type="date"
                    value={editTask.start_date}
                    onChange={(e) => setEditTask({ ...editTask, start_date: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>End Date
                  <input
                    type="date"
                    value={editTask.end_date}
                    onChange={(e) => setEditTask({ ...editTask, end_date: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>Project
                  <input
                    type="text"
                    placeholder="Project"
                    value={editTask.project}
                    onChange={(e) => setEditTask({ ...editTask, project: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>Priority
                  <select
                    value={editTask.priority}
                    onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Description"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="border border-gray-300 rounded p-2 w-full mt-2"
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              {/* User field */}
              <label>Status</label>
              <select
                value={editTask.status || ""}
                onChange={(e) =>
                  setEditTask({ ...editTask, status: e.target.value }) // Update status dynamically
                }
                className="border border-gray-300 rounded p-2 w-full mt-2"
              >
                <option value="">Select Status</option>
                <option value="done">Done</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          )}

        </div>
      )}
      {/* Displaying the Task List */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Task Name</th>
            <th className="border px-4 py-2">Assigned To</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Project</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
            {role === "admin" || role === "user" && <th className="border px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="border px-4 py-2">{task.taskName}</td>
              <td className="border px-4 py-2">{task.assignee}</td>
              <td className="border px-4 py-2">{task.start_date}</td>
              <td className="border px-4 py-2">{task.end_date}</td>
              <td className="border px-4 py-2">{task.priority}</td>
              <td className="border px-4 py-2">{task.project}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2">
                {role === "user" ? (
                  <select
                    value={task.status}
                    onChange={async (e) => {
                      const updatedStatus = e.target.value;
                      try {
                        // Update status in the backend
                        await updateTask(task._id, { status: updatedStatus });

                        // Refresh the task list
                        const updatedTasks = await fetchTasks();
                        setTasks(updatedTasks);
                      } catch (error) {
                        console.error("Error updating status:", error);
                        alert("Failed to update the task status.");
                      }
                    }}
                    className="border border-gray-300 rounded p-2 w-full"
                  >
                    <option value="done">Done</option>
                    <option value="pending">Pending</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>

              {role === "admin" && (
                <td className="border px-4 py-2">

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded m-3"
                  >
                    Delete
                  </button>

                </td>
              )}
              {role === "user" && (
                <td className="border px-4 py-2">
                  {<button
                    onClick={() => handleUpdate(task._id)}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Update Task
                  </button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

