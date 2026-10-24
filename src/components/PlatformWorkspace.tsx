import React from 'react';
import { Platform, Tone, HookAngle, Language, GeneratedCaption } from '../types';
import { CaptionResult } from './CaptionResult';
import { ComplianceInspector } from './ComplianceInspector';
import { PhoneMockup } from './PhoneMockup';
import { analyzeCompliance } from '../utils/compliance';
import {
  Sparkles,
  RefreshCw,
  Globe,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  Lightbulb,
  Video,
  Check,
} from 'lucide-react';

interface PlatformWorkspaceProps {
  platform: Platform;
  topic: string;
  setTopic: (t: string) => void;
  tone: Tone;
  setTone: (t: Tone) => void;
  hookAngle: HookAngle;
  setHookAngle: (h: HookAngle) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  currentCaption: GeneratedCaption | null;
  isGenerating: boolean;
  onGenerate: (overrideTopic?: string) => void;
  onUpdateCaption: (newText: string) => void;
  onSwapHook: (newHook: string) => void;
  onOpenSpecs: () => void;
}

const PLATFORM_METADATA: Record<
  Platform,
  {
    title: string;
    description: string;
    algorithmFocus: string;
    samplePrompts: { label: string; text: string; lang: 'en' | 'ur' }[];
  }
> = {
  'Instagram Reels': {
    title: 'Instagram Reels Studio',
    description: 'Engineered for maximum Save bookmarks, DM shares, and rising audio traction.',
    algorithmFocus: 'Saves & Direct Message Shares (5x algorithmic weight over likes)',
    samplePrompts: [
      { label: 'Saves Hack', text: 'Why bookmarking this routine will save you 20 hours every month', lang: 'en' },
      { label: 'Reel Aesthetic', text: 'Camera framing trick that makes your aesthetic reels look like film', lang: 'en' },
      { label: 'Desi Reel (Roman Urdu)', text: 'Gym me bicep grow na hone ki sabse bari ghalti jo 90% log karte hain', lang: 'ur' },
      { label: 'Phone Habit (Roman Urdu)', text: 'Subah uth kar foran phone scroll karna band karo aur yeh save karlo', lang: 'ur' },
    ],
  },
  TikTok: {
    title: 'TikTok FYP Studio',
    description: 'Engineered for instantaneous 3-second hook retention and completion loops.',
    algorithmFocus: 'Completion Rate, 3-Second Retention & Audio Loop Velocity',
    samplePrompts: [
      { label: 'Pattern Interrupt', text: 'Stop scrolling right now: hidden iPhone setting that ruins video quality', lang: 'en' },
      { label: 'Supermarket Trick', text: 'Psychological trick supermarkets use with music and cart size to make you spend 30% more', lang: 'en' },
      { label: 'Viral Code (Roman Urdu)', text: 'Video viral karne ka asaan tareen formula jo koi nahi batata', lang: 'ur' },
      { label: 'Freelance (Roman Urdu)', text: 'Freelancing shuru karne se pehle yeh 2 cheezein seekh lo warna clients nahi milenge', lang: 'ur' },
    ],
  },
  'YouTube Shorts': {
    title: 'YouTube Shorts Studio',
    description: 'Engineered for >80% stayed vs. swiped-away ratios and loopable conclusion hooks.',
    algorithmFocus: 'Viewed vs. Swiped-Away Ratio & Total Watch Minutes',
    samplePrompts: [
      { label: '1% CTR Secret', text: 'The 1% trick that top YouTube creators use to keep retention above 90%', lang: 'en' },
      { label: 'Looping Method', text: 'How connecting your last sentence to your opening hook doubles watch time', lang: 'en' },
      { label: 'Paisa Bachao (Roman Urdu)', text: 'Har mahine 30% paise bachane ka asaan formula jo kisine nahi sikhaya', lang: 'ur' },
      { label: 'Procrastination (Roman Urdu)', text: 'Kaam ke waqt mobile scroll karne ki aadat ko 5 minute me khatam karo', lang: 'ur' },
    ],
  },
};

const TONES: { id: Tone; label: string }[] = [
  { id: 'engaging', label: 'Engaging' },
  { id: 'bold', label: 'Bold' },
  { id: 'funny', label: 'Funny' },
  { id: 'educational', label: 'Educational' },
  { id: 'storytime', label: 'Storytime' },
  { id: 'inspirational', label: 'Inspirational' },
];

