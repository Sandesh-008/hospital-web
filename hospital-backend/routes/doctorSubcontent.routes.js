const express = require("express");
const router = express.Router();

const {
  addDoctorSubcontent,
  getDoctorSubcontent
} = require("../controllers/doctorSubcontent.controller");

router.post("/doctors/subcontent", addDoctorSubcontent);

router.get("/doctors/:doctor_id/subcontent", getDoctorSubcontent);

module.exports = router;