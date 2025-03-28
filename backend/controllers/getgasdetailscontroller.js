const db = require("../db"); // Import database connection

// Get gas station details with estimated end date and remove expired entries
const getGasDetails = (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // First, delete expired records where estimated_end_date is past today
    const deleteExpiredSql = "DELETE FROM gas WHERE estimated_end_date < ?";
    
    db.query(deleteExpiredSql, [currentDate], (deleteErr, deleteResult) => {
        if (deleteErr) {
            return res.status(500).json({ message: "Error deleting expired records", error: deleteErr });
        }

        // Fetch updated gas station details
        const sql = "SELECT gas_station, location, estimated_end_date FROM gas";

        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "No gas data found" });
            }

            res.status(200).json(results);
        });
    });
};

module.exports = { getGasDetails };
