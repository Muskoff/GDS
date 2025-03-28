const db = require("../db"); // Ensure correct path to your database connection file

const signupUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, role, student_id, institution, vehicle_type, license_number } = req.body;

        if (!name || !email || !password || !phone || !role) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const userInsertQuery = `
            INSERT INTO user (name, email, password, phone, address, role) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [userResult] = await db.promise().execute(userInsertQuery, [name, email, password, phone, address, role]);

        if (!userResult || userResult.affectedRows === 0) {
            return res.status(500).json({ message: "Failed to create user." });
        }

        const userId = userResult.insertId;

        if (role === "student") {
            if (!student_id || !institution) {
                return res.status(400).json({ message: "Student ID and institution are required for students." });
            }
            const studentInsertQuery = `
                INSERT INTO student (user_id, student_id, institution, discount_rate) 
                VALUES (?, ?, ?, ?)
            `;
            await db.promise().execute(studentInsertQuery, [userId, student_id, institution, 10]);
        }

        if (role === "rider") {
            if (!vehicle_type || !license_number) {
                return res.status(400).json({ message: "Vehicle type and license number are required for riders." });
            }
            const riderInsertQuery = `
                INSERT INTO riders (user_id, vehicle_type, license_number, availability) 
                VALUES (?, ?, ?, ?)
            `;
            await db.promise().execute(riderInsertQuery, [userId, vehicle_type, license_number, true]);
        }

        // Respond with userId and success message
        res.status(201).json({
            message: "Signup successful!",
            userId: userId,
            user: {
                id: userId,
                name,
                email,
                phone,
                role
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { signupUser };
