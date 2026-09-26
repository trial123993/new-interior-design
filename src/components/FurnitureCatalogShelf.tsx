import React, { useState } from 'react';
import { Plus, Check, Armchair, LayoutGrid, Lamp, Sparkles, Flower2 } from 'lucide-react';
import { RENTER_FURNITURE_CATALOG } from '../data/furnitureCatalog';
import { useRoomStudio } from '../context/RoomStudioContext';
import { CatalogFurnitureItem } from '../types';

export const FurnitureCatalogShelf: React.FC = () => {
  const { addItemToCanvas, placedItems } = useRoomStudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Furniture', 'Rugs', 'Lighting', 'Wall Finish', 'Decor'];

  const filteredItems = selectedCategory === 'All'
    ? RENTER_FURNITURE_CATALOG
    : RENTER_FURNITURE_CATALOG.filter((item) => item.category === selectedCategory);

  return (
    <div className="mt-6 bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E1D5]">
        <div>
          <h3 className="font-serif-display text-base font-bold text-[#2D2823] flex items-center gap-2">
            <span>Renter Furnishing Tray</span>
            <span className="text-xs text-[#8C7A6E] font-normal">
              · Click to place onto room canvas
            </span>
          </h3>
          <p className="text-xs text-[#6E5D50] mt-0.5">
            Every piece is 100% lease-safe and automatically tracked in your real-time budget.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE9DF] rounded-xl border border-[#DDD3C4]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FAF7F2] text-[#2D2823] font-bold shadow-xs'
                  : 'text-[#6E5D50] hover:text-[#2D2823]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {filteredItems.map((item) => {
          const countOnCanvas = placedItems.filter((i) => i.catalogId === item.id).length;

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] hover:border-[#B5A593] hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-xs text-[#2D2823]">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#5C704C] font-medium">
                      {item.removability}
                    </span>
                  </div>

                  <span className="font-mono font-bold text-xs text-[#2D2823] bg-[#EAE2D5] px-2 py-0.5 rounded">
                    ${item.basePrice}
                  </span>
                </div>

                <p className="text-[11px] text-[#7A6B5F] mt-1.5 line-clamp-2">
                  {item.description}
                </p>

                {/* Available material swatches preview */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] text-[#8C7A6E]">Finishes:</span>
                  {item.materials.map((mat) => (
                    <span
                      key={mat.id}
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: mat.colorHex }}
                      title={`${mat.name} (${mat.textureLabel})`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#EAE3D7] flex items-center justify-between">
                {countOnCanvas > 0 ? (
                  <span className="text-[11px] text-[#4E6B41] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {countOnCanvas} on canvas
                  </span>
                ) : (
                  <span className="text-[11px] text-[#8C7A6E]">Ready to stage</span>
                )}

                <button
                  type="button"
                  onClick={() => addItemToCanvas(item)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#4A3B32] hover:bg-[#342720] active:scale-95 rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add to Canvas
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
