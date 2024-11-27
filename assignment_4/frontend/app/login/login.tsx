"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      alert("Login Successful");
      const data = await response.json();
      const { accessToken } = data;

      localStorage.clear();
      localStorage.setItem("accessToken", accessToken);

      setIsLoggedIn(true);

     
      router.push("/users/dashboard"); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="min-h-screen bg-gray-100 rounded shadow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold text-purple-700 text-center">Login</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-700"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-700 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-600 hover:text-purple-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
