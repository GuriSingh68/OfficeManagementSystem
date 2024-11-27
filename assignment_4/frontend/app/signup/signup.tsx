"use client"
import { useState } from "react";
import Link from "next/link";
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    role: "user",
  });
  const [isSuccess,setIsSuccess]=useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create an account.");
      }
      setIsSuccess(true);
      alert("User signed up successfully");
    } catch (error: any) {
      alert(`Signup Error: ${error.message}`);
    }
  };

  return (
    <div className="m-5 p-10 w-auto bg-grey-500 rounded-lg shadow-lg" >
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold text-purple-700 text-center mb-4">Sign Up</h1>
      <p className="text-center text-gray-600 mb-6">Enter your details below:</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-gray-700">Mobile Number</label>
          <div className="flex space-x-2">
            <select
              id="country_code"
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="+1">Canada/US</option>
              <option value="+91">India</option>
            </select>
            <input
              type="tel"
              id="mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              required
              placeholder="+1 123-123-1234"
              className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="Enter Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({...formData,role:e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="admin">manager</option>
            </select>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-700"
        >
          Create Account
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
