"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppointmentModal } from "@/components/context/AppointmentModalContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const reviews = [
  {
    name: "Rohan Kulkarni",
    text:
      "Aarogyam Care Hospital provides exceptional care with modern facilities and supportive staff. Doctors explained everything clearly and ensured a smooth, comfortable treatment experience throughout my visit.",
  },
  {
    name: "Priya Deshmukh",
    text:
      "The medical team is highly professional and attentive. From consultation to treatment, everything was well organized, transparent, and handled with genuine care and dedication.",
  },
  {
    name: "Amit Sharma",
    text:
      "I was impressed by the hospital’s cleanliness, advanced equipment, and patient-focused approach. The staff was polite, responsive, and made the entire process stress-free.",
  },
  {
    name: "Neha Joshi",
    text:
      "Excellent healthcare services with experienced doctors and efficient support staff. The diagnosis was accurate, and treatment was explained properly before proceeding further.",
  },
  {
    name: "Siddharth Patil",
    text:
      "Aarogyam Care Hospital offers reliable and comprehensive medical services. The team ensured timely attention, clear communication, and a reassuring environment during my treatment journey.",
  },
];

export default function ReviewsAndAppointment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const slidesPerView =
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
          ? 2
          : 1
      : 3;

  const next = () =>
    setCurrent((prev) => (prev + 1) % reviews.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );

  const { openModal } = useAppointmentModal();

  return (
    <section id="reviews-appointments"
      ref={sectionRef} className="bg-white overflow-hidden">

      {/* ================= REVIEWS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2
          className={`text-3xl font-bold text-[#3c2c8f] mb-3 transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Happy Patients
        </h2>

        <p
          className={`text-gray-600 mb-12 transition-all duration-700 delay-150
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          What our patients say about their experience
        </p>

        {/* SLIDER */}
        <div className="relative">
          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10
            bg-white shadow-lg rounded-full p-3 text-[#5a3fa3]
            hover:scale-110 transition"
          >
            <FiChevronLeft size={22} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
            bg-white shadow-lg rounded-full p-3 text-[#5a3fa3]
            hover:scale-110 transition"
          >
            <FiChevronRight size={22} />
          </button>

          {/* TRACK */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / slidesPerView)}%)`,
              }}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="min-w-full md:min-w-[50%] lg:min-w-[33.3333%] px-4"
                >
                  <div
                    className="h-full bg-white border border-gray-300 rounded-2xl p-8
                    shadow-sm hover:shadow-xl transition-all duration-500
                    flex flex-col justify-between"
                  >
                    {/* TEXT */}
                    <div>
                      <span className="text-5xl text-[#544794]">“</span>
                      <p className="text-gray-700 leading-relaxed mt-2">
                        {review.text}
                      </p>
                    </div>

                    {/* FOOTER FIXED */}
                    <div className="mt-8">
                      <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className="text-yellow-400 text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-xl font-semibold text-gray-900">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= APPOINTMENT CTA (UNCHANGED) ================= */}
      <div className="relative bg-[#5a3fa3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-20 grid lg:grid-cols-2 items-center gap-16">
          <div
            className={`text-white transition-all duration-1000
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
          >
            <p className="text-white/80 mb-4 text-lg">
              We look forward to assisting you with your healthcare needs.
            </p>

            <h2 className="text-4xl font-bold leading-snug mb-8">
              Just Make an Appointment <br />
              and You’re Done!
            </h2>

            <button
              onClick={openModal}
              className="bg-white text-[#5a3fa3] px-8 py-4 rounded-lg font-semibold
              hover:-translate-y-1 transition hover:shadow-xl"
            >
              Take Appointment
            </button>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-200
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
          >
            <Image
              src="/images/doctors/review&appoinment.png"
              alt="Doctor"
              width={320}
              height={470}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
