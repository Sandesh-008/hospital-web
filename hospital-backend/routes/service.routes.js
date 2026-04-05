const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const upload = require("../config/multer");   // ✅ use existing multer

/* -------------------- ADD SERVICE -------------------- */
router.post(
  "/services/add_service",   // IMPORTANT (explained below)
  upload.single("image"),
  async (req, res) => {
    try {
      const { service_name } = req.body;

      if (!service_name) {
        return res.status(400).json({
          success: false,
          message: "Service name is required",
        });
      }

      const service = await Service.create({
        ...req.body,
        image: req.file ? req.file.filename : null,
      });

      res.status(201).json({
        success: true,
        message: "Service added successfully",
        data: service,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error adding service",
      });
    }
  }
);


/* -------------------- GET SERVICE -------------------- */

router.post("/get_all_services", async (req, res) => {
  try {
    const { client_id } = req.body

    const services = await Service.find({
  client_id,
  $or: [
    { isDeleted: false },
    { isDeleted: { $exists: false } }
  ]
});

    res.json({
      success: true,
      data: services,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})


/* -------------------- DELETE SERVICE -------------------- */

router.delete("/delete_service/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
      data: service,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router
