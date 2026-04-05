"use client"

import { useState } from "react"

type FAQ = {
  _id: string
  question: string
  answer: string
}

export default function ServiceFAQ({ faqs }: { faqs: FAQ[] }) {
  const [active, setActive] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="bg-white py-28">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-black mb-14 text-center">
          Frequently Asked Questions
        </h2>
        

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = active === i

            return (
              <div key={faq._id} className="border-b last:border-b-0">
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className={`
                    w-full px-6 py-5
                    flex items-center justify-between
                    text-left transition-colors duration-300
                    ${
                      isOpen
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-semibold">
                      {isOpen ? "▾" : "▸"}
                    </span>
                    <span className="text-lg font-medium">
                      {faq.question}
                    </span>
                  </div>
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="px-10 py-5 text-gray-800 leading-relaxed bg-white">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
