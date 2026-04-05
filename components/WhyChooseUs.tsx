"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FiActivity,
  FiUser,
  FiClipboard,
  FiMic,
} from "react-icons/fi";

const features = [
  {
    title: "Advanced Medical Infrastructure",
    desc: "Aarogyam Care Hospital is equipped with modern diagnostic systems and advanced treatment technology, ensuring accurate evaluations, efficient procedures, and high-quality healthcare services for patients across Pune.",
    icon: FiActivity,
  },
  {
    title: "Comprehensive Care Under One Roof",
    desc: "We provide multi-specialty healthcare services in one facility, ensuring coordinated treatment, seamless patient experience, and convenient access to consultations, diagnostics, and advanced medical care.",
    icon: FiUser,
  },
  {
    title: "Experienced & Skilled Medical Team",
    desc: "Our team of qualified healthcare professionals delivers safe, ethical, and evidence-based treatments, focusing on precision, patient comfort, and consistently high clinical standards.",
    icon: FiClipboard,
  },
  {
    title: "Experienced & Skilled Medical Team",
    desc: "Our team of qualified healthcare professionals delivers safe, ethical, and evidence-based treatments, focusing on precision, patient comfort, and consistently high clinical standards.",
    icon: FiMic,
  },
];


export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#5a3fa3f9] text-white py-14 lg:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT IMAGE */}
        <div
          className={`transition-all duration-1000 ${
            visible
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-20 scale-95"
          }`}
        >
          <Image
            src="/images/WhyUs.jpg"
            alt="Medical Team"
            width={600}
            height={700}
            className="rounded-2xl shadow-2xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Title */}
          <div
            className={`mb-10 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold mb-3">Why Choose Us?</h2>
            <p className="text-lg text-white/90">
              Where Personalized Care Meets Excellence in Healthcare
            </p>
          </div>

          {/* Boxes */}
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  style={{ transitionDelay: `${i * 120}ms` }}
                  className={`group relative p-6 border border-white/40 rounded-xl overflow-hidden transition-all duration-700
                  ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                  hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]
                `}
                >
                  {/* Animated border glow */}
                  <span className="absolute inset-0 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 animate-pulse"></span>

                  {/* Icon */}
                  <div className="mb-4">
                    <Icon className="text-4xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed text-[18px]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
