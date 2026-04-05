// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import AppointmentForm from "./appointment/AppointmentForm"

// const API_BASE_URL = "http://localhost:5000/api/doctors"
// const IMAGE_BASE_URL = "---"

// export default function DoctorProfile() {
//   const params = useParams()
//   const doctorId = params.id as string

//   const [doctor, setDoctor] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (!doctorId) return

//     const fetchDoctor = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/${doctorId}`)
//         const data = await res.json()

//         if (data.success) {
//           setDoctor(data.data)
//         }
//       } catch (error) {
//         console.error("Error fetching doctor:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDoctor()
//   }, [doctorId])

//   if (loading) {
//     return (
//       <div className="py-24 text-center text-lg">
//         Loading doctor profile...
//       </div>
//     )
//   }

//   if (!doctor) {
//     return (
//       <div className="py-24 text-center text-red-600">
//         Doctor not found
//       </div>
//     )
//   }

//   return (
//     <section className="bg-[#f2f2f2] overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 py-20">

//         <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-start">

//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9 }}
//             className="flex gap-12 flex-col md:flex-row"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.92 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1 }}
//               className="relative w-[360px] h-[380px] mt-6 border-2 border-gray-900 rounded-3xl overflow-hidden shadow-lg mx-auto md:mx-0"
//             >
//               <Image
//                 src={`${IMAGE_BASE_URL}/${doctor.doctor_image}`}
//                 alt={doctor.name}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.9 }}
//               className="pt-4 space-y-4"
//             >
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {doctor.name}
//               </h1>

//               <p className="text-lg font-medium text-[#6b4fd8]">
//                 ⭐ {doctor.rating} ({doctor.review_count} Reviews)
//               </p>

//               <p className="text-gray-800 text-lg leading-relaxed max-w-xl">
//                 {doctor.qualifications}
//               </p>

//               <ul className="space-y-3 text-gray-900 text-lg pt-2">
//                 <li>🗓 {doctor.availability}</li>
//                 <li>📞 {doctor.phone}</li>
//                 <li>📍 {doctor.hospital}</li>
//               </ul>

//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="mt-5 w-[280px] py-3 rounded-full bg-[#4b2c83] text-white text-lg font-semibold hover:bg-[#3e236f] transition"
//               >
//                 Contact
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 80 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="bg-white rounded-3xl shadow-xl px-10 py-10 w-full max-w-[420px] justify-self-center lg:justify-self-end"
//           >
//             <h3 className="text-2xl font-bold text-gray-900">
//               Book Appointment
//             </h3>
//             <p className="text-gray-600 mt-1 mb-6">
//               Our team will contact you shortly
//             </p>

//             <AppointmentForm />
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   )
// }