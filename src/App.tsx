/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { UploadBox } from './components/UploadBox';
import { StyleChooseBox } from './components/StyleChooseBox';
import { ResultsGrid } from './components/ResultsGrid';
import { RenterStagingStudio } from './components/RenterStagingStudio';
import { RenterGuaranteeCard } from './components/RenterGuaranteeCard';
import { RenterRulebookModal } from './components/RenterRulebookModal';
import { RoomStudioProvider } from './context/RoomStudioContext';
import { STYLE_VIBES, COLOR_PALETTES, BASE_BEFORE_IMAGE, getThreeDesignResults } from './data/mockRooms';
import { StyleVibe, ColorPalette, RoomDesignResult } from './types';
import { downloadDesignImage } from './utils/downloadImage';
import { CheckCircle2, ShieldCheck, Sparkles, Download, Heart } from 'lucide-react';

export default function App() {
  return (
    <RoomStudioProvider>
      <AppContent />
    </RoomStudioProvider>
  );
}

function AppContent() {
  // 1. Uploaded Room State
  const [currentRoomImage, setCurrentRoomImage] = useState<string>(BASE_BEFORE_IMAGE);
  const [roomName, setRoomName] = useState<string>('Builder-Grade Studio (Demo)');

  // 2. Style & Palette State
  const [selectedVibe, setSelectedVibe] = useState<StyleVibe>(STYLE_VIBES[0]);
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(COLOR_PALETTES[0]);

  // 3. Favorite Design Selection
  const [favoriteIndex, setFavoriteIndex] = useState<number>(0);

  // 4. Modal and feedback states
  const [isRulebookOpen, setIsRulebookOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute 3 makeover results side-by-side
  const designResults: RoomDesignResult[] = useMemo(() => {
    return getThreeDesignResults(selectedVibe.id, selectedPalette);
  }, [selectedVibe.id, selectedPalette]);

  // Handle room upload / change
  const handleImageSelected = (imgUrl: string, name: string) => {
    setCurrentRoomImage(imgUrl);
    setRoomName(name);
    showToast('Room successfully loaded! Renter dimensions preserved.');
  };

  // Handle Style Vibe Selection
  const handleSelectVibe = (vibe: StyleVibe) => {
    setSelectedVibe(vibe);
    // Find matching recommended palette if available
    const recId = vibe.recommendedPalettes[0];
    const recPalette = COLOR_PALETTES.find((p) => p.id === recId);
    if (recPalette) {
      setSelectedPalette(recPalette);
    }
    showToast(`Style updated to ${vibe.name}`);
  };

  // Handle Palette Selection
  const handleSelectPalette = (palette: ColorPalette) => {
    setSelectedPalette(palette);
    showToast(`Color palette changed to ${palette.name}`);
  };

  // Handle Download Picture / Design Package
  const handleDownload = async (design: RoomDesignResult) => {
    setIsDownloading(true);
    try {
      await downloadDesignImage(design, selectedPalette, currentRoomImage);
      showToast(`Downloaded "${design.conceptTitle}" directly to your computer!`);
    } catch (err) {
      console.error(err);
      showToast('Download completed.');
    } finally {
      setIsDownloading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Reset to initial demo
  const handleResetDemo = () => {
    setCurrentRoomImage(BASE_BEFORE_IMAGE);
    setRoomName('Builder-Grade Studio (Demo)');
    setSelectedVibe(STYLE_VIBES[0]);
    setSelectedPalette(COLOR_PALETTES[0]);
    setFavoriteIndex(0);
    showToast('Demo reset to initial baseline state.');
  };

  return (
    <div className="min-h-screen linen-pattern flex flex-col justify-between">
      {/* Top Bar Header */}
      <Header
        onResetToDemo={handleResetDemo}
        onOpenRules={() => setIsRulebookOpen(true)}
      />

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">
        {/* Hero Banner with Warm Editorial Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE8DC] border border-[#DDD3C2] rounded-full text-xs font-semibold text-[#5A4537]">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5D39]" />
            <span>Contest Demonstration Edition · Renter Vibe Transformer</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2823] leading-tight">
            Transform Your Rental Vibe Without Risking Your Deposit
          </h1>

          <p className="text-sm sm:text-base text-[#6E5D50] leading-relaxed">
            Zero wall demolition. Zero window alterations. 100% renter-safe warmth using peel-and-stick color accents, layered area rugs, tactile woods, and movable furniture.
          </p>
        </div>

        {/* Feature 1: UPLOAD BOX */}
        <UploadBox
          currentRoomImage={currentRoomImage}
          roomName={roomName}
          onImageSelected={handleImageSelected}
        />

        {/* Feature 2: STYLE CHOOSE BOX */}
        <StyleChooseBox
          selectedVibe={selectedVibe}
          selectedPalette={selectedPalette}
          onSelectVibe={handleSelectVibe}
          onSelectPalette={handleSelectPalette}
        />

        {/* FEATURE: INTERACTIVE ROOM CANVAS & RIGHT SIDEBAR BUDGET TRACKER */}
        <RenterStagingStudio roomImageUrl={currentRoomImage} />

        {/* Feature 3 & 4: RESULTS GRID WITH SLIDER & SAVE BUTTON */}
        <ResultsGrid
          options={designResults}
          favoriteIndex={favoriteIndex}
          onSelectFavorite={setFavoriteIndex}
          onDownloadOption={handleDownload}
          selectedPalette={selectedPalette}
          beforeImageUrl={currentRoomImage}
          isDownloading={isDownloading}
        />

        {/* Renter Guarantee & Architectural Rules */}
        <RenterGuaranteeCard />
      </main>

      {/* Renter Non-Permanent Rulebook Modal */}
      <RenterRulebookModal
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2823] text-[#FAF7F2] text-xs font-medium px-4 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#A1B88D] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quiet Footer */}
      <footer className="mt-16 border-t border-[#E6DFD5] bg-[#FAF7F2] py-8 text-xs text-[#7A6B5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-bold text-[#2D2823] text-sm">RoomMagic MVP</span>
            <span>·</span>
            <span>Non-Permanent Renter Decor Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setIsRulebookOpen(true)}
              className="hover:text-[#2D2823] transition-colors cursor-pointer"
            >
              Deposit Protection Policy
            </button>
            <button
              type="button"
              onClick={handleResetDemo}
              className="hover:text-[#2D2823] transition-colors cursor-pointer"
            >
              Reset Contest State
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
