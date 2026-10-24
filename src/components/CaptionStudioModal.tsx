import React from 'react';
import { GeneratedCaption, Platform } from '../types';
import { CaptionResult } from './CaptionResult';
import { ComplianceInspector } from './ComplianceInspector';
import { PhoneMockup } from './PhoneMockup';
import { analyzeCompliance } from '../utils/compliance';
import { X, Sparkles, Smartphone, Check } from 'lucide-react';

interface CaptionStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  caption: GeneratedCaption | null;
  onUpdateCaption: (newText: string) => void;
  onSwapHook: (newHook: string) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
}

export const CaptionStudioModal: React.FC<CaptionStudioModalProps> = ({
  isOpen,
  onClose,
  caption,
  onUpdateCaption,
  onSwapHook,
  platform,
  setPlatform,
}) => {
  if (!isOpen || !caption) return null;

  const complianceReport = analyzeCompliance(caption.fullCaption);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#0b0b0d] border border-neutral-800 rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black font-black flex items-center justify-center text-xs tracking-tighter">
              VS
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <span>Caption Studio & Phone Preview</span>
                {caption.language === 'roman-urdu' && (
                  <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300">
                    Roman Urdu
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-400">
                Live short-form video simulation and strict 5-point blueprint compliance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Output & Compliance */}
          <div className="lg:col-span-7 space-y-5">
            <CaptionResult
              caption={caption}
              onUpdateCaption={onUpdateCaption}
              onSwapHook={onSwapHook}
            />

            <ComplianceInspector report={complianceReport} />
          </div>

          {/* Right Column: Live Phone Mockup Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
            <PhoneMockup
              caption={caption}
              activePlatform={platform}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500">
          <span>Click any A/B variation to swap Line 1 hook instantly.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
