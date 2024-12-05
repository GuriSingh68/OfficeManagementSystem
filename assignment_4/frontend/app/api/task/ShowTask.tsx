"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getUserRole } from "../auth/auth";
import { fetchTaskById, fetchTasks } from "./taskApi";
import { TaskInterface } from "@/app/Component/task/TaskList";
import { useRouter } from "next/navigation";
import TaskDetailsComponent from "@/app/Component/task/CreateTaskDetails";

const FetchTasks = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadRoleAndTasks = async () => {
      try {
        const userRole = getUserRole();
        setRole(userRole);

        const taskData = await fetchTasks();
        const sortedTasks = taskData.sort((a: any, b: any) => b.start_date - a.start_date);
        setTasks(sortedTasks);
      } catch (error: any) {
        console.error(`Error fetching tasks: ${error.message}`);
      }
    };

    loadRoleAndTasks();
  }, []);

  const handleClick = async (task:TaskInterface) => {
    try {
      const data = await fetchTaskById(task._id);
      setSelectedTask(data);
    } catch (error) {
      console.error(`Error fetching task by ID: ${error}`);
    }
  };
  const handleCloseDetails = () => {
    setSelectedTask(null);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 hover:text-red-500">
        <Link href="/users/task">Tasks</Link>
      </h3>
      {tasks.length !== 0 ? (
        <div className="space-y-4">
          {role === "admin" && (
            <div>
              <Link
                href="/users/task"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Task
              </Link>
            </div>
          )}
          {tasks.slice(0, 2).map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto"
            >
              <div className="card-header mb-4">
                <h4 className="text-xl font-semibold text-gray-800">
                  Name: {task.taskName}
                </h4>
              </div>
              <div className="card-body">
                <ul className="mt-2 space-y-2 text-sm text-gray-600">
                  <li className="hover:text-blue-500">Priority: {task.priority}</li>
                  <li className="hover:text-green-500">
                    Status: <strong>{task.status}</strong>
                  </li>
                  <li className="hover:text-purple-500">
                    Start Date: {new Date(task.start_date).toLocaleDateString()}
                  </li>
                  <li className="hover:text-purple-500">
                    End Date: {new Date(task.end_date).toLocaleDateString()}
                  </li>
                </ul>
              </div>
              {role === "admin"  && (
                <div className="card-footer mt-4">
                  <button
                    onClick={() => handleClick(task)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <><h3 className="text-xl font-semibold mb-4 hover:text-red-500">
          List empty
        </h3>
        <Link
                href="/users/task"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Task
              </Link>
        </>
      )}
       {selectedTask && (
        <TaskDetailsComponent task={selectedTask} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default FetchTasks;
