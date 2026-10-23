import React from 'react';
import { ComplianceReport } from '../types';
import { ShieldCheck, Check, X } from 'lucide-react';

interface ComplianceInspectorProps {
  report: ComplianceReport;
}

export const ComplianceInspector: React.FC<ComplianceInspectorProps> = ({ report }) => {
  const is100 = report.score === 100;

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header with Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Blueprint Compliance Audit
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border border-neutral-700 bg-neutral-900 text-white">
            {report.score}% Passed
          </div>
        </div>
      </div>

      {/* 5-Rule Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        {/* Rule 1: Hook Word Count */}
        <div
          className={`p-3 rounded-xl border flex items-start gap-2.5 transition ${
            report.isHookWordCountValid
              ? 'bg-black border-neutral-700 text-neutral-200'
              : 'bg-neutral-900 border-neutral-600 text-neutral-300'
          }`}
        >
          <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0 mt-0.5">
            {report.isHookWordCountValid ? (
              <Check className="w-3 h-3 text-white stroke-[3]" />
            ) : (
              <X className="w-3 h-3 text-white" />
            )}
          </div>
          <div>
            <div className="font-bold text-white">Rule 1 · Hook Under 7 Words</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {report.hookWordCount} words detected ({report.isHookWordCountValid ? 'Pass' : 'Target: < 7 words'})
            </div>
          </div>
        </div>

        {/* Rule 1b: Exactly 1 Emoji */}
        <div
          className={`p-3 rounded-xl border flex items-start gap-2.5 transition ${
            report.isHookEmojiValid
              ? 'bg-black border-neutral-700 text-neutral-200'
              : 'bg-neutral-900 border-neutral-600 text-neutral-300'
          }`}
        >
          <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0 mt-0.5">
            {report.isHookEmojiValid ? (
              <Check className="w-3 h-3 text-white stroke-[3]" />
            ) : (
              <X className="w-3 h-3 text-white" />
            )}
          </div>
          <div>
            <div className="font-bold text-white">Rule 1b · Exactly 1 Emoji</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {report.hookEmojiCount} emoji in Hook ({report.isHookEmojiValid ? 'Pass' : 'Must be exactly 1'})
            </div>
          </div>
        </div>

        {/* Rule 2 & 4: Line Breaks */}
        <div
          className={`p-3 rounded-xl border flex items-start gap-2.5 transition ${
            report.hasCleanLineBreaks
              ? 'bg-black border-neutral-700 text-neutral-200'
              : 'bg-neutral-900 border-neutral-600 text-neutral-300'
          }`}
        >
          <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0 mt-0.5">
            {report.hasCleanLineBreaks ? (
              <Check className="w-3 h-3 text-white stroke-[3]" />
            ) : (
              <X className="w-3 h-3 text-white" />
            )}
          </div>
          <div>
            <div className="font-bold text-white">Rules 2 & 4 · Empty Line Breaks</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {report.hasCleanLineBreaks ? 'Clean spacing between sections' : 'Double line breaks required'}
            </div>
          </div>
        </div>

        {/* Rule 5: 3-5 Tags */}
        <div
          className={`p-3 rounded-xl border flex items-start gap-2.5 transition ${
            report.isTagCountValid
              ? 'bg-black border-neutral-700 text-neutral-200'
              : 'bg-neutral-900 border-neutral-600 text-neutral-300'
          }`}
        >
          <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0 mt-0.5">
            {report.isTagCountValid ? (
              <Check className="w-3 h-3 text-white stroke-[3]" />
            ) : (
              <X className="w-3 h-3 text-white" />
            )}
          </div>
          <div>
            <div className="font-bold text-white">Rule 5 · 3 to 5 Niche Tags</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {report.tagCount} hashtags detected ({report.isTagCountValid ? 'Pass' : 'Target: 3-5 tags'})
            </div>
          </div>
        </div>
      </div>

      {/* Banned Words Anti-AI Filter */}
      <div className="p-3 rounded-xl border border-neutral-800 bg-black flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white stroke-[3]" />
          </div>
          <div>
            <span className="font-bold text-white">Anti-AI Jargon Filter: </span>
            {report.isToneClean ? (
              <span className="text-neutral-300">Zero corporate buzzwords detected (100% human creator voice)</span>
            ) : (
              <span className="text-white font-mono">
                Flagged buzzwords: {report.bannedWords.map((w) => `"${w}"`).join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
