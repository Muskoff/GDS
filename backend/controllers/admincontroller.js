const db = require("../db"); // Ensure correct path to your database connection file

// Admin Signup Controller
const adminSignup = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const insertQuery = `
            INSERT INTO users (name, email, password, phone, address, role) 
            VALUES (?, ?, ?, ?, ?, 'admin')
        `;
        const [result] = await db.promise().execute(insertQuery, [name, email, password, phone, address]);

        if (!result || result.affectedRows === 0) {
            return res.status(500).json({ message: "Failed to create admin." });
        }

        res.status(201).json({
            message: "Admin signup successful!",
            admin: { id: result.insertId, name, email, phone }
        });
    } catch (error) {
        console.error("Admin Signup Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Admin Login Controller
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const selectQuery = `SELECT * FROM users WHERE email = ? AND role = 'admin'`;
        const [rows] = await db.promise().execute(selectQuery, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Admin not found or incorrect credentials." });
        }

        const admin = rows[0];

        if (password !== admin.password) {
            return res.status(401).json({ message: "Invalid password." });
        }

        res.status(200).json({
            message: "Login successful!",
            admin: { id: admin.id, name: admin.name, email: admin.email }
        });
    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { adminSignup, adminLogin };
