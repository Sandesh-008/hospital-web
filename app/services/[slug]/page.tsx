import ServiceBanner from "@/components/ServicesPageSections/ServiceBanner"
import ServiceClient from "./ServiceClient"
import { serviceFaqs } from "@/data/serviceFaqs"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ service_id?: string }>
}

export default async function ServicePage({ params, searchParams }: Props) {
  const { slug } = await params
  const { service_id } = await searchParams

  let json: any = {
    service: null,
    service_subcontent: [],
    service_faqs: [],
    doctors: [],
  }

  try {
    const res = await fetch(
      "http://localhost:5000/api/get_service_details",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id,
          client_id:
            process.env.NEXT_PUBLIC_CLIENT_ID ||
            "999999999999999999999999",
        }),
        cache: "no-store",
      }
    )

    const apiData = await res.json()
    const root = apiData.data || apiData

    json = {
      service: root.service || null,
      service_subcontent: root.service_subcontent || [],
      service_faqs: root.service_faqs || [],
      doctors: root.doctors || [],
    }
  } catch (err) {
    console.error("FETCH ERROR:", err)
  }

  const { service, service_subcontent, doctors } = json

  if (!service) {
    return (
      <main className="p-20 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
      </main>
    )
  }

  const sections =
  service_subcontent?.map((item: any) => ({
    image: item.sub_image
      ? `http://localhost:5000/uploads/service_subcontent/${item.sub_image}`
      : "/images/services/default-subcontent.jpg",
    title: item.sub_title,
    description: item.sub_content,
  })) || []

  // ✅ STATIC FAQ USING SLUG
  const staticFaqsRaw = serviceFaqs[slug] || []

  const formattedFaqs = staticFaqsRaw.map((f, i) => ({
    _id: `${slug}-${i}`,
    question: f.q,
    answer: f.a,
  }))

  return (
    <main className="bg-white">
      <ServiceBanner
        serviceName={service.service_name}
        description={service.description}
      />

      <ServiceClient
        sections={sections}
        doctors={doctors}
        serviceId={service_id!}
        faqs={formattedFaqs}   // ✅ STATIC FAQ PASSED
      />
    </main>
  )
}