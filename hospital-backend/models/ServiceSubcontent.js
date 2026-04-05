const mongoose = require("mongoose");

const serviceSubcontentSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: true,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    sub_title: {
      type: String,
      required: true,
    },
    sub_content: {
      type: String,
      required: true,
    },
    sub_image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceSubcontent", serviceSubcontentSchema);
