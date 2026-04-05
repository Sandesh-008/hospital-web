"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useAppointmentModal } from "@/components/context/AppointmentModalContext"
import { HiMenu, HiX } from "react-icons/hi"

const resourcesMenu = [{ label: "WebBuzz", href: "#" }]

/* -------------------- NAV LINK -------------------- */
function NavLink({ href, label, active }: { href: string; label: string; active: string }) {
  return (
    <Link
      href={href}
      className={`relative after:absolute after:left-0 after:-bottom-1
      after:h-[2px] after:bg-[#5a2ea6] after:transition-all after:duration-300
      hover:text-[#5a2ea6] ${active}`}
    >
      {label}
    </Link>
  )
}

/* -------------------- SERVICES DROPDOWN -------------------- */
function MegaMenu({
  label,
  data,
  openMenu,
  setOpenMenu,
}: {
  label: string
  data: { title: string; slug: string; id?: string }[]
  openMenu: string | null
  setOpenMenu: (val: string | null) => void
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(label)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button className="flex items-center gap-1 font-semibold text-[19px] text-gray-800 hover:text-[#5a2ea6] transition">
        {label} <span className="text-xs">▼</span>
      </button>

      <div
        className={`absolute top-full left-0 w-72 bg-white border border-gray-200 shadow-xl transition-all duration-200
        ${openMenu === label ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <ul className="py-2">
          {data.map((section, index) => (
            <li key={section.slug}>
              <Link
                href={{
                  pathname: `/services/${section.slug}`,
                  query: { service_id: section.id },
                }}
                className="block px-4 py-2 text-[18px] text-black hover:bg-[#f3efff] hover:text-[#5a2ea6] transition"
                onClick={() => setOpenMenu(null)}
              >
                {section.title}
              </Link>

              {index !== data.length - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* -------------------- RESOURCES DROPDOWN -------------------- */
function SimpleDropdown({
  label,
  items,
  openMenu,
  setOpenMenu,
}: {
  label: string
  items: { label: string; href: string }[]
  openMenu: string | null
  setOpenMenu: (val: string | null) => void
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(label)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button className="flex items-center gap-1 font-semibold text-[19px] text-gray-800 hover:text-[#5a2ea6] transition">
        {label} <span className="text-xs">▼</span>
      </button>

      <div
        className={`absolute top-full left-0 w-56 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 transition-all duration-200
        ${openMenu === label ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <ul className="py-3">
          {items.map((item, idx) => (
            <li key={idx}>
              <Link
                href={"/buzz"}
                onClick={() => setOpenMenu(null)}
                className="block px-4 py-2 text-[18px] text-gray-700 hover:bg-[#f3efff] hover:text-[#5a2ea6] transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* -------------------- NAVBAR -------------------- */
export default function Navbar() {
  const pathname = usePathname()
  const { openModal } = useAppointmentModal()

  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const [services, setServices] = useState<{ title: string; slug: string; id?: string }[]>([])

  useEffect(() => {
    setOpenMenu(null)
  }, [pathname])

  /* -------- FETCH SERVICES -------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/get_all_services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: "999999999999999999999999" }),
    })
      .then(async (res) => {
        const text = await res.text()
        const data = JSON.parse(text)

        const servicesArray = data?.data || []

        const formattedServices = servicesArray.map((s: any) => ({
          title: s.service_name,
          slug: s.service_name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-"),
          id: s._id,
        }))

        setServices(formattedServices)
      })
      .catch((err) => console.error("Services API error:", err))
  }, [])

  const isActive = (path: string) =>
    pathname === path ? "text-[#5a2ea6] after:w-full" : "text-gray-700 after:w-0"

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/hospital-logo.png" alt="Hospital" width={70} height={70} />
            <span className="font-bold text-2xl text-[#4b2c8c]">Hospital</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10 font-semibold text-[18px]">

            <NavLink href="/" label="Home" active={isActive("/")} />
            <NavLink href="/about" label="About Us" active={isActive("/about")} />

            <MegaMenu
              label="Services"
              data={services}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />

            <SimpleDropdown
              label="Resources"
              items={resourcesMenu}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />

            <NavLink href="/contact" label="Contact Us" active={isActive("/contact")} />

            <Link
              href="/ai-chat"
              className="relative text-gray-700 hover:text-[#5a2ea6]"
            >
              AI Assistant
            </Link>
          </nav>

          {/* RIGHT BUTTON */}
          <div className="flex items-center gap-4">

            <button
              onClick={openModal}
              className="hidden lg:block bg-[#5a2ea6] text-white px-6 py-3 rounded-lg
              transition-all duration-300 border-2 border-[#5a2ea6]
              hover:bg-white hover:text-[#5a2ea6]"
            >
              Book Appointment
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden text-3xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiX /> : <HiMenu />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-6 space-y-4 text-lg font-semibold">

          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>

          <div className="space-y-2">
            <p className="text-[#5a2ea6]">Services</p>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}?service_id=${service.id}`}
                className="block pl-3 text-gray-700"
              >
                {service.title}
              </Link>
            ))}
          </div>

          <Link href="/contact">Contact</Link>
          <Link href="/ai-chat">AI Assistant</Link>

          <button
            onClick={openModal}
            className="w-full bg-[#5a2ea6] text-white py-3 rounded-lg"
          >
            Book Appointment
          </button>
        </div>
      )}

    </header>
  )
}