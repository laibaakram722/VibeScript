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

// Regex to detect Roman Urdu words
const ROMAN_URDU_REGEX = /\b(karein|karo|karna|karte|karti|hai|hain|nahi|nhi|kyun|kyu|yeh|ye|woh|wo|kaise|kese|kahan|kab|kisko|apko|aapko|apka|aapka|ap|aap|meri|mera|mere|teri|tera|tere|bhi|shuru|ghalti|galti|seekho|sikho|dekho|wala|wali|wale|sabse|ziyada|zyada|bohat|boht|kamal|foran|fauran|bataye|batayein|batana|paise|paisa|bhai|dost|yara|yar|chhoro|choro|theek|thik|mat|hota|hoti|hote|raha|rahi|rahe|rakho|lagta|lagti|suno|samjho|samjhein|zaroor|zarur|batao|kisi|kuch|kuchbhi|aik|ek|doosre|dusre|laiba)\b/i;

function detectRomanUrdu(text: string): boolean {
  const matches = text.match(new RegExp(ROMAN_URDU_REGEX, "gi"));
  return Boolean(matches && matches.length >= 1);
}

// Clean and extract a punchy subject from user topic
function extractSubject(topic: string, isUrdu = false): { main: string; short: string } {
  let cleaned = topic
    .trim()
    .replace(/^(how to|how i|how we|how|why you|why we|why i|why|the reason|what happens when|i tested|i tried|i quit|i stopped|a video about|video topic:)\s+/i, "")
    .replace(/^(aaj main|aaj hum|yeh video|video me|main apko|hum apko|is video me|yeh jaan lo ke)\s+/i, "")
    .trim();

  // If starts with common pronoun or article, strip it
  cleaned = cleaned.replace(/^(the|a|an|my|your|our|this|yeh|ye|woh|is|aik|ek)\s+/i, "").trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  const short = words.slice(0, 3).join(" ") || (isUrdu ? "yeh trick" : "this habit");
  const main = words.slice(0, 5).join(" ") || (isUrdu ? "yeh tarika" : "this routine");
  return { main, short };
}

