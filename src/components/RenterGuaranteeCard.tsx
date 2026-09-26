import React from 'react';
import { ShieldCheck, Ban, CheckCircle2, Home } from 'lucide-react';

export const RenterGuaranteeCard: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 mt-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
              The Renter Standard
            </span>
            <span className="text-[#C4B7A6]">·</span>
            <span className="text-xs text-[#7A6B5F]">Deposit Protection Guarantee</span>
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#2D2823] mt-1">
            Never Alters Structural Items
          </h3>
          <p className="text-sm text-[#6E5D50] mt-1 max-w-2xl">
            RoomMagic is strictly engineered for tenants. We transform the mood, warmth, and texture of your space without ever violating your lease agreement.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-[#EFE8DD] border border-[#DDD3C2] rounded-xl self-start md:self-auto">
          <ShieldCheck className="w-5 h-5 text-[#4E6B41]" />
          <span className="text-xs font-bold text-[#352B24]">100% Lease & Landlord Approved</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Strictly Permitted Renter Items */}
        <div className="bg-[#F3EFE7] border border-[#DDD3C4] rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#3C572D] uppercase tracking-wide mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#4E6B41]" />
            What RoomMagic Changes (Non-Permanent)
          </div>
          <ul className="space-y-2.5 text-xs text-[#524439]">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Paint & Walls:</span>
              <span>Peel-and-stick murals, water-based removable wallpaper, or landlord-approved warm paint coats that can be primed back.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Area Rugs:</span>
              <span>Layered plush wool & jute rugs placed over existing landlord laminate or carpet with non-staining felt pads.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Movable Furniture:</span>
              <span>Freestanding walnut consoles, rattan seating, and bouclé armchairs that move out with you on moving day.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Lighting & Curtains:</span>
              <span>Spring-tension curtain rods (zero drill holes) and plug-in arc lamps with 2700K warm incandescent glow.</span>
            </li>
          </ul>
        </div>

        {/* Never Changed / Strict Structural Prohibition */}
        <div className="bg-[#F7F2EB] border border-[#E0D7C9] rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8C5D39] uppercase tracking-wide mb-3">
            <Ban className="w-4 h-4 text-[#A84A3B]" />
            Strictly Prohibited Structural Changes
          </div>
          <ul className="space-y-2.5 text-xs text-[#524439]">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Physical Walls:</span>
              <span>Never knocks down, alters, cuts, or moves drywall, studs, or partitions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Real Windows:</span>
              <span>Window frames, glass panes, sills, and hardware remain 100% physically intact.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Room Layout & Geometry:</span>
              <span>Doorways, structural columns, and room dimensions are strictly preserved.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#352B24]">· Electrical/Plumbing:</span>
              <span>No rewiring behind walls, no hardwired fixtures, zero plumbing relocation.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
