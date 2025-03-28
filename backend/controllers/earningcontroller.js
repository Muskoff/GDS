const db = require("../db");

// Get all payment records
const getAllEarnings = async (req, res) => {
    try {
        const [earnings] = await db.promise().execute(
            `SELECT order_id, amount_paid, payment_date FROM payments WHERE payment_status = 'Completed'`
        );

        res.status(200).json({ earnings }); // Returns all payment details
    } catch (error) {
        console.error("Error fetching earnings:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getAllEarnings };
