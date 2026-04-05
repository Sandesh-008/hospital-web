
import AboutPreview from "@/components/AboutPreview"
import HeroSlider from "@/components/HeroSlider"
import InfoCards from "@/components/InfoCards"
import StatsSection from "@/components/StatsSection"
import HospitalSegments from "@/components/HospitalSegments"
import HomePageOurDoctors from "@/components/HomePageOurDoctors"
import WhyChooseUs from "@/components/WhyChooseUs"
import ReviewsAndAppointment from "@/components/ReviewsAndAppointment"

export default function Home() {
  return (
    <>
      <HeroSlider />
      <InfoCards />
      <AboutPreview/>
      <StatsSection/>
      <HospitalSegments/>
      <HomePageOurDoctors/>
      <WhyChooseUs/>
      <ReviewsAndAppointment/>
    </>
  )
}
