const openai = require("../utils/openai")
const pdfParse = require("pdf-parse")

/* ================================
   AI CHATBOT
================================ */
exports.hospitalChatbot = async (req, res) => {
  try {
    console.log("Incoming body:", req.body)

    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional hospital assistant. Provide helpful but safe medical guidance.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    })

    res.json({
      success: true,
      reply: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message)
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}
