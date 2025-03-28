const db = require("../db");

// Get all users
const getUsers = (req, res) => {
    const sql = "SELECT id, name, email, role FROM user";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        res.status(200).json(results);
    });
};

// Update user details
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const sql = "UPDATE user SET name = ?, email = ?, role = ? WHERE id = ?";
    db.query(sql, [name, email, role, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User updated successfully" });
    });
};

// Delete user
const deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM user WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    });
};

module.exports = { getUsers, updateUser, deleteUser };
