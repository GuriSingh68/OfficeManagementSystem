"use client"
import { getUserRole } from '@/app/api/auth/auth';
import { deleteUsers, fetchUsers, updateUsers } from '@/app/api/users/userApi';
import { UserInterface } from '@/app/interface/userInterface'
import React, { useEffect, useState } from 'react'

const ShowMembers = () => {

    const [users, setUsers] = useState<UserInterface[]>([]);
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [editable, setEditable] = useState<Partial<UserInterface>[]>([]);
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

    const handleDelete = async (id: string) => {
        try {
            await deleteUsers(id);
            setUsers((prev) => prev.filter((user) => user._id !== id));
            alert(`User deleted Successfully`)
        } catch (error) {

        }
    }

    const toggleEdit = () => {
        setEditMode((prev) => !prev);
        if (!editMode) {
            setEditable(users.map((user) => ({ ...user })));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { name, value } = e.target;
        setEditable((prevUsers) =>
            prevUsers.map((user) =>
                user._id === id ? { ...user, [name]: value } : user
            )
        );

    }
    const handleSave = async (id: string) => {
        const update_user = editable.find((user) => user._id === id);
        if (update_user) {
            try {
                await updateUsers(id, update_user);
                setUsers((prev) =>
                    prev.map((user) => (
                        user._id === id ? {...user, ...update_user } : user
                    )))
                alert("User updated successfully")
            } catch (error) {
                console.log(`Error - ${error}`)
            }
        }
    }
    return (
        <div>
            <button
                onClick={toggleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                {editMode ? "Save Changes" : "Edit All"}
            </button>

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
                        users.map((user) => {
                            const editableUser = editable.find((editable) => editable._id === user._id);

                            return (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editableUser?.firstName || ""}
                                                onChange={(e) => handleChange(e, user._id)}
                                                className="border p-2 rounded w-full"
                                            />
                                        ) : (
                                            user.firstName
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={editableUser?.lastName || ""}
                                                onChange={(e) => handleChange(e, user._id)}
                                                className="border p-2 rounded w-full"
                                            />
                                        ) : (
                                            user.lastName
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editMode ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editableUser?.email || ""}
                                                onChange={(e) => handleChange(e, user._id)}
                                                className="border p-2 rounded w-full"
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="role"
                                                value={editableUser?.role || ""}
                                                onChange={(e) => handleChange(e, user._id)}
                                                className="border p-2 rounded w-full"
                                            />
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="mobile"
                                                value={editableUser?.mobile || ""}
                                                onChange={(e) => handleChange(e, user._id)}
                                                className="border p-2 rounded w-full"
                                            />
                                        ) : (
                                            user.mobile
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {editMode && (
                                            <button
                                                onClick={() => handleSave(user._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Save
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded ml-3"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ShowMembers;