const ServiceSubcontent = require("../models/ServiceSubcontent");

exports.addServiceSubcontent = async (req, res) => {
  try {
    console.log("ROUTE HIT:", req.body);

    const {
      client_id,
      service_id,
      sub_title,
      sub_content,
      sub_image,
    } = req.body;

    // Basic validation
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
      sub_image,
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
};
