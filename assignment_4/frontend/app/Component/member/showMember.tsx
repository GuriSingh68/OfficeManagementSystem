"use client"
import { getUserRole } from '@/app/api/auth/auth';
import { deleteUsers, fetchUsers } from '@/app/api/users/userApi';
import { UserInterface } from '@/app/interface/userInterface'
import React, { useEffect, useState } from 'react'

const ShowMembers = () => {

    const [users, setUsers] = useState<UserInterface[]>([]);
    const role = getUserRole();
    useEffect(() => {
        try {
            const loadUsers = async () => {
                if (role === "admin") {
                    const data = await fetchUsers();
                    setUsers(data);
                }
            }; loadUsers()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleDelete = async (id:string) => {
        try {
             await deleteUsers(id);
             setUsers((prev) => prev.filter((user) => user._id !==id));
             alert(`User deleted Successfully`)
        } catch (error) {
            
        }
    } 
    const handleUpdate=async(id:string) => {
        const data_update={
            firstName:"",
            lastName:"",
            email:"",
            dob:"",
            role:"",
        }
    }
    return (
        <div>
            <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">First Name</th>
                        <th className="border px-4 py-2">Last Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Mobile</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr className='m-4' key={user._id}>
                                <td className="border px-4 py-2">{user.firstName}</td>
                                <td className="border px-4 py-2">{user.lastName}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">{user.mobile}</td>
                                <td className="border px-4 py-2">
                                <button  className="bg-red-500 text-white px-4 py-2 rounded m-3" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                            
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowMembers;