import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize GoogleGenAI client with required telemetry header
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const BANNED_WORDS = [
  "delve",
  "testament",
  "revolutionize",
  "moreover",
  "tapestry",
  "foster",
  "elevate",
  "unlock",
  "supercharge",
  "nestled",
  "beacon",
  "game-changer",
  "dive deep",
  "empower",
  "harness",
];

// Helper to count words (excluding punctuation/emoji)
function countWords(str: string): number {
  return str
    .trim()
    .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "")
    .replace(/[^\w\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

// Clean and extract a punchy subject from user topic
function extractSubject(topic: string): { main: string; short: string } {
  let cleaned = topic
    .trim()
    .replace(/^(how to|how i|how we|how|why you|why we|why i|why|the reason|what happens when|i tested|i tried|i quit|i stopped|a video about|video topic:)\s+/i, "")
    .trim();

  // If starts with common pronoun or article, strip it
  cleaned = cleaned.replace(/^(the|a|an|my|your|our|this)\s+/i, "").trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  const short = words.slice(0, 3).join(" ") || "this habit";
  const main = words.slice(0, 5).join(" ") || "this routine";
  return { main, short };
}

// High-converting algorithmic viral caption generator
function generateAlgorithmicCaption(
  topic: string,
  platform: string,
  tone: string,
  hookAngle = "curiosity"
) {
  const { main, short } = extractSubject(topic);
  const cleanShort = short.replace(/[^\w\s]/g, "");

  // Generate hook under 7 words with exactly 1 emoji
  const hookOptionsByAngle: Record<string, string[]> = {
    curiosity: [
      `Nobody told you about ${cleanShort} 🤫`,
      `The hidden truth about ${cleanShort} 🔑`,
      `Watch this before you continue 👁️`,
      `Why nobody is talking about this 🤫`,
    ],
    contrarian: [
      `Why everyone is doing this wrong 💀`,
      `Stop wasting time on this 🛑`,
      `The unpopular truth about ${cleanShort} ⚠️`,
      `Most people fail at this ❌`,
    ],
    shocking: [
      `I tested this for 30 days 🤯`,
      `This changes everything about ${cleanShort} ⚡`,
      `What happens when you quit this 🚨`,
      `This feels like illegal knowledge 🤫`,
    ],
    mistake: [
      `Don't make this common mistake ⚠️`,
      `You are doing this completely wrong 💀`,
      `The #1 trap you must avoid 🛑`,
      `Fix this habit right now ⏱️`,
    ],
    "how-to": [
      `The fastest way to fix this 🚀`,
      `Fix your routine in 10 seconds ⏱️`,
      `The cheat code for ${cleanShort} ⚡`,
      `Do this for instant results 🎯`,
    ],
  };

  const pool = hookOptionsByAngle[hookAngle] || hookOptionsByAngle.curiosity;
  let hook = pool[Math.floor(Math.random() * pool.length)];

  // Double check word count strictly < 7 words and contains 1 emoji
  if (countWords(hook) >= 7) {
    hook = `Stop doing this completely wrong 🛑`;
  }

  // Generate 1-2 punchy sentences Value / CTA (No banned words, human creator voice)
  let valueCta = "";
  if (tone === "bold") {
    valueCta = `Most people figure this out way too late. Try this tonight and prove me wrong.`;
  } else if (tone === "funny") {
    valueCta = `I spent 4 hours testing this so you don't look ridiculous. Save this before you forget.`;
  } else if (tone === "educational") {
    valueCta = `Small adjustments make the biggest difference. Save this breakdown for your next session.`;
  } else if (tone === "storytime") {
    valueCta = `I never expected this to work until day seven. Read that again.`;
  } else if (tone === "inspirational") {
    valueCta = `Consistency beats motivation every single day. Save this to stay focused.`;
  } else {
    // Engaging
    if (platform === "Instagram Reels") {
      valueCta = `Save this for your next session. Share this with someone who needs the reminder.`;
    } else if (platform === "YouTube Shorts") {
      valueCta = `Hit subscribe for daily hacks that actually work. Try this tonight.`;
    } else {
      valueCta = `Try this tonight and watch what happens. Save this for your next session.`;
    }
  }

  // Generate 3-5 niche tags tailored to platform and topic
  const topicTag = `#${cleanShort.replace(/\s+/g, "").slice(0, 16).toLowerCase()}`;
  const baseTags: Record<string, string[]> = {
    TikTok: [topicTag, "#fyp", "#contentcreator", "#viralvideo", "#lifehacks"],
    "Instagram Reels": [topicTag, "#reelsviral", "#creatortips", "#growthmindset", "#productivity"],
    "YouTube Shorts": [topicTag, "#shorts", "#youtubeshorts", "#viralshorts", "#creatoreconomy"],
  };

  const selectedPlatformTags = baseTags[platform] || baseTags.TikTok;
  // Deduplicate and ensure 3 to 5 tags
  const tags = Array.from(new Set(selectedPlatformTags)).slice(0, 4);

  // Strictly formatted caption:
  // Line 1: Hook
  // Line 2: Empty
  // Lines 3-4: Value/CTA
  // Line 5: Empty
  // Line 6: Tags
  const fullCaption = `${hook}\n\n${valueCta}\n\n${tags.join(" ")}`;

  // Alternative hooks under 7 words with 1 emoji
  const alternativeHooks = [
    `The #1 rule for ${cleanShort.split(/\s+/)[0] || "this"} 🔑`,
    `Stop scrolling and fix ${cleanShort.split(/\s+/)[0] || "this"} 🛑`,
    `Nobody told you about ${cleanShort.split(/\s+/)[0] || "this"} 🤫`,
  ].filter((h) => h !== hook).slice(0, 3);

  const tips: Record<string, string> = {
    TikTok: "Hooks with under 7 words prevent 64% of first-second swipe-aways on the FYP.",
    "Instagram Reels": "Saves trigger the Reels recommendation engine 5x stronger than likes.",
    "YouTube Shorts": "Looping your ending back into the opening hook spikes average watch percentage above 100%.",
  };

  return {
    fullCaption,
    hook,
    valueCta,
    tags,
    alternativeHooks,
    creatorTip: tips[platform] || tips.TikTok,
    source: "vibe-script-engine",
  };
}

// POST /api/generate
app.post("/api/generate", async (req: Request, res: Response) => {
  try {
    const { topic, platform = "TikTok", tone = "engaging", hookAngle = "curiosity", forceDemo = false } = req.body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({ error: "Please enter a video topic or transcript." });
    }

    const cleanTopic = topic.trim();

    // If demo requested or no API key, use algorithmic engine immediately
    if (forceDemo || !process.env.GEMINI_API_KEY) {
      const result = generateAlgorithmicCaption(cleanTopic, platform, tone, hookAngle);
      return res.json({
        ...result,
        platform,
        tone,
      });
    }

    // Attempt Gemini with a 3.5s timeout race so the user is NEVER blocked
    const ai = aiClient || new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const systemPrompt = `You are Vibe Script, an elite social media copywriter and growth strategist specializing in viral short-form video content for TikTok, Instagram Reels, and YouTube Shorts. 

Analyze the user's raw video topic or rough transcript and generate ONE highly engaging, publish-ready caption tailored for: ${platform}.

Strictly enforce this blueprint:
1. THE HOOK (Line 1): Aggressive, curiosity-inducing hook line. Under 7 words and include exactly 1 relevant emoji. Never say "Are you ready?".
2. LINE BREAK (Line 2): Empty line break.
3. THE VALUE/CTA (Lines 3-4): 1-2 short, punchy sentences delivering quick insight or driving high engagement.
4. LINE BREAK (Line 5): Empty line break.
5. THE TAGS (Line 6): 3 to 5 highly relevant niche hashtags separated cleanly by spaces.

STRICT CONSTRAINTS:
- Real human creator tone: casual, confident, concise, and direct.
- Tone style: ${tone}.
- Hook angle: ${hookAngle}.
- FORBIDDEN BUZZWORDS: delve, testament, revolutionize, moreover, tapestry, foster, elevate, unlock, supercharge, nestled, beacon, game-changer, dive deep.

Output JSON format ONLY:
{
  "hook": "Under 7 words with 1 emoji",
  "valueCta": "1-2 punchy sentences",
  "tags": ["#tag1", "#tag2", "#tag3", "#tag4"],
  "alternativeHooks": ["Alt 1 under 7 words 🎯", "Alt 2 under 7 words ⚡", "Alt 3 under 7 words 🔑"],
  "creatorTip": "1 algorithm tip for this platform"
}`;

    const geminiPromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Video Topic: ${cleanTopic}\nPlatform: ${platform}\nTone: ${tone}`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
        responseMimeType: "application/json",
      },
    });

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 3500)
    );

    const response = await Promise.race([geminiPromise, timeoutPromise]);

    if (!response || !response.text) {
      // Timeout or empty -> instant seamless fallback
      const fallback = generateAlgorithmicCaption(cleanTopic, platform, tone, hookAngle);
      return res.json({
        ...fallback,
        platform,
        tone,
      });
    }

    let parsed: any;
    try {
      parsed = JSON.parse(response.text);
    } catch {
      const fallback = generateAlgorithmicCaption(cleanTopic, platform, tone, hookAngle);
      return res.json({
        ...fallback,
        platform,
        tone,
      });
    }

    const hook = parsed.hook || `Stop doing ${cleanTopic.slice(0, 15)} wrong 🛑`;
    const valueCta = parsed.valueCta || "Save this for your next session.";
    const tags = Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : ["#fyp", "#viral", "#creator"];
    const alternativeHooks = Array.isArray(parsed.alternativeHooks)
      ? parsed.alternativeHooks.slice(0, 3)
      : [];
    const creatorTip = parsed.creatorTip || "Short hooks under 7 words boost initial retention.";

    const fullCaption = `${hook}\n\n${valueCta}\n\n${tags.join(" ")}`;

    return res.json({
      fullCaption,
      hook,
      valueCta,
      tags,
      alternativeHooks,
      creatorTip,
      platform,
      tone,
      source: "gemini-3.8-flash",
    });
  } catch (err: any) {
    const topic = req.body?.topic || "creating content";
    const platform = req.body?.platform || "TikTok";
    const tone = req.body?.tone || "engaging";
    const fallback = generateAlgorithmicCaption(topic, platform, tone);
    return res.json({
      ...fallback,
      platform,
      tone,
    });
  }
});

// GET /api/status - check status
app.get("/api/status", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: "gemini-3.8-flash",
    brand: "Vibe Script",
  });
});

// Dev & Production serving
const isProd = process.env.NODE_ENV === "production";

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vibe Script server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
