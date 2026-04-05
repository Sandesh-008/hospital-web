"use client"

import { useEffect, useState } from "react"
import Slide from "./Slide"

const slides = [
  {
    title: "Compassionate Care\nAdvanced Medicine",
    description:
      "Combining expert doctors, modern technology, and patient-first care for better health outcomes.",
    image: "/images/hero2.jpg",
  },
  {
    title: "Making A Big Impact\nWith Little Care",
    description:
      "Our commitment to child healthcare is unwavering, driven by the belief that every child deserves a healthy start and a brighter future.",
    image: "/images/hero1.jpg",
  },
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-white">
      {slides.map((slide, i) => (
        <Slide key={i} data={slide} active={i === index} />
      ))}
    </section>
  )
}
