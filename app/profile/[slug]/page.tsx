import { Suspense } from "react"
import DoctorProfileClient from "./DoctorProfileClient"
import DoctorDetailSections from "@/components/doctors/DoctorDetailSections"
import ServiceBanner from "@/components/ServicesPageSections/ServiceBanner"
import { doctorFaqs } from "@/data/doctorFaqs"
import ReviewsAndAppointment from "@/components/ReviewsAndAppointment"

type Props = {
  params: {
    slug: string
  }
}

export default function ProfilePage({ params }: Props) {
  const { slug } = params

  // ✅ GET STATIC FAQ BY DOCTOR SLUG
  const staticFaqRaw = doctorFaqs[slug] || []

  // ✅ CONVERT TO COMPONENT FORMAT
  const formattedFaqs = staticFaqRaw.map((f, i) => ({
    _id: `${slug}-${i}`,
    question: f.q,
    answer: f.a,
  }))

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          Loading profile...
        </div>
      }
    >
      <ServiceBanner
        serviceName="Our Doctors"
        description="Meet Our Expert Doctors Team"
      />

      <DoctorProfileClient />

      {/* ✅ PASS FAQ TO DETAILS SECTION */}
      <DoctorDetailSections faqs={formattedFaqs} />

      <ReviewsAndAppointment/>
    </Suspense>
  )
}