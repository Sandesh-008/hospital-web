const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ FALLBACK GOES HERE
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        reply: "This is a demo AI response for development.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(
      `You are a professional hospital AI assistant.
Explain in simple language.\n\nUser: ${message}`
    );

    const reply = result.response.text();

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
  console.error("Gemini Error:", error);

  res.json({
    success: true,
    reply: "AI is currently in demo mode. Please enable billing to activate real AI.",
  });


    // ✅ Optional: fallback if quota error
    res.json({
      success: true,
      reply: "AI service temporarily unavailable. This is a fallback response.",
    });
  }
});

module.exports = router;