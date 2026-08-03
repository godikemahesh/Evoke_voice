import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini initialization
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Evoke AI Server" });
});

// AI Script Generation Endpoint
app.post("/api/generate-prompt", async (req, res) => {
  try {
    const { creatorName, recipientName, relationship, occasion, tone, language, customInstructions, duration } = req.body;

    const ai = getGenAI();
    const systemInstruction = `You are a professional celebrity scriptwriter for Evoke, a luxury AI gifting platform.
Craft a personalized, high-emotion video or voice call script for ${creatorName || "a celebrity"} addressing ${recipientName || "a fan"}.
Tone: ${tone || "Heartfelt & Warm"}
Language: ${language || "English"}
Occasion: ${occasion || "Special Occasion"}
Relationship: ${relationship || "Friend"}
Duration Target: ${duration || "~60 sec"}
Instructions: ${customInstructions || "Make it feel intimate, personal, and unforgettable."}

Format the response strictly as valid JSON with keys:
- "script": The full spoken message (word-for-word spoken script).
- "hooks": Array of 3 short key highlights or takeaway lines in the script.
- "deliveryNote": Director's note for the creator's pacing and facial expressions.`;

    const promptText = `Generate a personalized ${tone} ${occasion} message script for ${recipientName} from ${creatorName}. Key details: ${customInstructions || "Surprise them with warm wishes."}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.8,
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);

    res.json({
      success: true,
      script: data.script || `Hey ${recipientName}! This is ${creatorName}. Wishing you an incredible ${occasion}!`,
      hooks: data.hooks || [`Warm wishes for ${occasion}`, "Personalized highlight", "Special blessing"],
      deliveryNote: data.deliveryNote || "Deliver with warm eye contact and a joyful smile.",
    });
  } catch (error: any) {
    console.error("Error generating script:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI script",
      fallbackScript: `Hey ${req.body?.recipientName || "there"}! Wishing you an absolute best on your ${req.body?.occasion || "special day"}! May this year bring endless happiness.`,
    });
  }
});

// AI Text to Speech Audio Preview Endpoint
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const ai = getGenAI();
    const chosenVoice = voice || "Puck"; // Puck, Kore, Zephyr, Fenrir, Charon

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Say warmly and enthusiastically: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: chosenVoice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      res.json({ success: true, audioBase64: base64Audio });
    } else {
      res.status(500).json({ success: false, error: "No audio generated" });
    }
  } catch (error: any) {
    console.error("Error in TTS endpoint:", error);
    res.status(500).json({ success: false, error: error.message || "TTS error" });
  }
});

// AI Gifting Concierge Endpoint
app.post("/api/recommend-creator", async (req, res) => {
  try {
    const { query } = req.body;
    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `You are the Evoke AI Concierge. Recommend 2 creators or advice based on user query: "${query}". Respond with friendly markdown advice.`,
    });

    res.json({ success: true, recommendation: response.text });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Evoke Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
