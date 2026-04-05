"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Target } from "lucide-react"
import { useAppointmentModal } from "@/components/context/AppointmentModalContext"


import {
  Smile,
  UserCheck,
  ShieldPlus,
  BriefcaseMedical,
} from "lucide-react"



export default function AboutClient() {

  const { openModal } = useAppointmentModal()
  return (
    <main className="bg-[#f9fafc]">

      {/* ================= ABOUT INTRO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#5a2ea6] text-xl font-bold uppercase tracking-wide">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-6 leading-tight">
            Aarogyam Care Hospital
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            Aarogyam Care Hospital is a trusted multispeciality healthcare center in Pune, dedicated to delivering comprehensive and patient-focused medical services. The hospital is supported by a team of experienced doctors and skilled healthcare professionals committed to excellence in treatment and care. 
                Aarogyam Care Hospital offers modern infrastructure and advanced medical technology to ensure accurate diagnosis and effective treatment. The staff at this establishment are courteous, well-trained, and prompt in providing assistance. They are always available to address patient concerns, offer guidance, and ensure a comfortable and supportive healthcare experience.         </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-6 leading-tight">
            About the Medical Team
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The medical team at Aarogyam Care Hospital consists of qualified professionals with extensive academic backgrounds and years of clinical expertise in their respective specialties. The team has trained at reputed medical institutions and gained hands-on experience across various healthcare settings. With a strong focus on ethical practice, patient safety, and continuous learning. With a collective experience spanning over a decade, the team remains committed to delivering reliable, compassionate, and high-quality healthcare services to every patient.          </p>

        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-[#4b2c83]/10 rounded-[40px]" />
          <Image
            src="/images/about/about-main.avif"
            alt="Hospital"
            width={600}
            height={500}
            className="relative rounded-[32px] shadow-2xl object-cover"
          />
        </motion.div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-[#5a2ea6] text-xl font-semibold uppercase">
              Why Choose Us ?
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-8 leading-tight">
              WHY AAROGYAM CARE HOSPITAL
            </h2>


            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-800">
              <li>Comfortable, Hygienic Healing Environment</li>
              <li>Advanced Multi-Level Sterilization Protocols</li>
              <li>Minimally Invasive Treatment Approach</li>
              <li>Modern & Painless Procedures</li>
              <li>Experienced Specialist Doctors Panel</li>
            </ul>

          </motion.div>

          {/* RIGHT CARDS */}
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: Smile,
                title: "1000+ Happy Patients",
                desc: "Trusted by thousands for reliable & compassionate care.",
              },
              {
                icon: UserCheck,
                title: "Specialized Expertise",
                desc: "Focused treatments backed by clinical excellence.",
              },
              {
                icon: ShieldPlus,
                title: "Safety & Care",
                desc: "Strict protocols ensuring patient safety & quality.",
              },
              {
                icon: BriefcaseMedical,
                title: "12+ Years Experience",
                desc: "A proven track record in advanced medical services.",
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="
                    bg-white border border-gray-100
                    p-8 rounded-3xl
                    shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                    hover:-translate-y-1 transition
                  "
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#ff5a1f]/10 text-[#ff5a1f] mb-6">
                    <Icon size={26} />
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h4>

                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="relative py-28 bg-[#f9fafc]">
        {/* subtle pattern bg */}
        <div className="absolute inset-0 bg-[url('/images/about/our-mission-vision.jpg')] opacity-[0.2]" />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          {/* ===== VISION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
            bg-white rounded-[36px]
            border border-gray-100
            shadow-[0_20px_50px_rgba(0,0,0,.42)]
            p-12 text-center
            hover:-translate-y-1 transition
          "
          >
            <div className="mx-auto mb-8 w-16 h-16 flex items-center justify-center rounded-full bg-[#4b2c83]/10 text-[#4b2c83]">
              <Eye size={30} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our Vision
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our vision is to redefine healthcare excellence by creating a
              multispeciality hospital that serves as a beacon of comprehensive
              care, compassion, and innovation. We aspire to be a trusted
              destination where patients receive personalized treatment delivered
              by skilled professionals dedicated to enhancing lives and building
              a healthier community.
            </p>
          </motion.div>

          {/* ===== MISSION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="
            bg-white rounded-[36px]
            border border-gray-100
            shadow-[0_20px_50px_rgba(0,0,0,0.42)]
            p-12 text-center
            hover:-translate-y-1 transition
          "
          >
            <div className="mx-auto mb-8 w-16 h-16 flex items-center justify-center rounded-full bg-[#ff5a1f]/10 text-[#ff5a1f]">
              <Target size={30} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to provide compassionate, comprehensive, and
              cutting-edge healthcare services across multiple specialties,
              ensuring the highest standards of medical excellence and
              patient-centered care. We are committed to continuous improvement,
              innovative treatments, and creating a supportive environment for
              patients and their families.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#4b2c83]">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Your Health Deserves Expert Attention
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-white/90 max-w-2xl mx-auto mb-10"
          >
            Book an appointment with our experienced specialists and take
            the first step toward better health.
          </motion.p>

          <button
            onClick={openModal}
            className="
              inline-block px-10 py-4 rounded-full
              bg-white text-[#4b2c83]
              font-semibold text-lg
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_6px_25px_rgba(255,255,255,0.35)]
              cursor-pointer hover:scale-[1.02] active:scale-[0.98]

            "
          >
            Book Appointment
          </button>
        </div>
      </section>

    </main>
  )
}
