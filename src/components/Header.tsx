import React from 'react';

interface HeaderProps {
  onResetToDemo: () => void;
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResetToDemo, onOpenRules }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E6DFD5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text wordmark in display face */}
        <div className="flex items-center gap-3">
          <a href="#" className="font-serif-display text-2xl font-bold tracking-tight text-[#2D2823] hover:text-[#4A3B32] transition-colors">
            RoomMagic <span className="text-[#8C5D39] text-xl font-normal italic">MVP</span>
          </a>
          <span className="hidden sm:inline-block text-xs font-medium text-[#7D6B5D] bg-[#EFE9DF] px-2.5 py-1 rounded-md">
            Renter-Friendly Studio
          </span>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B5A4E]">
          <button 
            type="button"
            onClick={onOpenRules} 
            className="hover:text-[#2D2823] transition-colors cursor-pointer"
          >
            Non-Permanent Guarantee
          </button>
          <a href="#upload-section" className="hover:text-[#2D2823] transition-colors">
            Upload Room
          </a>
          <a href="#style-section" className="hover:text-[#2D2823] transition-colors">
            Style & Palette
          </a>
          <a href="#staging-studio-section" className="hover:text-[#2D2823] transition-colors text-[#8C5D39] font-semibold">
            Canvas & Budget
          </a>
          <a href="#results-section" className="hover:text-[#2D2823] transition-colors">
            Makeover Results
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onResetToDemo}
            className="px-4 py-2 text-xs font-semibold text-[#4A3B32] bg-[#EBE3D7] hover:bg-[#E2D8CA] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Reset Demo
          </button>
        </div>
      </div>
    </header>
  );
};
