const multer = require("multer")
const path = require("path")
const fs = require("fs")

// ensure folder exists
const uploadPath = path.join(__dirname, "../uploads/doctors")

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-")

    cb(null, uniqueName)
  },
})

const uploadDoctor = multer({ storage })

module.exports = uploadDoctor