import React from 'react';
import { Home, Youtube, Instagram, Sparkles } from 'lucide-react';

export type SidebarTab = 'home' | 'youtube' | 'tiktok' | 'instagram';

interface SidebarProps {
  currentTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  generatedCount: number;
}

// TikTok SVG Icon for clean monochrome consistency
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const TABS: { id: SidebarTab; label: string; icon: React.FC<{ className?: string }>; badge: string }[] = [
  { id: 'home', label: 'Home', icon: Home, badge: 'Overview' },
  { id: 'youtube', label: 'YouTube', icon: Youtube, badge: 'Shorts' },
  { id: 'tiktok', label: 'TikTok', icon: TikTokIcon, badge: 'FYP & Loops' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, badge: 'Reels & Saves' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  generatedCount,
}) => {
  return (
    <aside className="w-64 shrink-0 bg-[#070708] border-r border-neutral-800/80 min-h-screen flex flex-col justify-between p-4 select-none">
      <div className="space-y-6">
        {/* Brand Name */}
        <div className="px-2 pt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-black font-black flex items-center justify-center text-xs tracking-tighter">
              VS
            </div>
            <span className="text-[15px] font-bold tracking-tight text-white font-mono lowercase">
              vibescript.io
            </span>
          </div>
        </div>

        {/* Workspace Dropdown */}
        <div className="px-2.5 py-2 rounded-xl bg-neutral-900/40 border border-neutral-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              <span className="bg-gradient-to-tr from-neutral-700 to-neutral-500 w-full h-full flex items-center justify-center">
                AS
              </span>
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-neutral-200">
                Creator Studio
              </div>
              <div className="text-[10px] text-neutral-500 font-mono">
                Viral Architecture
              </div>
            </div>
          </div>
        </div>

        {/* 4 Dedicated Tabs: Home, YouTube, TikTok, Instagram */}
        <div className="space-y-1.5">
          <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
            Platform Workspaces
          </div>
          <nav className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-sm border border-neutral-700/80 font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-neutral-400'}`} />
                    <span className="tracking-tight">{tab.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-neutral-800 text-neutral-200'
                        : 'text-neutral-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Upgrade & Progress Section */}
      <div className="space-y-4 pt-6">
        <button
          type="button"
          onClick={() => {}}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 text-xs font-medium text-neutral-300 hover:text-white transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
          <span>Pro Viral Strategist</span>
        </button>

        <div className="space-y-1.5 px-1">
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <span>{Math.min(generatedCount, 5)}/5 generated scripts</span>
          </div>
          <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${Math.min((generatedCount / 5) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
