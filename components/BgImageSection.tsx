"use client"

import { motion } from "framer-motion"

interface BgImageSectionProps {
  backgroundImage?: string
  subtitle: string
  description: string
}

export default function BgImageSection({
  backgroundImage,
  subtitle,
  description,
}: BgImageSectionProps) {
  const hasImage = Boolean(backgroundImage)

  return (
    <section
      className="
        relative w-full
        min-h-[420px]
        flex items-center justify-center
        overflow-hidden
        rounded-3xl
        bg-black
      "
    >
      {/* BASE BACKGROUND IMAGE */}
      {hasImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />

          {/* BLUR LAYER */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 blur-md opacity-40"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />

          {/* SOFT HERO GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-black/30 to-black/30" />
        </>
      )}

      {/* DARK OVERLAY (TEXT CONTRAST) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="
          relative z-10
          max-w-3xl
          text-center
          px-6
        "
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white">
          {subtitle}
        </h3>

        <p className="mt-4 text-lg md:text-xl text-gray-200 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </section>
  )
}
