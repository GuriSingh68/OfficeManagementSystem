import React from 'react'

const LogoutButton = () => {

    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login"
    }

    return (
        <div>
           <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    )
}

export default LogoutButton