// High-converting algorithmic viral caption generator (English & Roman Urdu)
function generateAlgorithmicCaption(
  topic: string,
  platform: string,
  tone: string,
  hookAngle = "curiosity",
  language = "auto"
) {
  const isUrdu = language === "roman-urdu" || (language === "auto" && detectRomanUrdu(topic));
  const { short } = extractSubject(topic, isUrdu);
  const cleanShort = short.replace(/[^\w\s]/g, "");

  let hook = "";
  let valueCta = "";
  let tags: string[] = [];
  let alternativeHooks: string[] = [];

  if (isUrdu) {
    // Punchy Roman Urdu Hooks strictly < 7 words with 1 emoji
    const urduHooksByAngle: Record<string, string[]> = {
      curiosity: [
        `Yeh secret koi nahi batata 🤫`,
        `Yeh hidden trick jaan lo 🔑`,
        `Yeh video aakhri baar dekho 👁️`,
        `Kisine apko yeh nahi bataya 🤫`,
      ],
      contrarian: [
        `99% log yeh ghalti karte 💀`,
        `Fuzool time zaya karna chhoro 🛑`,
        `Yeh tarika bilkul ghalat hai ❌`,
        `Sab log yeh ghalat kar-rahe ⚠️`,
      ],
      shocking: [
        `Mene 30 din yeh azmaya 🤯`,
        `Yeh trick sab badal degi ⚡`,
        `Yeh secret bilkul illegal lagta 🚨`,
        `Aisa result kabhi nahi dekha 🤯`,
      ],
      mistake: [
        `Yeh ghalti foran band karo 🛑`,
        `Yeh sabse bari ghalti hai 💀`,
        `Is ghalti se bach kar raho ⚠️`,
        `Abhi yeh aadat badal lo ⏱️`,
      ],
      "how-to": [
        `Yeh setting abhi on karo ⚡`,
        `10 second me masala hal 🚀`,
        `Video viral karne ka code 🎯`,
        `Asaan tareen formula seekh lo 🔑`,
      ],
    };

    const urduPool = urduHooksByAngle[hookAngle] || urduHooksByAngle.curiosity;
    hook = urduPool[Math.floor(Math.random() * urduPool.length)];

    // Ensure under 7 words strictly
    if (countWords(hook) >= 7) {
      hook = `Yeh ghalti foran band karo 🛑`;
    }

    // Roman Urdu Value / CTA (1-2 punchy sentences)
    if (tone === "bold") {
      valueCta = `Bohat kam log yeh secret samajhte hain. Aaj raat hi azmao aur khud fark dekho.`;
    } else if (tone === "funny") {
      valueCta = `Mene 4 ghante lagaye taake apka mazaq na bane. Foran save karlo baad me kaam ayega.`;
    } else if (tone === "educational") {
      valueCta = `Choti si tabdeeli se sabse bara fark parta hai. Agli video se pehle yeh save karlo.`;
    } else if (tone === "storytime") {
      valueCta = `Mujhe khud yaqeen nahi aya jab tak result samne nahi aya. Dobara dhiyan se parho.`;
    } else if (tone === "inspirational") {
      valueCta = `Himmat mat haro, mehnat ka phal zaroor milega. Apne dost ke sath share karo.`;
    } else {
      // Engaging
      if (platform === "Instagram Reels") {
        valueCta = `Agli video se pehle yeh save karlo. Apne dost ke sath share karna mat bhoolna.`;
      } else if (platform === "YouTube Shorts") {
        valueCta = `Aise zabardast hacks ke liye subscribe karo. Aaj hi try karke dekho.`;
      } else {
        valueCta = `Aaj raat hi try karo aur fark dekho. Foran save karlo baad me nahi milega.`;
      }
    }

    // Roman Urdu Niche Tags (3-5 tags)
    const urduTopicTag = `#${cleanShort.replace(/\s+/g, "").slice(0, 14).toLowerCase() || "urdutips"}`;
    const baseUrduTags: Record<string, string[]> = {
      TikTok: [urduTopicTag, "#tiktokpakistan", "#urdutips", "#fyp", "#desicreator"],
      "Instagram Reels": [urduTopicTag, "#urduquotes", "#reelsviral", "#pakistanireels", "#growthtips"],
      "YouTube Shorts": [urduTopicTag, "#shorts", "#youtubepakistan", "#viralshorts", "#desitips"],
    };
    tags = Array.from(new Set(baseUrduTags[platform] || baseUrduTags.TikTok)).slice(0, 4);

    alternativeHooks = [
      `Yeh trick kisi ko mat batana 🤫`,
      `Subah uth kar yeh mat karo 🛑`,
      `Yeh setting abhi on karo ⚡`,
    ].filter((h) => h !== hook).slice(0, 3);
  } else {
    // English Hooks strictly < 7 words with 1 emoji
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
    hook = pool[Math.floor(Math.random() * pool.length)];

    if (countWords(hook) >= 7) {
      hook = `Stop doing this completely wrong 🛑`;
    }

    // English Value / CTA
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

    const topicTag = `#${cleanShort.replace(/\s+/g, "").slice(0, 16).toLowerCase()}`;
    const baseTags: Record<string, string[]> = {
      TikTok: [topicTag, "#fyp", "#contentcreator", "#viralvideo", "#lifehacks"],
      "Instagram Reels": [topicTag, "#reelsviral", "#creatortips", "#growthmindset", "#productivity"],
      "YouTube Shorts": [topicTag, "#shorts", "#youtubeshorts", "#viralshorts", "#creatoreconomy"],
    };
    tags = Array.from(new Set(baseTags[platform] || baseTags.TikTok)).slice(0, 4);

    alternativeHooks = [
      `The #1 rule for this 🔑`,
      `Stop scrolling and fix this 🛑`,
      `Nobody told you about this 🤫`,
    ].filter((h) => h !== hook).slice(0, 3);
  }

  const fullCaption = `${hook}\n\n${valueCta}\n\n${tags.join(" ")}`;

  const tips: Record<string, string> = {
    TikTok: isUrdu
      ? "Roman Urdu me aggressive hook swipe-away rate ko 68% tak kam kar deta hai."
      : "Hooks with under 7 words prevent 64% of first-second swipe-aways on the FYP.",
    "Instagram Reels": isUrdu
      ? "Save aur share CTA Roman Urdu me audience ko foran action lene par majboor karta hai."
      : "Saves trigger the Reels recommendation engine 5x stronger than likes.",
    "YouTube Shorts": isUrdu
      ? "Aakhri sentence ko shuru ke hook ke sath loop karna retention barha deta hai."
      : "Looping your ending back into the opening hook spikes average watch percentage above 100%.",
  };

  return {
    fullCaption,
    hook,
    valueCta,
    tags,
    alternativeHooks,
    creatorTip: tips[platform] || tips.TikTok,
    source: isUrdu ? "vibe-script-urdu-engine" : "vibe-script-engine",
    detectedLanguage: isUrdu ? "Roman Urdu" : "English",
  };
}

