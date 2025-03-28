import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://100.119.117.121:5000/login", { email, password });

            if (response.data.message) {
                alert(response.data.message);
            }

            console.log("Login Response:", response.data);

            const userRole = response.data.role;
            if (userRole === "student") {
                navigate("/studentdashboard");
            } else if (userRole === "rider") {
                navigate("/riderdashboard");
            } else if (userRole === "customer") {
                navigate("/customerdashboard");
            } else {
                console.error("Unknown role:", userRole);
                setError("Invalid role. Please contact support.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-center text-lg font-medium text-gray-600">Please sign in to continue</p>
                </div>

                {error && <p className="text-red-500 text-center font-semibold bg-red-100 p-3 rounded-lg">{error}</p>}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email Address"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                        <FaSignInAlt className="mr-2 h-5 w-5" />
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-4 text-lg font-medium">
                    Don't have an account? {' '}
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center justify-center gap-2">
                        <FaUserPlus className="inline" />
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;