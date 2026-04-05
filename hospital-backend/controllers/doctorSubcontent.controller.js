const DoctorSubcontent = require("../models/doctorSubcontent.model");

exports.addDoctorSubcontent = async (req, res) => {
  try {
    const { client_id, doctor_id, sub_title, sub_content, sub_image } = req.body;

    if (!client_id || !doctor_id || !sub_title || !sub_content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const newData = new DoctorSubcontent(req.body);
    await newData.save();

    res.status(200).json({
      success: true,
      message: "Doctor subcontent added successfully",
      data: newData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


exports.getDoctorSubcontent = async (req, res) => {
  try {
    const { doctor_id } = req.params;

    if (!doctor_id) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const data = await DoctorSubcontent.find({
      doctor_id,
      is_active: true
    }).sort({ display_order: 1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};