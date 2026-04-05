"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { FiPhone, FiMail, FiMapPin, FiChevronDown } from "react-icons/fi"
import { FaFacebookF, FaInstagram } from "react-icons/fa"

type Service = {
  service_id: string
  service_name: string
  slug: string
}

type ContactInfo = {
  address: string
  phone: string
  email: string
}

export default function Footer() {
  const [showMore, setShowMore] = useState(false)
  const [servicesData, setServicesData] = useState<Service[]>([])
  const [contact, setContact] = useState<ContactInfo>({
    address: "Loading...",
    phone: "Loading...",
    email: "Loading..."
  })

  // ----------------------------
  // FETCH SERVICES
  // ----------------------------
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("http://localhost:5000/api/get_all_services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "999999999999999999999999",
          }),
        })

        const text = await res.text()
        if (!res.ok) {
          console.error("API ERROR:", text)
          return
        }

        let json
        try {
          json = JSON.parse(text)
        } catch {
          console.error("INVALID JSON RESPONSE:", text)
          return
        }

        const mappedServices: Service[] = (json?.data || []).map((service: any) => ({
          service_id: service._id,
          service_name: service.service_name,
          slug: service.service_name.toLowerCase().replace(/\s+/g, "-"),
        }))

        setServicesData(mappedServices)
      } catch (err) {
        console.error("FETCH ERROR:", err)
      }
    }

    fetchServices()
  }, [])

  // ----------------------------
  // FETCH CONTACT INFO
  // ----------------------------
  useEffect(() => {
  async function fetchContact() {
    try {
      const res = await fetch("http://localhost:5000/api/get_client_config")

      if (!res.ok) {
        console.error("CONTACT API ERROR")
        return
      }

      const json = await res.json()

      const data = json?.data
      if (data) {
        setContact({
          address: data.address || "Address not available",
          phone: data.phone || "Phone not available",
          email: data.email || "Email not available",
        })
      }
    } catch (err) {
      console.error("CONTACT FETCH ERROR:", err)
    }
  }

  fetchContact()
}, [])

  const visibleServices = servicesData.slice(0, 6)
  const hiddenServices = servicesData.slice(6)

  return (
    <footer className="relative overflow-hidden text-gray-700">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/footer-bg.avif"
          alt="Footer Background"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/95" />
      </div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-6 py-20 grid gap-14 lg:grid-cols-4">

        {/* LOGO */}
        <div className="space-y-6">
          <Image
            src="/images/hospital-logo.png"
            alt="Hospital Logo"
            width={170}
            height={90}
          />
          <p className="text-[16px] leading-relaxed font-semibold">
            A trusted multispeciality hospital delivering advanced healthcare
            with compassion, expert doctors, and modern medical facilities.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-2xl font-semibold text-[#3c2c8f] mb-6">
            Quick Links
          </h4>
          <ul className="space-y-4 font-semibold text-[18px]">
            {[{ label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Our Doctors", href: "/our-doctors" },
            { label: "Gallery", href: "/gallery" },
            { label: "Contact Us", href: "/contact" }].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="hover:text-[#3c2c8f] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-2xl font-semibold text-[#3c2c8f] mb-6">
            Our Services
          </h4>

          <ul className="space-y-4 text-gray-700 font-semibold text-[18px]">
            {visibleServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}?service_id=${service.service_id}`}
                  className="hover:text-[#3c2c8f] transition-colors"
                >
                  {service.service_name}
                </Link>
              </li>
            ))}
          </ul>

          {showMore && (
            <ul className="mt-4 space-y-4 text-gray-700 text-[18px] font-semibold animate-fadeIn">
              {hiddenServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}?service_id=${service.service_id}`}
                    className="hover:text-[#3c2c8f] transition-colors"
                  >
                    {service.service_name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-5 flex items-center gap-2 text-lg font-semibold text-[#3c2c8f] hover:underline "
          >
            {showMore ? "View Less" : "View More"}
            <FiChevronDown
              className={`transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
            />
          </button>

        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-2xl font-semibold text-[#3c2c8f] mb-6">
            Contact Us
          </h4>

          <div className="space-y-6 text-[18px] font-semibold">
            {/* ADDRESS */}
            <div className="flex items-start gap-3">
              <FiMapPin className="text-[#3c2c8f] text-2xl mt-1 flex-shrink-0" />
              <span>{contact.address}</span>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3">
              <FiPhone className="text-[#3c2c8f] text-2xl flex-shrink-0" />
              <span>{contact.phone}</span>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-3">
              <FiMail className="text-[#3c2c8f] text-2xl flex-shrink-0" />
              <span>{contact.email}</span>
            </div>
          </div>


          {/* SOCIAL */}
          <div className="flex gap-4 mt-10">
            {[FaFacebookF, FaInstagram].map((Icon, i) => (
              <div
                key={i}
                className="w-12 h-12 flex items-center justify-center
                rounded-full bg-[#3c2c8f]/10 text-[#3c2c8f]
                hover:bg-[#3c2c8f] hover:text-white
                transition-all duration-300 cursor-pointer"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="relative bg-[#4d368d] text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Aarogyam Care Hospital | All Rights Reserved.
      </div>

    </footer>
  )
}
