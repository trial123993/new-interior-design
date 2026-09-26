import { RoomDesignResult, ColorPalette } from '../types';

/**
 * Downloads the room design result image directly to user's computer.
 */
export async function downloadDesignImage(
  design: RoomDesignResult,
  palette: ColorPalette,
  beforeImageSrc?: string
): Promise<void> {
  try {
    // Generate a high-end presentation card via HTML5 canvas
    const canvas = document.createElement('canvas');
    const width = 1400;
    const height = 1100;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      // Fallback simple download
      const link = document.createElement('a');
      link.href = design.imageUrl;
      link.download = `RoomMagic-${design.vibeName.replace(/\s+/g, '-')}-Design.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // 1. Draw warm cream background
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, width, height);

    // Subtle warm linen pattern / borders
    ctx.fillStyle = '#F2ECE4';
    ctx.fillRect(40, 40, width - 80, height - 80);

    ctx.strokeStyle = '#D9CEBF';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // 2. Draw Header
    ctx.fillStyle = '#2D2823';
    ctx.font = 'bold 36px "Fraunces", Georgia, serif';
    ctx.fillText('RoomMagic MVP', 70, 95);

    ctx.fillStyle = '#735E50';
    ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Renter-Friendly Non-Permanent Transformation Plan', 70, 125);

    // Landlord Safety Stamp
    ctx.fillStyle = '#4A3B32';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Landlord Guarantee: 0% Structural Impact', width - 420, 100);

    ctx.fillStyle = '#8C7769';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Walls, windows & structure 100% untouched', width - 420, 122);

    // Divider line
    ctx.strokeStyle = '#E0D5C7';
    ctx.beginPath();
    ctx.moveTo(70, 150);
    ctx.lineTo(width - 70, 150);
    ctx.stroke();

    // 3. Load and Draw Main After Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = design.imageUrl;

    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // continue gracefully even if image fails
    });

    if (img.complete && img.naturalWidth > 0) {
      // Draw image in card with rounded corners effect
      const imgX = 70;
      const imgY = 180;
      const imgW = 780;
      const imgH = 585;

      ctx.save();
      ctx.fillStyle = '#E5DED4';
      ctx.fillRect(imgX, imgY, imgW, imgH);
      ctx.drawImage(img, imgX, imgY, imgW, imgH);
      ctx.restore();

      // Image Label
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(imgX + 20, imgY + 20, 230, 36);
      ctx.fillStyle = '#2D2823';
      ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`TRANSFORMED · ${design.vibeName.toUpperCase()}`, imgX + 32, imgY + 43);
    }

    // 4. Draw Right Details Sidebar
    const sideX = 890;
    let currentY = 210;

    // Style Title
    ctx.fillStyle = '#2D2823';
    ctx.font = 'bold 28px "Fraunces", Georgia, serif';
    ctx.fillText(design.vibeName, sideX, currentY);
    currentY += 30;

    ctx.fillStyle = '#735E50';
    ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(design.conceptTitle, sideX, currentY);
    currentY += 45;

    // Color Palette section
    ctx.fillStyle = '#4A3B32';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Color Palette: ${palette.name}`, sideX, currentY);
    currentY += 22;

    // Draw Palette Swatches
    palette.colors.forEach((col, idx) => {
      const swX = sideX + idx * 80;
      // Color box
      ctx.fillStyle = col.hex;
      ctx.fillRect(swX, currentY, 68, 40);
      ctx.strokeStyle = '#D9CEBF';
      ctx.strokeRect(swX, currentY, 68, 40);

      // Color label
      ctx.fillStyle = '#5A4E46';
      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(col.name.slice(0, 11), swX, currentY + 56);
      ctx.fillText(col.hex, swX, currentY + 70);
    });
    currentY += 100;

    // Non-Permanent Renter Checklist
    ctx.fillStyle = '#2D2823';
    ctx.font = 'bold 16px "Fraunces", Georgia, serif';
    ctx.fillText('100% Non-Permanent Renter Items:', sideX, currentY);
    currentY += 28;

    design.renterChanges.forEach((item, index) => {
      // Checkmark icon simulation
      ctx.fillStyle = '#7C8A69';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✓', sideX, currentY);

      // Title & Removability
      ctx.fillStyle = '#2D2823';
      ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`${item.title} (${item.removability})`, sideX + 22, currentY);
      currentY += 18;

      // Benefit
      ctx.fillStyle = '#735E50';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(item.renterBenefit.slice(0, 52), sideX + 22, currentY);
      currentY += 28;
    });

    // 5. Draw Footer Notes
    const footerY = 820;
    ctx.strokeStyle = '#E0D5C7';
    ctx.beginPath();
    ctx.moveTo(70, footerY);
    ctx.lineTo(width - 70, footerY);
    ctx.stroke();

    ctx.fillStyle = '#4A3B32';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('The Renter Vibe Rule: Style with freedom, leave with your entire security deposit.', 70, footerY + 45);

    ctx.fillStyle = '#8C7769';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Exported from RoomMagic MVP for Contest Demonstration · Non-destructive interior styling engine', 70, footerY + 72);

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RoomMagic-${design.vibeName.replace(/\s+/g, '-')}-Renter-Makeover.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (err) {
    console.error('Error generating design download:', err);
    // Direct fallback
    const link = document.createElement('a');
    link.href = design.imageUrl;
    link.download = `RoomMagic-${design.vibeName.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
