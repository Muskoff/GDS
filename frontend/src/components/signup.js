import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaUserTag, FaIdCard, FaUniversity, FaCar, FaIdBadge } from "react-icons/fa";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "",
        student_id: "",
        institution: "",
        vehicle_type: "",
        license_number: ""
    });
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signup", formData);
            const { id, role } = response.data.user;
            alert(`Signup successful! Your User ID is: ${id}`);
            
            if (role === "student") navigate("/studentdashboard");
            else if (role === "rider") navigate("/riderdashboard");
            else navigate("/customerdashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight">Create Your Account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Join our community today</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                            <FaUser className="h-5 w-5 text-gray-400" />
                            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                        </div>
                        <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                        </div>
                        <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                            <FaLock className="h-5 w-5 text-gray-400" />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                        </div>
                        <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                            <FaPhone className="h-5 w-5 text-gray-400" />
                            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                        </div>
                        <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                            <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                            <input type="text" name="address" placeholder="Address" onChange={handleChange} className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                        </div>
                        <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                            <FaUserTag className="h-5 w-5 text-gray-400" />
                            <select name="role" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none">
                                <option value="">Select Your Role</option>
                                <option value="student">Student</option>
                                <option value="rider">Rider</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                    </div>
                    {formData.role === "student" && (
                        <div className="space-y-4">
                            <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                                <FaIdCard className="h-5 w-5 text-gray-400" />
                                <input type="text" name="student_id" placeholder="Student ID" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                            </div>
                            <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                                <FaUniversity className="h-5 w-5 text-gray-400" />
                                <input type="text" name="institution" placeholder="Institution" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                            </div>
                        </div>
                    )}
                    {formData.role === "rider" && (
                        <div className="space-y-4">
                            <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                                <FaCar className="h-5 w-5 text-gray-400" />
                                <input type="text" name="vehicle_type" placeholder="Vehicle Type" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                            </div>
                            <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:border-indigo-500">
                                <FaIdBadge className="h-5 w-5 text-gray-400" />
                                <input type="text" name="license_number" placeholder="License Number" onChange={handleChange} required className="ml-2 block w-full border-0 focus:ring-0 focus:outline-none" />
                            </div>
                        </div>
                    )}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-150 hover:scale-105">
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors duration-150">
                            Login here
                        </Link>
                    </p>
                   
                </div>
            </div>
        </div>
    );
};

export default Signup;