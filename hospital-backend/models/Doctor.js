const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema(
  {
    client_id: { type: String, required: true },
    service_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    doctor_image: String,
    rating: Number,
    review_count: Number,
    qualifications: String,
    speciality: String,
    availability: String,
    phone: String,
    hospital: String,
    doctor_keywords: [String],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Doctor", doctorSchema)
