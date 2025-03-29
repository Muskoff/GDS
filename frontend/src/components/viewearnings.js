import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { MdError, MdPayment } from 'react-icons/md';

const OrderEarnings = () => {
    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        const fetchEarnings = async () => {
            setLoading(true);
            setError(null);
            setNoData(false);
            try {
                const response = await fetch("http://localhost:5000/api/earnings");
                const data = await response.json();
                if (response.ok) {
                    if (data.earnings.length === 0) {
                        setNoData(true);
                    }
                    setEarnings(data.earnings);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Failed to fetch data");
            }
            setLoading(false);
        };
        
        fetchEarnings();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl">
            <div className="flex items-center justify-center mb-6">
                <MdPayment className="text-3xl text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
            </div>
            
            {loading && (
                <div className="flex items-center justify-center p-4">
                    <FaSpinner className="animate-spin text-blue-600 text-2xl mr-2" />
                    <p className="text-gray-600 text-lg">Loading payments...</p>
                </div>
            )}
            
            {error && (
                <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
                    <MdError className="text-red-500 text-2xl mr-2" />
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            )}
            
            {noData && (
                <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-lg">No payment records found.</p>
                </div>
            )}
            
            {earnings.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full mt-4 border-collapse rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                <th className="px-6 py-4 font-semibold">
                                    <div className="flex items-center justify-center">
                                        <FaShoppingCart className="mr-2" />
                                        Order ID
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    <div className="flex items-center justify-center">
                                        <FaMoneyBillWave className="mr-2" />
                                        Amount Paid
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    <div className="flex items-center justify-center">
                                        <FaCalendarAlt className="mr-2" />
                                        Payment Date
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {earnings.map((earning, index) => (
                                <tr key={index} 
                                    className="text-center border-b hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">{earning.order_id}</td>
                                    <td className="px-6 py-4 text-green-600 font-semibold">
                                        ${earning.amount_paid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(earning.payment_date).toLocaleDateString()}
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

export default OrderEarnings;