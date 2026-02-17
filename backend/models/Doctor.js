const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  category: String,          // Neurologist, Gynecologist etc
  address: String,           // Clinic Address
  availableTime: String      // 10AM - 4PM
});

