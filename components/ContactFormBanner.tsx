"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "axios"

/* ---------------- CONFIG ---------------- */
const CLIENT_ID = "999999999999999999999999"

const GET_CLIENT_API = "http://localhost:5000/api/get_client_config"
const SEND_EMAIL_API = "http://localhost:5000/api/book_appointment"
const GET_SERVICES_API = "http://localhost:5000/api/get_all_services"

/* ---------------- TYPES ---------------- */
interface Service {
  _id: string
  service_name: string
}

/* ---------------- COMPONENT ---------------- */
export default function ContactFormBanner() {
  const [clientEmail, setClientEmail] = useState("")
  const [services, setServices] = useState<Service[]>([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("")
  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  /* ---------- FETCH CLIENT EMAIL ---------- */
  useEffect(() => {
    const fetchClientConfig = async () => {
      try {
        const res = await axios.get(GET_CLIENT_API)
        const emailFromAPI = res.data?.data?.email || ""

        if (emailFromAPI) {
          setClientEmail(emailFromAPI)
        }
      } catch (err) {
        console.error("Failed to fetch client config:", err)
      }
    }

    fetchClientConfig()
  }, [])

  /* ---------- FETCH SERVICES ---------- */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.post(GET_SERVICES_API, {
          client_id: CLIENT_ID,
        })

        if (res.data?.success) {
          setServices(res.data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch services", error)
      }
    }

    fetchServices()
  }, [])

  /* ---------- SUBMIT FORM ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSuccessMsg("")
    setErrorMsg("")

    if (!name || !email || !phone || !service) {
      setErrorMsg("Please fill all required fields.")
      return
    }

    setLoading(true)

    const selectedService = services.find((s) => s._id === service)

    const formData = {
      name: name.trim(),
      sender_email: email,
      sender_number: phone,
      service: selectedService?.service_name || "N/A",
      appointment_date: new Date().toISOString().split("T")[0],
      client_id: CLIENT_ID,
    }

    try {
      const res = await axios.post(SEND_EMAIL_API, formData)

      if (res.data?.success) {
        setSuccessMsg("Appointment booked successfully")

        setName("")
        setEmail("")
        setPhone("")
        setService("")
        setMessage("")
      } else {
        setErrorMsg(res.data?.message || "Failed to book appointment.")
      }
    } catch (err: any) {
      console.error("Submit Error:", err)
      setErrorMsg(
        err.response?.data?.message || "Server error. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-screen left-1/2 -ml-[50vw] bg-[#0b0b12] pt-20 mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* LEFT TEXT (VERTICALLY CENTERED) */}
          <div className="lg:col-span-4 text-white flex flex-col justify-left items-left text-left space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-white/50">
              Connect With Us
            </span>

            <h2 className="text-3xl font-semibold">
              Care begins with a conversation
            </h2>

            <p className="text-white/65 text-sm">
              Our medical professionals are here to assist you.
            </p>
          </div>

          {/* IMAGE */}
          <div className="lg:col-span-4 flex justify-center">
            <Image
              src="/images/services/contact-form-pointing.webp"
              alt="Medical Assistance"
              width={320}
              height={450}
              priority
            />
          </div>

          {/* FORM */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-lg border border-white/30 rounded-2xl p-7 mb-10">
              <form className="space-y-4" onSubmit={handleSubmit}>
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-dark"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-dark"
                  />
                </div>

                <input
                  required
                  placeholder="Contact Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-dark"
                />

                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="input-dark"
                >
                  <option value="">Select Service</option>
                  {services.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.service_name}
                    </option>
                  ))}
                </select>

                <textarea
                  rows={3}
                  placeholder="Tell us what you’re looking for"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-dark resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full border border-white/40 text-white text-lg hover:bg-yellow-600 hover:text-black disabled:opacity-60"
                >
                  {loading ? "SENDING..." : "SEND"}
                </button>

                {successMsg && (
                  <p className="text-green-400 text-center font-semibold">
                    {successMsg}
                  </p>
                )}

                {errorMsg && (
                  <p className="text-red-400 text-center font-semibold">
                    {errorMsg}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  )
}