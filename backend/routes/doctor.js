
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/admin");

// ADD DOCTOR (Protected)
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, specialization, address, category, availableTime } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      address,
      category,
      availableTime
    });

    await doctor.save();

    res.json({ message: "Doctor Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET ALL DOCTORS (Public)
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
