import "./globals.css"
import TopBar from "../components/Topbar"
import Navbar from "../components/Navbar"
import Footer from "@/components/Footer"
import { AppointmentModalProvider } from "@/components/context/AppointmentModalContext"
import AppointmentModal from "@/components/appointment/AppointmentModal"
import FloatingContactButtons from "@/components/FloatingContactButtons"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        

       <AppointmentModalProvider>
        <TopBar />
          <Navbar />
          {children}
          <Footer />
          <AppointmentModal />
        </AppointmentModalProvider>
        <FloatingContactButtons/>
      </body>
    </html>
  )
}
