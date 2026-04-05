const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const uploadDoctor = require("../middlewares/uploadDoctor")

/* -------------------- ADD DOCTOR -------------------- */
router.post(
  "/add_doctor",
  uploadDoctor.single("doctor_image"),
  async (req, res) => {
    try {
      const { name } = req.body

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Doctor name is required",
        })
      }

      // auto slug
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      const doctor = await Doctor.create({
        ...req.body,
        slug,
        doctor_image: req.file
          ? `uploads/doctors/${req.file.filename}`
          : null,
      })

      res.status(201).json({
        success: true,
        message: "Doctor added successfully",
        data: doctor,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Error adding doctor",
      })
    }
  }
)

/* -------------------- GET DOCTORS BY SERVICE -------------------- */
router.post("/get_all_doctors", async (req, res) => {
  try {
    const { client_id, service_id } = req.body;

    if (!client_id) {
      return res.status(400).json({
        success: false,
        message: "client_id is required",
      });
    }

    let query = { client_id };

    if (service_id) {
      query.service_id = service_id;
    }

    const doctors = await Doctor.find(query);

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.error("GET DOCTORS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* -------------------- GET DOCTOR BY SLUG -------------------- */
router.get("/doctors/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const doctor = await Doctor.findOne({ slug });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("GET DOCTOR BY SLUG ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;