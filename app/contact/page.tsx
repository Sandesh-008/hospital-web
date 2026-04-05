"use client"

import ContactClient from "./ContactClient"
import ServiceBanner from "@/components/ServicesPageSections/ServiceBanner"

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Hero Banner (reuse existing banner) */}
      <ServiceBanner 
      serviceName="Contact Us"
      description="Reach out to us for compassionate care, clarity, and confidence."/>

      {/* Contact Form + Info Section */}
      <ContactClient />

    </main>
  )
}
