"use client"
import { isAuthenticated } from '@/app/api/auth/auth'
import Header from '@/app/Component/Header'
import NotAuthenticated from '@/app/Component/NotAuthenticated'
import Sidebar from '@/app/Component/Sidebar'
import TaskList from '@/app/Component/task/TaskList'
import React from 'react'

const Task = () => {
  return (
    <div>
      <Sidebar />
      <TaskList />
     
    </div>
  )
}

export default Task
