const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads/";

    if (req.originalUrl.includes("/doctors"))
      folder += "doctors/";
    else if (req.originalUrl.includes("/services"))
      folder += "services/";
    else if (req.originalUrl.includes("/service-subcontent"))
      folder += "service_subcontent/";
    else if (req.originalUrl.includes("/doctor-subcontent"))
      folder += "doctor_subcontent/";

    // 🔥 Ensure folder exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s/g, "");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;