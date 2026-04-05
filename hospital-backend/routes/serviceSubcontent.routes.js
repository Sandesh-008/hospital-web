const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const ServiceSubcontent = require("../models/ServiceSubcontent");

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = path.join(__dirname, "../uploads/service_subcontent");

    // Ensure folder exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s/g, "");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* ================= ADD SERVICE SUBCONTENT ================= */

router.post(
  "/add_service_subcontent",
  upload.single("sub_image"), // 👈 IMPORTANT (must match form-data key)
  async (req, res) => {
    try {
      const { client_id, service_id, sub_title, sub_content } = req.body;

      if (!client_id || !service_id || !sub_title || !sub_content) {
        return res.status(400).json({
          success: false,
          message: "Required fields missing",
        });
      }

      const newSubcontent = new ServiceSubcontent({
        client_id,
        service_id,
        sub_title,
        sub_content,
        sub_image: req.file ? req.file.filename : null, // 👈 Save filename
      });

      await newSubcontent.save();

      return res.status(201).json({
        success: true,
        message: "Service subcontent added successfully",
        data: newSubcontent,
      });
    } catch (error) {
      console.error("ADD SUBCONTENT ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

module.exports = router;