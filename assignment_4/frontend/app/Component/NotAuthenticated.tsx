"use client"
import { useRouter } from 'next/router'
import React from 'react'

const NotAuthenticated = () => {
  const router=useRouter();
  return (
         <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Error 404 Not Found
                              {router.push("/login")}
                            </h3>
                        </div>
    </div>
  )
}

export default NotAuthenticated;