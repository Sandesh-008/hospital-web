"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const GET_CLIENT_API = "http://localhost:5000/api/get_client_config"

export default function TopBar() {
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const res = await axios.get(GET_CLIENT_API)

        if (res.data?.success && res.data?.data) {
          setPhone(res.data.data.phone)
          setEmail(res.data.data.email)
        }
      } catch (error) {
        console.error("Failed to fetch client details", error)
      }
    }

    fetchClientDetails()
  }, [])

  return (
    <div className="bg-[#7045b9] text-white text-sm py-2">
      <div className="max-w-7xl mx-auto flex justify-between px-4">
        <p>Emergency: {phone || "Loading..."}</p>
        <p>{email || "Loading..."}</p>
      </div>
    </div>
  )
}