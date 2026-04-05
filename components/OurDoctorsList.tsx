"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

const API_URL = "http://localhost:5000/api/get_all_doctors"
const CLIENT_ID = "999999999999999999999999"
const IMAGE_BASE_URL = "http://localhost:5000/uploads";

const getDoctorImage = (image) => {
  if (!image) return "/images/doctor-placeholder.png";

  // already full URL
  if (image.startsWith("http")) return image;

  // remove starting slash if present
  if (image.startsWith("/")) image = image.slice(1);

  // if already contains uploads
  if (image.startsWith("uploads/")) {
    return `http://localhost:5000/${image}`;
  }

  // if already contains doctors/
  if (image.startsWith("doctors/")) {
    return `${IMAGE_BASE_URL}/${image}`;
  }

  // default case
  return `${IMAGE_BASE_URL}/doctors/${image}`;
};

type Doctor = {
  _id: string
  name: string
  speciality: string
  qualifications: string
  availability: string
  hospital: string
  phone: string
  doctor_image: string
}

export default function OurDoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ client_id: CLIENT_ID }),
        })

        const result = await res.json()

        if (result.success) {
          setDoctors(result.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  if (loading) {
    return (
      <section className="py-32 text-center">
        <p className="text-xl font-semibold text-gray-600">
          Loading medical specialists...
        </p>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900">
            Meet Our Medical Specialists
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Experienced doctors providing trusted and compassionate healthcare.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
          {doctors.map((doctor, index) => {

            const slug = doctor.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")

            return (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="
                  bg-white rounded-[28px]
                  border border-gray-200
                  shadow-[0_20px_50px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                  overflow-hidden
                  transition-all duration-300
                  group
                "
              >
                {/* IMAGE */}
                <div className="relative h-68 w-full overflow-hidden">
                  <Image
                    src={getDoctorImage(doctor.doctor_image)}
                    alt={doctor.name}
                    fill
                    className="
                      object-cover
                      group-hover:scale-105
                      transition duration-500
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {doctor.name}
                    </h3>

                    <p className="text-base text-gray-600 line-clamp-2 leading-relaxed">
                      {doctor.qualifications}
                    </p>


                    <p className="text-base font-semibold text-indigo-600 mt-1">
                      {doctor.speciality}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-50 p-4 rounded-xl border border-gray-300">
                      <p className="text-gray-500 mb-1">Availability</p>
                      <p className="font-semibold text-gray-800">
                        {doctor.availability}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-gray-300">
                      <p className="text-gray-500 mb-1">Hospital</p>
                      <p className="font-semibold text-gray-800">
                        {doctor.hospital}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={{
                      pathname: `/profile/${slug}`,
                      query: { id: doctor._id },
                    }}
                    className="
                      block text-center w-full mt-4
                      bg-indigo-600 hover:bg-indigo-700
                      text-white font-semibold text-base
                      py-3 rounded-xl
                      transition shadow-md
                    "
                  >
                    View Full Profile
                  </Link>

                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}