import OurDoctorsList from "@/components/OurDoctorsList"
import ServiceBanner from "@/components/ServicesPageSections/ServiceBanner"

export default function OurDoctorsPage() {
  return (
    <>
      {/*  SERVICE BANNER  */}
      <ServiceBanner 
      serviceName="Our Doctors"
      description="Meet Our Expert Doctors Team" />

      <OurDoctorsList />
    </>
  )
}
