import React, { useState } from "react";
import axios from "axios";

const UserAvailability = () => {
  const [userId, setUserId] = useState("");
  const [availability, setAvailability] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch user availability
  const fetchAvailability = async () => {
    setMessage("");
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/api/available/${userId}`);
      setAvailability(res.data.availability);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching availability");
    }
  };

  // Update user availability
  const updateAvailability = async (newAvailability) => {
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/availables", {
        user_id: userId,
        new_availability: newAvailability,
      });
      setMessage(res.data.message);
      setAvailability(newAvailability);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating availability");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-2xl rounded-3xl mt-12 border border-gray-100 backdrop-blur-sm">
      <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">User Availability</h2>
      {message && <p className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 font-medium shadow-lg border-l-4 border-green-500 animate-fadeIn">{message}</p>}
      {error && <p className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 font-medium shadow-lg border-l-4 border-red-500 animate-fadeIn">{error}</p>}

      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border-2 border-gray-200 p-4 rounded-xl w-full focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-lg"
          placeholder="Enter user ID"
          required
        />
      </div>
      <button
        onClick={fetchAvailability}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
      >
        Check Availability
      </button>

      {availability !== null && (
        <div className="mt-10 text-center backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-inner">
          <p className="text-2xl font-bold text-gray-800 mb-6">
            Current Status: 
            <span className={`ml-3 ${availability ? 'text-green-600' : 'text-red-600'} animate-pulse`}>
              {availability ? "Available" : "Unavailable"}
            </span>
          </p>
          <div className="mt-8 flex gap-6">
            <button
              onClick={() => updateAvailability(1)}
              className="flex-1 bg-gradient-to-br from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>✓ Set Available</span>
            </button>
            <button
              onClick={() => updateAvailability(0)}
              className="flex-1 bg-gradient-to-br from-red-500 to-rose-600 text-white py-4 rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>✕ Set Unavailable</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvailability;