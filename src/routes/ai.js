const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API Key belum disetting" });

  try {
    const modelName = "gemini-2.5-flash"; 

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Tolong kembangkan ide singkat ini menjadi satu paragraf catatan yang rapi dan insightful dalam Bahasa Indonesia: "${prompt}"` }] }],
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Gagal menghubungi Google AI");
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Tidak ada hasil dari AI");

    res.json({ result: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: error.message || "Gagal memanggil AI" });
  }
});

module.exports = router;