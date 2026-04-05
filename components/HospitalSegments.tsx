"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type Service = {
  service_id: string;
  service_name: string;
  slug: string;
  description: string;
  icon?: string;
};

export default function SpecializedSegments() {
  const [services, setServices] = useState<Service[]>([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* ----------------------------
     FETCH SERVICES
  ---------------------------- */
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(
          "http://localhost:5000/api/get_all_services",  //get_all_services - API USED
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id:
                process.env.NEXT_PUBLIC_CLIENT_ID ||
                "999999999999999999999999",
            }),
          }
        );

        const text = await res.text();

        if (!res.ok) {
          console.error("API ERROR:", text);
          return;
        }

        let json;
        try {
          json = JSON.parse(text);
        } catch {
          console.error("INVALID JSON RESPONSE:", text);
          return;
        }

        setServices(
          (json?.data || []).map((service: any) => ({
            service_id: service._id,
            service_name: service.service_name,
            slug: service.service_name.toLowerCase().replace(/\s+/g, "-"),
            description: service.description,
            icon: service.image,
          }))
        );
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    }

    fetchServices();
  }, []);
console.log("API RESPONSE:", JSON);
  /* ----------------------------
     SCROLL ANIMATION
  ---------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
    
  }, []);

  return (
    <section
    id="hospital-segments"
      ref={sectionRef}
      className="max-w-full mx-auto px-6 sm:px-10 lg:px-20 py-20 bg-white"
    >
      {/* HEADER */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#4b2fae] mb-3">
          Specialized Hospital Segments
        </h2>
        <p className="text-lg text-gray-700">
          Dedicated to Your Well-being: Our Commitment to Patient Care
        </p>
        <div className="w-16 h-1 mx-auto bg-[#4b2fae] mt-4 rounded-full animate-pulse" />
      </div>

      {/* SERVICE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {services.map((service, i) => (
          <div
            key={service.service_id}
            className={`flex flex-col bg-white border border-gray-400 p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              visible ? "animate-fadeUp" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {/* ICON */}
            <div className="w-12 h-12 mb-4 relative">
              <Image
                src={
                  service.icon
                    ? `http://localhost:5000/uploads/services/${service.icon}`
                    : "/images/segmentsIcons/default.png"
                }
                alt={service.service_name}
                fill
                className="object-contain"
              />
            </div>

            {/* TITLE */}
            <h3 className="text-xl text-black font-bold mb-2">
              {service.service_name}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-700 mb-6 flex-grow line-clamp-5">
              {service.description}
            </p>

            {/* READ MORE */}
            <Link
              href={`/services/${service.slug}?service_id=${service.service_id}`}
              className="mt-auto inline-flex items-center text-[#4b2fae] font-semibold hover:underline"
            >
              Read More <FiArrowRight className="ml-2" />
            </Link>
          </div>
        ))}
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s forwards;
        }
      `}</style>
    </section>
  );
}
