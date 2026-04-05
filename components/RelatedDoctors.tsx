"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "axios"

type Doctor = {
  _id: string
  slug: string
  name: string
  designation: string
  experience: string
  image?: string
}

type Props = {
  doctors?: Doctor[]
  serviceId: string
}

const FALLBACK_IMAGE = "/doctor-placeholder.jpg"

export default function RelatedDoctors({ doctors = [], serviceId }: Props) {
  const [doctorList, setDoctorList] = useState<Doctor[]>(doctors)

  useEffect(() => {
    if (!serviceId) return

    const fetchDoctors = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/get_all_doctors",
          {
            client_id: "999999999999999999999999",
            service_id: serviceId,
          }
        )

        if (!res?.data?.data) {
          setDoctorList([])
          return
        }

        const mappedDoctors: Doctor[] = res.data.data.map((doc: any) => ({
          _id: doc._id,
          slug: doc.slug, // ✅ use real slug from backend
          name: doc.name,
          designation: doc.speciality,
          experience: doc.qualifications,
          image: doc.doctor_image
            ? `http://localhost:5000/${doc.doctor_image}`
            : FALLBACK_IMAGE,
        }))

        setDoctorList(mappedDoctors)
      } catch (error) {
        console.error("Failed to fetch doctors", error)
      }
    }

    fetchDoctors()
  }, [serviceId])

  if (!doctorList.length) {
    return (
      <section className="py-16 text-center text-gray-500">
        <p>No related doctors available at the moment.</p>
      </section>
    )
  }

  return (
    <section className="relative py-18 mt-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6f4ff] via-white to-white" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex gap-10 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {doctorList.map((doc, i) => {
            const imageSrc =
              doc.image && doc.image.trim() !== ""
                ? doc.image
                : FALLBACK_IMAGE

            return (
              <motion.div
                key={doc._id || i}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="snap-start shrink-0 w-[300px]"
              >
                <div className="group h-full rounded-[1.8rem] overflow-hidden bg-white border border-gray-300 shadow-lg">
                  <div className="relative h-[260px] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={doc.name}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {doc.name}
                    </h3>

                    <div className="mt-4 inline-block px-4 py-1 rounded-full text-sm font-medium bg-[#f1ecff] text-[#5a2ea6]">
                      {doc.experience}
                    </div>

                    <Link
                      href={`/profile/${doc.slug}?id=${doc._id}&name=${encodeURIComponent(doc.name)}`}
                      className="mt-6 inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#4b2c83] text-white font-semibold text-lg"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}