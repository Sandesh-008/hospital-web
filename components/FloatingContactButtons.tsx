"use client"

import { FiPhone } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"

export default function FloatingContactButtons() {
  const PHONE = "918888877777" // country code included
  const WHATSAPP = "918888877777"

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4">

      {/* CALL BUTTON */}
      <a
        href={`tel:+${PHONE}`}
        aria-label="Call us"
        className="group flex items-center gap-3 bg-[#ff5a1f] text-white font-semibold
                   px-3 py-2 rounded-full shadow-lg hover:bg-[#e64a19]
                   transition-all duration-300 hover:scale-105"
      >
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <FiPhone className="text-xl" />
        </div>
        <span className="hidden sm:block">Call Us Now</span>
      </a>

      {/* WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-3 bg-[#25D366] text-white font-semibold
                   px-3 py-2 rounded-full shadow-lg hover:bg-[#1ebe5d]
                   transition-all duration-300 hover:scale-105"
      >
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <FaWhatsapp className="text-2xl" />
        </div>
        <span className="hidden sm:block">Chat With Us</span>
      </a>

    </div>
  )
}
