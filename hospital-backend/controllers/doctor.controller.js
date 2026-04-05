const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    const imagePath = req.file
      ? `doctors/${req.file.filename}`
      : null;

    const doctor = new Doctor({
      name,
      specialization,
      doctor_image: imagePath,
    });

    await doctor.save();

    res.json({
      success: true,
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};