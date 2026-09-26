import { CatalogFurnitureItem } from '../types';

export const RENTER_FURNITURE_CATALOG: CatalogFurnitureItem[] = [
  {
    id: 'walnut-credenza',
    name: 'Walnut Lowline Credenza',
    category: 'Furniture',
    basePrice: 340,
    removability: 'Freestanding',
    description: 'Slatted sliding doors with warm wood grain. Completely freestanding.',
    iconName: 'Tv2',
    defaultWidth: 170,
    defaultHeight: 90,
    defaultMaterialId: 'mat-walnut',
    materials: [
      { id: 'mat-walnut', name: 'Warm Walnut', colorHex: '#5C3822', textureLabel: 'Oiled Grain', priceModifier: 0 },
      { id: 'mat-oak', name: 'Natural White Oak', colorHex: '#B59473', textureLabel: 'Matte Oak', priceModifier: -20 },
      { id: 'mat-ash', name: 'Smoked Ebonized Ash', colorHex: '#282421', textureLabel: 'Charcoal Grain', priceModifier: 30 },
    ],
  },
  {
    id: 'boucle-armchair',
    name: 'Curved Bouclé Lounge Chair',
    category: 'Furniture',
    basePrice: 285,
    removability: 'Freestanding',
    description: 'Cloud-soft sculptural cocoon chair. Adds instant warmth to empty corners.',
    iconName: 'Armchair',
    defaultWidth: 120,
    defaultHeight: 110,
    defaultMaterialId: 'mat-boucle-cream',
    materials: [
      { id: 'mat-boucle-cream', name: 'Bouclé Cream', colorHex: '#F6F0E6', textureLabel: 'Textured Fleece', priceModifier: 0 },
      { id: 'mat-linen-oat', name: 'Oatmeal Linen', colorHex: '#DDD1C1', textureLabel: 'Raw Flax', priceModifier: -15 },
      { id: 'mat-terracotta-velvet', name: 'Terracotta Wool', colorHex: '#B35D43', textureLabel: 'Warm Weave', priceModifier: 25 },
    ],
  },
  {
    id: 'geometric-wool-rug',
    name: 'Geometric 8x10 Area Rug',
    category: 'Rugs',
    basePrice: 220,
    removability: 'Layered',
    description: 'Plush hand-tufted wool. Completely covers builder-grade carpet.',
    iconName: 'LayoutGrid',
    defaultWidth: 200,
    defaultHeight: 140,
    defaultMaterialId: 'mat-rug-terracotta',
    materials: [
      { id: 'mat-rug-terracotta', name: 'Terracotta & Sand', colorHex: '#C56A4F', textureLabel: 'Hand-Tufted', priceModifier: 0 },
      { id: 'mat-rug-caramel', name: 'Caramel & Cream', colorHex: '#A87042', textureLabel: 'High-Low Pile', priceModifier: 15 },
      { id: 'mat-rug-sage', name: 'Sage & Flax', colorHex: '#7B896B', textureLabel: 'Flatweave Wool', priceModifier: -10 },
    ],
  },
  {
    id: 'brass-arc-lamp',
    name: 'Arched Brass Floor Lamp',
    category: 'Lighting',
    basePrice: 145,
    removability: 'Plug-in',
    description: 'Sweeping overhead light with foot switch. Zero electrical drilling.',
    iconName: 'Lamp',
    defaultWidth: 100,
    defaultHeight: 150,
    defaultMaterialId: 'mat-brass',
    materials: [
      { id: 'mat-brass', name: 'Polished Brass', colorHex: '#C99E55', textureLabel: 'Brushed Metal', priceModifier: 0 },
      { id: 'mat-bronze', name: 'Warm Antique Bronze', colorHex: '#524336', textureLabel: 'Patina Bronze', priceModifier: 10 },
      { id: 'mat-matte-black', name: 'Matte Cast Iron', colorHex: '#22201E', textureLabel: 'Powder Coat', priceModifier: -10 },
    ],
  },
  {
    id: 'rattan-chair',
    name: 'Woven Rattan Accent Chair',
    category: 'Furniture',
    basePrice: 195,
    removability: 'Freestanding',
    description: 'Airy natural woven frame with linen cushion. Lightweight for moving.',
    iconName: 'Armchair',
    defaultWidth: 110,
    defaultHeight: 110,
    defaultMaterialId: 'mat-honey-cane',
    materials: [
      { id: 'mat-honey-cane', name: 'Honey Rattan', colorHex: '#C49658', textureLabel: 'Natural Cane', priceModifier: 0 },
      { id: 'mat-bleached-cane', name: 'Bleached Sand Cane', colorHex: '#E2D3BE', textureLabel: 'Sun-Bleached', priceModifier: 15 },
      { id: 'mat-dark-roast', name: 'Dark Roasted Rattan', colorHex: '#422F22', textureLabel: 'Stained Cane', priceModifier: 10 },
    ],
  },
  {
    id: 'removable-wallpaper',
    name: 'Peel-and-Stick Accent Wall',
    category: 'Wall Finish',
    basePrice: 85,
    removability: 'Peel & Stick',
    description: 'Self-adhesive woven wallpaper. Peels off with zero residue or wall damage.',
    iconName: 'Sparkles',
    defaultWidth: 160,
    defaultHeight: 100,
    defaultMaterialId: 'mat-paper-terracotta',
    materials: [
      { id: 'mat-paper-terracotta', name: 'Warm Terracotta Arch', colorHex: '#BD6448', textureLabel: 'Matte Woven', priceModifier: 0 },
      { id: 'mat-paper-limewash', name: 'Oatmeal Limewash', colorHex: '#E0D4C3', textureLabel: 'Plaster Texture', priceModifier: 10 },
      { id: 'mat-paper-sage', name: 'Sage Botanical Mural', colorHex: '#6F7E5C', textureLabel: 'Subtle Print', priceModifier: 15 },
    ],
  },
  {
    id: 'layered-jute-rug',
    name: 'Layered Woven Jute Rug',
    category: 'Rugs',
    basePrice: 165,
    removability: 'Layered',
    description: 'Natural chunky braided jute rug with non-slip felt subfloor protector.',
    iconName: 'LayoutGrid',
    defaultWidth: 190,
    defaultHeight: 130,
    defaultMaterialId: 'mat-jute-natural',
    materials: [
      { id: 'mat-jute-natural', name: 'Natural Honey Jute', colorHex: '#A38155', textureLabel: 'Braided Plant Fiber', priceModifier: 0 },
      { id: 'mat-jute-bleached', name: 'Bleached Ivory Jute', colorHex: '#D6C8B4', textureLabel: 'Sunwashed Jute', priceModifier: 10 },
      { id: 'mat-jute-caramel', name: 'Dark Caramel Jute', colorHex: '#694B2E', textureLabel: 'Roasted Fiber', priceModifier: 5 },
    ],
  },
  {
    id: 'ceramic-table-lamp',
    name: 'Ribbed Ceramic Table Glow',
    category: 'Lighting',
    basePrice: 75,
    removability: 'Plug-in',
    description: 'Pleated linen shade with tactile ceramic ribbed base. 2700K warm glow.',
    iconName: 'Lamp',
    defaultWidth: 70,
    defaultHeight: 85,
    defaultMaterialId: 'mat-ceramic-oat',
    materials: [
      { id: 'mat-ceramic-oat', name: 'Oatmeal Stoneware', colorHex: '#DED3C4', textureLabel: 'Matte Ribbed Clay', priceModifier: 0 },
      { id: 'mat-ceramic-terracotta', name: 'Unglazed Terracotta', colorHex: '#B25D42', textureLabel: 'Raw Clay', priceModifier: 5 },
      { id: 'mat-ceramic-olive', name: 'Moss Olive Glaze', colorHex: '#5F6B4C', textureLabel: 'Satin Ceramic', priceModifier: 10 },
    ],
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig & Clay Pot',
    category: 'Decor',
    basePrice: 65,
    removability: 'Freestanding',
    description: 'Lush 5-foot statement indoor tree in raw clay planter with water tray.',
    iconName: 'Flower2',
    defaultWidth: 75,
    defaultHeight: 130,
    defaultMaterialId: 'mat-pot-terracotta',
    materials: [
      { id: 'mat-pot-terracotta', name: 'Raw Terracotta Pot', colorHex: '#B66649', textureLabel: 'Baked Earth', priceModifier: 0 },
      { id: 'mat-pot-white', name: 'Speckled White Stone', colorHex: '#EAE4DA', textureLabel: 'Handmade Glaze', priceModifier: 10 },
      { id: 'mat-pot-charcoal', name: 'Basalt Charcoal Clay', colorHex: '#35302C', textureLabel: 'Matte Basalt', priceModifier: 12 },
    ],
  },
];

/**
 * Initial sample layout presets to populate the canvas
 */
export function getInitialCanvasItems(): Array<{
  catalogId: string;
  x: number;
  y: number;
  rotation?: number;
  materialId?: string;
}> {
  return [
    { catalogId: 'geometric-wool-rug', x: 26, y: 55, materialId: 'mat-rug-terracotta' },
    { catalogId: 'walnut-credenza', x: 42, y: 35, materialId: 'mat-walnut' },
    { catalogId: 'boucle-armchair', x: 18, y: 42, materialId: 'mat-boucle-cream' },
    { catalogId: 'brass-arc-lamp', x: 74, y: 22, materialId: 'mat-brass' },
    { catalogId: 'fiddle-leaf-fig', x: 82, y: 48, materialId: 'mat-pot-terracotta' },
  ];
}
