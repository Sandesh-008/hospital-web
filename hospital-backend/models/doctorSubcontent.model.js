const mongoose = require("mongoose");

const doctorSubcontentSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  sub_title: { type: String, required: true },
  sub_content: { type: String, required: true },
  sub_image: { type: String },
  display_order: Number,
  sub_type: String,
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("DoctorSubcontent", doctorSubcontentSchema);