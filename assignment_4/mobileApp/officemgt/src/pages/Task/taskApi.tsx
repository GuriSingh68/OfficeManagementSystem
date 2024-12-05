import { getUserRole } from "../../utils/jwtUtils";


const API_BASE = 'http://localhost:3000';

export const fetchTasks = async () => {

    try {
        const res = await fetch(`${API_BASE}/task`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        const data = await res.json();
        console.log(data)
        if (!res.ok) throw new Error(data.message || 'Failed to fetch tasks');
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
};

export const fetchTaskById = async (_id: string) => {
    const res = await fetch(`${API_BASE}/task/${_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });
    const response = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch task");
    }
    return response;
};


export const createTask = async (taskData: any) => {
    const userRole = getUserRole();
    if (await userRole == "admin") {
        const res = await fetch(`${API_BASE}/task/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(taskData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to create task');
        return data;
    }

};
export const updateTask = async (taskId: string, taskData: any) => {
    const role = await getUserRole();
    try {
        if (role === 'admin') {
            const res = await fetch(`${API_BASE}/task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(taskData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to update task');
            return data;
        }

        if (role === 'user' && taskData.status) {
            const res = await fetch(`${API_BASE}/task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ status: taskData.status }),
            });
            const content_type = res.headers.get("content-type");
            let data_res;

            if (content_type && content_type.includes("application/json")) {
                data_res = await res.json();
            } else {
                data_res = await res.text(); 
            }

            if (!res.ok) throw new Error(data_res.message || data_res || "Failed to update task");

            return data_res; 
        }

        throw new Error('Invalid update request or user role not authorized');

    } catch (error) {
        console.error(error);
        alert(`Error`);
    }
};
export const deleteTask = async (id: string) => {
    const data = await fetch(`${API_BASE}/task/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });
    const res=await data.json()
    if(!res)
        console.error(`Err in delete }`)
    return res;
};
