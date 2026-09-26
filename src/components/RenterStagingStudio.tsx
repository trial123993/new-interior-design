import React from 'react';
import { InteractiveRoomCanvas } from './InteractiveRoomCanvas';
import { RenterBudgetTracker } from './RenterBudgetTracker';
import { FurnitureCatalogShelf } from './FurnitureCatalogShelf';
import { Sparkles, DollarSign, ShieldCheck } from 'lucide-react';

interface RenterStagingStudioProps {
  roomImageUrl: string;
}

export const RenterStagingStudio: React.FC<RenterStagingStudioProps> = ({ roomImageUrl }) => {
  return (
    <section id="staging-studio-section" className="space-y-6">
      <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
                Interactive Staging & Budget Studio
              </span>
              <span className="text-[#C4B7A6]">·</span>
              <span className="text-xs text-[#7A6B5F]">Real-Time Cost Engine</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2D2823] mt-1">
              Live Renter Room Canvas & Budget
            </h2>
            <p className="text-sm text-[#6E5D50] mt-1 max-w-2xl leading-relaxed">
              Drag, arrange, and customize non-permanent furnishings directly in your space. The Right Sidebar continuously tracks your total expenditure and guarantees 0% deposit risk.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs bg-[#EFE9DF] px-3.5 py-2 rounded-xl border border-[#DDD3C4]">
            <ShieldCheck className="w-4 h-4 text-[#4E6B41]" />
            <span className="font-semibold text-[#3D322A]">
              100% Non-Permanent Staging
            </span>
          </div>
        </div>

        {/* 2-COLUMN STUDIO: Canvas on Left, Renter Budget Tracker on Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Left Canvas Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <InteractiveRoomCanvas roomImageUrl={roomImageUrl} />
            <FurnitureCatalogShelf />
          </div>

          {/* Right Sidebar: Renter Budget Tracker (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <RenterBudgetTracker />
          </div>
        </div>
      </div>
    </section>
  );
};
