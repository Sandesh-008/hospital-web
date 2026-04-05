const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  appointment_date: String,
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);