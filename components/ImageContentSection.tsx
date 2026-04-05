"use client"

import Image from "next/image"
import { motion, Variants } from "framer-motion"

type Props = {
  image: string
  title: string
  description: string
  reverse?: boolean
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const imageVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -160,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ FIX
    },
  },
}

const imageVariantReverse: Variants = {
  hidden: {
    opacity: 0,
    x: 160,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ FIX
    },
  },
}

const contentVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ FIX
    },
  },
}

export default function ImageContentSection({
  image,
  title,
  description,
  reverse = false,
}: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
    >
      {/* ================= IMAGE ================= */}
      <motion.div
        variants={reverse ? imageVariantReverse : imageVariant}
        className={`
          relative h-[420px] rounded-[2.5rem] overflow-hidden
          ${reverse ? "md:order-2" : ""}
        `}
      >
        <div
          className="
            relative h-full w-full rounded-[2.5rem] overflow-hidden
            bg-white
            shadow-[0_35px_85px_rgba(0,0,0,0.45)]
            ring-1 ring-black/5
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            className="
              object-cover
              transition-transform duration-[1600ms] ease-out
              hover:scale-110
            "
          />
        </div>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <motion.div
        variants={contentVariant}
        className={`
          space-y-6
          ${reverse ? "md:order-1" : ""}
        `}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>

        <div className="h-1 w-30 bg-gradient-to-r from-[#5a2ea6] to-[#7b4fd8] rounded-full" />

        <p className="text-xl text-gray-800 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.section>
  )
}
