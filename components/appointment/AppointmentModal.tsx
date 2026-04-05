"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppointmentModal } from "@/components/context/AppointmentModalContext"
import AppointmentForm from "./AppointmentForm"

export default function AppointmentModal() {
  const { isOpen, closeModal } = useAppointmentModal()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-10 w-full max-w-lg relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-2xl text-gray-900"
            >
              ×
            </button>

            <h2 className="text-3xl text-gray-800 font-bold mb-6 text-center">
              Book an Appointment
            </h2>

            {/* ✅ FORM COMES FROM HERE */}
            <AppointmentForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
