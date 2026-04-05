"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import ContactFormBanner from "../ContactFormBanner"
import DoctorFAQ from "../faq/ServiceFAQ"

const API_BASE_URL = "http://localhost:5000/api/doctors"
const IMAGE_BASE_URL = "http://localhost:5000/uploads"

type SubContent = {
  _id: string
  sub_title: string
  sub_content: string
  sub_image: string
}

type FAQ = {
  _id: string
  question: string
  answer: string
}

interface Props {
  faqs?: FAQ[]
}

export default function DoctorDetailSections({ faqs = [] }: Props) {
  const searchParams = useSearchParams()
  const doctorId = searchParams.get("id")

  const [sections, setSections] = useState<SubContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!doctorId) return

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/${doctorId}/subcontent`
        )

        const json = await res.json()
        setSections(json.data || [])
      } catch (err) {
        console.error("Doctor Subcontent API error", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [doctorId])

  if (loading) {
    return <p className="text-center py-20">Loading...</p>
  }

  return (
    <>
      <section className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">

          {sections.slice(0, 2).map((item, index) => {
            const imageUrl = `${IMAGE_BASE_URL}/${item.sub_image}`

            return index % 2 === 0 ? (
              <RowContentImage
                key={item._id}
                title={item.sub_title}
                text={item.sub_content}
                image={imageUrl}
              />
            ) : (
              <RowImageContent
                key={item._id}
                title={item.sub_title}
                text={item.sub_content}
                image={imageUrl}
              />
            )
          })}

          {sections.length > 2 && <ContactFormBanner />}

          {sections.slice(2).map((item, index) => {
            const imageUrl = `${IMAGE_BASE_URL}/${item.sub_image}`
            const actualIndex = index + 2

            return actualIndex % 2 === 0 ? (
              <RowContentImage
                key={item._id}
                title={item.sub_title}
                text={item.sub_content}
                image={imageUrl}
              />
            ) : (
              <RowImageContent
                key={item._id}
                title={item.sub_title}
                text={item.sub_content}
                image={imageUrl}
              />
            )
          })}

        </div>
      </section>

      {/* ✅ DOCTOR FAQ SECTION */}
      {faqs && faqs.length > 0 && (
        <DoctorFAQ faqs={faqs} />
      )}
    </>
  )
}

function RowContentImage({ title, text, image }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="w-16 h-1 rounded-full mb-6 bg-[#5a2ea6]" />
        <p className="text-gray-700 text-lg">{text}</p>
      </div>

      <div className="relative h-[380px] rounded-3xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}

function RowImageContent({ title, text, image }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="relative h-[380px] rounded-3xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="w-16 h-1 rounded-full mb-6 bg-[#5a2ea6]" />
        <p className="text-gray-700 text-lg">{text}</p>
      </div>
    </div>
  )
}