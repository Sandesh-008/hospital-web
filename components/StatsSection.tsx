"use client"

import { useEffect, useRef } from "react"
import { User, Smile, Stethoscope, FileText } from "lucide-react"

const stats = [
    { value: 15, label: "Years of Experience", icon: User },
    { value: 7000, label: "Happy Patients", icon: Smile },
    { value: 60, label: "Qualified Doctors", icon: Stethoscope },
    { value: 100, label: "Medical Specialities", icon: FileText },
]

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const cards = section.querySelectorAll(".stat-card")

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    cards.forEach((card) => {
                        card.classList.add("stat-visible")

                        const num = card.querySelector(".stat-number") as HTMLElement
                        const end = Number(num.dataset.value)

                        const duration = 2000
                        const startTime = performance.now()

                        const easeOutCubic = (t: number) =>
                            1 - Math.pow(1 - t, 3)

                        const animateCount = (now: number) => {
                            const elapsed = now - startTime
                            const progress = Math.min(elapsed / duration, 1)

                            const eased = easeOutCubic(progress)
                            const value = Math.floor(eased * end)

                            num.innerText =
                                end >= 1000 ? value.toLocaleString() : String(value)

                            if (progress < 1) {
                                requestAnimationFrame(animateCount)
                            }
                        }

                        requestAnimationFrame(animateCount)

                    })

                    observer.disconnect()
                }
            },
            { threshold: 0.35 }
        )

        observer.observe(section)
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-52 -mt-40 bg-fixed bg-center bg-cover"
            style={{ backgroundImage: "url(/images/stats-bg.jpg)" }}
        >
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-[#4b2c83]/55" />

            {/* CONTENT */}
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {stats.map((item, i) => {
                        const Icon = item.icon

                        return (
                            <div
                                key={i}
                                className="
                  stat-card
                  backdrop-blur-xl
                  bg-white/10
                  border border-white/20
                  rounded-2xl
                  p-10
                  text-center
                  text-white
                  shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                "
                                style={{ transitionDelay: `${i * 320}ms` }}
                            >
                                <Icon className="mx-auto mb-5 w-12 h-12 text-white/90" />

                                <h3
                                    className="stat-number text-4xl font-bold mb-2"
                                    data-value={item.value}
                                >
                                    0
                                </h3>

                                <p className="text-white/90 text-lg font-medium">
                                    {item.label}
                                </p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}
