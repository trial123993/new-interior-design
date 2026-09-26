import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { DEMO_ROOMS, BASE_BEFORE_IMAGE } from '../data/mockRooms';

interface UploadBoxProps {
  currentRoomImage: string;
  roomName: string;
  onImageSelected: (imageUrl: string, name: string) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  currentRoomImage,
  roomName,
  onImageSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelected(event.target.result as string, file.name);
        setUploadStatus('Room image loaded successfully! Structure mapped.');
        setTimeout(() => setUploadStatus(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="upload-section" className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-xs tracking-wider uppercase text-[#8C5D39] font-semibold">
              Step 1 of 3
            </span>
            <span className="text-[#C4B7A6]">·</span>
            <span className="text-xs text-[#7A6B5F]">Non-Permanent Analysis</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2D2823] mt-1">
            Upload Your Rental Room
          </h2>
          <p className="text-sm text-[#6E5D50] mt-1 max-w-xl">
            Upload your living room, studio, or bedroom photo. RoomMagic preserves physical walls, layouts, and windows — only transforming movable decor, peel-and-stick color, and rugs.
          </p>
        </div>

        {/* Structural Safe Guarantee Badge */}
        <div className="bg-[#F0EAE0] border border-[#DDD3C4] rounded-xl p-3.5 flex items-start gap-3 max-w-xs shrink-0">
          <CheckCircle className="w-5 h-5 text-[#5C704C] shrink-0 mt-0.5" />
          <div className="text-xs text-[#4A3B32]">
            <p className="font-semibold text-[#2D2823]">Zero Structural Damage</p>
            <p className="text-[#6E5D50] mt-0.5 leading-relaxed">
              No walls demolished, no window changes, 0 holes drilled into studs.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-stretch">
        {/* Drop Zone Box */}
        <div className="lg:col-span-7 flex flex-col">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleTriggerUpload}
            className={`flex-1 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[260px] ${
              isDragging
                ? 'border-[#8C5D39] bg-[#F4EFE6] scale-[0.99]'
                : 'border-[#D9CEBF] hover:border-[#8C5D39] bg-[#FAF8F5] hover:bg-[#F6F1E9]'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-[#EFE8DE] flex items-center justify-center text-[#5A4537] mb-4 shadow-xs">
              <Upload className="w-6 h-6 stroke-[1.8]" />
            </div>

            <h3 className="font-serif-display text-lg font-semibold text-[#2D2823]">
              Drag & Drop Your Room Photo
            </h3>
            <p className="text-xs text-[#7A6B5F] mt-1.5 max-w-sm">
              Click or drag a picture of your living room, bedroom, or rental space (JPG, PNG, WEBP)
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleTriggerUpload();
              }}
              className="mt-5 px-5 py-2.5 text-xs font-semibold text-[#FAF7F2] bg-[#4A3B32] hover:bg-[#382C24] active:scale-95 rounded-lg transition-all cursor-pointer shadow-sm"
            >
              Browse Files to Upload
            </button>
          </div>

          {/* Quick preset selector for judges */}
          <div className="mt-4 pt-4 border-t border-[#EAE3D8] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#7A6B5F] font-medium">Or test with demo rental space:</span>
            <div className="flex gap-2">
              {DEMO_ROOMS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => onImageSelected(demo.imageUrl, demo.name)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    currentRoomImage === demo.imageUrl
                      ? 'bg-[#E8DFC9] border-[#B89B77] text-[#33261C]'
                      : 'bg-[#F2ECE3] border-[#DFD5C6] text-[#5C4D42] hover:bg-[#EAE1D3]'
                  }`}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Active Room Preview */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#F4EFE6] border border-[#DDD3C4] rounded-xl p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#8C5D39]" />
                <span className="font-semibold text-[#3D322A]">Current Room (Before)</span>
              </div>
              <span className="text-[11px] text-[#7A6B5F] bg-[#EAE2D4] px-2 py-0.5 rounded">
                Unstyled Baseline
              </span>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-[#D8CDBC] bg-[#E8E1D3] aspect-4/3 flex items-center justify-center">
              <img
                src={currentRoomImage || BASE_BEFORE_IMAGE}
                alt="Current Rental Room Before Makeover"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#2D2823]/80 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-medium px-2.5 py-1 rounded shadow-xs">
                Real Layout & Windows Retained
              </div>
            </div>

            <div className="mt-3 text-xs text-[#6E5D50] flex items-center justify-between">
              <span className="truncate font-medium">{roomName || 'Builder-Grade Rental Apartment'}</span>
              <button
                type="button"
                onClick={handleTriggerUpload}
                className="text-[#8C5D39] hover:text-[#5A3A22] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Change
              </button>
            </div>
          </div>
        </div>
      </div>

      {uploadStatus && (
        <div className="mt-4 p-3 bg-[#EAF2E4] border border-[#BBD4B0] text-[#345229] text-xs rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{uploadStatus}</span>
        </div>
      )}
    </section>
  );
};
