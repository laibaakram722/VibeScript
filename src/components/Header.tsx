import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HeaderProps {
  hasApiKey: boolean;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ hasApiKey, onOpenGuide }) => {
  return (
    <header className="border-b border-neutral-800 bg-black/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-black text-sm tracking-tighter">
            VS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white uppercase">
                Vibe Script
              </h1>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                · Short-Form Studio
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-normal">
              Viral Copywriter & Growth Strategist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-xs text-neutral-300 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{hasApiKey ? 'Gemini 3.8 Flash' : 'Zero-Prompt Engine'}</span>
          </div>

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>Blueprint Specs</span>
          </button>
        </div>
      </div>
    </header>
  );
};
