import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { CatalogFurnitureItem, CanvasPlacedItem, MaterialOption } from '../types';
import { RENTER_FURNITURE_CATALOG, getInitialCanvasItems } from '../data/furnitureCatalog';

interface RoomStudioContextType {
  placedItems: CanvasPlacedItem[];
  selectedItemId: string | null;
  budgetCap: number;
  totalCost: number;
  remainingBudget: number;
  budgetPercentage: number;
  isOverBudget: boolean;
  depositRiskAmount: number; // Always $0.00 for renter-safe items
  addItemToCanvas: (catalogItem: CatalogFurnitureItem, position?: { x: number; y: number }) => void;
  removeItemFromCanvas: (instanceId: string) => void;
  updateItemPosition: (instanceId: string, x: number, y: number) => void;
  updateItemMaterial: (instanceId: string, materialId: string) => void;
  selectItem: (instanceId: string | null) => void;
  clearCanvas: () => void;
  resetToDefaultLayout: () => void;
  setBudgetCap: (cap: number) => void;
}

const RoomStudioContext = createContext<RoomStudioContextType | undefined>(undefined);

export const RoomStudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budgetCap, setBudgetCap] = useState<number>(1500);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Initialize with initial stylish layout
  const [placedItems, setPlacedItems] = useState<CanvasPlacedItem[]>(() => {
    const initialPreset = getInitialCanvasItems();
    return initialPreset.map((preset, index) => {
      const catalog = RENTER_FURNITURE_CATALOG.find((c) => c.id === preset.catalogId) || RENTER_FURNITURE_CATALOG[0];
      const matId = preset.materialId || catalog.defaultMaterialId;
      const mat = catalog.materials.find((m) => m.id === matId) || catalog.materials[0];
      const price = catalog.basePrice + (mat.priceModifier || 0);

      return {
        instanceId: `item-${Date.now()}-${index}`,
        catalogId: catalog.id,
        name: catalog.name,
        category: catalog.category,
        price,
        x: preset.x,
        y: preset.y,
        width: catalog.defaultWidth,
        height: catalog.defaultHeight,
        rotation: preset.rotation || 0,
        activeMaterialId: mat.id,
        activeMaterialName: mat.name,
        activeColorHex: mat.colorHex,
        materials: catalog.materials,
        removability: catalog.removability,
        iconName: catalog.iconName,
      };
    });
  });

  // REACTIVE BUDGET SUM: Reactively sums up combined cost of all furniture items placed onto canvas
  const totalCost = useMemo(() => {
    return placedItems.reduce((acc, item) => acc + item.price, 0);
  }, [placedItems]);

  const remainingBudget = useMemo(() => {
    return budgetCap - totalCost;
  }, [budgetCap, totalCost]);

  const budgetPercentage = useMemo(() => {
    if (budgetCap <= 0) return 100;
    return Math.min(100, Math.round((totalCost / budgetCap) * 100));
  }, [totalCost, budgetCap]);

  const isOverBudget = totalCost > budgetCap;

  // Add Item to Canvas
  const addItemToCanvas = useCallback((catalogItem: CatalogFurnitureItem, position?: { x: number; y: number }) => {
    const mat = catalogItem.materials.find((m) => m.id === catalogItem.defaultMaterialId) || catalogItem.materials[0];
    const price = catalogItem.basePrice + (mat.priceModifier || 0);

    // Default position with slight offset so newly dropped items don't overlap directly
    const defaultX = position ? position.x : 35 + (Math.random() * 20 - 10);
    const defaultY = position ? position.y : 40 + (Math.random() * 15 - 7);

    const newItem: CanvasPlacedItem = {
      instanceId: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      catalogId: catalogItem.id,
      name: catalogItem.name,
      category: catalogItem.category,
      price,
      x: Math.max(5, Math.min(85, defaultX)),
      y: Math.max(5, Math.min(85, defaultY)),
      width: catalogItem.defaultWidth,
      height: catalogItem.defaultHeight,
      rotation: 0,
      activeMaterialId: mat.id,
      activeMaterialName: mat.name,
      activeColorHex: mat.colorHex,
      materials: catalogItem.materials,
      removability: catalogItem.removability,
      iconName: catalogItem.iconName,
    };

    setPlacedItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.instanceId);
  }, []);

  // Remove Item from Canvas - SUBTRACTS COST IMMEDIATELY
  const removeItemFromCanvas = useCallback((instanceId: string) => {
    setPlacedItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
    setSelectedItemId((current) => (current === instanceId ? null : current));
  }, []);

  // Update item position
  const updateItemPosition = useCallback((instanceId: string, x: number, y: number) => {
    setPlacedItems((prev) =>
      prev.map((item) => (item.instanceId === instanceId ? { ...item, x, y } : item))
    );
  }, []);

  // Swap material style with fluid price recalculation
  const updateItemMaterial = useCallback((instanceId: string, materialId: string) => {
    setPlacedItems((prev) =>
      prev.map((item) => {
        if (item.instanceId !== instanceId) return item;
        const catalog = RENTER_FURNITURE_CATALOG.find((c) => c.id === item.catalogId);
        const mat = item.materials.find((m) => m.id === materialId);
        if (!mat || !catalog) return item;

        const newPrice = catalog.basePrice + (mat.priceModifier || 0);

        return {
          ...item,
          activeMaterialId: mat.id,
          activeMaterialName: mat.name,
          activeColorHex: mat.colorHex,
          price: newPrice,
        };
      })
    );
  }, []);

  const selectItem = useCallback((instanceId: string | null) => {
    setSelectedItemId(instanceId);
  }, []);

  const clearCanvas = useCallback(() => {
    setPlacedItems([]);
    setSelectedItemId(null);
  }, []);

  const resetToDefaultLayout = useCallback(() => {
    const initialPreset = getInitialCanvasItems();
    const items = initialPreset.map((preset, index) => {
      const catalog = RENTER_FURNITURE_CATALOG.find((c) => c.id === preset.catalogId) || RENTER_FURNITURE_CATALOG[0];
      const matId = preset.materialId || catalog.defaultMaterialId;
      const mat = catalog.materials.find((m) => m.id === matId) || catalog.materials[0];
      const price = catalog.basePrice + (mat.priceModifier || 0);

      return {
        instanceId: `item-${Date.now()}-${index}`,
        catalogId: catalog.id,
        name: catalog.name,
        category: catalog.category,
        price,
        x: preset.x,
        y: preset.y,
        width: catalog.defaultWidth,
        height: catalog.defaultHeight,
        rotation: 0,
        activeMaterialId: mat.id,
        activeMaterialName: mat.name,
        activeColorHex: mat.colorHex,
        materials: catalog.materials,
        removability: catalog.removability,
        iconName: catalog.iconName,
      };
    });
    setPlacedItems(items);
    setSelectedItemId(null);
  }, []);

  const value: RoomStudioContextType = {
    placedItems,
    selectedItemId,
    budgetCap,
    totalCost,
    remainingBudget,
    budgetPercentage,
    isOverBudget,
    depositRiskAmount: 0, // Always $0 deposit risk
    addItemToCanvas,
    removeItemFromCanvas,
    updateItemPosition,
    updateItemMaterial,
    selectItem,
    clearCanvas,
    resetToDefaultLayout,
    setBudgetCap,
  };

  return <RoomStudioContext.Provider value={value}>{children}</RoomStudioContext.Provider>;
};

export const useRoomStudio = (): RoomStudioContextType => {
  const context = useContext(RoomStudioContext);
  if (!context) {
    throw new Error('useRoomStudio must be used within a RoomStudioProvider');
  }
  return context;
};
