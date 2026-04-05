const nodemailer = require("nodemailer");
const Appointment = require("../models/Appointment");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.bookAppointment = async (req, res) => {
  try {
    console.log("🚀 API HIT");
    console.log("BODY:", req.body); // ✅ CORRECT PLACE

    const {
      name,
      sender_number,
      sender_email,
      service,
      appointment_date,
    } = req.body;

    // 1️⃣ Save to DB
    const newAppointment = new Appointment({
      name,
      phone: sender_number,
      service,
      appointment_date,
    });

    await newAppointment.save();

    // 2️⃣ Email to Hospital
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Appointment Booked",
        text: `
Name: ${name}
Phone: ${sender_number}
Email: ${sender_email}
Service: ${service}
Date: ${appointment_date}
        `,
      });
      console.log("✅ Hospital email sent");
    } catch (err) {
      console.log("❌ Hospital email error:", err);
    }

    // 3️⃣ Email to User
    try {
      console.log("➡ Sending to user:", sender_email);

      await transporter.sendMail({
        from: `"Aarogyam Care Hospital" <${process.env.EMAIL_USER}>`,
        to: sender_email,
        subject: "Appointment Confirmation",
        text: `
Dear ${name},

Your appointment has been successfully received.

Service: ${service}
Date: ${appointment_date}

We will contact you shortly.

- Aarogyam Care Hospital
        `,
      });

      console.log("✅ User email sent");
    } catch (err) {
      console.log("❌ User email error:", err);
    }

    res.json({ success: true, message: "Appointment Booked Successfully" });

  } catch (error) {
    console.error("🔥 MAIN ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};