import React from 'react';
import { Platform } from '../types';
import { TrendingUp, Clock, Eye, Target, Flame } from 'lucide-react';

interface GrowthStrategistInsightsProps {
  platform: Platform;
}

const STRATEGIES: Record<
  Platform,
  {
    targetMetric: string;
    hookRetentionGoal: string;
    optimalLength: string;
    postingTimes: string;
    secretWeapon: string;
    algorithmHacks: string[];
  }
> = {
  TikTok: {
    targetMetric: 'Completion Rate & Loops',
    hookRetentionGoal: '> 70% retention past 3 seconds',
    optimalLength: '12 – 24 seconds for max loops',
    postingTimes: '2:00 PM – 5:00 PM & 8:00 PM – 11:00 PM',
    secretWeapon: 'First line on-screen caption must match your spoken hook verbatim.',
    algorithmHacks: [
      'Stack 1 broad hashtag (#fyp) + 3 ultra-specific niche tags.',
      'Place your visual cut right at the 2.5 second mark.',
      'Leave an intentional curiosity gap that gets answered in the last 4 seconds.',
    ],
  },
  'Instagram Reels': {
    targetMetric: 'Saves & Direct Message Shares',
    hookRetentionGoal: '> 65% retention past 3 seconds',
    optimalLength: '7 – 15 seconds (b-roll loop style) or 30 – 45s (deep value)',
    postingTimes: '9:00 AM – 11:00 AM & 6:00 PM – 8:30 PM',
    secretWeapon: 'The Save button is 5x weighted in the Reels algorithm compared to a like.',
    algorithmHacks: [
      'Prompt: "Save this so you have it for later" in Lines 3-4.',
      'Use 3-5 tags only; Instagram suppresses 30 hashtag spam blocks.',
      'Pair with trending audio with the rising arrow badge.',
    ],
  },
  'YouTube Shorts': {
    targetMetric: 'Viewed vs. Swiped Away (> 80%)',
    hookRetentionGoal: '> 80% stayed instead of swiping',
    optimalLength: '28 – 55 seconds (YouTube rewards total watch minutes)',
    postingTimes: '12:00 PM – 3:00 PM & 7:00 PM – 10:00 PM',
    secretWeapon: 'Loopable ending: connect your final sentence directly into your opening hook.',
    algorithmHacks: [
      'Never say "welcome back to my channel" or intro pleasantries.',
      'The hook must deliver on the title within 1.5 seconds.',
      'Pin a comment asking an easy debate question to drive comment velocity.',
    ],
  },
};

export const GrowthStrategistInsights: React.FC<GrowthStrategistInsightsProps> = ({
  platform,
}) => {
  const info = STRATEGIES[platform] || STRATEGIES.TikTok;

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-white" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            {platform} Growth Engine
          </h3>
        </div>
        <span className="text-[11px] font-mono text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700">
          Algorithm Benchmarks
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-black border border-neutral-800">
          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <Target className="w-3.5 h-3.5 text-white" />
            <span>Primary Metric</span>
          </div>
          <div className="font-bold text-white mt-1">{info.targetMetric}</div>
        </div>

        <div className="p-3 rounded-xl bg-black border border-neutral-800">
          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <Eye className="w-3.5 h-3.5 text-white" />
            <span>3s Retention</span>
          </div>
          <div className="font-bold text-white mt-1">{info.hookRetentionGoal}</div>
        </div>

        <div className="p-3 rounded-xl bg-black border border-neutral-800">
          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-white" />
            <span>Optimal Length</span>
          </div>
          <div className="font-bold text-white mt-1">{info.optimalLength}</div>
        </div>

        <div className="p-3 rounded-xl bg-black border border-neutral-800">
          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span>Prime Times</span>
          </div>
          <div className="font-bold text-white mt-1">{info.postingTimes}</div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-black border border-neutral-800 space-y-1.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Strategist Playbook for {platform}:
        </div>
        <ul className="space-y-1 text-xs text-neutral-300">
          {info.algorithmHacks.map((hack, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-white font-bold">—</span>
              <span>{hack}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
