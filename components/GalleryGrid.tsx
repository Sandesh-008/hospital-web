"use client"

import Image from "next/image"
import { motion, Variants } from "framer-motion"

const images = [
  "/images/gallery/g1.jpg",
  "/images/gallery/g2.jpg",
  "/images/gallery/g3.jpg",
  "/images/gallery/g4.jpg",
  "/images/gallery/g5.jpg",
  "/images/gallery/g6.jpg",
  "/images/gallery/g7.jpg",
  "/images/gallery/g8.jpg",
  "/images/gallery/g9.jpg",
  "/images/gallery/g10.jpg",
  "/images/gallery/g11.jpg",
  "/images/gallery/g12.jpg",
]

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ FIX
    },
  },
}

export default function GalleryGrid() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group relative overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={src}
                alt="Hospital Gallery"
                width={600}
                height={400}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
