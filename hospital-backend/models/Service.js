const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    client_id: { type: String, required: true },

    service_name: { 
      type: String, 
      required: true,
      trim: true 
    },

    description: { 
      type: String,
      trim: true 
    },

    image: { 
      type: String 
    },

    keywords: { 
      type: String 
    },

    doctor_ids: [{ 
      type: String 
    }],

    // ✅ Soft Delete Field
    isDeleted: { 
      type: Boolean, 
      default: false 
    },

    // ✅ Optional: Who deleted it (for audit)
    deletedBy: {
      type: String,
      default: null
    },

    // ✅ Optional: When deleted
    deletedAt: {
      type: Date,
      default: null
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);