// POST /api/generate
app.post("/api/generate", async (req: Request, res: Response) => {
  try {
    const {
      topic,
      platform = "TikTok",
      tone = "engaging",
      hookAngle = "curiosity",
      language = "auto",
      forceDemo = false,
    } = req.body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({ error: "Please enter a video topic or transcript." });
    }

    const cleanTopic = topic.trim();
    const isUrdu = language === "roman-urdu" || (language === "auto" && detectRomanUrdu(cleanTopic));

    // If demo requested or no API key, use algorithmic engine immediately
    if (forceDemo || !process.env.GEMINI_API_KEY) {
      const result = generateAlgorithmicCaption(cleanTopic, platform, tone, hookAngle, language);
      return res.json({
        ...result,
        platform,
        tone,
        language: isUrdu ? "roman-urdu" : "english",
      });
    }

    // Call Gemini 3.8 Flash
    const ai = aiClient || new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });

    const languageInstruction = isUrdu
      ? `CRITICAL LANGUAGE REQUIREMENT: The user's video topic is in ROMAN URDU (Urdu written in the Latin/English alphabet). You MUST analyze the Roman Urdu topic and generate the HOOK, VALUE/CTA, and TAGS in fluent, native, aggressive, conversational ROMAN URDU (e.g., 'Yeh ghalti foran band karo 🛑', 'Agli video se pehle yeh save karlo. Aaj raat hi azmao aur fark dekho.'). Do NOT translate into formal English unless explicitly instructed.`
      : `Generate the caption in crisp, fluent, punchy English (or match the user's primary language).`;

    const systemPrompt = `You are Vibe Script, an elite social media copywriter and growth strategist specializing in viral short-form video content for TikTok, Instagram Reels, and YouTube Shorts. 

Analyze the user's raw video topic or rough transcript and generate ONE highly engaging, publish-ready caption tailored for: ${platform}.

${languageInstruction}

Strictly enforce this 5-point blueprint:
1. THE HOOK (Line 1): Aggressive, curiosity-inducing hook line. Strictly under 7 words and include exactly 1 relevant emoji. Never say generic intros like "Are you ready?" or "Kya aap tayar hain?".
2. LINE BREAK (Line 2): Empty line break.
3. THE VALUE/CTA (Lines 3-4): 1-2 short, punchy sentences delivering quick insight or driving high engagement (e.g. saves, shares, comments).
4. LINE BREAK (Line 5): Empty line break.
5. THE TAGS (Line 6): 3 to 5 highly relevant niche hashtags separated cleanly by spaces.

STRICT CONSTRAINTS:
- Real human creator tone: casual, confident, concise, and direct.
- Tone style: ${tone}.
- Hook angle: ${hookAngle}.
- FORBIDDEN BUZZWORDS: delve, testament, revolutionize, moreover, tapestry, foster, elevate, unlock, supercharge, nestled, beacon, game-changer, dive deep.

Output JSON format ONLY:
{
  "hook": "${isUrdu ? 'Punchy Roman Urdu hook under 7 words with 1 emoji' : 'Under 7 words with 1 emoji'}",
  "valueCta": "${isUrdu ? '1-2 punchy sentences in Roman Urdu' : '1-2 punchy sentences'}",
  "tags": ["#tag1", "#tag2", "#tag3", "#tag4"],
  "alternativeHooks": [
    "${isUrdu ? 'Roman Urdu Alt 1 under 7 words 🎯' : 'Alt 1 under 7 words 🎯'}",
    "${isUrdu ? 'Roman Urdu Alt 2 under 7 words ⚡' : 'Alt 2 under 7 words ⚡'}",
    "${isUrdu ? 'Roman Urdu Alt 3 under 7 words 🔑' : 'Alt 3 under 7 words 🔑'}"
  ],
  "creatorTip": "1 snappy algorithm tip for this platform"
}`;

    const geminiPromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Video Topic: ${cleanTopic}\nPlatform: ${platform}\nTone: ${tone}\nLanguage Preference: ${isUrdu ? "Roman Urdu" : "English"}`,
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
      const fallback = generateAlgorithmicCaption(cleanTopic, platform, tone, hookAngle, language);
      return res.json({
        ...fallback,
        platform,
        tone,
        language: isUrdu ? "roman-urdu" : "english",
      });
    }

    let parsed: any;
    try {
      parsed = JSON.parse(response.text);
    } catch {
      const fallback = generateAlgorithmicCaption(cleanTopic, platform, tone, hookAngle, language);
      return res.json({
        ...fallback,
        platform,
        tone,
        language: isUrdu ? "roman-urdu" : "english",
      });
    }

    const hook = parsed.hook || (isUrdu ? "Yeh ghalti foran band karo 🛑" : "Stop doing this completely wrong 🛑");
    const valueCta = parsed.valueCta || (isUrdu ? "Agli video se pehle yeh save karlo. Aaj raat hi azmao." : "Save this for your next session.");
    const tags = Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : ["#fyp", "#viral", "#creator"];
    const alternativeHooks = Array.isArray(parsed.alternativeHooks)
      ? parsed.alternativeHooks.slice(0, 3)
      : [];
    const creatorTip = parsed.creatorTip || (isUrdu ? "Roman Urdu me short hook 3-second retention ko double kar deta hai." : "Short hooks under 7 words boost initial retention.");

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
      language: isUrdu ? "roman-urdu" : "english",
      source: "gemini-3.8-flash",
    });
  } catch (err: any) {
    const topic = req.body?.topic || "creating content";
    const platform = req.body?.platform || "TikTok";
    const tone = req.body?.tone || "engaging";
    const language = req.body?.language || "auto";
    const fallback = generateAlgorithmicCaption(topic, platform, tone, "curiosity", language);
    return res.json({
      ...fallback,
      platform,
      tone,
      language: fallback.detectedLanguage === "Roman Urdu" ? "roman-urdu" : "english",
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
    languagesSupported: ["English", "Roman Urdu"],
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
