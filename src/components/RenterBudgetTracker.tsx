import React from 'react';
import { 
  DollarSign, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw, 
  SlidersHorizontal,
  Layers,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useRoomStudio } from '../context/RoomStudioContext';

interface RenterBudgetTrackerProps {
  onOpenCatalog?: () => void;
}

export const RenterBudgetTracker: React.FC<RenterBudgetTrackerProps> = ({ onOpenCatalog }) => {
  const {
    placedItems,
    selectedItemId,
    budgetCap,
    totalCost,
    remainingBudget,
    budgetPercentage,
    isOverBudget,
    depositRiskAmount,
    removeItemFromCanvas,
    updateItemMaterial,
    selectItem,
    clearCanvas,
    resetToDefaultLayout,
    setBudgetCap,
  } = useRoomStudio();

  return (
    <aside className="w-full lg:w-96 flex flex-col bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl shadow-xs overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="p-5 border-b border-[#E8E1D5] bg-[#F5EFEB]/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5C704C] animate-pulse" />
            <h3 className="font-serif-display text-base font-bold text-[#2D2823] tracking-tight">
              Renter Budget Tracker
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#5C704C] bg-[#E9F0E1] px-2 py-0.5 rounded-md border border-[#D0E2C2]">
            Live Real-Time
          </span>
        </div>
        <p className="text-xs text-[#7A6B5F] mt-1 leading-relaxed">
          Sums combined cost of all non-permanent pieces currently placed on the room canvas.
        </p>
      </div>

      {/* Main Reactive Budget Card */}
      <div className="p-5 border-b border-[#E8E1D5] bg-gradient-to-b from-[#FAF7F2] to-[#F5ECE1]/60">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-[#8C5D39] uppercase tracking-wider">
            Combined Canvas Total
          </span>
          <span className="text-xs text-[#7A6B5F]">
            Limit: ${budgetCap.toLocaleString()}
          </span>
        </div>

        {/* Big Reactive Tally */}
        <div className="mt-2 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1 text-[#2D2823]">
            <span className="fluid-budget-counter font-serif-display text-3xl sm:text-4xl font-bold tracking-tight font-mono tabular-nums">
              ${totalCost.toLocaleString()}
            </span>
            <span className="text-xs text-[#8C7A6E] font-medium">USD</span>
          </div>

          <div className={`text-right text-xs font-semibold ${isOverBudget ? 'text-[#A84A3B]' : 'text-[#4E6B41]'}`}>
            {isOverBudget ? (
              <span>+${Math.abs(remainingBudget).toLocaleString()} over budget</span>
            ) : (
              <span>${remainingBudget.toLocaleString()} remaining</span>
            )}
          </div>
        </div>

        {/* Fluid Animated Progress Bar */}
        <div className="mt-3 w-full bg-[#E5DED4] h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isOverBudget
                ? 'bg-[#BD5843]'
                : budgetPercentage > 80
                ? 'bg-[#C98A44]'
                : 'bg-[#5C704C]'
            }`}
            style={{ width: `${budgetPercentage}%` }}
          />
        </div>

        {/* Deposit Risk Indicator (Always $0 for Renters) */}
        <div className="mt-4 pt-3 border-t border-[#E8DFD3] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#4E6B41]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="font-semibold">Security Deposit Risk:</span>
          </div>
          <span className="font-bold text-[#352B24] font-mono tabular-nums">
            ${depositRiskAmount.toFixed(2)} (0% Risk)
          </span>
        </div>
      </div>

      {/* Itemized Staged Furniture List */}
      <div className="flex-1 p-5 overflow-y-auto max-h-[380px] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#4A3B32] uppercase tracking-wide flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#8C5D39]" />
            Placed Items on Canvas ({placedItems.length})
          </span>
          {placedItems.length > 0 && (
            <button
              type="button"
              onClick={clearCanvas}
              className="text-[11px] text-[#A84A3B] hover:text-[#7A2F23] font-semibold transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {placedItems.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#8C7A6E] border-2 border-dashed border-[#DDD3C4] rounded-xl p-4">
            <p className="font-semibold text-[#4A3B32]">Canvas is Empty</p>
            <p className="mt-1 text-[#7A6B5F]">
              Drag or click furniture pieces from the staging shelf below to add them to your room.
            </p>
            {onOpenCatalog && (
              <button
                type="button"
                onClick={onOpenCatalog}
                className="mt-3 px-3 py-1.5 text-xs font-semibold text-[#4A3B32] bg-[#EAE2D5] hover:bg-[#DDD3C2] rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Renter Furniture
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {placedItems.map((item) => {
              const isSelected = selectedItemId === item.instanceId;
              return (
                <div
                  key={item.instanceId}
                  onClick={() => selectItem(item.instanceId)}
                  className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F2EDE5] border-[#8C5D39] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E2D9CC] hover:border-[#C4B4A2]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15 transition-colors duration-300"
                          style={{ backgroundColor: item.activeColorHex }}
                        />
                        <h4 className="font-semibold text-xs text-[#2D2823] truncate">
                          {item.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7A6B5F]">
                        <span>{item.activeMaterialName}</span>
                        <span>·</span>
                        <span className="text-[#5C704C] font-medium">{item.removability}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold font-mono tabular-nums text-[#2D2823]">
                        ${item.price}
                      </span>
                      {/* Immediate Remove Button: Subtracts cost reactively */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItemFromCanvas(item.instanceId);
                        }}
                        className="p-1 rounded-md text-[#9B897D] hover:text-[#BD5843] hover:bg-[#FBEBE8] transition-colors cursor-pointer"
                        title="Remove from room (subtracts cost immediately)"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Material Switcher Swatches */}
                  <div className="mt-2.5 pt-2 border-t border-[#E8E0D4] flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#8C7A6E]">
                      Material Finish:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {item.materials.map((mat) => {
                        const isMatActive = item.activeMaterialId === mat.id;
                        return (
                          <button
                            key={mat.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateItemMaterial(item.instanceId, mat.id);
                            }}
                            className={`fluid-material-swatch w-4 h-4 rounded-full border cursor-pointer ${
                              isMatActive
                                ? 'ring-2 ring-[#4A3B32] ring-offset-1 scale-115 border-black/30'
                                : 'border-black/20 hover:scale-110 opacity-75 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: mat.colorHex }}
                            title={`${mat.name} (${mat.textureLabel})`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Utility Actions */}
      <div className="p-4 border-t border-[#E8E1D5] bg-[#F5EFEB]/80 flex items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={resetToDefaultLayout}
          className="flex items-center gap-1.5 text-xs font-medium text-[#6B5A4E] hover:text-[#2D2823] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Staging
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-[#7A6B5F]">
          <span>Cap:</span>
          {[1200, 1500, 2000].map((cap) => (
            <button
              key={cap}
              type="button"
              onClick={() => setBudgetCap(cap)}
              className={`px-1.5 py-0.5 rounded font-mono cursor-pointer transition-colors ${
                budgetCap === cap
                  ? 'bg-[#4A3B32] text-white font-bold'
                  : 'bg-[#EAE2D5] text-[#5C4C40] hover:bg-[#DFD6C6]'
              }`}
            >
              ${cap}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
