"use client";
import React from 'react';
import Link from 'next/link';
import { getUserRole } from '@/app/api/auth/auth';
import ShowTask from '@/app/api/task/ShowTask';
import DashboardEvents from '@/app/api/events/DashboardEvents';

const Dashboard = () => {
    const role = getUserRole();
    return (
        <div className="flex h-screen">

            {/* Sidebar */}
            <aside className="w-72 bg-purple-100 h-full p-8 shadow-lg">
                <nav className="space-y-4 text-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-8">{`Welcome ${role}`}</h2>
                    <Link href="#" passHref className="block py-3 text-gray-700 hover:bg-red-200 rounded-lg">
                        Dashboard
                    </Link>
                    <Link href="/users/events" passHref className="block py-3 text-gray-700 hover:bg-red-200 rounded-lg">
                        Events
                    </Link>
                    <Link href="/users/task" passHref className="block py-3 text-gray-700 hover:bg-red-200 rounded-lg">
                        Tasks
                    </Link>
                    <Link href="#" passHref className="block py-3 text-gray-700 hover:bg-red-200 rounded-lg">
                        Report
                    </Link>
                    {role === "admin" ? (
                        <Link href="/users/member" passHref className="block py-3 text-gray-700 hover:bg-red-200 rounded-lg">
                            User Controller
                        </Link>
                    ) : null}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-grow p-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h2>

                {/* Two Columns Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ShowTask Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <ShowTask />
                    </div>

                    {/* DashboardEvents Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <DashboardEvents />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
