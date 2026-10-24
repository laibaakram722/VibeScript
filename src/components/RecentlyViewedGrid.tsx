import React, { useState } from 'react';
import { GeneratedCaption, Platform } from '../types';
import { ChevronLeft, ChevronRight, MoreHorizontal, ArrowRight, Copy, Check } from 'lucide-react';

interface RecentlyViewedGridProps {
  history: GeneratedCaption[];
  onSelectCaption: (caption: GeneratedCaption) => void;
  onOpenVault: () => void;
}

// Curated default template cards matching the visual aesthetic of the screenshot
const DEFAULT_PREVIEWS = [
  {
    id: 'sample-1',
    platform: 'TikTok' as Platform,
    title: 'Zero Friction Logistics',
    subtitle: 'Moving commerce without complexity. Stop scrolling and watch this.',
    hook: 'Stop doing this wrong 🛑',
    updated: 'Updated 2h ago',
    imageStyle: 'from-neutral-900 via-neutral-950 to-black',
    accentGraphic: 'linear',
  },
  {
    id: 'sample-2',
    platform: 'Instagram Reels' as Platform,
    title: 'Nordic Studio',
    subtitle: 'A digital product studio crafting calm experiences and high retention.',
    hook: 'This changes everything ⚡',
    updated: 'Updated yesterday',
    imageStyle: 'from-neutral-900 via-black to-neutral-950',
    accentGraphic: 'lines',
  },
  {
    id: 'sample-3',
    platform: 'YouTube Shorts' as Platform,
    title: 'Orbit',
    subtitle: 'Invest in the future of infrastructure. 99% of people miss this.',
    hook: 'Yeh secret koi nahi batata 🤫',
    updated: 'Updated 2 days ago',
    imageStyle: 'from-black via-neutral-950 to-neutral-900',
    accentGraphic: 'sphere',
  },
  {
    id: 'sample-4',
    platform: 'TikTok' as Platform,
    title: 'Lumina',
    subtitle: 'Intelligent lighting for modern spaces. iPhone camera secret setting.',
    hook: 'Fix your settings now ⏱️',
    updated: 'Updated 3 days ago',
    imageStyle: 'from-neutral-950 via-neutral-900 to-black',
    accentGraphic: 'dome',
  },
];

export const RecentlyViewedGrid: React.FC<RecentlyViewedGridProps> = ({
  history,
  onSelectCaption,
  onOpenVault,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Ignore
    }
  };

  // Combine real user history with fallback items to fill 4 slots nicely
  const displayItems = history.length > 0
    ? history.slice(0, 4).map((h, i) => ({
        id: h.id,
        platform: h.platform,
        title: h.hook.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim() || `Script 0${i + 1}`,
        subtitle: h.valueCta || '1-2 punchy sentences tailored for high conversion.',
        hook: h.hook,
        updated: new Date(h.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        imageStyle: DEFAULT_PREVIEWS[i % DEFAULT_PREVIEWS.length].imageStyle,
        captionData: h,
      }))
    : DEFAULT_PREVIEWS.map((d) => ({
        ...d,
        captionData: {
          id: d.id,
          topic: d.title,
          platform: d.platform,
          tone: 'engaging' as const,
          hook: d.hook,
          valueCta: d.subtitle,
          tags: ['#fyp', '#viral', '#creator'],
          fullCaption: `${d.hook}\n\n${d.subtitle}\n\n#fyp #viral #creator`,
          alternativeHooks: ['Try this tonight 🛑', 'The truth revealed 🔑', 'Stop scrolling now ⚡'],
          createdAt: Date.now(),
        },
      }));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 space-y-4 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white tracking-tight">
          Recently viewed
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenVault}
            className="text-xs text-neutral-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-7 h-7 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid (Matching Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelectCaption(item.captionData as GeneratedCaption)}
            className="group rounded-2xl bg-[#0c0c0e] border border-neutral-800/80 hover:border-neutral-700 p-2.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Thumbnail Area */}
            <div
              className={`relative w-full h-36 rounded-xl overflow-hidden bg-gradient-to-b ${item.imageStyle} border border-neutral-800/60 flex flex-col justify-between p-3 transition-transform group-hover:scale-[1.01]`}
            >
              {/* Top Left Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-neutral-800 text-[10px] text-neutral-300 font-mono">
                  {item.platform}
                </span>
              </div>

              {/* Center Abstract Graphic / Text */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-white tracking-tight line-clamp-1">
                  {item.title}
                </div>
                <div className="text-[10px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </div>
              </div>

              {/* Ambient radial accent inside thumbnail */}
              <div className="absolute right-0 bottom-0 w-28 h-28 bg-white/[0.03] rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Bottom Metadata Bar */}
            <div className="pt-3 px-1 pb-1 flex items-center justify-between text-xs">
              <div>
                <div className="font-medium text-neutral-200 group-hover:text-white transition truncate max-w-[140px] text-xs">
                  {item.title}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                  {item.updated}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, item.id, item.captionData.fullCaption)}
                  title="Copy caption"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  className="p-1 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
