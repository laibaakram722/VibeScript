import React from 'react';
import { X, ShieldAlert, Sparkles } from 'lucide-react';
import { BANNED_WORDS } from '../utils/compliance';

interface BlueprintSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintSpecsModal: React.FC<BlueprintSpecsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-black font-black flex items-center justify-center text-xs">
              VS
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-tight">
                Vibe Script Blueprint Specification
              </h3>
              <p className="text-xs text-neutral-400">
                Mandatory architectural rules for maximum retention
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Rule Architectural Blueprint */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            5-Point Structural Blueprint
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-black border border-neutral-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </span>
              <div>
                <span className="font-bold text-white">THE HOOK (Line 1): </span>
                <span className="text-neutral-300">
                  Must start immediately with an aggressive, curiosity-inducing hook line. Under 7 words and includes exactly 1 relevant emoji. Never uses generic introductions like "Are you ready?".
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-neutral-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </span>
              <div>
                <span className="font-bold text-white">LINE BREAK (Line 2): </span>
                <span className="text-neutral-300">
                  Insert an empty line break to separate the hook visually.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-neutral-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </span>
              <div>
                <span className="font-bold text-white">THE VALUE / CTA (Lines 3-4): </span>
                <span className="text-neutral-300">
                  1-2 short, punchy sentences delivering quick insight or driving high engagement (e.g. "Save this for your next session", "Try this tonight", "Read that again.").
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-neutral-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                4
              </span>
              <div>
                <span className="font-bold text-white">LINE BREAK (Line 5): </span>
                <span className="text-neutral-300">
                  Insert an empty line break before the hashtag block.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-neutral-800 flex items-start gap-3">
              <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                5
              </span>
              <div>
                <span className="font-bold text-white">THE TAGS (Line 6): </span>
                <span className="text-neutral-300">
                  3 to 5 highly relevant, niche hashtags stacked vertically or separated cleanly by a single space.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tone & Anti-AI Forbidden Words */}
        <div className="space-y-3 border-t border-neutral-800 pt-4">
          <div className="flex items-center gap-2 text-white">
            <ShieldAlert className="w-4 h-4 text-white" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Strict Human Tone & Banned AI Buzzwords
            </h4>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Every caption speaks like a real human content creator: casual, confident, concise, and direct. Generic corporate AI jargon is strictly prohibited:
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {BANNED_WORDS.map((word) => (
              <span
                key={word}
                className="px-2 py-0.5 rounded bg-black text-neutral-400 border border-neutral-800 text-[11px] font-mono line-through"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white hover:bg-neutral-200 text-black transition cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
