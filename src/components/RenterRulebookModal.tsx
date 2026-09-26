import React from 'react';
import { X, ShieldCheck, Check, Ban } from 'lucide-react';

interface RenterRulebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RenterRulebookModal: React.FC<RenterRulebookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#7A6B5F] hover:text-[#2D2823] hover:bg-[#EFE9DF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#4E6B41]" />
          <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-bold">
            Landlord Approved Standard
          </span>
        </div>

        <h2 className="font-serif-display text-2xl font-bold text-[#2D2823] mt-2">
          The Non-Permanent Renter Manifesto
        </h2>

        <p className="text-sm text-[#6E5D50] mt-2 leading-relaxed">
          Renters deserve a home that feels like an intentional sanctuary without risking their security deposit. RoomMagic adheres to strict architectural boundaries:
        </p>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-[#F2ECE3] border border-[#DDD3C2] rounded-xl">
            <h3 className="font-bold text-sm text-[#2D2823] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4E6B41] stroke-[3]" />
              Rule 1: Never Demolish or Relocate Real Walls
            </h3>
            <p className="text-xs text-[#6E5D50] mt-1 leading-relaxed">
              Every drywall plane, corner stud, and partition remains untouched. Color is brought in through water-based peel-and-stick murals or low-VOC primer-safe paints that wash or peel clean on move-out day.
            </p>
          </div>

          <div className="p-4 bg-[#F2ECE3] border border-[#DDD3C2] rounded-xl">
            <h3 className="font-bold text-sm text-[#2D2823] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4E6B41] stroke-[3]" />
              Rule 2: Respect Real Windows & Daylight Framing
            </h3>
            <p className="text-xs text-[#6E5D50] mt-1 leading-relaxed">
              Real window casings, glass panes, and hardware are preserved. Softness is added using non-damaging spring tension curtain rods and floor-length breathable linen drapes.
            </p>
          </div>

          <div className="p-4 bg-[#F2ECE3] border border-[#DDD3C2] rounded-xl">
            <h3 className="font-bold text-sm text-[#2D2823] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4E6B41] stroke-[3]" />
              Rule 3: Subfloor Protection with Layered Rugs
            </h3>
            <p className="text-xs text-[#6E5D50] mt-1 leading-relaxed">
              Instead of tearing up landlord carpet or refinishing floorboards, we layer textured 100% natural wool and woven jute rugs with 1/4" non-skid felt backing.
            </p>
          </div>

          <div className="p-4 bg-[#F5EBE8] border border-[#E3CBC4] rounded-xl">
            <h3 className="font-bold text-sm text-[#8C3A2B] flex items-center gap-2">
              <Ban className="w-4 h-4 text-[#A84A3B] stroke-[2.5]" />
              Rule 4: Zero Hardwired Electrical or Plumbing Holes
            </h3>
            <p className="text-xs text-[#6E5D50] mt-1 leading-relaxed">
              Lighting transformations use high-CRI 2700K plug-in arc lamps, USB-rechargeable wall sconces (mounted via 3M Command strips), and ambient ceramic base fixtures.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8E1D5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-[#FAF7F2] bg-[#4A3B32] hover:bg-[#382C24] rounded-lg transition-colors cursor-pointer"
          >
            Understood & Return to Studio
          </button>
        </div>
      </div>
    </div>
  );
};
