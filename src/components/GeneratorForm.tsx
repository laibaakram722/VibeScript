import React from 'react';
import { Platform, Tone, HookAngle, Language } from '../types';
import { Lightbulb, RefreshCw, Zap, Video, Check, Globe } from 'lucide-react';

interface GeneratorFormProps {
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
  onTryDemo: () => void;
}

const SAMPLE_TOPICS_ENGLISH = [
  { label: 'Camera Settings', text: 'iPhone camera settings that secretly ruin your video sharpness and how to fix them' },
  { label: '5AM Routine', text: 'The simple morning routine that cured my daily brain fog in 14 days' },
  { label: 'Gym Plateau', text: 'Why 99% of gym lifters never build shoulder caps and the 1 exercise fix' },
  { label: 'Retail Psychology', text: 'Psychological trick supermarkets use with music and cart size to make you spend 30% more' },
];

const SAMPLE_TOPICS_URDU = [
  { label: 'Gym Ghalti', text: 'Gym me bicep grow na hone ki sabse bari ghalti jo 90% log karte hain' },
  { label: 'Subah Phone', text: 'Subah uth kar foran phone scroll karna band karo aur yeh 5 minute rule try karo' },
  { label: 'Freelancing', text: 'Freelancing shuru karne se pehle yeh 2 cheezein seekh lo warna clients nahi milenge' },
  { label: 'iPhone Camera', text: 'iPhone camera ki secret setting jo video ko HD 4K crystal clear banati hai' },
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

const LANGUAGES: { id: Language; label: string; tag: string }[] = [
  { id: 'auto', label: 'Auto-Detect', tag: 'Smart' },
  { id: 'roman-urdu', label: 'Roman Urdu', tag: 'Desi/Urdu' },
  { id: 'english', label: 'English', tag: 'Global' },
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
  language,
  setLanguage,
  isGenerating,
  onGenerate,
  onTryDemo,
}) => {
  const currentSamples = language === 'roman-urdu' ? SAMPLE_TOPICS_URDU : SAMPLE_TOPICS_ENGLISH;

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight uppercase flex items-center gap-2">
            <span>Video Input & Strategy</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Supports both English & Roman Urdu with aggressive under-7-word hooks
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

      {/* Language Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-300">
          <label className="font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>Language & Script</span>
          </label>
          <span className="text-neutral-500 font-mono text-[11px]">
            Roman Urdu or English
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLanguage(lang.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'border-white bg-white text-black shadow-sm'
                    : 'border-neutral-800 bg-black text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{lang.label}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-600' : 'text-neutral-500'}`}>
                  {lang.tag}
                </span>
              </button>
            );
          })}
        </div>
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
          placeholder={
            language === 'roman-urdu'
              ? 'e.g. Gym me bicep grow kyu nahi hota aur 90% log kya ghalti karte hain...'
              : 'e.g. Why you freeze and scroll phone when you have urgent tasks, and the 5-minute rule...'
          }
          className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition resize-none"
        />

        {/* Quick Inspiration Chips */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Lightbulb className="w-3 h-3 text-neutral-400" />
              <span>Inspiration Starters:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLanguage('roman-urdu')}
                className={`text-[10px] font-mono underline cursor-pointer ${language === 'roman-urdu' ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Roman Urdu Samples
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setLanguage('english')}
                className={`text-[10px] font-mono underline cursor-pointer ${language === 'english' ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                English Samples
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentSamples.map((sample, idx) => (
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
              <span>Analyzing Topic & Crafting Punchy Hook...</span>
            </>
          ) : (
            <span>
              {language === 'roman-urdu'
                ? 'Generate Roman Urdu Viral Caption'
                : 'Generate 1-Click Viral Caption'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
