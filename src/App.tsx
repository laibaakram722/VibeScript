/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Platform, Tone, HookAngle, GeneratedCaption } from './types';
import { analyzeCompliance } from './utils/compliance';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { CaptionResult } from './components/CaptionResult';
import { ComplianceInspector } from './components/ComplianceInspector';
import { PhoneMockup } from './components/PhoneMockup';
import { BlueprintSpecsModal } from './components/BlueprintSpecsModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { GrowthStrategistInsights } from './components/GrowthStrategistInsights';
import { Smartphone } from 'lucide-react';

const STORAGE_KEY = 'vibe_script_history_v1';

// Seed initial caption matching the blueprint
const INITIAL_CAPTION: GeneratedCaption = {
  id: 'seed-1',
  topic: 'iPhone camera settings that secretly ruin video sharpness',
  platform: 'TikTok',
  tone: 'engaging',
  hook: 'Stop scrolling right now 🛑',
  valueCta: 'Your iPhone defaults to 30fps smoothing that blurs your movement. Try this tonight and watch what happens.',
  tags: ['#fyp', '#iphonehacks', '#cameratips', '#contentcreator', '#viralvideo'],
  fullCaption:
    'Stop scrolling right now 🛑\n\nYour iPhone defaults to 30fps smoothing that blurs your movement. Try this tonight and watch what happens.\n\n#fyp #iphonehacks #cameratips #contentcreator #viralvideo',
  alternativeHooks: [
    'You are filming this all wrong 💀',
    'Turn off this hidden iPhone setting 🤫',
    'Delete this camera setting immediately 🚨',
  ],
  creatorTip: 'The 1-second visual pattern interrupt on line 1 prevents 73% of instant swipe-aways.',
  source: 'preset',
  createdAt: Date.now(),
};

export default function App() {
  const [topic, setTopic] = useState('iPhone camera settings that secretly ruin video sharpness');
  const [platform, setPlatform] = useState<Platform>('TikTok');
  const [tone, setTone] = useState<Tone>('engaging');
  const [hookAngle, setHookAngle] = useState<HookAngle>('curiosity');

  const [currentCaption, setCurrentCaption] = useState<GeneratedCaption>(INITIAL_CAPTION);
  const [history, setHistory] = useState<GeneratedCaption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      } else {
        setHistory([INITIAL_CAPTION]);
      }
    } catch {
      // Ignore
    }

    // Check server status
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(Boolean(data.hasApiKey));
      })
      .catch(() => {
        setHasApiKey(false);
      });
  }, []);

  // Save history to localStorage
  const saveToHistory = (newCap: GeneratedCaption) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== newCap.id);
      const updated = [newCap, ...filtered].slice(0, 30);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleGenerate = async (overrideTopic?: string, forceDemo = false) => {
    const queryTopic = overrideTopic || topic;
    if (!queryTopic.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: queryTopic,
          platform,
          tone,
          hookAngle,
          forceDemo,
        }),
      });

      const data = await response.json();

      const newCaption: GeneratedCaption = {
        id: `cap-${Date.now()}`,
        topic: queryTopic,
        platform,
        tone,
        fullCaption: data.fullCaption,
        hook: data.hook,
        valueCta: data.valueCta,
        tags: data.tags || [],
        alternativeHooks: data.alternativeHooks || [],
        creatorTip: data.creatorTip,
        source: data.source,
        createdAt: Date.now(),
      };

      setCurrentCaption(newCaption);
      saveToHistory(newCaption);
    } catch (err) {
      console.error('Failed to generate caption:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Allow swapping the hook (Line 1) with one of the generated A/B alternatives
  const handleSwapHook = (newHook: string) => {
    if (!currentCaption) return;
    const lines = currentCaption.fullCaption.split(/\r?\n/);
    lines[0] = newHook;
    const updatedFull = lines.join('\n');

    const updated: GeneratedCaption = {
      ...currentCaption,
      hook: newHook,
      fullCaption: updatedFull,
    };
    setCurrentCaption(updated);
    saveToHistory(updated);
  };

  // Direct manual editing of full caption
  const handleUpdateCaption = (newText: string) => {
    if (!currentCaption) return;
    const lines = newText.split(/\r?\n/);
    const updatedHook = lines[0] || '';
    const tagMatches = newText.match(/#[a-zA-Z0-9_]+/g) || [];

    const updated: GeneratedCaption = {
      ...currentCaption,
      hook: updatedHook,
      fullCaption: newText,
      tags: tagMatches,
    };
    setCurrentCaption(updated);
    saveToHistory(updated);
  };

  const complianceReport = analyzeCompliance(currentCaption?.fullCaption || '');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <Header hasApiKey={hasApiKey} onOpenGuide={() => setIsSpecsModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Hero Section */}
        <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span>Viral Growth Engine</span>
            <span>·</span>
            <span>Architectural Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
            Turn Rough Video Ideas Into Ready Captions.
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-3xl">
            Strict 5-part blueprint: under-7-word curiosity hooks with 1 emoji, punchy value/CTA, and calibrated niche tags without generic AI buzzwords.
          </p>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex lg:hidden items-center justify-center p-1 bg-neutral-950 border border-neutral-800 rounded-xl max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'editor'
                ? 'bg-white text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Editor & Blueprint
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-white text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone Preview</span>
          </button>
        </div>

        {/* Two-Column Grid: Left Workspace, Right Phone Mockup & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Inputs, Results, Compliance Auditor) */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              activeTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* 1. Generator Form */}
            <GeneratorForm
              topic={topic}
              setTopic={setTopic}
              platform={platform}
              setPlatform={setPlatform}
              tone={tone}
              setTone={setTone}
              hookAngle={hookAngle}
              setHookAngle={setHookAngle}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              onTryDemo={() => handleGenerate(undefined, true)}
            />

            {/* 2. Generated Caption Result */}
            {currentCaption && (
              <CaptionResult
                caption={currentCaption}
                onUpdateCaption={handleUpdateCaption}
                onSwapHook={handleSwapHook}
              />
            )}

            {/* 3. Compliance Inspector */}
            <ComplianceInspector report={complianceReport} />

            {/* 4. History Vault */}
            <HistoryDrawer
              history={history}
              onSelect={(cap) => {
                setCurrentCaption(cap);
                setPlatform(cap.platform);
                setTone(cap.tone);
              }}
              onClear={() => {
                setHistory([]);
                localStorage.removeItem(STORAGE_KEY);
              }}
              onDeleteOne={(id) => {
                setHistory((prev) => {
                  const filtered = prev.filter((item) => item.id !== id);
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
                  return filtered;
                });
              }}
            />
          </div>

          {/* Right Column (Phone Mockup & Platform Growth Playbook) */}
          <div
            className={`lg:col-span-5 space-y-6 ${
              activeTab === 'editor' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Phone Screen Mockup */}
            <PhoneMockup
              caption={currentCaption}
              activePlatform={platform}
            />

            {/* Platform Growth Engine Benchmarks */}
            <GrowthStrategistInsights platform={platform} />
          </div>
        </div>
      </main>

      {/* Blueprint Specs Modal */}
      <BlueprintSpecsModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-black py-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white uppercase tracking-wider">Vibe Script</span>
            <span>—</span>
            <span>Short-Form Caption Architecture</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-500">
            <span>TikTok · Reels · YouTube Shorts</span>
            <span>·</span>
            <button
              onClick={() => setIsSpecsModalOpen(true)}
              className="text-white hover:underline cursor-pointer"
            >
              Blueprint Guidelines
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
