import React, { useState, useEffect } from "react";
import axios from "axios";

const GasManagement = () => {
    const [gasData, setGasData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        gasStation: "",
        location: "",
        lastFilled: "",
        totalFilledKg: "",
        gasesAvailable: ""
    });
    const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
        fetchGasLevels();
    }, []);

    const fetchGasLevels = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://100.119.117.121:5000/api/gaslevels");
            setGasData(response.data);
        } catch (error) {
            console.error("Error fetching gas levels:", error);
            setError("Failed to fetch gas levels. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInitialize = async () => {
        if (!formData.gasStation || !formData.location || !formData.lastFilled || !formData.totalFilledKg || !formData.gasesAvailable) {
            setError("All fields are required.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/initialize", [formData]);
            fetchGasLevels();
            setFormData({
                gasStation: "",
                location: "",
                lastFilled: "",
                totalFilledKg: "",
                gasesAvailable: ""
            });
        } catch (error) {
            console.error("Error initializing gas data:", error);
            setError("Failed to initialize gas data.");
        }
    };

    const handleEntryClick = (entry) => {
        setSelectedEntry(entry.id);
        setFormData({
            gasStation: entry.gas_station,
            location: entry.location,
            lastFilled: entry.last_filled.split('T')[0],
            totalFilledKg: entry.total_filled_kg,
            gasesAvailable: entry.gases_available
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-100 py-12">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-5xl font-extrabold mb-12 text-indigo-900 text-center tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Gas Management System
                    </span>
                </h2>
                
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-lg shadow-md animate-fade-in">
                        {error}
                    </div>
                )}

                {/* Initialize Gas Data */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 mb-16 transform hover:scale-[1.01] transition-all duration-300">
                    <h3 className="text-3xl font-bold mb-8 text-indigo-900 text-center">Initialize Gas Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {Object.keys(formData).map((key) => (
                            <div key={key} className="relative group">
                                <input
                                    type={key === "lastFilled" ? "date" : "text"}
                                    name={key}
                                    value={formData[key]}
                                    placeholder={key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 border-2 border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-indigo-900 placeholder-indigo-300"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button 
                            onClick={handleInitialize} 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700"
                            disabled={!formData.gasStation || !formData.location || !formData.lastFilled || !formData.totalFilledKg || !formData.gasesAvailable}
                        >
                            Initialize
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gasData.length > 0 ? (
                            gasData.map((entry) => (
                                <div 
                                    key={entry.id} 
                                    className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                                        selectedEntry === entry.id ? 'ring-4 ring-indigo-500 shadow-2xl' : ''
                                    }`}
                                    onClick={() => handleEntryClick(entry)}
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{entry.gas_station}</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                                                <p className="text-sm text-indigo-600 font-semibold mb-1">Location</p>
                                                <p className="text-gray-800 font-medium">{entry.location}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                                                <p className="text-sm text-indigo-600 font-semibold mb-1">Last Filled</p>
                                                <p className="text-gray-800 font-medium">{new Date(entry.last_filled).toDateString()}</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                                                <p className="text-sm text-indigo-600 font-semibold mb-1">Total Filled</p>
                                                <p className="text-gray-800 font-medium">{entry.total_filled_kg} kg</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                                                <p className="text-sm text-indigo-600 font-semibold mb-1">Days Left</p>
                                                <p className="text-gray-800 font-medium">{entry.daysLeft} days</p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl mt-4">
                                            <p className="text-sm text-indigo-600 font-semibold mb-1">Gases Available</p>
                                            <p className="text-gray-800 font-medium">{entry.gases_available}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-600 py-16 text-xl font-medium bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg">
                                No gas data available.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GasManagement;