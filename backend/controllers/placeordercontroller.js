const db = require("../db");

// Fetch available gas types
const getGasTypes = async (req, res) => {
    try {
        const [gasTypes] = await db.promise().execute("SELECT gas_type, price FROM gas_price");
        res.status(200).json(gasTypes);
    } catch (error) {
        console.error("Error fetching gas types:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Fetch available riders (availability = 1)
const getAvailableRiders = async (req, res) => {
    try {
        const [riders] = await db.promise().execute("SELECT user_id FROM riders WHERE availability = 1");
        res.status(200).json(riders);
    } catch (error) {
        console.error("Error fetching riders:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Fetch available vehicle types (availability = 1)
const getAvailableVehicles = async (req, res) => {
    try {
        const [vehicles] = await db.promise().execute("SELECT user_id, vehicle_type FROM riders WHERE availability = 1");
        res.status(200).json(vehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Place an order with rider and vehicle selection
const placeOrder = async (req, res) => {
    try {
        const { user_id, gas_type, quantity, address, rider_id, vehicle_id } = req.body;

        if (!user_id || !gas_type || !quantity || !address || !rider_id || !vehicle_id) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Fetch user role for discount eligibility
        console.log(`Fetching user role for user ID: ${user_id}`);
        const [users] = await db.promise().execute("SELECT role FROM user WHERE id = ?", [user_id]);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const user = users[0]; 
        let discount = user.role === "student" ? 10 : 0;

        // Fetch gas price per unit
        console.log(`Fetching gas price for type: ${gas_type}`);
        const [gasPrices] = await db.promise().execute("SELECT price FROM gas_price WHERE gas_type = ?", [gas_type]);

        if (!gasPrices || gasPrices.length === 0) {
            return res.status(404).json({ message: "Gas type not found." });
        }

        const price_per_unit = gasPrices[0].price;
        let total_price = price_per_unit * quantity;

        // Apply discount if applicable
        if (discount > 0) {
            total_price -= total_price * (discount / 100);
        }

        // Insert order into the database with selected rider and vehicle
        console.log(`Placing order: User ${user_id}, Gas ${gas_type}, Quantity ${quantity}, Address ${address}, Rider ${rider_id}, Vehicle ${vehicle_id}`);
        const orderQuery = `
            INSERT INTO orders (user_id, gas_type, quantity, address, total_price, discount_applied, status, rider_id, vehicle_id) 
            VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?, ?)
        `;
        await db.promise().execute(orderQuery, [user_id, gas_type, quantity, address, total_price, discount, rider_id, vehicle_id]);

        console.log(`Order placed successfully for User ${user_id}`);
        res.status(201).json({ 
            message: "Order placed successfully!", 
            total_price: total_price.toFixed(2), 
            discount 
        });
    } catch (error) {
        console.error("Order error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { placeOrder, getGasTypes, getAvailableRiders, getAvailableVehicles };
