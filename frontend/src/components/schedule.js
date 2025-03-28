import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaPhone, FaUser, FaEnvelope, FaClock, FaCheck, FaTimes } from "react-icons/fa";

const MeetingPage = () => {
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.appointlet.com/";
    script.async = true;
    document.body.appendChild(script);
    
    const link = document.createElement("link");
    link.href = "https://js.appointlet.com/styles.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmAppointment = () => {
    if (!formData.name || !formData.email || !selectedTime) {
      alert("Please fill in all details.");
      return;
    }
    setShowSchedulePopup(false);
    alert(`Appointment confirmed for ${selectedTime}. Check your email.`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white text-black p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 tracking-wide">Schedule Your Meeting</h1>
      
      {/* Meeting Options */}
      <div className="w-full max-w-md space-y-4">
        <a className="appointlet-button w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold p-5 rounded-xl flex items-center justify-center space-x-3 transform transition-transform hover:scale-105 shadow-lg"
          data-appointlet-modal 
          href="https://appt.link/meet-with-biiig-sugar-jBFmdxRb/in-person-meeting"
        >
          <FaCalendarAlt className="text-xl" />
          <span>Schedule a Meeting</span>
        </a>

        <a className="appointlet-button w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold p-5 rounded-xl flex items-center justify-center space-x-3 transform transition-transform hover:scale-105 shadow-lg"
          data-appointlet-modal 
          href="https://appt.link/meet-with-biiig-sugar-jBFmdxRb/phone-call"
        >
          <FaPhone className="text-xl" />
          <span>Schedule a Phone Call</span>
        </a>
      </div>

      {showSchedulePopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-2xl shadow-2xl w-96 transform transition-all">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Schedule a Meeting
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FaClock className="absolute top-3 left-3 text-gray-400" />
                <select
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select a Time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Confirm and Cancel Buttons */}
            <div className="flex justify-between mt-6 gap-4">
              <button
                onClick={handleConfirmAppointment}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-lg flex items-center justify-center space-x-2 transform transition-transform hover:scale-105"
              >
                <FaCheck />
                <span>Confirm</span>
              </button>
              <button
                onClick={() => setShowSchedulePopup(false)}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-3 rounded-lg flex items-center justify-center space-x-2 transform transition-transform hover:scale-105"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;