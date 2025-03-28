import React, { useEffect, useState } from "react";

const GasStations = () => {
    const [gasStations, setGasStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGasStations();
    }, []);

    const fetchGasStations = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/gasdetails");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch gas stations");
            }

            setGasStations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Gas Stations</span>
            </h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="max-w-2xl mx-auto">
                    <p className="text-red-500 text-center p-6 bg-red-50 rounded-xl shadow-sm border border-red-200">{error}</p>
                </div>
            ) : gasStations.length === 0 ? (
                <div className="max-w-2xl mx-auto">
                    <p className="text-gray-600 text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">No gas stations available.</p>
                </div>
            ) : (
                <div className="overflow-hidden shadow-2xl rounded-2xl bg-white border border-gray-100">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Gas Station</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Estimated Finish Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {gasStations.map((station, index) => (
                                <tr key={index} className="hover:bg-blue-50 transition-colors duration-200">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{station.gas_station}</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm text-gray-700">{station.location}</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm text-gray-700">{new Date(station.estimated_end_date).toLocaleDateString()}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GasStations;