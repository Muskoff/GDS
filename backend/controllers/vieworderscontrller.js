const db = require("../db");

// Fetch only pending orders for the rider
const getOrdersForRider = async (req, res) => {
    try {
        const [orders] = await db.promise().execute(
            "SELECT order_id, user_id, gas_type, quantity, address, total_price FROM orders WHERE status = 'pending'"
        );
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders for rider:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Mark order as completed (fix: using req.params)
const markOrderAsCompleted = async (req, res) => {
    try {
        const { order_id } = req.params; // Extract from URL instead of body
        if (!order_id) {
            return res.status(400).json({ message: "Order ID is required." });
        }

        const [result] = await db.promise().execute(
            "UPDATE orders SET status = 'completed' WHERE order_id = ?",
            [order_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found or already completed." });
        }

        res.status(200).json({ message: "Order marked as completed." });
    } catch (error) {
        console.error("Error marking order as completed:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getOrdersForRider, markOrderAsCompleted };
