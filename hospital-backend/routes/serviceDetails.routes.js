const express = require("express");
const router = express.Router();

const {
  getServiceDetails,
} = require("../controllers/serviceDetails.controller");

router.post("/get_service_details", getServiceDetails);

module.exports = router;
