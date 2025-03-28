import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMotorcycle, FaGasPump, FaBoxes, FaMapMarkerAlt, FaDollarSign, FaCheckCircle } from 'react-icons/fa';

const RiderOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch pending orders from backend
    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://100.119.117.121:5000/api/vieworders");
            setOrders(res.data);
        } catch (err) {
            setError("Error fetching orders.");
            console.error("Error fetching orders:", err);
        }
    };

    // Mark an order as completed
    const markAsCompleted = async (orderId) => {
        try {
            await axios.put(`http://100.119.117.121:5000/api/orderscomplete/${orderId}`);

            // Update UI: Remove the completed order from the list
            setOrders(orders.filter(order => order.order_id !== orderId));
        } catch (err) {
            setError("Error marking order as completed.");
            console.error("Error marking order as completed:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-8">
                <FaMotorcycle className="text-3xl text-blue-600 mr-3" />
                <h2 className="text-3xl font-extrabold text-blue-600">Rider Orders Dashboard</h2>
            </div>
            {error && <p className="text-red-500 text-center font-bold bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
            <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <th className="px-6 py-4 font-bold"><div className="flex items-center justify-center"><FaMotorcycle className="mr-2" />User ID</div></th>
                            <th className="px-6 py-4 font-bold"><div className="flex items-center justify-center"><FaGasPump className="mr-2" />Gas Type</div></th>
                            <th className="px-6 py-4 font-bold"><div className="flex items-center justify-center"><FaBoxes className="mr-2" />Quantity</div></th>
                            <th className="px-6 py-4 font-bold"><div className="flex items-center justify-center"><FaMapMarkerAlt className="mr-2" />Address</div></th>
                            <th className="px-6 py-4 font-bold"><div className="flex items-center justify-center"><FaDollarSign className="mr-2" />Total Price</div></th>
                            <th className="px-6 py-4 font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order.order_id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 font-semibold text-center">{order.user_id}</td>
                                    <td className="px-6 py-4 font-semibold text-center">{order.gas_type}</td>
                                    <td className="px-6 py-4 font-semibold text-center">{order.quantity}</td>
                                    <td className="px-6 py-4 font-semibold text-center">{order.address}</td>
                                    <td className="px-6 py-4 font-semibold text-center">${order.total_price}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => markAsCompleted(order.order_id)}
                                            className="w-full flex items-center justify-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 font-bold"
                                        >
                                            <FaCheckCircle className="mr-2" />
                                            Complete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8 font-bold text-gray-500">No pending orders available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RiderOrders;