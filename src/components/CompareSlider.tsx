import React, { useState } from 'react';
import { Sliders, SplitSquareVertical, ArrowLeftRight, Check, Eye } from 'lucide-react';
import { RoomDesignResult } from '../types';

interface CompareSliderProps {
  options: RoomDesignResult[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  beforeImageUrl: string;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({
  options,
  selectedIndex,
  onSelectIndex,
  beforeImageUrl,
}) => {
  // Slider position from 0 to 100
  const [sliderVal, setSliderVal] = useState<number>(selectedIndex * 50);
  const [showSplitView, setShowSplitView] = useState<boolean>(false);
  const [splitPercent, setSplitPercent] = useState<number>(50);

  // When continuous slider moves:
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    if (val < 33) {
      if (selectedIndex !== 0) onSelectIndex(0);
    } else if (val < 67) {
      if (selectedIndex !== 1) onSelectIndex(1);
    } else {
      if (selectedIndex !== 2) onSelectIndex(2);
    }
  };

  const handleSelectOptionDirect = (idx: number) => {
    onSelectIndex(idx);
    setSliderVal(idx === 0 ? 0 : idx === 1 ? 50 : 100);
  };

  const currentOption = options[selectedIndex] || options[0];

  return (
    <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 mt-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE2D6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
              Interactive Room Comparator
            </span>
            <span className="text-[#C4B7A6]">·</span>
            <span className="text-xs text-[#7A6B5F]">Smooth Slider Bar</span>
          </div>
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2D2823] mt-0.5">
            Slide & Compare Renter Makeovers
          </h3>
          <p className="text-xs sm:text-sm text-[#6E5D50] mt-1">
            Slide smoothly to compare all 3 styling options on the same screen, or toggle the Before/After split inspection.
          </p>
        </div>

        {/* Toggle between 3-way compare and Split Before/After */}
        <div className="flex items-center bg-[#EFE9DF] p-1 rounded-xl self-start sm:self-auto border border-[#DDD3C4]">
          <button
            type="button"
            onClick={() => setShowSplitView(false)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              !showSplitView
                ? 'bg-[#FAF7F2] text-[#2D2823] shadow-xs'
                : 'text-[#6E5D50] hover:text-[#2D2823]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            3-Option Slider
          </button>
          <button
            type="button"
            onClick={() => setShowSplitView(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              showSplitView
                ? 'bg-[#FAF7F2] text-[#2D2823] shadow-xs'
                : 'text-[#6E5D50] hover:text-[#2D2823]'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            Before vs. After Split
          </button>
        </div>
      </div>

      {!showSplitView ? (
        /* 3-WAY COMPARISON SLIDER SCRUBBER */
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold text-[#5A4B40] mb-2 px-1">
            <button
              type="button"
              onClick={() => handleSelectOptionDirect(0)}
              className={`hover:text-[#2D2823] transition-colors cursor-pointer text-left ${
                selectedIndex === 0 ? 'text-[#8C5D39] font-bold' : ''
              }`}
            >
              Option 1 · {options[0]?.vibeName || 'Concept A'}
            </button>
            <button
              type="button"
              onClick={() => handleSelectOptionDirect(1)}
              className={`hover:text-[#2D2823] transition-colors cursor-pointer text-center ${
                selectedIndex === 1 ? 'text-[#8C5D39] font-bold' : ''
              }`}
            >
              Option 2 · {options[1]?.vibeName || 'Concept B'}
            </button>
            <button
              type="button"
              onClick={() => handleSelectOptionDirect(2)}
              className={`hover:text-[#2D2823] transition-colors cursor-pointer text-right ${
                selectedIndex === 2 ? 'text-[#8C5D39] font-bold' : ''
              }`}
            >
              Option 3 · {options[2]?.vibeName || 'Concept C'}
            </button>
          </div>

          {/* Interactive Range Input Slider */}
          <div className="relative py-4 px-1">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={sliderVal}
              onChange={handleScrubberChange}
              className="renter-slider w-full cursor-grab active:cursor-grabbing"
              aria-label="Compare 3 room design options"
            />

            {/* Visual Step Dots */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 w-3 h-3 rounded-full bg-[#FAF7F2] border-2 border-[#4A3B32] pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FAF7F2] border-2 border-[#4A3B32] pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 right-2 w-3 h-3 rounded-full bg-[#FAF7F2] border-2 border-[#4A3B32] pointer-events-none" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8C7A6E] mt-1 px-1">
            <span>Slide left for Option 1</span>
            <span className="font-medium text-[#4A3B32]">
              Currently Focused: {currentOption?.vibeName} ({currentOption?.conceptTitle})
            </span>
            <span>Slide right for Option 3</span>
          </div>

          {/* Mini active comparison preview strip */}
          <div className="mt-6 p-4 bg-[#F4EFE6] border border-[#DDD3C4] rounded-xl flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-48 aspect-4/3 rounded-lg overflow-hidden border border-[#D5C8B6] shrink-0">
              <img
                src={currentOption?.imageUrl}
                alt={currentOption?.conceptTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#8C5D39] uppercase tracking-wider">
                  Active Comparison View
                </span>
                <span className="text-xs text-[#B8A796]">·</span>
                <span className="text-xs font-bold text-[#2D2823]">
                  {currentOption?.vibeName}
                </span>
              </div>
              <h4 className="font-serif-display text-lg font-bold text-[#2D2823] mt-0.5">
                {currentOption?.conceptTitle}
              </h4>
              <p className="text-xs text-[#6E5D50] mt-1 leading-relaxed">
                {currentOption?.atmosphereDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-[#E3DACB] text-[11px]">
                <span className="font-semibold text-[#4A3B32]">Key Removable Items:</span>
                {currentOption?.renterChanges.slice(0, 3).map((item, i) => (
                  <span key={i} className="text-[#6B5B4E] bg-[#EAE2D5] px-2 py-0.5 rounded">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* BEFORE VS AFTER SPLIT SLIDER VIEW */
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-[#6E5D50] mb-3">
            <span className="font-semibold text-[#4A3B32] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#8C5D39]" />
              Interactive Transformation Wipe
            </span>
            <span className="text-[11px] text-[#7A6B5F]">
              Drag the center slider line to reveal Before vs. After
            </span>
          </div>

          {/* Interactive Split View Container */}
          <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-xl overflow-hidden select-none border border-[#D5C8B6] shadow-inner bg-[#E8E1D3]">
            {/* Background Layer: After Makeover Image */}
            <img
              src={currentOption?.imageUrl}
              alt="Makeover After"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#2D2823]/80 backdrop-blur-xs text-[#FAF7F2] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
              Makeover ({currentOption?.vibeName})
            </div>

            {/* Foreground Clipped Layer: Before Image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${splitPercent}%` }}
            >
              <img
                src={beforeImageUrl}
                alt="Original Rental Room Before"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#2D2823] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm border border-black/10">
                Original Room (Before)
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              style={{ left: `${splitPercent}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF7F2] text-[#2D2823] border border-[#DDD3C4] shadow-md flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 text-[#4A3B32]" />
              </div>
            </div>

            {/* Invisible Range Slider on top for smooth scrub */}
            <input
              type="range"
              min="0"
              max="100"
              value={splitPercent}
              onChange={(e) => setSplitPercent(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              aria-label="Slide to compare before and after room transformation"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#7A6B5F] mt-2 px-1">
            <span>← Original Builder-Grade Space</span>
            <span className="font-semibold text-[#4A3B32]">{splitPercent}% Transformation Wipe</span>
            <span>Transformed Renter Haven →</span>
          </div>
        </div>
      )}
    </div>
  );
};
