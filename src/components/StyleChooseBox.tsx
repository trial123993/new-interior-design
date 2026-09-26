import React from 'react';
import { Sparkles, Palette, Layers, Check } from 'lucide-react';
import { StyleVibe, ColorPalette } from '../types';
import { STYLE_VIBES, COLOR_PALETTES } from '../data/mockRooms';

interface StyleChooseBoxProps {
  selectedVibe: StyleVibe;
  selectedPalette: ColorPalette;
  onSelectVibe: (vibe: StyleVibe) => void;
  onSelectPalette: (palette: ColorPalette) => void;
}

export const StyleChooseBox: React.FC<StyleChooseBoxProps> = ({
  selectedVibe,
  selectedPalette,
  onSelectVibe,
  onSelectPalette,
}) => {
  return (
    <section id="style-section" className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="pb-6 border-b border-[#E8E1D5]">
        <div className="flex items-center gap-2">
          <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
            Step 2 of 3
          </span>
          <span className="text-[#C4B7A6]">·</span>
          <span className="text-xs text-[#7A6B5F]">Aesthetic Direction</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2D2823] mt-1">
          Pick Style Vibe & Color Combination
        </h2>
        <p className="text-sm text-[#6E5D50] mt-1 max-w-2xl">
          Choose the mood you want to evoke. Each vibe is carefully tailored with 100% removable rental furnishings, peel-and-stick accents, and zero structural changes.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {/* Style Vibe Selection Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3B32] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8C5D39]" />
              Select Style Vibe
            </label>
            <span className="text-xs text-[#8C7A6E]">3 Renter-Friendly Aesthetics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STYLE_VIBES.map((vibe) => {
              const isSelected = selectedVibe.id === vibe.id;
              return (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => onSelectVibe(vibe)}
                  className={`text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#F2ECE3] border-[#8C5D39] ring-2 ring-[#8C5D39]/20 shadow-sm'
                      : 'bg-[#FAF8F5] border-[#DFD6C7] hover:border-[#B5A593] hover:bg-[#F7F2EB]'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#4A3B32] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  )}

                  <div>
                    <h3 className="font-serif-display text-lg font-bold text-[#2D2823] pr-8">
                      {vibe.name}
                    </h3>
                    <p className="text-xs font-medium text-[#8C5D39] mt-0.5">
                      {vibe.subtitle}
                    </p>
                    <p className="text-xs text-[#6E5D50] mt-3 leading-relaxed">
                      {vibe.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E4DC CF] text-[11px] text-[#7A6B5F]">
                    <span className="font-semibold text-[#4A3B32]">Key Renter Pieces: </span>
                    <span>{vibe.keyElements.slice(0, 2).join(', ')}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Combination Picker */}
        <div className="pt-6 border-t border-[#EAE3D8]">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3B32] flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#8C5D39]" />
              Select Color Combination
            </label>
            <span className="text-xs text-[#8C7A6E]">5 Curated Warm Renter Palettes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {COLOR_PALETTES.map((palette) => {
              const isSelected = selectedPalette.id === palette.id;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => onSelectPalette(palette)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#F2ECE3] border-[#8C5D39] ring-2 ring-[#8C5D39]/20 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#DFD6C7] hover:border-[#B5A593] hover:bg-[#F7F2EB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif-display text-sm font-bold text-[#2D2823]">
                      {palette.name}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] font-semibold text-[#8C5D39] bg-[#EAE0D3] px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Swatches strip */}
                  <div className="flex items-center gap-1.5 mt-3">
                    {palette.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-7 rounded border border-black/10 shadow-2xs relative group"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} (${color.hex})`}
                      />
                    ))}
                  </div>

                  <p className="text-[11px] text-[#7A6B5F] mt-2.5 line-clamp-1">
                    {palette.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Palette Details Bar */}
          <div className="mt-5 p-3.5 bg-[#F2EDE5] border border-[#DDD3C4] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#3D322A]">Chosen Swatch Tones:</span>
              <span className="text-[#6E5D50]">{selectedPalette.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {selectedPalette.colors.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[11px] text-[#5C4C40]">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
