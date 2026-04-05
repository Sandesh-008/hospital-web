"use client"

import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function Chatbot() {
  const [message, setMessage] = useState("")
  const [reply, setReply] = useState("")

  const sendMessage = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/ai/chat",
      { message }
    )
    setReply(res.data.reply)
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl p-6 rounded-2xl"
      >
        <h2 className="text-xl font-bold mb-4 text-black">
          🤖 AI Hospital Assistant
        </h2>

        <input
          className="w-full border p-2 rounded mb-3 text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your symptoms..."
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 text-black px-4 py-2 rounded-lg"
        >
          Ask AI
        </button>

        {reply && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 bg-gray-700 p-3 rounded"
          >
            {reply}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}