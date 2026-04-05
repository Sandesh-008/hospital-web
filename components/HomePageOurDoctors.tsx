"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

type Doctor = {
  _id: string;
  name: string;
  doctor_image?: string;
};

const IMAGE_BASE_URL = "http://localhost:5000/";
const FALLBACK_IMAGE = "/doctor-placeholder.jpg";

export default function OurDoctors() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  /* Title animation on scroll */
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

  /* Fetch doctors from API */
  useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/get_all_doctors",
        {
          client_id: "999999999999999999999999",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      setDoctors(res.data.data || [])
    } catch (error) {
      console.error("Failed to fetch doctors", error)
    }
  }

  fetchDoctors()
}, [])

  /* Horizontal scroll buttons */
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
    id="our-doctors"
      ref={sectionRef}
      className="relative py-24 px-45 bg-[#f9fbfcfa] overflow-hidden"
    >
      {/* ===== TITLE ===== */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-4xl font-bold text-[#3c2c8f] mb-2">
          Our Doctors
        </h2>
        <p className="text-lg text-gray-800 font-medium">
          Meet Our Expert Doctors Team
        </p>

        <div className="flex justify-center mt-4">
          <span className="text-[#5a43c6] text-3xl">~∿~</span>
        </div>
      </div>

      {/* ===== SCROLL BUTTONS ===== */}
      <button
        onClick={() => scroll("left")}
        className="mx-30 hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white text-black shadow-lg items-center justify-center hover:scale-110 transition"
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="mx-30 hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white text-black shadow-lg items-center justify-center hover:scale-110 transition"
      >
        <FiChevronRight size={24} />
      </button>

      {/* ===== HORIZONTAL SCROLL ===== */}
      <div
        ref={scrollRef}
        className="flex gap-10 px-10 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {doctors.map((doc) => {
          const imageSrc = doc.doctor_image
            ? IMAGE_BASE_URL + doc.doctor_image
            : FALLBACK_IMAGE;

          return (
            <div
              key={doc._id}
              className="min-w-[280px] text-center group"
            >
              {/* Image Card */}
              <div className="relative w-[260px] h-[260px] mx-auto rounded-3xl border border-black overflow-hidden bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <Image
                  src={imageSrc}
                  alt={doc.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mt-6 text-xl font-semibold text-black">
                {doc.name}
              </h3>
            </div>
          );
        })}
      </div>

      {/* ===== BUTTON ===== */}
      <div className="text-center mt-16">
        <Link
          href="/our-doctors"
          className="relative px-8 py-4 bg-[#3c2c8f] text-white font-semibold rounded-lg overflow-hidden group"
        >
          <span className="relative z-10">See More Details</span>
          <span className="absolute inset-0 bg-[#5a43c6] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
      </div>
    </section>
  );
}
