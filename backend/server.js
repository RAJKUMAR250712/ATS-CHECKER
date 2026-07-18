
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
// app.use(
//   cors({
//     origin: "https://ats-checker-black.vercel.app",
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ats-checker-black.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// =========================
// API KEY CHECK
// =========================
console.log(
  "GROQ API:",
  process.env.GROQ_API_KEY ? "LOADED ✅" : "MISSING ❌"
);

// =========================
// NORMALIZE SCORE (FIXED)
// =========================
const normalizeScore = (score) => {
  const num = Number(score);

  if (isNaN(num)) return 0;

  // AI sometimes gives 0-10 scale → convert
  if (num <= 10) return Math.round(num * 10);

  if (num > 100) return 100;

  return Math.round(num);
};

// =========================
// SAFE JSON EXTRACTOR
// =========================
const extractJSON = (text) => {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch (err) {
    return null;
  }
};

// =========================
// DEFAULT RESPONSE
// =========================
const fallbackResponse = {
  score: 50,
  summary:
    "Resume analysis could not be fully generated. Please improve structure and clarity.",
  weak_points: [],
  improvements: [],
  missing_keywords: [],
  suggestions: [],
};

// =========================
// ROUTE
// =========================
app.post("/analyze", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Resume text missing" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "API Key missing" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an ATS resume expert. You MUST return only valid JSON. No markdown, no text, no explanation.",
          },
          {
            role: "user",
            content: `
Analyze this resume carefully and return ONLY JSON.

IMPORTANT RULES:
- score must be between 0 and 100
- summary must ALWAYS be 2–3 meaningful sentences
- weak_points, improvements, missing_keywords, suggestions must NOT be empty (generate realistic values)

FORMAT:
{
  "score": 85,
  "summary": "....",
  "weak_points": [{"title":"", "desc":""}],
  "improvements": [{"title":"", "desc":""}],
  "missing_keywords": ["", ""],
  "suggestions": [{"title":"", "desc":""}]
}

Resume:
${text}
            `,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content || "";

    console.log("RAW AI RESPONSE:", raw);

    let parsed = extractJSON(raw);

    // =========================
    // FINAL SAFE RESPONSE
    // =========================
    const result = {
      score: normalizeScore(parsed?.score),

      summary:
        parsed?.summary && parsed.summary.trim()
          ? parsed.summary.trim()
          : fallbackResponse.summary,

      weak_points: Array.isArray(parsed?.weak_points)
        ? parsed.weak_points
        : [],

      improvements: Array.isArray(parsed?.improvements)
        ? parsed.improvements
        : [],

      missing_keywords: Array.isArray(parsed?.missing_keywords)
        ? parsed.missing_keywords
        : [],

      suggestions: Array.isArray(parsed?.suggestions)
        ? parsed.suggestions
        : [],
    };

    return res.json(result);
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      error: "AI request failed",
      details: err.response?.data || err.message,
    });
  }
});

// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});