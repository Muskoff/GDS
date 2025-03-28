import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51R4Bs7B7L6tvwmzEWMt1pnDPWSojFdEhT3oCZNyK1acbhmaoo048HdnKh4zCLaRffP7EkVfEDldoi3m9WQeigFWJ00PJInpZoi");

const CheckoutForm = ({ order_id, amount_paid }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);

        if (!stripe || !elements) return;

        try {
            const { data } = await axios.post("http://100.119.117.121:5000/api/payment-intent", {
                order_id,
                amount: amount_paid,
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                setResponse({
                    message: "Payment Successful!",
                    order_id,
                    amount_paid,
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <CardElement className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 transition-all duration-300 shadow-sm" />
            <button type="submit" disabled={!stripe || loading} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg font-semibold">
                {loading ? "Processing..." : "Pay with Card"}
            </button>
            {response && <p className="text-green-500 text-center font-medium animate-fade-in">{response.message}</p>}
            {error && <p className="text-red-500 text-center font-medium animate-fade-in">{error}</p>}
        </form>
    );
};

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        order_id: "",
        payment_method: "Credit Card",
        amount_paid: "",
        phone_number: ""
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResponse(null);

        try {
            const res = await axios.post("http://100.119.117.121:5000/api/payment", formData);
            setResponse(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-2">Make Payment</h2>
                    <p className="text-purple-100 text-center">Secure and easy payment process</p>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Order ID</label>
                            <input type="text" name="order_id" placeholder="Enter your order ID" value={formData.order_id} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Payment Method</label>
                            <select name="payment_method" value={formData.payment_method} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white">
                                <option value="Credit Card">Credit Card</option>
                                <option value="Mobile Money">Mobile Money</option>
                                <option value="Telecel Cash">Telecel Cash</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Amount</label>
                            <input type="number" name="amount_paid" placeholder="Enter amount" value={formData.amount_paid} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
                        </div>
                        {formData.payment_method === "Credit Card" ? (
                            <Elements stripe={stripePromise}>
                                <CheckoutForm order_id={formData.order_id} amount_paid={formData.amount_paid} />
                            </Elements>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input type="tel" name="phone_number" placeholder="Enter mobile money number" value={formData.phone_number} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg font-semibold">
                                    Pay Now
                                </button>
                            </>
                        )}
                    </form>
                    {response && <p className="mt-4 text-green-500 text-center font-medium bg-green-50 p-3 rounded-lg">{response.message}</p>}
                    {error && <p className="mt-4 text-red-500 text-center font-medium bg-red-50 p-3 rounded-lg">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;