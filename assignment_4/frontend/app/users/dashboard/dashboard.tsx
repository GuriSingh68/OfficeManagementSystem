"use client"
import React from 'react'
import Link from 'next/link'
import { getUserRole } from '@/app/api/auth/auth';
import TaskList from '@/app/Component/task/TaskList';
import ShowTask from '@/app/api/task/ShowTask';

const Dashboard = () => {
    const role=getUserRole();
    return (
        <div className="flex h-screen">

            {/* Sidebar */}
            <aside className="w-72 bg-purple-100 h-full p-8 shadow-lg">
                <nav className="space-y-4 text-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-8">{`Welcome ${role}`}</h2>
                    <Link href="#" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Dashboard
                    </Link>
                    <Link href="/events" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Events
                    </Link>
                    <Link href="/users/task" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Tasks
                    </Link>
                    <Link href="#" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Report
                    </Link>
                    {role==="admin" ?
                        <>
                            <Link href="/users/member" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        User controller
                    </Link>
                        </> : null
                    }
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-grow p-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column (Other sections like Events and Members) */}
                    {/* <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
                                <a href="tasks.html" className="hover:text-red-700">Tasks</a>
                            </h3>
                            <button className="bg-grey-200 px-2 py-1 rounded hover:bg-purple-100 ">
                                <a href="tasks.html">Create Task</a>
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
                                <a href="events.html" className="hover:text-red-700">Events</a>
                            </h3>
                            <button className="bg-grey-200 px-2 py-1 rounded hover:bg-purple-100 ">
                                <a href="events.html">Create Event</a>
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <a href="members.html" className="text-2xl font-semibold text-gray-700 mb-6 hover:text-red-700 flex">
                                Members
                            </a>
                            <button className="bg-grey-200 px-2 py-1 rounded hover:bg-purple-100 ">
                                <a href="members.html">Add Members</a>
                            </button>
                        </div>
                    </div> */}

                    {/* Right Column (Tasks Section) */}
                    <div className="bg-white rounded-lg shadow-lg p-8 col-span-2">
                        
                            <ShowTask/> 
                        {/* FetchTasks component displays the tasks */}
                        
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;
