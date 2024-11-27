"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getUserRole } from '../auth/auth';
import { fetchTaskById, fetchTasks } from './taskApi';
import { TaskInterface } from '@/app/Component/task/TaskList';
import { useRouter } from 'next/router';
const FetchTasks = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        const loadTasks = async () => {
          try {
            const taskData = await fetchTasks();
            setTasks(taskData);
            const sortTask=(a:any,b:any) => {
              return b.start_date - b.start_date
            }
            const userRole = await getUserRole();
            setRole(userRole);
          } catch (error: any) {
            console.log(`Error - ${error}`)
          } 
        };
        loadTasks();
      }, []);
      const handleClick=async (id:string) =>{
          try {
              const data = await fetchTaskById(id)
          } catch (error) {
            console.log(error)
          }
      }

    return (
      <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 hover:text-red-500">
        <Link href="/users/task">Tasks</Link>
      </h3>
      <div className="space-y-4">
        {tasks.slice(0, 1).map((task, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <div className="card-header mb-4">
              <h4 className="text-xl font-semibold text-gray-800">Name {task.taskName}</h4>
            </div>
            <div className="card-body">
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li className="hover:text-blue-500">Priority: {task.priority}</li>
                <li className="hover:text-green-500">Status: <strong>{task.status}</strong></li>
                <li className="hover:text-purple-500">Start Date: {new Date(task.start_date).toLocaleDateString()}</li>
                <li className="hover:text-purple-500">End Date: {new Date(task.end_date).toLocaleDateString()}</li>
              </ul>
            </div>
            <div className="card-footer mt-4">
              <Link href="/users/task"
                onClick={() => handleClick(task._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
               View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchTasks;
