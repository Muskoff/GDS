const db = require("../db");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Fetch user from database
        const [users] = await db.promise().execute("SELECT * FROM user WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const user = users[0];

        // Log the role
        console.log("User Role from DB:", user.role);

        // Compare passwords directly
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Send response
        res.status(200).json({
            message: "Login successful!",
            userId: user.id,
            role: user.role // Send role to frontend
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { loginUser }; 