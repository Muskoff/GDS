import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [gasTypes, setGasTypes] = useState([]);
  const [riders, setRiders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    gas_type: "",
    quantity: "",
    address: "",
    rider_id: "",
    vehicle_id: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchGasTypes();
    fetchRiders();
    fetchVehicles();
  }, []);

  const fetchGasTypes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-gas");
      setGasTypes(res.data);
    } catch (err) {
      console.error("Error fetching gas types", err);
    }
  };

  const fetchRiders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/riders");
      setRiders(res.data);
    } catch (err) {
      console.error("Error fetching riders", err);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "quantity" || name === "gas_type") {
      calculateTotal(value, formData.gas_type);
    }
  };

  const calculateTotal = (quantity, gasType) => {
    const selectedGas = gasTypes.find((gas) => gas.gas_type === gasType);
    if (!selectedGas) return;

    const pricePerUnit = selectedGas.price;
    const qty = parseInt(quantity) || 0;
    let discountAmount = 0;

    if (qty >= 10) {
      discountAmount = 0.15; 
    } else if (qty >= 5) {
      discountAmount = 0.1; 
    } else if (qty >= 3) {
      discountAmount = 0.05; 
    }

    const total = qty * pricePerUnit;
    const discountValue = total * discountAmount;
    setDiscount(discountValue);
    setTotalPrice(total - discountValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/orders", formData);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-3xl font-extrabold text-white text-center">Place Your Gas Order</h2>
        </div>
        
        <div className="p-8">
          {message && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
            <p className="text-green-700 font-medium">{message}</p>
          </div>}
          
          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                required
                placeholder="User ID"
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
              
              <select
                name="gas_type"
                value={formData.gas_type}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
              >
                <option value="">Select Gas Type</option>
                {gasTypes.map((gas) => (
                  <option key={gas.gas_type} value={gas.gas_type}>{gas.gas_type} - ${gas.price}</option>
                ))}
              </select>
              
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                placeholder="Amount"
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
              
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Delivery Address"
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
              
              <select
                name="rider_id"
                value={formData.rider_id}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
              >
                <option value="">Select Rider</option>
                {riders.map((rider) => (
                  <option key={rider.user_id} value={rider.user_id}>Rider {rider.user_id}</option>
                ))}
              </select>
              
              <select
                name="vehicle_id"
                value={formData.vehicle_id}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150"
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.user_id} value={vehicle.user_id}>{vehicle.vehicle_type} (Rider {vehicle.user_id})</option>
                ))}
              </select>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-gray-800">Total Price</p>
                  <p className="text-sm text-gray-600">Discount Applied: ${discount.toFixed(2)}</p>
                </div>
                <p className="text-3xl font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-150 hover:scale-[1.02]"
            >
              Place Order Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;