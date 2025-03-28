import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/admin/login", formData);
            localStorage.setItem("adminToken", response.data.token);
            navigate("/admindashboard");
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome Back Admin</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Please sign in to your account</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <FaLock />
                            </span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FaSignInAlt className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
                {message && <p className="mt-2 text-center text-sm text-red-600">{message}</p>}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/adminsignup" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;