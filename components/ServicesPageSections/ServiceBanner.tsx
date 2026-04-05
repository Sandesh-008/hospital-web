import Image from "next/image"

export default function ServiceBanner({
  serviceName,
  description,
  bannerImage,
}: {
  serviceName: string
  description?: string
  bannerImage?: string // optional: allow dynamic banner image per service
}) {
  return (
    <section className="relative md:h-[420px] lg:h-[340px] overflow-hidden">

      {/* ================= BACKGROUND IMAGE ================= */}
      <Image
        src="/images/services/banner-bg.jpg"
        alt="Hospital service banner"
        fill
        priority
        className="object-cover scale-110"
      />

      {/* ================= GRADIENT OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#24145d]/95 via-[#3c2c8f]/55 to-[#5a2ea6]/75" />

      {/* ================= SOFT NOISE / DEPTH ================= */}
      <div className="absolute inset-0 bg-black/10" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-5xl">

          {/* EYEBROW */}
          <span
            className="
              inline-block mb-6 text-xs md:text-sm
              uppercase tracking-[0.3em]
              text-white/90
              animate-[fadeUp_0.8s_ease-out]
            "
          >
            Our Medical Services
          </span>

          {/* MAIN TITLE */}
          <h1
            className="
              text-4xl md:text-5xl lg:text-6xl
              font-bold text-white
              leading-tight tracking-wide
              drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]
              animate-[fadeUp_1s_ease-out]
            "
          >
            {serviceName}
          </h1>

          {/* DIVIDER */}
          <div
            className="
              mx-auto mt-6 h-[3px] w-20
              bg-white/80 rounded-full
              animate-[growLine_1.1s_ease-out]
            "
          />

          {/* DESCRIPTION */}
          {description && (
            <p
              className="
                mt-6 text-base md:text-lg
                text-white/95
                leading-relaxed
                max-w-3xl mx-auto
                drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]
                animate-[fadeUp_1.2s_ease-out]
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
