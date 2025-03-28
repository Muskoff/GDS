const db = require("../db"); // Import MySQL database connection

// Set user availability explicitly
const setUserAvailability = async (req, res) => {
  const { user_id, new_availability } = req.body;

  if (!user_id || new_availability === undefined) {
    return res.status(400).json({ message: "User ID and availability status are required." });
  }

  try {
    // Check if user exists
    const result = await db.promise().query(
      "SELECT availability FROM riders WHERE user_id = ?",
      [user_id]
    );

    if (result[0].length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update availability status
    await db.promise().query(
      "UPDATE riders SET availability = ? WHERE user_id = ?",
      [new_availability, user_id]
    );

    res.json({ message: `Availability updated to ${new_availability}` });
  } catch (err) {
    console.error("Error updating availability:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch user availability
const getUserAvailability = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await db.promise().query(
      "SELECT availability FROM riders WHERE user_id = ?",
      [user_id]
    );

    if (result[0].length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0][0]);
  } catch (err) {
    console.error("Error fetching availability:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { setUserAvailability, getUserAvailability };
