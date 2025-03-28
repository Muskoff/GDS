import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const dashboardItems = [
        { title: "Manage Users", description: "Add, edit, and remove users", route: "/adminuser", icon: "👥" },
        { title: "Manage Gas", description: "Handle book inventory and borrowing", route: "/managegases", icon: "🔥" },
        { title: "Manage gas location", description: "Oversee student and staff attendance", route: "/manage-attendance", icon: "📍" },
        { title: "Settings", description: "Adjust system settings", route: "/settings", icon: "⚙️" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-12 text-indigo-900 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Admin Dashboard
                    </span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dashboardItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white backdrop-blur-lg bg-opacity-80 shadow-2xl rounded-2xl p-8 hover:shadow-3xl transition-all cursor-pointer transform hover:scale-105 duration-300 ease-in-out border border-indigo-50"
                            onClick={() => navigate(item.route)}
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h2 className="text-2xl font-bold text-indigo-900 mb-3 tracking-tight">{item.title}</h2>
                            <p className="text-gray-600 text-base leading-relaxed">{item.description}</p>
                            <div className="mt-4 flex justify-end">
                                <div className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    Explore →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;