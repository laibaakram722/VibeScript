# Vibe Script

> **Elite Short-Form Video Caption Architecture & Growth Studio** for TikTok, Instagram Reels, and YouTube Shorts.

Vibe Script transforms raw video topics or rough transcripts into high-retention, publish-ready captions strictly engineered around viral algorithmic principles and human creator psychology.

Designed in a high-contrast, editorial **monochrome black & white** aesthetic.

---

## Key Features

- **Strict 5-Point Blueprint Engine:**
  - **Line 1 (The Hook):** Aggressive, curiosity-inducing hook line strictly under 7 words containing exactly 1 relevant emoji. Zero generic intros like *"Are you ready?"*.
  - **Line 2:** Empty line break.
  - **Lines 3–4 (The Value / CTA):** 1–2 short, punchy sentences driving saves, loops, and comments.
  - **Line 5:** Empty line break.
  - **Line 6 (The Tags):** 3 to 5 niche hashtags calibrated for platform discovery.

- **Anti-AI Buzzword Auditor:**
  - Zero-tolerance filter actively scanning and forbidding generic corporate AI marketing jargon (*delve*, *testament*, *revolutionize*, *moreover*, *tapestry*, *foster*, *elevate*, *unlock*, *supercharge*, *nestled*, *beacon*, *game-changer*).
  - Enforces casual, confident, concise, and direct creator voice.

- **Platform Presets:**
  - **TikTok:** Calibrated for FYP completion velocity, pattern interrupts, and audio loops.
  - **Instagram Reels:** Calibrated for save bookmarks and DM share multipliers.
  - **YouTube Shorts:** Calibrated for >80% stayed vs. swiped-away ratios and loopable conclusions.

- **Tone & Curiosity Angle Presets:**
  - **Tones:** Engaging, Funny, Inspirational, Educational, Storytime, and Bold.
  - **Curiosity Angles:** Intense Curiosity, Contrarian / Unpopular, Shock Value, Critical Mistake, and Cheat Code / Fast Fix.

- **Interactive Phone Mockup:**
  - Real-time visual simulation with realistic hardware frame and platform skins for TikTok, Instagram Reels, and YouTube Shorts.
  - Expandable caption overlay (`...more`), interactive action counters, audio disc, and monochrome studio backdrop themes.

- **Creator Productivity Tools:**
  - **1-Click Copy:** Copy Entire Caption, Copy Hook Only, or Copy Tags Only.
  - **A/B Hook Swapper:** Instant 1-click swapping with 3 alternative hooks under 7 words.
  - **Live Caption Editor:** Real-time editing with live Blueprint Compliance scoring (0–100%).
  - **Export:** Download captions as `.txt` files.
  - **Script Vault:** Browser-persistent local storage of generated scripts.
  - **Growth Benchmarks:** Retention goals, optimal durations, and prime posting windows.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
- **Backend:** Express, Node.js (`tsx`)
- **AI Engine:** Google GenAI SDK (`@google/genai`), Gemini 3.8 Flash (`gemini-3.8-flash`) with resilient algorithmic offline engine fallback
- **Build System:** Vite

---

## Architectural Blueprint Specification

Every caption output strictly adheres to the following structural schema:

```text
[Hook under 7 words with exactly 1 emoji]

[1-2 punchy sentences with value insight or engagement call to action]

#tag1 #tag2 #tag3 #tag4
```

### Constraints Checklist:
1. Hook word count: `< 7` words (excluding emojis and punctuation).
2. Hook emoji count: `1` emoji only.
3. Clean empty line breaks between sections.
4. Hashtag count: `3 to 5` relevant tags.
5. Tone check: `0` corporate AI marketing words.

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later)
- npm, yarn, or pnpm

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR-USERNAME/vibe-script.git
cd vibe-script
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Add your Gemini API Key in `.env`:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

> **Note:** The app features a built-in algorithmic engine and instant demo mode that functions even without an API key configured.

### 4. Running the Development Server
Start the full-stack dev server (port 3000):

```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

### 5. Building for Production
Create an optimized production build:

```bash
npm run build
npm start
```

---

## License

This project is licensed under the [MIT License](LICENSE).
