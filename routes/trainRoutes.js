const express = require("express");
const db = require("../config/db");
const adminAuth = require("../middleware/adminMiddleware");

const router = express.Router();

// Add Train (Admin Only)
router.post("/add", adminAuth, async (req, res) => {
    const { name, source, destination, total_seats } = req.body;

    try {
        await db.execute(
            "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)",
            [name, source, destination, total_seats, total_seats]
        );
        res.status(201).json({ message: "Train added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add train" });
    }
});

// Get Available Trains
router.get("/availability", async (req, res) => {
    const { source, destination } = req.query;

    try {
        const [trains] = await db.execute(
            "SELECT * FROM trains WHERE source = ? AND destination = ?",
            [source, destination]
        );
        res.json(trains);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trains" });
    }
});

module.exports = router;