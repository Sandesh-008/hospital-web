"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const imgs = sectionRef.current?.querySelectorAll(".reveal-img")
          const text = sectionRef.current?.querySelector(".reveal-text")

          imgs?.forEach((img) => img.classList.add("animate-imgLeft"))
          text?.classList.add("animate-textRight")

          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative -mt-38 bg-white overflow-hidden"
    >
      <div className="max-w-7xl py-78 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – MODERN IMAGE COMPOSITION */}
        <div className="relative h-[560px] flex items-center justify-center">
          <div className="relative w-[560px] h-[520px]">

            {/* MAIN IMAGE */}
            <div className="
                absolute top-0 left-1/2 -translate-x-1/2
                w-[520px] h-[340px]
                rounded-[28px]
                border-[4px] border-[#5a2ea6]
                shadow-[0_20px_40px_rgba(90,46,166,0.25)]
                reveal-img delay-200
                bg-white
                z-10
              ">
              <div className="w-full h-full rounded-[24px] overflow-hidden">
                <Image
                  src="/about1.webp"
                  alt="Medical Team"
                  fill
                  className="object-cover rounded-[24px]"
                />
              </div>
            </div>


            {/* BOTTOM LEFT IMAGE */}
            <div className="
                absolute bottom-[-55px] left-0
                w-[260px] h-[220px]
                rounded-[20px]
                border-[3px] border-[#7b4fd8]
                shadow-[0_14px_30px_rgba(123,79,216,0.25)]
                reveal-img delay-400
                bg-white
              ">
              <div className="w-full h-full rounded-[16px] overflow-hidden">
                <Image
                  src="/about2.avif"
                  alt="Hospital Equipment"
                  fill
                  className="object-cover rounded-[16px]"
                />
              </div>
            </div>



            {/* BOTTOM RIGHT IMAGE */}
            <div className="
                absolute bottom-[-55px] right-0
                w-[260px] h-[220px]
                rounded-[20px]
                border-[3px] border-[#5a2ea6]
                shadow-[0_14px_30px_rgba(90,46,166,0.25)]
                reveal-img delay-600
                bg-white
              ">
              <div className="w-full h-full rounded-[16px] overflow-hidden">
                <Image
                  src="/about3.avif"
                  alt="Doctor with Patient"
                  fill
                  className="object-cover rounded-[16px]"
                />
              </div>
            </div>


          </div>
        </div>




        {/* RIGHT – CONTENT */}
        <div className="reveal-text">
          <h3 className="text-[#5a2ea6] text-2xl font-semibold mb-3">
            Welcome To
          </h3>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Aarogyam Care Hospital
          </h2>

          <p className="text-gray-950 leading-relaxed mb-5 text-xl">
            Aarogyam Care Hospital is a multi-specialty healthcare center located in Pune. The hospital is led by experienced medical professionals and supported by a dedicated team of specialists across various departments. A wide range of services are provided including General Medicine, Advanced Critical Care, Maternity Services, Pediatric Care, Orthopedics, Cardiology, and comprehensive Diagnostic Facilities.          </p>

          <p className="text-gray-950 leading-relaxed mb-8 text-xl">
            Aarogyam Care Hospital in Pune is committed to delivering high-quality medical care tailored to the individual needs of every patient. The staff at this establishment are courteous, compassionate, and prompt in providing assistance. They are always available to address patient concerns, answer questions, and ensure a comfortable and supportive healthcare experience.          </p>

          <Link
            href="/about"
            className="
              inline-flex items-center
              bg-[#5a2ea6] text-white
              px-8 py-4 rounded-lg
              font-medium
              transition-all duration-300
              hover:bg-white
              hover:text-[#5a2ea6]
              border-2 [#5a2ea6]
              hover:shadow-[0_6px_16px_rgba(90,46,166,0.25)]">
            More About Us
          </Link>
        </div>

      </div>
    </section>
  )
}
