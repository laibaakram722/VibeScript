import React from 'react';
import { Platform, Tone, HookAngle } from '../types';
import { Lightbulb, RefreshCw, Zap, Video, Check } from 'lucide-react';

interface GeneratorFormProps {
  topic: string;
  setTopic: (t: string) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
  tone: Tone;
  setTone: (t: Tone) => void;
  hookAngle: HookAngle;
  setHookAngle: (h: HookAngle) => void;
  isGenerating: boolean;
  onGenerate: (overrideTopic?: string) => void;
  onTryDemo: () => void;
}

const SAMPLE_TOPICS = [
  { label: 'Camera Settings', text: 'iPhone camera settings that secretly ruin your video sharpness and how to fix them' },
  { label: '5AM Routine', text: 'The simple morning routine that cured my daily brain fog in 14 days' },
  { label: 'Gym Plateau', text: 'Why 99% of gym lifters never build shoulder caps and the 1 exercise fix' },
  { label: 'Retail Psychology', text: 'Psychological trick supermarkets use with music and cart size to make you spend 30% more' },
  { label: 'Procrastination', text: 'Why you freeze and scroll when you have urgent tasks, and the 5-minute rule' },
];

const PLATFORMS: { id: Platform; label: string; badge: string }[] = [
  { id: 'TikTok', label: 'TikTok', badge: 'FYP & Loops' },
  { id: 'Instagram Reels', label: 'Instagram Reels', badge: 'Saves & Shares' },
  { id: 'YouTube Shorts', label: 'YouTube Shorts', badge: 'CTR & Retention' },
];

const TONES: { id: Tone; label: string; desc: string }[] = [
  { id: 'engaging', label: 'Engaging', desc: 'High conversation' },
  { id: 'funny', label: 'Funny', desc: 'Relatable creator humor' },
  { id: 'inspirational', label: 'Inspirational', desc: 'High-agency & grit' },
  { id: 'educational', label: 'Educational', desc: 'Zero fluff, pure value' },
  { id: 'storytime', label: 'Storytime', desc: 'Suspense & loops' },
  { id: 'bold', label: 'Bold', desc: 'Contrarian & direct' },
];

const HOOK_ANGLES: { id: HookAngle; label: string }[] = [
  { id: 'curiosity', label: 'Intense Curiosity' },
  { id: 'contrarian', label: 'Contrarian / Unpopular' },
  { id: 'shocking', label: 'Shock Value' },
  { id: 'mistake', label: 'Critical Mistake' },
  { id: 'how-to', label: 'Cheat Code / Fast Fix' },
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  topic,
  setTopic,
  platform,
  setPlatform,
  tone,
  setTone,
  hookAngle,
  setHookAngle,
  isGenerating,
  onGenerate,
  onTryDemo,
}) => {
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight uppercase flex items-center gap-2">
            <span>Video Input & Strategy</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Raw idea, hook angle, or rough voice transcript
          </p>
        </div>

        <button
          type="button"
          onClick={onTryDemo}
          className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition flex items-center gap-1.5 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Load Instant Sample</span>
        </button>
      </div>

      {/* Platform Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-300">
          <span className="font-bold uppercase tracking-wider">Target Platform</span>
          <span className="text-neutral-500 font-mono text-[11px]">Format & Pacing</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PLATFORMS.map((p) => {
            const isSelected = platform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`relative flex flex-col items-start p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-white bg-white text-black shadow-lg shadow-white/5'
                    : 'border-neutral-800 bg-black text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold">
                    {p.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
                <span className={`text-[11px] mt-1 font-medium ${isSelected ? 'text-neutral-700' : 'text-neutral-500'}`}>
                  {p.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-neutral-400" />
            <span>Raw Video Topic or Rough Transcript</span>
          </label>
          <span className="text-[11px] text-neutral-500 font-mono">
            {topic.length} chars
          </span>
        </div>

        <textarea
          rows={3}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. I tested eating 3 eggs every morning for 30 days and my energy levels doubled, but my doctor was surprised by my lab results..."
          className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition resize-none"
        />

        {/* Quick Inspiration Chips */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400">
            <Lightbulb className="w-3 h-3 text-neutral-400" />
            <span>Quick Starters:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_TOPICS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTopic(sample.text);
                  onGenerate(sample.text);
                }}
                className="px-2.5 py-1 text-xs rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tone & Hook Angle Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Tone Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Tone Preset
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => {
              const isSelected = tone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    isSelected
                      ? 'border-white bg-white text-black'
                      : 'border-neutral-800 bg-black text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <span className="truncate">{t.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hook Strategy Angle */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Hook Curiosity Angle
          </label>
          <div className="flex flex-col gap-1.5">
            {HOOK_ANGLES.map((h) => {
              const isSelected = hookAngle === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setHookAngle(h.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium text-left transition cursor-pointer ${
                    isSelected
                      ? 'border-white bg-neutral-900 text-white font-semibold'
                      : 'border-neutral-800 bg-black text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <span>{h.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={isGenerating || !topic.trim()}
          onClick={() => onGenerate()}
          className="w-full py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wide text-black bg-white hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-black" />
              <span>Analyzing Topic & Crafting Blueprint...</span>
            </>
          ) : (
            <span>Generate 1-Click Viral Caption</span>
          )}
        </button>
      </div>
    </div>
  );
};
