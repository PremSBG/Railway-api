const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { train_id } = req.body;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // ✅ Lock the row to prevent race conditions
        const [train] = await connection.execute(
            "SELECT available_seats FROM trains WHERE id = ? FOR UPDATE",
            [train_id]
        );

        if (train.length === 0) {
            await connection.rollback();
            connection.release();
            return res.status(404).json({ error: "Train not found" });
        }

        if (train[0].available_seats <= 0) {
            await connection.rollback();
            connection.release();
            return res.status(400).json({ error: "No available seats" });
        }

        // ✅ Reduce seat count safely
        await connection.execute(
            "UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?",
            [train_id]
        );

        // ✅ Insert booking
        const [result] = await connection.execute(
            "INSERT INTO bookings (user_id, train_id) VALUES (?, ?)",
            [userId, train_id]
        );

        await connection.commit();
        connection.release();

        res.json({ message: "Seat booked successfully", booking_id: result.insertId });
    } catch (error) {
        await connection.rollback();
        connection.release();
        res.status(500).json({ error: "Booking failed" });
    }
});

module.exports = router;
