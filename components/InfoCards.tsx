"use client"

import {
  CalendarCheck,
  Stethoscope,
  Hospital,
  HeartHandshake,
} from "lucide-react"
import { useAppointmentModal } from "@/components/context/AppointmentModalContext"

const cards = [
  {
    title: "Book Appointment",
    icon: CalendarCheck,
    action: "modal",
  },
  {
    title: "Premier Health Check-Up",
    icon: Stethoscope,
    action: "scroll",
    target: "reviews-appointments",
  },
  {
    title: "Comprehensive Services",
    icon: Hospital,
    action: "scroll",
    target: "hospital-segments",
  },
  {
    title: "Expert Medical Care",
    icon: HeartHandshake,
    action: "scroll",
    target: "our-doctors",
  },
]

export default function InfoCards() {
  const { openModal } = useAppointmentModal()

  const handleCardClick = (card: any) => {
    if (card.action === "modal") {
      openModal()
    }

    if (card.action === "scroll" && card.target) {
      const section = document.getElementById(card.target)
      section?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className="relative -mt-28 z-30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {cards.map((card, i) => {
          const Icon = card.icon

          return (
            <div
              key={i}
              onClick={() => handleCardClick(card)}
              style={{ animationDelay: `${i * 150}ms` }}
              className="
                cursor-pointer
                group relative bg-white rounded-3xl p-6 text-center 
                shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                transition-all duration-500 ease-out
                border border-transparent
                opacity-0 translate-y-12 animate-cardUp
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]
                hover:border-gray-700/90
                overflow-hidden
              "
            >
              {/* INNER COLOR WASH */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br from-[#7b4fd8]/5 to-[#5a2ea6]/5
                  opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              {/* ICON */}
              <div
                className="
                  relative z-10
                  mx-auto mb-6
                  w-20 h-20 flex items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br from-[#7b4fd8] to-[#5a2ea6]
                  text-white
                  transition-all duration-500
                  group-hover:shadow-[0_0_30px_rgba(123,79,216,0.6)]
                  group-hover:scale-105
                "
              >
                <Icon size={40} strokeWidth={1.5} />
              </div>

              {/* TITLE */}
              <h3
                className="
                  relative z-10
                  text-lg font-semibold text-gray-900 tracking-wide
                  transition-colors duration-500
                  group-hover:text-[#5a2ea6]
                "
              >
                {card.title}
              </h3>

              {/* UNDERLINE */}
              <div
                className="
                  relative z-10
                  mt-4 mx-auto h-[3px] w-0 bg-[#5a2ea6]
                  transition-all duration-500
                  group-hover:w-14
                "
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
