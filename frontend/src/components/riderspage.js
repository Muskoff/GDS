import React, { useState } from "react";
import axios from "axios";
import { FaGasPump, FaDollarSign, FaCheck, FaExclamationCircle } from "react-icons/fa";

const GasPriceForm = () => {
    const [formData, setFormData] = useState({
        gas_type: "",
        price: ""
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResponse(null);
        
        try {
            const res = await axios.post("http://localhost:5000/api/gas", formData);
            setResponse(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl mt-10 border border-gray-100">
            <div className="flex items-center justify-center mb-8">
                <FaGasPump className="text-4xl text-blue-500 mr-3" />
                <h2 className="text-3xl font-bold text-center text-gray-800">Update Gas Price</h2>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8 rounded-full"></div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                        <FaGasPump className="mr-2 text-blue-500" />
                        Gas Type
                    </label>
                    <input
                        type="text"
                        name="gas_type"
                        placeholder="Enter gas type (e.g., Regular, Premium)"
                        value={formData.gas_type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-400"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                        <FaDollarSign className="mr-2 text-green-500" />
                        Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                            type="number"
                            name="price"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-400"
                        />
                    </div>
                </div>
                <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:via-blue-700 hover:to-purple-600 transition-all duration-300 font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                    <FaCheck className="mr-2" />
                    Update Price
                </button>
            </form>
            {response && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <p className="text-green-600 font-medium">{response.message}</p>
                </div>
            )}
            {error && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center">
                    <FaExclamationCircle className="text-red-500 mr-2" />
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            )}
        </div>
    );
};

export default GasPriceForm;