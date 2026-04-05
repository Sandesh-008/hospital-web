const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
  name: String,
  logo: String,
  email: String,
  phone: String,
  address: String,
  website: String,
  social_links: {
    facebook: String,
    instagram: String,
    linkedin: String,
  },
})

module.exports = mongoose.model("Client", clientSchema)