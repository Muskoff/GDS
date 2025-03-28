const db = require("../db");

// Insert or update gas price by riders
const updateGasPrice = async (req, res) => {
    try {
        const { gas_type, price } = req.body;

        if (!gas_type || !price) {
            return res.status(400).json({ message: "Gas type and price are required." });
        }

        // Insert if not exists, otherwise update
        const query = `
            INSERT INTO gas_price (gas_type, price) 
            VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE price = VALUES(price)
        `;

        await db.promise().execute(query, [gas_type, price]);

        res.status(200).json({ message: "Gas price set successfully!" });
    } catch (error) {
        console.error("Gas price update error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { updateGasPrice };
