import React, { useState } from 'react';
import { GeneratedCaption } from '../types';
import {
  Copy,
  Check,
  Download,
  Edit3,
  ArrowRightLeft,
  TrendingUp,
} from 'lucide-react';

interface CaptionResultProps {
  caption: GeneratedCaption;
  onUpdateCaption: (newCaptionText: string) => void;
  onSwapHook: (newHook: string) => void;
}

export const CaptionResult: React.FC<CaptionResultProps> = ({
  caption,
  onUpdateCaption,
  onSwapHook,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(caption.fullCaption);

  // Sync editable text when caption changes
  React.useEffect(() => {
    setEditableText(caption.fullCaption);
  }, [caption.fullCaption]);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([caption.fullCaption], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibe-script-${caption.platform.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveEdit = () => {
    onUpdateCaption(editableText);
    setIsEditing(false);
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <h3 className="text-base font-bold text-white uppercase tracking-tight">
              Publish-Ready Viral Caption
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Architectural blueprint applied for <span className="text-white font-semibold">{caption.platform}</span> ({caption.tone} tone)
          </p>
        </div>

        {/* Copy & Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopy(caption.fullCaption, 'full')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-white hover:bg-neutral-200 transition cursor-pointer"
          >
            {copiedType === 'full' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied All</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Entire Caption</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="Download caption as .txt file"
            className="p-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (isEditing) handleSaveEdit();
              else setIsEditing(true);
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition cursor-pointer flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5 text-neutral-400" />
            <span>{isEditing ? 'Done' : 'Edit'}</span>
          </button>
        </div>
      </div>

      {/* Caption Content Area */}
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            rows={7}
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            className="w-full px-4 py-3 bg-black border border-white rounded-xl text-white font-mono text-sm leading-relaxed focus:outline-none transition"
          />
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">
              Preserve empty line breaks between Hook, Value/CTA, and Tags.
            </span>
            <button
              type="button"
              onClick={handleSaveEdit}
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold transition cursor-pointer"
            >
              Apply Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Formatted Script Box */}
          <div className="relative group bg-black border border-neutral-800 rounded-xl p-4 font-mono text-sm leading-relaxed text-neutral-100 whitespace-pre-wrap selection:bg-white selection:text-black">
            {caption.fullCaption}

            {/* Floating quick partial copy buttons */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-700">
              <button
                type="button"
                onClick={() => handleCopy(caption.hook, 'hook')}
                className="px-2 py-0.5 text-[11px] font-sans font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded transition cursor-pointer"
              >
                {copiedType === 'hook' ? 'Copied Hook' : 'Copy Hook'}
              </button>
              <span className="text-neutral-700">|</span>
              <button
                type="button"
                onClick={() => handleCopy(caption.tags.join(' '), 'tags')}
                className="px-2 py-0.5 text-[11px] font-sans font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded transition cursor-pointer"
              >
                {copiedType === 'tags' ? 'Copied Tags' : 'Copy Tags'}
              </button>
            </div>
          </div>

          {/* Architectural Breakdown Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-black border border-neutral-800">
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Line 1 · The Hook
              </div>
              <div className="text-xs text-white font-medium mt-1 truncate">
                {caption.hook}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-neutral-800">
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Lines 3-4 · Value / CTA
              </div>
              <div className="text-xs text-white font-medium mt-1 truncate">
                {caption.valueCta}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-neutral-800">
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Line 6 · {caption.tags.length} Niche Tags
              </div>
              <div className="text-xs text-white font-medium mt-1 truncate">
                {caption.tags.join(' ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A/B Hook Swapping (Test Alternative Hooks under 7 words) */}
      {caption.alternativeHooks && caption.alternativeHooks.length > 0 && (
        <div className="border-t border-neutral-800 pt-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <ArrowRightLeft className="w-3.5 h-3.5 text-neutral-400" />
              <span>A/B Hook Variations (Click to Swap Line 1)</span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">&lt; 7 words</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {caption.alternativeHooks.map((altHook, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSwapHook(altHook)}
                className="group flex flex-col items-start p-2.5 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-white text-left transition cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-neutral-500 group-hover:text-neutral-300 uppercase tracking-wider font-mono">
                    Option 0{index + 1}
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-500 group-hover:text-white">
                    Swap →
                  </span>
                </div>
                <div className="text-xs text-neutral-300 group-hover:text-white font-medium mt-1">
                  {altHook}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Creator Insight Tip */}
      {caption.creatorTip && (
        <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs flex items-start gap-2.5">
          <TrendingUp className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <div className="text-neutral-300">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] mr-1">Algorithm Tip:</span>
            {caption.creatorTip}
          </div>
        </div>
      )}
    </div>
  );
};
