const Service = require("../models/Service");
const ServiceSubcontent = require("../models/ServiceSubcontent");
const Doctor = require("../models/Doctor");

exports.getServiceDetails = async (req, res) => {
  try {
    const { client_id, service_id, service_name } = req.body;

    if (!client_id || (!service_id && !service_name)) {
      return res.status(400).json({
        success: false,
        message: "client_id and service_id or service_name required",
      });
    }

    // 1️⃣ Get Service
    const service = service_id
      ? await Service.findOne({ _id: service_id, client_id })
      : await Service.findOne({ service_name, client_id });

    if (!service) {
      return res.json({
        success: false,
        service: null,
        service_subcontent: [],
        doctors: [],
        service_faqs: [],
      });
    }

    // 2️⃣ Get Subcontent
    const service_subcontent = await ServiceSubcontent.find({
      service_id: service._id.toString(),
      client_id,
    });

    // 3️⃣ Get Doctors
    const doctors = await Doctor.find({
      service_id: service._id.toString(),
      client_id,
    });

    // 4️⃣ FAQs (empty for now – we’ll add later)
    const service_faqs = [];

    return res.json({
      success: true,
      service,
      service_subcontent,
      doctors,
      service_faqs,
    });
  } catch (error) {
    console.error("get_service_details error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
