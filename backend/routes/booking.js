console.log("Booking route loaded");
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE BOOKING
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const booking = new Booking({
      user: req.user.id,
      doctor: doctorId,
      date,
      time
    });

    await booking.save();

    res.json({ message: "Appointment booked successfully", booking });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET MY BOOKINGS
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("doctor");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
