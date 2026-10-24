import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';

interface TopNavProps {
  onOpenSpecs: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenSpecs }) => {
  return (
    <header className="h-14 px-8 flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-900/60 bg-transparent z-20">
      <div className="flex-1" />

      {/* Center Links */}
      <nav className="flex items-center gap-7 text-[13px] font-normal text-neutral-400">
        <button
          type="button"
          onClick={onOpenSpecs}
          className="hover:text-white transition cursor-pointer"
        >
          Product
        </button>
        <button
          type="button"
          onClick={onOpenSpecs}
          className="flex items-center gap-1 hover:text-white transition cursor-pointer"
        >
          <span>Resources</span>
          <ChevronDown className="w-3 h-3 text-neutral-500" />
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="hover:text-white transition cursor-pointer"
        >
          Pricing
        </button>
        <button
          type="button"
          onClick={onOpenSpecs}
          className="hover:text-white transition cursor-pointer"
        >
          Docs
        </button>
      </nav>

      {/* Right Notification Icon */}
      <div className="flex-1 flex justify-end items-center">
        <button
          type="button"
          onClick={() => {}}
          className="relative p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white ring-2 ring-black" />
        </button>
      </div>
    </header>
  );
};
