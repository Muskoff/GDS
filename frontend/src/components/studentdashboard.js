import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingBag, FaCalendarAlt, FaCreditCard, FaGasPump, FaMapMarkerAlt, FaStarHalf, FaHeadset, FaUserCircle } from 'react-icons/fa';

const CustomerDashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-center text-indigo-800 mb-10 pt-4"
            >
                Student Dashboard
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-indigo-600 mb-4 flex justify-center">
                        <FaShoppingBag />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
                    <p className="text-gray-600 mt-2">View and track your current orders.</p>
                    <div className="mt-6">
                        <Link to="/placeorder" className="block bg-indigo-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-200">
                            View Orders
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                        <FaCalendarAlt />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Schedule Meeting</h1>
                    <p className="text-gray-600 mt-2">Schedule Meetings.</p>
                    <div className="mt-6">
                        <Link to="/schedule" className="block bg-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200">
                            Schedule
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-green-600 mb-4 flex justify-center">
                        <FaCreditCard />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
                    <p className="text-gray-600 mt-2">Manage your payment methods.</p>
                    <div className="mt-6">
                        <Link to="/payment" className="block bg-green-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 transform hover:-translate-y-1 transition-all duration-200">
                            Payment
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-yellow-600 mb-4 flex justify-center">
                        <FaGasPump />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Gas details</h1>
                    <p className="text-gray-600 mt-2">View gas details.</p>
                    <div className="mt-6">
                        <Link to="/getgas" className="block bg-yellow-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-yellow-700 transform hover:-translate-y-1 transition-all duration-200">
                            Current gas details
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-purple-600 mb-4 flex justify-center">
                        <FaMapMarkerAlt />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Addresses</h1>
                    <p className="text-gray-600 mt-2">Manage your delivery addresses.</p>
                    <div className="mt-6">
                        <Link to="/addresses" className="block bg-purple-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-200">
                            Manage Addresses
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-red-600 mb-4 flex justify-center">
                        <FaStarHalf />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
                    <p className="text-gray-600 mt-2">View and manage your reviews.</p>
                    <div className="mt-6">
                        <Link to="/reviews" className="block bg-red-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-red-700 transform hover:-translate-y-1 transition-all duration-200">
                            My Reviews
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-pink-600 mb-4 flex justify-center">
                        <FaHeadset />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Support</h1>
                    <p className="text-gray-600 mt-2">Get help and assistance.</p>
                    <div className="mt-6">
                        <Link to="/support" className="block bg-pink-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-pink-700 transform hover:-translate-y-1 transition-all duration-200">
                            Contact Support
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transform transition-all duration-300">
                    <div className="text-4xl text-teal-600 mb-4 flex justify-center">
                        <FaUserCircle />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your account details.</p>
                    <div className="mt-6">
                        <Link to="/profile" className="block bg-teal-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-teal-700 transform hover:-translate-y-1 transition-all duration-200">
                            Edit Profile
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CustomerDashboard;