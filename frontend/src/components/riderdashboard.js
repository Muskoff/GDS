import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBox, FaHistory, FaMoneyBillWave, FaCalendarAlt, FaGasPump, FaUserClock, FaHeadset, FaUserCircle } from 'react-icons/fa';

const CustomerDashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-purple-50 p-6">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-center text-gray-800 mb-12 pt-6 drop-shadow-lg"
            >
                Rider's Dashboard
            </motion.h1>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaBox className="text-4xl text-indigo-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Current Orders</h1>
                        <p className="text-gray-600 mt-3">Manage Your Gas.</p>
                        <div className="mt-6">
                            <Link to="/riderspage" className="block bg-indigo-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
                                Edit Gas
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaHistory className="text-4xl text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Delivery History</h1>
                        <p className="text-gray-600 mt-3">View your orders.</p>
                        <div className="mt-6">
                            <Link to="/vieworder" className="block bg-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
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
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaMoneyBillWave className="text-4xl text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
                        <p className="text-gray-600 mt-3">Track your income and payments.</p>
                        <div className="mt-6">
                            <Link to="/viewearnings" className="block bg-green-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
                                View Earnings
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaCalendarAlt className="text-4xl text-yellow-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Schedule</h1>
                        <p className="text-gray-600 mt-3">Manage your working hours.</p>
                        <div className="mt-6">
                            <Link to="/appointmentschedule" className="block bg-yellow-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-yellow-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
                                Set Schedule
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaGasPump className="text-4xl text-purple-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Gas Details</h1>
                        <p className="text-gray-600 mt-3">Manage your Gas information.</p>
                        <div className="mt-6">
                            <Link to="/managegas" className="block bg-purple-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
                                Manage Gas
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaUserClock className="text-4xl text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Availability</h1>
                        <p className="text-gray-600 mt-3">Make yourself available.</p>
                        <div className="mt-6">
                            <Link to="/availability" className="block bg-red-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-red-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
                               Availability
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaHeadset className="text-4xl text-pink-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Support</h1>
                        <p className="text-gray-600 mt-3">Get help and assistance.</p>
                        <div className="mt-6">
                            <Link to="/support" className="block bg-pink-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-pink-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
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
                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 border border-gray-100">
                        <div className="flex justify-center mb-4">
                            <FaUserCircle className="text-4xl text-teal-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                        <p className="text-gray-600 mt-3">Manage your account details.</p>
                        <div className="mt-6">
                            <Link to="/profile" className="block bg-teal-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-teal-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-xl">
                                Edit Profile
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;