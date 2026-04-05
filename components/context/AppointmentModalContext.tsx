"use client"

import { createContext, useContext, useState } from "react"

type ModalContextType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const AppointmentModalContext = createContext<ModalContextType | null>(null)

export function AppointmentModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AppointmentModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </AppointmentModalContext.Provider>
  )
}

export function useAppointmentModal() {
  const context = useContext(AppointmentModalContext)
  if (!context) {
    throw new Error(
      "useAppointmentModal must be used inside AppointmentModalProvider"
    )
  }
  return context
}
