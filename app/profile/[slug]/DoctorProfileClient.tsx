"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAppointmentModal } from "@/components/context/AppointmentModalContext"
import AppointmentForm from "@/components/appointment/AppointmentForm"

const API_BASE_URL = "http://localhost:5000/api/doctors"

// ✅ FIXED IMAGE FUNCTION
const getDoctorImage = (image: string) => {
  if (!image) return "/images/doctor-placeholder.png"

  if (image.startsWith("http")) return image

  if (image.startsWith("/")) image = image.slice(1)

  // if already contains uploads
  if (image.startsWith("uploads/")) {
    return `http://localhost:5000/${image}`
  }

  return `http://localhost:5000/uploads/${image}`
}

export default function DoctorProfileClient() {
  const params = useParams()
  const doctorId = params.slug as string // ✅ now should be _id

  const { openModal } = useAppointmentModal()

  const [doctor, setDoctor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!doctorId) return

    const fetchDoctor = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/${doctorId}`)
        const data = await res.json()

        console.log("DOCTOR API:", data) // ✅ debug

        if (data.success) {
          setDoctor(data.data)
        }
      } catch (err) {
        console.error("Error fetching doctor:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctor()
  }, [doctorId])

  if (loading) {
    return <div className="py-24 text-center">Loading doctor profile...</div>
  }

  if (!doctor) {
    return <div className="py-24 text-center text-red-600">Doctor not found</div>
  }

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-10 items-start">

          {/* LEFT PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col md:flex-row gap-10"
          >
            {/* IMAGE */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[260px] h-[300px] rounded-2xl overflow-hidden shadow-md border border-gray-200 mx-auto md:mx-0"
            >
              <Image
                src={getDoctorImage(doctor.doctor_image)}
                alt={doctor.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* DETAILS */}
            <div className="flex-1 space-y-5">

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {doctor.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {doctor.qualifications}
                </p>
              </div>

              {/* RATING */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold">
                  ⭐ {doctor.rating}
                </span>
                <span className="text-gray-500 text-sm">
                  {doctor.review_count} Reviews
                </span>
              </div>

              {/* INFO GRID */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-slate-50 rounded-xl border">
                  <p className="text-gray-500">Availability</p>
                  <p className="font-semibold text-gray-800">
                    {doctor.availability}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border">
                  <p className="text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-800">
                    {doctor.phone}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border sm:col-span-2">
                  <p className="text-gray-500">Hospital</p>
                  <p className="font-semibold text-gray-800">
                    {doctor.hospital}
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={openModal}
                className="mt-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition"
              >
                Book Appointment
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-3xl shadow-xl p-8 sticky top-24"
          >
            <h3 className="text-2xl font-bold mb-5 text-gray-900">
              Book Appointment
            </h3>

            <AppointmentForm />
          </motion.div>

        </div>
      </div>
    </section>
  )
}