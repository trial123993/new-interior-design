import React, { useRef, useState, useEffect } from 'react';
import { 
  Trash2, 
  Move, 
  Palette, 
  Sparkles, 
  Info,
  Maximize2,
  Armchair,
  Layers,
  Check
} from 'lucide-react';
import { useRoomStudio } from '../context/RoomStudioContext';
import { CanvasPlacedItem } from '../types';

interface InteractiveRoomCanvasProps {
  roomImageUrl: string;
}

export const InteractiveRoomCanvas: React.FC<InteractiveRoomCanvasProps> = ({ roomImageUrl }) => {
  const {
    placedItems,
    selectedItemId,
    selectItem,
    updateItemPosition,
    removeItemFromCanvas,
    updateItemMaterial,
  } = useRoomStudio();

  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isNearTrashZone, setIsNearTrashZone] = useState<boolean>(false);

  // Global mouse move and mouse up handlers for smooth dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingItemId || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate percentage coordinates relative to container
      const mouseX = e.clientX - rect.left - dragOffset.x;
      const mouseY = e.clientY - rect.top - dragOffset.y;

      const percentX = (mouseX / rect.width) * 100;
      const percentY = (mouseY / rect.height) * 100;

      // Check if dragged outside boundaries (e.g. < -5% or > 95%) or into bottom trash strip
      const isOutOfBounds = percentX < -8 || percentX > 98 || percentY < -8 || percentY > 96;
      setIsNearTrashZone(isOutOfBounds);

      updateItemPosition(draggingItemId, percentX, percentY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!draggingItemId || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - dragOffset.x;
      const mouseY = e.clientY - rect.top - dragOffset.y;

      const percentX = (mouseX / rect.width) * 100;
      const percentY = (mouseY / rect.height) * 100;

      // If dragged off canvas, subtract cost immediately by removing item!
      if (percentX < -5 || percentX > 95 || percentY < -5 || percentY > 95) {
        removeItemFromCanvas(draggingItemId);
      } else {
        // Clamp smoothly inside canvas
        const clampedX = Math.max(2, Math.min(88, percentX));
        const clampedY = Math.max(2, Math.min(88, percentY));
        updateItemPosition(draggingItemId, clampedX, clampedY);
      }

      setDraggingItemId(null);
      setIsNearTrashZone(false);
    };

    if (draggingItemId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingItemId, dragOffset, removeItemFromCanvas, updateItemPosition]);

  const handleMouseDown = (e: React.MouseEvent, item: CanvasPlacedItem) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    selectItem(item.instanceId);
    setDraggingItemId(item.instanceId);

    // Calculate initial mouse click offset within item element
    const itemPxX = (item.x / 100) * rect.width;
    const itemPxY = (item.y / 100) * rect.height;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setDragOffset({
      x: clickX - itemPxX,
      y: clickY - itemPxY,
    });
  };

  const selectedItem = placedItems.find((i) => i.instanceId === selectedItemId);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Canvas Header Bar */}
      <div className="flex items-center justify-between pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#3D322A] flex items-center gap-1.5">
            <Armchair className="w-3.5 h-3.5 text-[#8C5D39]" />
            Live Staging Canvas
          </span>
          <span className="text-[#A59485]">·</span>
          <span className="text-[#7A6B5F]">
            Drag pieces freely · Drag off canvas to remove & subtract cost
          </span>
        </div>

        <span className="hidden sm:inline-block text-[11px] text-[#5C704C] bg-[#E9F0E1] px-2 py-0.5 rounded font-medium">
          Zero Wall/Window Damage
        </span>
      </div>

      {/* Main Interactive Stage Area */}
      <div
        ref={containerRef}
        onClick={() => selectItem(null)}
        className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-[#D5C8B6] bg-[#E8E1D3] shadow-inner select-none cursor-default group"
      >
        {/* Background Room Photo (Real layout & windows preserved) */}
        <img
          src={roomImageUrl}
          alt="Rental Room Canvas"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95"
        />

        {/* Ambient Warm Gradient Filter to integrate mock furniture smoothly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

        {/* Drop Off Boundary Warning / Zone */}
        {draggingItemId && (
          <div
            className={`absolute inset-0 border-4 border-dashed transition-all duration-300 pointer-events-none flex items-center justify-center ${
              isNearTrashZone
                ? 'border-[#BD5843] bg-[#BD5843]/15'
                : 'border-[#8C5D39]/40 bg-black/5'
            }`}
          >
            {isNearTrashZone && (
              <div className="bg-[#BD5843] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
                <Trash2 className="w-4 h-4" />
                Release to Remove Piece & Subtract Cost
              </div>
            )}
          </div>
        )}

        {/* PLACED FURNITURE ITEMS ON CANVAS */}
        {placedItems.map((item) => {
          const isSelected = selectedItemId === item.instanceId;
          const isDragging = draggingItemId === item.instanceId;

          return (
            <div
              key={item.instanceId}
              onMouseDown={(e) => handleMouseDown(e, item)}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                zIndex: isDragging ? 30 : isSelected ? 20 : item.category === 'Rugs' ? 10 : 15,
              }}
              className={`absolute select-none cursor-grab active:cursor-grabbing transition-transform duration-150 ${
                isDragging ? 'scale-105 shadow-2xl opacity-90' : 'hover:scale-102 shadow-lg'
              }`}
            >
              {/* Furniture Tactile Visual Representation */}
              <div
                className={`fluid-furniture-item relative rounded-xl p-3.5 border flex flex-col items-center justify-center backdrop-blur-xs ${
                  isSelected
                    ? 'ring-2 ring-[#4A3B32] ring-offset-2 ring-offset-transparent border-[#4A3B32]'
                    : 'border-white/40 hover:border-white/80'
                }`}
                style={{
                  backgroundColor: item.activeColorHex,
                  color: ['#FAF6ED', '#FAF3E8', '#F6F0E6', '#DDD1C1', '#DED3C4', '#EAE4DA'].includes(
                    item.activeColorHex
                  )
                    ? '#2D2823'
                    : '#FAF7F2',
                  minWidth: `${Math.max(90, item.width * 0.75)}px`,
                  minHeight: `${Math.max(65, item.height * 0.55)}px`,
                }}
              >
                {/* Drag Handle & Removability Indicator */}
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-90 mb-1">
                  <Move className="w-3 h-3 stroke-[2.5]" />
                  <span>{item.category}</span>
                </div>

                {/* Title */}
                <span className="text-xs font-bold text-center leading-tight max-w-[130px] drop-shadow-xs">
                  {item.name}
                </span>

                {/* Material and price tag */}
                <div className="mt-1 flex items-center gap-1.5 text-[10px] opacity-95">
                  <span className="font-medium truncate max-w-[85px]">
                    {item.activeMaterialName}
                  </span>
                  <span>·</span>
                  <span className="font-mono font-bold">${item.price}</span>
                </div>

                {/* Subtle depth bottom shadow for tactile furniture feel */}
                <div className="absolute -bottom-2 inset-x-2 h-2 bg-black/20 blur-xs rounded-full -z-10 pointer-events-none" />
              </div>
            </div>
          );
        })}

        {/* Selected Item Floating Inspector Card */}
        {selectedItem && !draggingItemId && (
          <div
            className="absolute bottom-4 left-4 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D5C8B6] rounded-xl p-3.5 shadow-xl flex items-center gap-4 text-xs animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display font-bold text-[#2D2823]">
                  {selectedItem.name}
                </span>
                <span className="font-mono font-bold text-[#8C5D39]">
                  ${selectedItem.price}
                </span>
              </div>
              <p className="text-[11px] text-[#7A6B5F] mt-0.5">
                {selectedItem.activeMaterialName} ({selectedItem.removability})
              </p>
            </div>

            {/* Quick Material Swapper */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-[#E2D8CA]">
              <span className="text-[10px] uppercase font-bold text-[#8C7A6E]">Finish:</span>
              {selectedItem.materials.map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => updateItemMaterial(selectedItem.instanceId, mat.id)}
                  className={`w-5 h-5 rounded-full border transition-all duration-300 cursor-pointer ${
                    selectedItem.activeMaterialId === mat.id
                      ? 'ring-2 ring-[#4A3B32] scale-110'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: mat.colorHex }}
                  title={`${mat.name} (${mat.textureLabel})`}
                />
              ))}
            </div>

            {/* Quick Remove Button */}
            <button
              type="button"
              onClick={() => removeItemFromCanvas(selectedItem.instanceId)}
              className="p-1.5 rounded-lg text-[#BD5843] hover:bg-[#FBEBE8] transition-colors cursor-pointer pl-3 border-l border-[#E2D8CA]"
              title="Remove item (subtracts cost immediately)"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
