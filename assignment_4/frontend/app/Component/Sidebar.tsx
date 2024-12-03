"use client"
import Link from 'next/link'
import React from 'react'
import { getUserRole } from '../api/auth/auth'
import LogoutButton from './Button/Logout'
import router, { useRouter } from 'next/router'

const Sidebar = () => {
    const role=getUserRole()
  return (
    <header className="bg-purple-100 text-white py-2 rounded">
      <nav className="flex justify-between space-y-4">
                <h2 className="text-xl font-bold text-gray-800 mb-8">{`Welcome ${role}`}</h2>
                    <Link href="/users/dashboard" className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Dashboard
                    </Link>
                    <Link href="/users/events" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Events
                    </Link>
                    <Link href="/users/task" className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Tasks
                    </Link>
                    {/* <Link href="/members" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Members
                    </Link> 
                    Functionality removed
                    */}
                    <Link href="#" passHref className='block py-3 text-gray-700 hover:bg-red-200 rounded-lg'>
                        Report
                    </Link>
                    <LogoutButton />
                </nav>
            </header>


  )
}

export default Sidebar