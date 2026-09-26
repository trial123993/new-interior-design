export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  colors: ColorSwatch[];
}

export interface StyleVibe {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  keyElements: string[];
  recommendedPalettes: string[];
}

export interface RenterItem {
  category: 'Wall Finish' | 'Flooring' | 'Furniture' | 'Lighting' | 'Textiles';
  title: string;
  renterBenefit: string;
  removability: 'Peel & Stick' | 'Freestanding' | 'Layered' | 'Plug-in' | 'Tension Rod';
}

export interface RoomDesignResult {
  id: string;
  vibeId: string;
  vibeName: string;
  conceptTitle: string;
  paletteName: string;
  paletteColors: string[];
  imageUrl: string;
  atmosphereDescription: string;
  renterChanges: RenterItem[];
  landlordSafetyScore: number; // always 100%
  structuralImpact: '0% Structural Changes (Walls & Windows Untouched)';
}

export interface DemoRoom {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  colorHex: string;
  textureLabel: string;
  priceModifier?: number;
}

export interface CatalogFurnitureItem {
  id: string;
  name: string;
  category: 'Furniture' | 'Rugs' | 'Lighting' | 'Wall Finish' | 'Decor';
  basePrice: number;
  removability: 'Freestanding' | 'Layered' | 'Plug-in' | 'Peel & Stick' | 'Tension Rod';
  description: string;
  iconName: string;
  defaultWidth: number;
  defaultHeight: number;
  materials: MaterialOption[];
  defaultMaterialId: string;
}

export interface CanvasPlacedItem {
  instanceId: string;
  catalogId: string;
  name: string;
  category: 'Furniture' | 'Rugs' | 'Lighting' | 'Wall Finish' | 'Decor';
  price: number;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  width: number; // in pixels
  height: number; // in pixels
  rotation: number; // degrees
  activeMaterialId: string;
  activeMaterialName: string;
  activeColorHex: string;
  materials: MaterialOption[];
  removability: 'Freestanding' | 'Layered' | 'Plug-in' | 'Peel & Stick' | 'Tension Rod';
  iconName: string;
}
