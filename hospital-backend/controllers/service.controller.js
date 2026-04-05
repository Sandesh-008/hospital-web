const Service = require("../models/Service");

exports.addService = async (req, res) => {
  try {
    const {
      client_id,
      service_name,
      description,
      image,
      keywords,
      doctor_ids,
    } = req.body;

    if (!client_id || !service_name) {
      return res.json({
        status: false,
        message: "client_id and service_name are required",
      });
    }

    const newService = new Service({
      client_id,
      service_name,
      description,
      image,
      keywords,
      doctor_ids,
    });

    await newService.save();

    res.json({
      status: true,
      message: "Service added successfully",
      data: newService,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
    });
  }
};
