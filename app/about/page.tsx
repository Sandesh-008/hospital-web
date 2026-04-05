import AboutClient from "./AboutClient"
import ServiceBanner from "@/components/ServicesPageSections/ServiceBanner"

export default function AboutPage() {
  return (
    <>
      {/* COMMON BANNER (same as services / doctors) */}
      <ServiceBanner
        serviceName="About Us"
        description="Compassion, Care & Clinical Excellence"
      />

      {/* PAGE CONTENT BELOW BANNER */}
      <AboutClient />
    </>
  )
}
