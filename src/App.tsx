/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Platform, Tone, HookAngle, Language, GeneratedCaption } from './types';
import { Sidebar, SidebarTab } from './components/Sidebar';
import { HeroCenterpiece } from './components/HeroCenterpiece';
import { RecentlyViewedGrid } from './components/RecentlyViewedGrid';
import { PlatformWorkspace } from './components/PlatformWorkspace';
import { CaptionStudioModal } from './components/CaptionStudioModal';
import { BlueprintSpecsModal } from './components/BlueprintSpecsModal';
import { HistoryDrawer } from './components/HistoryDrawer';

const STORAGE_KEY = 'vibe_script_history_v1';

// Seed initial caption
const INITIAL_CAPTION: GeneratedCaption = {
  id: 'seed-1',
  topic: 'Gym me bicep grow na hone ki sabse bari ghalti',
  platform: 'Instagram Reels',
  tone: 'engaging',
  language: 'roman-urdu',
  hook: 'Yeh ghalti foran band karo 🛑',
  valueCta: 'Agli video se pehle yeh save karlo. Aaj raat hi azmao aur fark dekho.',
  tags: ['#gymghalti', '#reelsviral', '#urdutips', '#fyp', '#desicreator'],
  fullCaption:
    'Yeh ghalti foran band karo 🛑\n\nAgli video se pehle yeh save karlo. Aaj raat hi azmao aur fark dekho.\n\n#gymghalti #reelsviral #urdutips #fyp #desicreator',
  alternativeHooks: [
    'Yeh secret koi nahi batata 🤫',
    '99% log yeh ghalti karte 💀',
    'Abhi yeh aadat badal lo ⏱️',
  ],
  creatorTip: 'Save aur share CTA Roman Urdu me audience ko foran action lene par majboor karta hai.',
  source: 'preset',
  createdAt: Date.now(),
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<SidebarTab>('home');
  const [platform, setPlatform] = useState<Platform>('Instagram Reels');
  const [topic, setTopic] = useState('Gym me bicep grow na hone ki sabse bari ghalti jo 90% log karte hain');
  const [tone, setTone] = useState<Tone>('engaging');
  const [hookAngle, setHookAngle] = useState<HookAngle>('curiosity');
  const [language, setLanguage] = useState<Language>('auto');

  const [currentCaption, setCurrentCaption] = useState<GeneratedCaption>(INITIAL_CAPTION);
  const [history, setHistory] = useState<GeneratedCaption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Sync sidebar tab selection with target platform
  const handleTabChange = (tab: SidebarTab) => {
    setCurrentTab(tab);
    if (tab === 'youtube') {
      setPlatform('YouTube Shorts');
    } else if (tab === 'tiktok') {
      setPlatform('TikTok');
    } else if (tab === 'instagram') {
      setPlatform('Instagram Reels');
    }
  };

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
  }, []);

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

  const handleGenerate = async (overrideTopic?: string, targetPlatform?: Platform) => {
    const queryTopic = overrideTopic || topic;
    const activePlatform = targetPlatform || platform;
    if (!queryTopic.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: queryTopic,
          platform: activePlatform,
          tone,
          hookAngle,
          language,
        }),
      });

      const data = await response.json();

      const newCaption: GeneratedCaption = {
        id: `cap-${Date.now()}`,
        topic: queryTopic,
        platform: activePlatform,
        tone,
        language: data.language || language,
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

      // If on home, open studio modal so user sees results immediately
      if (currentTab === 'home') {
        setIsStudioOpen(true);
      }
    } catch (err) {
      console.error('Failed to generate caption:', err);
    } finally {
      setIsGenerating(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#070708] text-white flex font-sans selection:bg-white selection:text-black">
      {/* 4 Tabs Sidebar: Home, YouTube, TikTok, Instagram */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        generatedCount={history.length}
      />

      {/* Main Screen Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        {/* Tab 1: Home Dashboard Overview */}
        {currentTab === 'home' && (
          <main className="flex-1 flex flex-col justify-between">
            <HeroCenterpiece
              topic={topic}
              setTopic={setTopic}
              platform={platform}
              setPlatform={setPlatform}
              tone={tone}
              setTone={setTone}
              hookAngle={hookAngle}
              setHookAngle={setHookAngle}
              language={language}
              setLanguage={setLanguage}
              isGenerating={isGenerating}
              onGenerate={() => handleGenerate()}
              onOpenPhone={() => setIsStudioOpen(true)}
              onOpenSpecs={() => setIsSpecsOpen(true)}
            />

            <RecentlyViewedGrid
              history={history}
              onSelectCaption={(cap) => {
                setCurrentCaption(cap);
                setPlatform(cap.platform);
                setTone(cap.tone);
                if (cap.language) setLanguage(cap.language);
                setIsStudioOpen(true);
              }}
              onOpenVault={() => setIsVaultOpen(true)}
            />
          </main>
        )}

        {/* Tab 2: YouTube Dedicated Workspace (Only YouTube Shorts + Side Mobile Preview) */}
        {currentTab === 'youtube' && (
          <main className="flex-1">
            <PlatformWorkspace
              platform="YouTube Shorts"
              topic={topic}
              setTopic={setTopic}
              tone={tone}
              setTone={setTone}
              hookAngle={hookAngle}
              setHookAngle={setHookAngle}
              language={language}
              setLanguage={setLanguage}
              currentCaption={
                currentCaption?.platform === 'YouTube Shorts'
                  ? currentCaption
                  : null
              }
              isGenerating={isGenerating}
              onGenerate={(t) => handleGenerate(t, 'YouTube Shorts')}
              onUpdateCaption={handleUpdateCaption}
              onSwapHook={handleSwapHook}
              onOpenSpecs={() => setIsSpecsOpen(true)}
            />
          </main>
        )}

        {/* Tab 3: TikTok Dedicated Workspace (Only TikTok + Side Mobile Preview) */}
        {currentTab === 'tiktok' && (
          <main className="flex-1">
            <PlatformWorkspace
              platform="TikTok"
              topic={topic}
              setTopic={setTopic}
              tone={tone}
              setTone={setTone}
              hookAngle={hookAngle}
              setHookAngle={setHookAngle}
              language={language}
              setLanguage={setLanguage}
              currentCaption={
                currentCaption?.platform === 'TikTok'
                  ? currentCaption
                  : null
              }
              isGenerating={isGenerating}
              onGenerate={(t) => handleGenerate(t, 'TikTok')}
              onUpdateCaption={handleUpdateCaption}
              onSwapHook={handleSwapHook}
              onOpenSpecs={() => setIsSpecsOpen(true)}
            />
          </main>
        )}

        {/* Tab 4: Instagram Dedicated Workspace (Only Instagram Reels + Side Mobile Preview) */}
        {currentTab === 'instagram' && (
          <main className="flex-1">
            <PlatformWorkspace
              platform="Instagram Reels"
              topic={topic}
              setTopic={setTopic}
              tone={tone}
              setTone={setTone}
              hookAngle={hookAngle}
              setHookAngle={setHookAngle}
              language={language}
              setLanguage={setLanguage}
              currentCaption={
                currentCaption?.platform === 'Instagram Reels'
                  ? currentCaption
                  : null
              }
              isGenerating={isGenerating}
              onGenerate={(t) => handleGenerate(t, 'Instagram Reels')}
              onUpdateCaption={handleUpdateCaption}
              onSwapHook={handleSwapHook}
              onOpenSpecs={() => setIsSpecsOpen(true)}
            />
          </main>
        )}
      </div>

      {/* Studio Modal for Home Quick View */}
      <CaptionStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        caption={currentCaption}
        onUpdateCaption={handleUpdateCaption}
        onSwapHook={handleSwapHook}
        platform={platform}
        setPlatform={setPlatform}
      />

      {/* Blueprint System Specs Modal */}
      <BlueprintSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* Script Vault Drawer Modal */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c0c0e] border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                All Saved Scripts ({history.length})
              </h3>
              <button
                type="button"
                onClick={() => setIsVaultOpen(false)}
                className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded-lg hover:bg-neutral-800 transition cursor-pointer"
              >
                Close
              </button>
            </div>
            <HistoryDrawer
              history={history}
              onSelect={(cap) => {
                setCurrentCaption(cap);
                setPlatform(cap.platform);
                setTone(cap.tone);
                if (cap.language) setLanguage(cap.language);
                setIsVaultOpen(false);

                // Switch to that platform's tab automatically
                if (cap.platform === 'YouTube Shorts') setCurrentTab('youtube');
                else if (cap.platform === 'TikTok') setCurrentTab('tiktok');
                else if (cap.platform === 'Instagram Reels') setCurrentTab('instagram');
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
        </div>
      )}
    </div>
  );
}
