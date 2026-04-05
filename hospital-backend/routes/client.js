const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

/* ================================
   ADD CLIENT API (Only One Allowed)
================================ */
router.post("/add_client", async (req, res) => {
  try {
    const { name, email, phone, address, logo } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Hospital name is required",
      });
    }

    // Check if client already exists
    const existingClient = await Client.findOne();
    if (existingClient) {
      return res.json({
        success: false,
        message: "Client already exists",
      });
    }

    const newClient = new Client({
      name,
      email,
      phone,
      address,
      logo,
    });

    await newClient.save();

    res.json({
      success: true,
      message: "Client added successfully",
      data: newClient,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


/* ================================
   GET CLIENT CONFIG API
================================ */
router.get("/get_client_config", async (req, res) => {
  try {
    const client = await Client.findOne();

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      data: client,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;