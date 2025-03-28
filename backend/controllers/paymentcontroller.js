const db = require("../db");

const processPayment = async (req, res) => {
    try {
        const { order_id, payment_method, amount_paid, phone_number } = req.body;

        if (!order_id || !payment_method || !amount_paid || !phone_number) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the order exists
        const [orders] = await db.promise().execute("SELECT total_price FROM orders WHERE user_id = ?", [order_id]);

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Order not found." });
        }

        const order = orders[0];

        if (amount_paid < order.total_price) {
            return res.status(400).json({ message: "Insufficient amount paid." });
        }

        // Insert payment record
        const paymentQuery = `
            INSERT INTO payments (order_id, payment_method, amount_paid, phone_number, payment_status) 
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.promise().execute(paymentQuery, [order_id, payment_method, amount_paid, phone_number, "Completed"]);

        res.status(201).json({ 
            message: "Payment successful!", 
            order_id,
            amount_paid,
            phone_number
        });

    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { processPayment };