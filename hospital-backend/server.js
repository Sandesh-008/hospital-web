require("dotenv").config();   // 🔥 FIRST LINE

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const serviceRoutes = require("./routes/service.routes");
const doctorRoutes = require("./routes/doctor.routes");
const serviceSubcontentRoutes = require("./routes/serviceSubcontent.routes");
const serviceDetailsRoutes = require("./routes/serviceDetails.routes");
const doctorSubcontentRoutes = require("./routes/doctorSubcontent.routes");
const clientRoutes = require("./routes/client");
//const aiRoutes = require("./routes/ai.routes");
const appointmentRoutes = require("./routes/appointmentRoutes");




const app = express()

/* -------------------- CORS -------------------- */
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

/* -------------------- BODY PARSERS -------------------- */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* -------------------- DB -------------------- */
connectDB()

/* -------------------- ROUTES -------------------- */
app.use("/api", serviceRoutes)
app.use("/api", doctorRoutes)
app.use("/api", serviceSubcontentRoutes)
app.use("/api", serviceDetailsRoutes)
app.use("/api", doctorSubcontentRoutes);
app.use("/api", clientRoutes)
//app.use("/api/ai", aiRoutes)
app.use("/api", appointmentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------- SERVER -------------------- */
const PORT = 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
