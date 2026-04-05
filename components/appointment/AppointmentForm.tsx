"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"

const CLIENT_ID = "999999999999999999999999"

const SEND_EMAIL_API = "http://localhost:5000/api/book_appointment"
const GET_SERVICES_API = "http://localhost:5000/api/get_all_services"

export default function AppointmentForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("")

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [services, setServices] = useState<any[]>([])
  const [email, setEmail] = useState("")

  /* ---------- FETCH SERVICES ---------- */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.post(GET_SERVICES_API, {
          client_id: CLIENT_ID,
        })

        console.log("SERVICES RESPONSE:", res.data)

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
    setLoading(true)
    setSuccessMsg("")
    setErrorMsg("")

    const selectedService = services.find(
      (s) => s._id === service
    )

    const formData = {
      name: name.trim(),
      sender_number: phone,
      sender_email: email,
      service: selectedService?.service_name,
      appointment_date: new Date().toISOString().split("T")[0],
      client_id: CLIENT_ID,
    }

    try {
      const response = await axios.post(
        SEND_EMAIL_API,
        formData
      )

      if (response.data?.success) {
        setSuccessMsg("✅ Appointment booked successfully!")
        setName("")
        setPhone("")
        setService("")
      } else {
        setErrorMsg(response.data?.message || "Booking failed")
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || "Server error"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <input
        required
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-5 py-3 rounded-xl border text-black"
      />

      <input
        required
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-5 py-3 rounded-xl border text-black"
      />

      <input
        required
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-5 py-3 rounded-xl border text-black"
      />

      <select
        required
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="w-full px-5 py-3 rounded-xl border text-black"
      >
        <option value="" disabled>
          Select Service
        </option>

        {services.length > 0 ? (
          services.map((item) => (
            <option key={item._id} value={item._id}>
              {item.service_name}
            </option>
          ))
        ) : (
          <option disabled>No services available</option>
        )}
      </select>

      <button
        disabled={loading}
        className="w-full py-3 bg-[#5a2ea6] text-white rounded-full font-semibold"
      >
        {loading ? "Sending..." : "Get Appointment"}
      </button>

      {successMsg && (
        <p className="text-green-600 text-center font-semibold">
          {successMsg}
        </p>
      )}

      {errorMsg && (
        <p className="text-red-600 text-center font-semibold">
          {errorMsg}
        </p>
      )}

      <div className="flex items-center gap-4 pt-3">
        <div className="flex -space-x-2">
          {[
            "/images/reviews/user1.jpg",
            "/images/reviews/user2.avif",
          ].map((img, i) => (
            <Image
              key={i}
              src={img}
              width={48}
              height={48}
              alt="Client"
              className="rounded-full border"
            />
          ))}
        </div>
        <p className="font-semibold text-black">
          <span className="text-[#5a2ea6]">1.2k+</span> Happy Clients
        </p>
      </div>

    </form>
  )
}