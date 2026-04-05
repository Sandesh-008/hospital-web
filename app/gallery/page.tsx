import GalleryGrid from "@/components/GalleryGrid"
import ReviewsAndAppointment from "@/components/ReviewsAndAppointment"
import ServiceBanner from "@/components/ServicesPageSections/ServiceBanner"

export const metadata = {
    title: "Hospital Gallery | Aarogyam Care Hospital",
    description: "Explore our hospital infrastructure, ICU, operation theaters, and patient care facilities."
}

export default function GalleryPage() {
    return (
        <main className="bg-white">
            {/* HERO */}
            <ServiceBanner
                serviceName="Hospital Gallery"
                description="A glimpse into our advanced medical facilities, patient care areas,
          and modern infrastructure."/>



            {/* GALLERY GRID */}
            <GalleryGrid />

            <ReviewsAndAppointment/>
        </main>
    )
}
