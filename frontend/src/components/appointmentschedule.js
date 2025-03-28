import React from "react";

const RidersPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full backdrop-blur-sm bg-opacity-90">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Schedule Your Appointment
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                    Book your session with our expert team at your convenience
                </p>
                <div className="flex justify-center">
                    <a
                        href="https://dashboard.appointlet.com/profiles/243198/scheduling-pages/436599"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition duration-300 ease-in-out font-semibold text-lg"
                    >
                        Schedule Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RidersPage;