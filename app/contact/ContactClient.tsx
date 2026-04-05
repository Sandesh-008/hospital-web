"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi"

import AppointmentForm from "@/components/appointment/AppointmentForm"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

type ContactInfo = {
  address: string
  contact_no: string
  email_id: string
}

export default function ContactClient() {
  const [contact, setContact] = useState<ContactInfo>({
    address: "Loading...",
    contact_no: "Loading...",
    email_id: "Loading...",
  })

  // ================= FETCH CONTACT INFO =================
useEffect(() => {
  async function fetchContact() {
    try {
      const res = await fetch(
        "http://localhost:5000/api/get_client_config",
        {
          method: "GET",
        }
      )

      if (!res.ok) {
        console.error("CONTACT API ERROR:", await res.text())
        return
      }

      const json = await res.json()
      const data = json?.data

      if (data) {
        setContact({
          address: data.address || "Address not available",
          contact_no: data.phone || "Phone not available",
          email_id: data.email || "Email not available",
        })
      }

    } catch (err) {
      console.error("CONTACT FETCH ERROR:", err)
    }
  }

  fetchContact()
}, [])

  return (
    <section className="bg-[#f7f7f7] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-28">

        {/* ================= FORM SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-[40px] overflow-hidden border border-gray-400
          shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
          style={{
            backgroundImage: "url(/images/contact/contact-form-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/80" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 p-14">

            {/* ================= LEFT : CONTACT INFO ================= */}
            <div className="space-y-10">
              <h2 className="text-4xl font-extrabold text-[#0f1b4c]">
                Contact
              </h2>

              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#0f1b4c]">Address</h4>
                  <p className="text-gray-700 leading-relaxed max-w-md">
                    {contact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                  📞
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#0f1b4c]">Contact</h4>
                  <p className="text-gray-700">{contact.contact_no}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#0f1b4c]">Email Us</h4>
                  <p className="text-gray-700">{contact.email_id}</p>
                </div>
              </div>
            </div>

            {/* ================= RIGHT : FORM ================= */}
            <div className="bg-white rounded-[30px] p-10 shadow-xl border border-gray-200">
              <h2 className="text-3xl font-extrabold text-[#0f1b4c] mb-6">
                Book Appointment
              </h2>
              <AppointmentForm />
            </div>
          </div>
        </motion.div>

        {/* ================= HEADING ================= */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-5xl font-extrabold text-[#0f1b4c]"
        >
          Our Practice Locations
        </motion.h2>

        {/* ================= ROW 1 ================= */}
        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-2 gap-20 px-6">

          {[
            {
              title: "Mumbai",
              time: "10 PM to 5 PM (Sunday Closed)",
            },
            {
              title: "Bangalore",
              time: "10 PM to 5 PM (Sunday Closed)",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="flex items-start gap-6"
            >
              <div className="text-orange-500 text-3xl">
                <HiOutlineClock />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#0f1b4c]">
                  {item.title}
                </h4>
                <p className="text-gray-600 mt-2">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= ROW 2 ================= */}
        <div className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-16 px-6">

          {[
            {
              title: "Bade Hospital Somatane",
              time: "Weekdays 2:00 PM to 4:00 PM (By appointment only)",
            },
            {
              title: "Medistar Superspeciality",
              time: "Weekdays 5:00 PM to 7:00 PM",
            },
            {
              title: "Online Consultation",
              time: "Weekdays 7:00 PM to 8:00 PM",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="flex items-start gap-6"
            >
              <div className="text-orange-500 text-3xl">
                <HiOutlineLocationMarker />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#0f1b4c]">
                  {item.title}
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {item.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= MAP ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-7xl mx-auto mt-32 px-6"
        >
          <div className="rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.15)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2912248537996!2d73.78593507465303!3d18.560904767942056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf18e5376d59%3A0x4b0d388e00b1403e!2sshivom%20regency%20Baner%20showroom!5e0!3m2!1sen!2sin!4v1767347452569!5m2!1sen!2sin"
              width="1200"
              height="600"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