const HOOK_ANGLES: { id: HookAngle; label: string }[] = [
  { id: 'curiosity', label: 'Intense Curiosity' },
  { id: 'contrarian', label: 'Contrarian' },
  { id: 'shocking', label: 'Shock Value' },
  { id: 'mistake', label: 'Mistake Avoidance' },
  { id: 'how-to', label: 'Cheat Code / Fast Fix' },
];

export const PlatformWorkspace: React.FC<PlatformWorkspaceProps> = ({
  platform,
  topic,
  setTopic,
  tone,
  setTone,
  hookAngle,
  setHookAngle,
  language,
  setLanguage,
  currentCaption,
  isGenerating,
  onGenerate,
  onUpdateCaption,
  onSwapHook,
  onOpenSpecs,
}) => {
  const meta = PLATFORM_METADATA[platform] || PLATFORM_METADATA.TikTok;
  const complianceReport = analyzeCompliance(currentCaption?.fullCaption || '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 select-none">
      {/* Platform Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {meta.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-[11px] font-mono text-neutral-300">
              Only {platform}
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            {meta.description}
          </p>
        </div>

        {/* Algorithm Badge */}
        <div className="px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-xs">
          <Flame className="w-4 h-4 text-white shrink-0" />
          <div>
            <div className="text-[10px] text-neutral-500 uppercase font-mono tracking-wider">
              Algorithm Priority
            </div>
            <div className="text-neutral-200 font-semibold text-xs truncate max-w-[280px]">
              {meta.algorithmFocus}
            </div>
          </div>
        </div>
      </div>

      {/* Main Side-by-Side Split Grid: Left Generator & Output, Right Only Mobile Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form, Captions & Compliance */}
        <div className="lg:col-span-7 space-y-6">
          {/* Platform-Dedicated Input Card */}
          <div className="bg-[#0b0b0d] border border-neutral-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-neutral-400" />
                <span>Video Topic or Raw Transcript ({platform})</span>
              </label>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <span className="text-neutral-500 mr-1">Script:</span>
                <button
                  type="button"
                  onClick={() => setLanguage('auto')}
                  className={`px-2 py-0.5 rounded transition cursor-pointer ${
                    language === 'auto'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Auto
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('roman-urdu')}
                  className={`px-2 py-0.5 rounded transition cursor-pointer ${
                    language === 'roman-urdu'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Roman Urdu
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('english')}
                  className={`px-2 py-0.5 rounded transition cursor-pointer ${
                    language === 'english'
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={
                language === 'roman-urdu'
                  ? `e.g. ${platform} ke liye video idea ya transcript yahan paste karein...`
                  : `e.g. Enter your video hook, outline, or rough script for ${platform}...`
              }
              className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition resize-none leading-relaxed"
            />

            {/* Quick Platform Starters */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400">
                <Lightbulb className="w-3 h-3 text-neutral-400" />
                <span>Ready-To-Test {platform} Starters:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {meta.samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (p.lang === 'ur') setLanguage('roman-urdu');
                      else setLanguage('english');
                      setTopic(p.text);
                      onGenerate(p.text);
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone & Hook Angle Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-900">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Tone Profile
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTone(t.id)}
                      className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition cursor-pointer ${
                        tone === t.id
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 bg-black text-neutral-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Hook Angle
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {HOOK_ANGLES.slice(0, 4).map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setHookAngle(h.id)}
                      className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition truncate cursor-pointer ${
                        hookAngle === h.id
                          ? 'border-white bg-neutral-900 text-white font-bold'
                          : 'border-neutral-800 bg-black text-neutral-400 hover:text-white'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isGenerating || !topic.trim()}
                onClick={() => onGenerate()}
                className="w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider text-black bg-white hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing & Building {platform} Caption...</span>
                  </>
                ) : (
                  <span>
                    Generate {platform} Viral Caption ✦
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Generated Caption Result (Exclusively for this Platform) */}
          {currentCaption && (
            <CaptionResult
              caption={currentCaption}
              onUpdateCaption={onUpdateCaption}
              onSwapHook={onSwapHook}
            />
          )}

          {/* Blueprint Compliance Inspector */}
          <ComplianceInspector report={complianceReport} />
        </div>

        {/* Right Column: "side of the screen we get only preview of mobile" */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8 flex flex-col items-center">
          <div className="w-full max-w-[340px] flex items-center justify-between text-xs px-2 text-neutral-400">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live {platform} Screen
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              Interactive Overlay
            </span>
          </div>

          {/* Mobile Preview specifically for this Platform */}
          <PhoneMockup
            caption={currentCaption}
            activePlatform={platform}
          />
        </div>
      </div>
    </div>
  );
};
