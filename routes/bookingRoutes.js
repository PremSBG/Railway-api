const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Import correctly

const router = express.Router();

// ✅ Ensure the function is correctly passed
router.post("/book", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { train_id } = req.body;

    try {
        // Check if train exists
        const [train] = await db.execute("SELECT * FROM trains WHERE id = ?", [train_id]);
        if (train.length === 0) return res.status(404).json({ error: "Train not found" });

        // Check seat availability
        if (train[0].available_seats <= 0) return res.status(400).json({ error: "No available seats" });

        // Transaction Handling for Concurrent Booking
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            await connection.execute(
                "UPDATE trains SET available_seats = available_seats - 1 WHERE id = ? AND available_seats > 0",
                [train_id]
            );

            const [result] = await connection.execute(
                "INSERT INTO bookings (user_id, train_id) VALUES (?, ?)",
                [userId, train_id]
            );

            await connection.commit();
            connection.release();

            res.json({ message: "Seat booked successfully", booking_id: result.insertId });
        } catch (err) {
            await connection.rollback();
            connection.release();
            res.status(500).json({ error: "Booking failed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router; // ✅ Ensure it is correctly exported