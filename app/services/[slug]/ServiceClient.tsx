"use client"

import ImageContentSection from "@/components/ImageContentSection"
import ContactFormBanner from "@/components/ContactFormBanner"
import RelatedDoctors from "@/components/RelatedDoctors"
import BgImageSection from "@/components/BgImageSection"
import ServiceFAQ from "@/components/faq/ServiceFAQ"

interface Section {
  image?: string
  title: string
  description: string
}

interface FAQ {
  _id: string
  question: string
  answer: string
}

interface ServiceClientProps {
  sections: Section[]
  doctors: any[]
  serviceId: string
  faqs: FAQ[]   // ✅ ADD FAQ PROP
}

export default function ServiceClient({
  sections,
  doctors,
  serviceId,
  faqs,
}: ServiceClientProps) {

  let imageRowSinceBg = 0

  const safeSections = sections.filter(
    (section) => section.image && section.image.trim() !== ""
  )

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12 space-y-28">
        {safeSections.map((section, index) => {

          if ((index + 1) % 5 === 0) {
            imageRowSinceBg = 0

            return (
              <BgImageSection
                key={`bg-${index}`}
                backgroundImage={section.image!}
                subtitle={section.title}
                description={section.description}
              />
            )
          }

          imageRowSinceBg += 1

          return (
            <div key={index}>
              <ImageContentSection
                image={section.image!}
                title={section.title}
                description={section.description}
                reverse={index % 2 !== 0}
              />

              {imageRowSinceBg === 2 && <ContactFormBanner />}
            </div>
          )
        })}
      </section>

      {/* Doctors */}
      <RelatedDoctors serviceId={serviceId} />

      {/* FAQ SECTION */}
      {faqs && faqs.length > 0 && (
        <ServiceFAQ faqs={faqs} />
      )}
    </>
  )
}