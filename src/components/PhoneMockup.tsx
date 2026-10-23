import React, { useState } from 'react';
import { Platform, GeneratedCaption } from '../types';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music2,
  ThumbsUp,
  ThumbsDown,
  Repeat,
  MoreVertical,
  Play,
} from 'lucide-react';

interface PhoneMockupProps {
  caption: GeneratedCaption | null;
  activePlatform: Platform;
}

const BG_THEMES = [
  { name: 'Deep Noir', class: 'from-black via-neutral-950 to-neutral-900' },
  { name: 'Studio Charcoal', class: 'from-neutral-900 via-neutral-950 to-black' },
  { name: 'Pure Contrast', class: 'from-neutral-950 to-black' },
  { name: 'Mono Slate', class: 'from-neutral-800 via-neutral-900 to-black' },
];

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  caption,
  activePlatform,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);

  const fallbackHook = "Stop scrolling right now 🛑";
  const fallbackValue = "Try this tonight and watch what happens. Save this before they take it down.";
  const fallbackTags = ["#fyp", "#viral", "#growth"];

  const hook = caption?.hook || fallbackHook;
  const valueCta = caption?.valueCta || fallbackValue;
  const tags = caption?.tags || fallbackTags;

  const currentBg = BG_THEMES[bgIndex].class;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Simulation Controls */}
      <div className="flex items-center justify-between w-full max-w-[340px] px-2 text-xs text-neutral-400">
        <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Live {activePlatform} Preview
        </span>

        <button
          type="button"
          onClick={() => setBgIndex((prev) => (prev + 1) % BG_THEMES.length)}
          className="text-[11px] text-neutral-300 hover:text-white font-mono transition cursor-pointer"
        >
          Theme: {BG_THEMES[bgIndex].name}
        </button>
      </div>

      {/* Phone Casing */}
      <div className="relative w-[320px] h-[640px] bg-black rounded-[48px] p-3 shadow-2xl border border-neutral-800 ring-1 ring-neutral-900 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Island / Speaker */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center border border-neutral-900">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 mr-4" />
          <div className="w-2 h-2 rounded-full bg-neutral-900" />
        </div>

        {/* Screen Area */}
        <div
          className={`relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b ${currentBg} flex flex-col justify-between p-4 select-none`}
        >
          {/* Top Status & Tabs */}
          <div className="pt-4 flex items-center justify-between text-white/90 text-xs font-semibold z-20">
            {activePlatform === 'TikTok' ? (
              <div className="flex items-center justify-center gap-4 w-full">
                <span className="text-white/50 text-xs">Following</span>
                <span className="text-white font-bold border-b-2 border-white pb-0.5">
                  For You
                </span>
              </div>
            ) : activePlatform === 'Instagram Reels' ? (
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-base font-extrabold tracking-tight">Reels</span>
                <span className="text-xs text-white/80">Camera</span>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-xs font-bold tracking-wider uppercase text-white">Shorts</span>
                <MoreVertical className="w-4 h-4 text-white/80" />
              </div>
            )}
          </div>

          {/* Center Play Indicator */}
          <div
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          >
            {!isPlaying && (
              <div className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center border border-white/40">
                <Play className="w-6 h-6 text-white ml-0.5" />
              </div>
            )}
          </div>

          {/* Right Action Icons (Platform Specific - Monochrome) */}
          <div className="absolute right-2.5 bottom-16 flex flex-col items-center gap-4 z-20">
            {activePlatform === 'TikTok' && (
              <>
                <div className="relative mb-2">
                  <div className="w-10 h-10 rounded-full bg-white text-black font-black flex items-center justify-center text-xs">
                    VS
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">
                    +
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <Heart className="w-7 h-7 text-white fill-white drop-shadow" />
                  <span className="text-[11px] font-bold text-white mt-0.5">142K</span>
                </div>

                <div className="flex flex-col items-center">
                  <MessageCircle className="w-7 h-7 text-white drop-shadow" />
                  <span className="text-[11px] font-bold text-white mt-0.5">1,842</span>
                </div>

                <div className="flex flex-col items-center">
                  <Bookmark className="w-7 h-7 text-white drop-shadow fill-white" />
                  <span className="text-[11px] font-bold text-white mt-0.5">34K</span>
                </div>

                <div className="flex flex-col items-center">
                  <Share2 className="w-7 h-7 text-white drop-shadow" />
                  <span className="text-[11px] font-bold text-white mt-0.5">8.9K</span>
                </div>

                {/* Rotating disc */}
                <div
                  className={`w-9 h-9 rounded-full bg-black border-2 border-white/50 flex items-center justify-center ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '4s' }}
                >
                  <Music2 className="w-4 h-4 text-white" />
                </div>
              </>
            )}

            {activePlatform === 'Instagram Reels' && (
              <>
                <div className="flex flex-col items-center">
                  <Heart className="w-6 h-6 text-white drop-shadow fill-white" />
                  <span className="text-[11px] font-semibold text-white mt-0.5">48K</span>
                </div>

                <div className="flex flex-col items-center">
                  <MessageCircle className="w-6 h-6 text-white drop-shadow" />
                  <span className="text-[11px] font-semibold text-white mt-0.5">932</span>
                </div>

                <div className="flex flex-col items-center">
                  <Share2 className="w-6 h-6 text-white drop-shadow" />
                  <span className="text-[11px] font-semibold text-white mt-0.5">2.4K</span>
                </div>

                <div className="flex flex-col items-center">
                  <Bookmark className="w-6 h-6 text-white drop-shadow fill-white" />
                </div>

                <div className="flex flex-col items-center">
                  <MoreVertical className="w-6 h-6 text-white drop-shadow" />
                </div>
              </>
            )}

            {activePlatform === 'YouTube Shorts' && (
              <>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ThumbsUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white mt-1">94K</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ThumbsDown className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white mt-1">Dislike</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white mt-1">1.2K</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white mt-1">Share</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white mt-1">Remix</span>
                </div>
              </>
            )}
          </div>

          {/* Bottom Caption Overlay */}
          <div className="pr-14 pb-2 z-20 space-y-2">
            {/* Creator Tag */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs drop-shadow">
                @vibescript_creator
              </span>
              {activePlatform === 'YouTube Shorts' ? (
                <button
                  type="button"
                  className="px-2 py-0.5 rounded-full bg-white text-black font-bold text-[10px]"
                >
                  Subscribe
                </button>
              ) : activePlatform === 'Instagram Reels' ? (
                <button
                  type="button"
                  className="px-2 py-0.5 rounded-full border border-white/60 text-white font-semibold text-[10px]"
                >
                  Follow
                </button>
              ) : null}
            </div>

            {/* Simulated Live Caption View */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-white/95 leading-snug drop-shadow cursor-pointer transition"
            >
              <div className="font-bold text-white text-sm tracking-tight mb-1">
                {hook}
              </div>

              {isExpanded ? (
                <div className="space-y-1.5 pt-0.5">
                  <p className="text-white/90 text-xs">{valueCta}</p>
                  <p className="text-neutral-300 font-semibold text-[11px]">
                    {tags.join(' ')}
                  </p>
                  <span className="text-[10px] text-white/60 font-semibold underline block">
                    Show less
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="truncate max-w-[190px] text-white/80">
                    {valueCta}
                  </span>
                  <span className="font-bold text-white underline text-[11px]">
                    more
                  </span>
                </div>
              )}
            </div>

            {/* Audio Pill */}
            <div className="flex items-center gap-2 text-[11px] text-white/90 font-medium">
              <Music2 className="w-3 h-3 animate-pulse" />
              <span className="truncate max-w-[180px]">
                original sound · {caption?.platform || 'Trending Sound'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
