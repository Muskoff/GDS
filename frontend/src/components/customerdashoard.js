import React from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">student Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to your dashboard. You can place an order below.</p>
                <div className="mt-4">
                    <Link to="/placeorder" className="block bg-indigo-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-indigo-700">
                        Place Order
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
