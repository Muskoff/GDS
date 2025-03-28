const db = require("../db"); // Import database connection

// Initialize gas data (Insert multiple entries)
const initializeGasData = (req, res) => {
    const gasData = req.body; // Expecting an array of gas station entries

    if (!Array.isArray(gasData) || gasData.length === 0) {
        return res.status(400).json({ message: "Invalid input format, expecting an array" });
    }

    const values = gasData.map(({ id, gasStation, location, lastFilled, totalFilledKg, gasesAvailable }) => {
        const lastFilledDate = new Date(lastFilled);
        const estimatedEndDate = new Date(lastFilledDate);
        estimatedEndDate.setDate(estimatedEndDate.getDate() + 14); // Add 14 days

        return [id, gasStation, location, lastFilled, totalFilledKg, gasesAvailable, estimatedEndDate];
    });

    const sql = `
        INSERT INTO gas (id, gas_station, location, last_filled, total_filled_kg, gases_available, estimated_end_date) 
        VALUES ? 
        ON DUPLICATE KEY UPDATE 
        gas_station = VALUES(gas_station), 
        location = VALUES(location), 
        last_filled = VALUES(last_filled), 
        total_filled_kg = VALUES(total_filled_kg), 
        gases_available = VALUES(gases_available),
        estimated_end_date = VALUES(estimated_end_date)
    `;

    db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        res.status(200).json({ message: "Gas data initialized successfully" });
    });
};

// Get all gas levels
const getGasLevels = (req, res) => {
    const sql = "SELECT * FROM gas"; // Fetch all entries

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No gas data found" });
        }

        // Calculate days left for each gas station
        const gasData = results.map(entry => {
            const estimatedEndDate = new Date(entry.estimated_end_date);
            const today = new Date();
            const daysLeft = Math.max(0, Math.ceil((estimatedEndDate - today) / (1000 * 60 * 60 * 24)));

            return {
                ...entry,
                daysLeft
            };
        });

        res.status(200).json(gasData);
    });
};

// Update gas levels
const updateGasLevels = async (req, res) => {
    const { gasStation, location, lastFilled, totalFilledKg, gasesAvailable } = req.body;

    try {
        // Ensure correct table name
        const getIdSql = `SELECT id FROM gas WHERE gas_station = ? AND location = ? LIMIT 1`;
        const [rows] = await db.execute(getIdSql, [gasStation, location]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Gas entry not found" });
        }

        const id = rows[0].id;

        // Calculate new estimated end date
        const lastFilledDate = new Date(lastFilled);
        const estimatedEndDate = new Date(lastFilledDate);
        estimatedEndDate.setDate(estimatedEndDate.getDate() + 14); // Add 14 days

        // Update the gas level using the retrieved ID
        const updateSql = `
            UPDATE gas 
            SET last_filled = ?, total_filled_kg = ?, gases_available = ?, estimated_end_date = ?
            WHERE id = ?
        `;
        const values = [lastFilled, totalFilledKg, gasesAvailable, estimatedEndDate, id];

        const [result] = await db.execute(updateSql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Failed to update gas entry" });
        }

        res.status(200).json({ message: "Gas level updated successfully", id });
    } catch (error) {
        console.error("Error updating gas levels:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { initializeGasData, getGasLevels, updateGasLevels };
