import React, { useState } from 'react';
import { Platform, Tone, HookAngle, Language } from '../types';
import {
  Upload,
  ChevronDown,
  Sparkles,
  Layers,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';

interface HeroCenterpieceProps {
  topic: string;
  setTopic: (t: string) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
  tone: Tone;
  setTone: (t: Tone) => void;
  hookAngle: HookAngle;
  setHookAngle: (h: HookAngle) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  isGenerating: boolean;
  onGenerate: (overrideTopic?: string) => void;
  onOpenPhone: () => void;
  onOpenSpecs: () => void;
}

export const HeroCenterpiece: React.FC<HeroCenterpieceProps> = ({
  topic,
  setTopic,
  platform,
  setPlatform,
  tone,
  setTone,
  hookAngle,
  setHookAngle,
  language,
  setLanguage,
  isGenerating,
  onGenerate,
  onOpenPhone,
  onOpenSpecs,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="relative pt-12 pb-16 px-4 flex flex-col items-center justify-center overflow-hidden text-center select-none">
      {/* Spectacular Glowing Horizon Arc (Matching Screenshot) */}
      <div className="absolute top-[180px] sm:top-[200px] left-1/2 -translate-x-1/2 w-[1000px] sm:w-[1400px] h-[800px] pointer-events-none select-none z-0">
        {/* Soft diffused glow */}
        <div className="absolute inset-0 rounded-[100%] border-t-[3px] border-white/40 blur-[16px] opacity-70" />
        {/* Sharp incandescent crest line */}
        <div className="absolute inset-0 rounded-[100%] border-t-[1.5px] border-white/90" />
        {/* Ambient atmospheric aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-white/10 to-transparent blur-3xl opacity-50 rounded-full" />
      </div>

      {/* Hero Headline */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
          Craft viral hooks that <span className="font-serif italic font-light text-white">stop the scroll</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-xl mx-auto">
          Turn your video ideas into viral short-form captions with precision.
        </p>
      </div>

      {/* Floating Prompt Island (Matching Screenshot Command Box) */}
      <div className="relative z-10 w-full max-w-2xl mt-8">
        <div className="bg-[#0e0e11]/90 border border-neutral-800/90 rounded-2xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/5 transition-all focus-within:border-neutral-700 focus-within:ring-white/10 text-left">
          {/* Text input area */}
          <textarea
            rows={2}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your video topic, rough script, or paste ideas (English or Roman Urdu)..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none resize-none leading-relaxed font-normal"
          />

          {/* Bottom Toolbar inside the box */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-neutral-800/60 mt-2">
            {/* Left Tools / Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Upload / Template Button */}
              <button
                type="button"
                onClick={() => setTopic('Gym me bicep grow na hone ki sabse bari ghalti jo 90% log karte hain')}
                title="Paste Roman Urdu Sample"
                className="p-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-400 hover:text-white transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>

              {/* Platform Selector Pill */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-800/80 bg-neutral-900/40 text-[11px] text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  aria-label="Target Platform"
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="TikTok" className="bg-neutral-950 text-white">TikTok</option>
                  <option value="Instagram Reels" className="bg-neutral-950 text-white">Instagram Reels</option>
                  <option value="YouTube Shorts" className="bg-neutral-950 text-white">YouTube Shorts</option>
                </select>
              </div>

              {/* Language Selector Pill */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-800/80 bg-neutral-900/40 text-[11px] text-neutral-300">
                <Globe className="w-3 h-3 text-neutral-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  aria-label="Language"
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="auto" className="bg-neutral-950 text-white">Auto-Detect</option>
                  <option value="roman-urdu" className="bg-neutral-950 text-white">Roman Urdu</option>
                  <option value="english" className="bg-neutral-950 text-white">English</option>
                </select>
              </div>

              {/* Tone / Angle Dropdown */}
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-800/80 bg-neutral-900/40 text-[11px] text-neutral-300">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  aria-label="Tone"
                  className="bg-transparent text-neutral-300 focus:outline-none cursor-pointer capitalize pr-1"
                >
                  <option value="engaging" className="bg-neutral-950 text-white">Tone: Engaging</option>
                  <option value="bold" className="bg-neutral-950 text-white">Tone: Bold</option>
                  <option value="funny" className="bg-neutral-950 text-white">Tone: Funny</option>
                  <option value="educational" className="bg-neutral-950 text-white">Tone: Educational</option>
                  <option value="storytime" className="bg-neutral-950 text-white">Tone: Storytime</option>
                  <option value="inspirational" className="bg-neutral-950 text-white">Tone: Inspirational</option>
                </select>
              </div>
            </div>

            {/* Right Action: Build site / Build script button */}
            <button
              type="button"
              disabled={isGenerating || !topic.trim()}
              onClick={() => onGenerate()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-white hover:text-black border border-neutral-700/80 text-xs font-semibold text-white shadow-lg shadow-black/50 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Building...</span>
                </>
              ) : (
                <>
                  <span>Build caption</span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-black">✦</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Capsule Buttons Below (Matching Screenshot) */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 mt-5">
        <button
          type="button"
          onClick={() => {
            setLanguage('roman-urdu');
            setTopic('Gym me bicep grow na hone ki sabse bari ghalti');
            onGenerate('Gym me bicep grow na hone ki sabse bari ghalti');
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/70 hover:bg-neutral-900 text-xs text-neutral-300 hover:text-white transition cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-neutral-400" />
          <span>Roman Urdu Preset</span>
        </button>

        <button
          type="button"
          onClick={onOpenSpecs}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/70 hover:bg-neutral-900 text-xs text-neutral-300 hover:text-white transition cursor-pointer"
        >
          <ShieldCheck className="w-3 h-3 text-neutral-400" />
          <span>Blueprint System</span>
        </button>

        <button
          type="button"
          onClick={onOpenPhone}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/70 hover:bg-neutral-900 text-xs text-neutral-300 hover:text-white transition cursor-pointer"
        >
          <Smartphone className="w-3 h-3 text-neutral-400" />
          <span>Live Phone Preview</span>
        </button>
      </div>
    </div>
  );
};
