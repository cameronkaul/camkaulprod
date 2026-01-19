import { useState, useCallback, useEffect, useRef } from 'react';

// Grid configuration
export const GRID_SIZE = 90; // Cell size in pixels
export const GRID_GAP = 8;
export const GRID_PADDING = 16;
export const ICON_SIZE = 72;
export const WIDGET_SIZE = 2; // 2x2 cells

export interface GridItem {
  id: string;
  type: 'icon' | 'widget';
  gridX: number;
  gridY: number;
  width: number; // in grid cells
  height: number; // in grid cells
}

interface Position {
  x: number;
  y: number;
}

const STORAGE_KEY = 'desktop-grid-layout-v3';

const CORE_ICON_ORDER = ['portfolio', 'photos', 'mail', 'instagram'] as const;
const coreIconSet = new Set<string>(CORE_ICON_ORDER);

function rectsOverlap(a: GridItem, b: GridItem) {
  return (
    a.gridX < b.gridX + b.width &&
    a.gridX + a.width > b.gridX &&
    a.gridY < b.gridY + b.height &&
    a.gridY + a.height > b.gridY
  );
}

function normalizeAndResolveLayout(rawItems: GridItem[]) {
  const defaultItems = getDefaultLayout();
  const defaultById = new Map(defaultItems.map((d) => [d.id, d] as const));

  // Ensure all default items exist
  const existingIds = new Set(rawItems.map((i) => i.id));
  const merged: GridItem[] = [...rawItems, ...defaultItems.filter((d) => !existingIds.has(d.id))];

  // Normalize core icon positions to match the desktop column order
  const desired = merged.map((item) => {
    const def = defaultById.get(item.id);
    if (def && item.type === 'icon' && coreIconSet.has(item.id)) {
      return { ...item, ...def, gridX: def.gridX, gridY: def.gridY };
    }
    return item;
  });

  // Place icons first (core icons at the very top), then everything else.
  const stableIndex = new Map(desired.map((it, idx) => [it.id, idx] as const));
  const sorted = [...desired].sort((a, b) => {
    const aCore = a.type === 'icon' && coreIconSet.has(a.id);
    const bCore = b.type === 'icon' && coreIconSet.has(b.id);
    if (aCore && bCore) {
      return CORE_ICON_ORDER.indexOf(a.id as (typeof CORE_ICON_ORDER)[number]) -
        CORE_ICON_ORDER.indexOf(b.id as (typeof CORE_ICON_ORDER)[number]);
    }
    if (aCore) return -1;
    if (bCore) return 1;

    if (a.type !== b.type) return a.type === 'icon' ? -1 : 1;
    return (stableIndex.get(a.id) ?? 0) - (stableIndex.get(b.id) ?? 0);
  });

  // Resolve overlaps by pushing colliding items downward.
  const placed: GridItem[] = [];
  const placedById = new Map<string, GridItem>();

  for (const item of sorted) {
    let candidate = { ...item };
    let safety = 0;
    while (placed.some((p) => rectsOverlap(candidate, p)) && safety < 200) {
      candidate = { ...candidate, gridY: candidate.gridY + 1 };
      safety++;
    }
    placed.push(candidate);
    placedById.set(candidate.id, candidate);
  }

  // Return in the original merged order (stable), with corrected positions.
  return merged.map((item) => placedById.get(item.id) ?? item);
}

function getDefaultLayout(): GridItem[] {
  return [
    // Icons on the left column
    { id: 'portfolio', type: 'icon', gridX: 0, gridY: 0, width: 1, height: 1 },
    { id: 'photos', type: 'icon', gridX: 0, gridY: 1, width: 1, height: 1 },
    { id: 'mail', type: 'icon', gridX: 0, gridY: 2, width: 1, height: 1 },
    { id: 'instagram', type: 'icon', gridX: 0, gridY: 3, width: 1, height: 1 },
    // Widgets on the right side
    { id: 'widget-video', type: 'widget', gridX: 3, gridY: 0, width: 2, height: 2 },
    { id: 'widget-photo', type: 'widget', gridX: 3, gridY: 2, width: 2, height: 2 },
  ];
}

export function useDesktopGrid() {
  const [items, setItems] = useState<GridItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored) as GridItem[];
        const normalized = normalizeAndResolveLayout(parsedItems);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        return normalized;
      }
    } catch (e) {
      console.error('Failed to load grid layout:', e);
    }

    const defaults = getDefaultLayout();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    draggedId: string | null;
    startGrid: Position | null;
    currentOffset: Position;
  }>({
    isDragging: false,
    draggedId: null,
    startGrid: null,
    currentOffset: { x: 0, y: 0 },
  });

  // Normalize layout on mount (prevents Mail from covering Photos, etc.)
  useEffect(() => {
    setItems((prev) => {
      const next = normalizeAndResolveLayout(prev);
      const prevStr = JSON.stringify(prev);
      const nextStr = JSON.stringify(next);
      if (prevStr === nextStr) return prev;
      localStorage.setItem(STORAGE_KEY, nextStr);
      return next;
    });
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Convert grid position to pixel position
  const gridToPixel = useCallback((gridX: number, gridY: number): Position => {
  return {
    x: GRID_PADDING + gridX * (GRID_SIZE + GRID_GAP),
    y: GRID_PADDING + 40 + gridY * (GRID_SIZE + GRID_GAP), // 40px for tighter spacing below menu bar
  };
  }, []);

  // Convert pixel position to grid position
  const pixelToGrid = useCallback((pixelX: number, pixelY: number): Position => {
    return {
      x: Math.max(0, Math.round((pixelX - GRID_PADDING) / (GRID_SIZE + GRID_GAP))),
      y: Math.max(0, Math.round((pixelY - GRID_PADDING - 40) / (GRID_SIZE + GRID_GAP))),
    };
  }, []);

  // Check if a position is occupied (excluding certain items)
  const isOccupied = useCallback((gridX: number, gridY: number, width: number, height: number, excludeIds: string[] = []): boolean => {
    for (const item of items) {
      if (excludeIds.includes(item.id)) continue;
      
      // Check if rectangles overlap
      const itemRight = item.gridX + item.width;
      const itemBottom = item.gridY + item.height;
      const newRight = gridX + width;
      const newBottom = gridY + height;

      if (gridX < itemRight && newRight > item.gridX && 
          gridY < itemBottom && newBottom > item.gridY) {
        return true;
      }
    }
    return false;
  }, [items]);

  // Find nearest available position
  const findNearestAvailable = useCallback((
    targetX: number, 
    targetY: number, 
    width: number, 
    height: number, 
    excludeIds: string[]
  ): Position => {
    // Spiral search for nearest available position
    const maxSearch = 20;
    for (let radius = 0; radius <= maxSearch; radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
          const testX = Math.max(0, targetX + dx);
          const testY = Math.max(0, targetY + dy);
          if (!isOccupied(testX, testY, width, height, excludeIds)) {
            return { x: testX, y: testY };
          }
        }
      }
    }
    return { x: targetX, y: targetY };
  }, [isOccupied]);

  // Handle selection
  const selectItem = useCallback((id: string, shiftKey: boolean = false) => {
    setSelectedIds(prev => {
      if (shiftKey) {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      }
      return new Set([id]);
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectByRect = useCallback((rect: { x: number; y: number; width: number; height: number } | null) => {
    if (!rect) return;

    const newSelected = new Set<string>();
    for (const item of items) {
      const itemPixel = gridToPixel(item.gridX, item.gridY);
      const itemWidth = item.width * GRID_SIZE + (item.width - 1) * GRID_GAP;
      const itemHeight = item.height * GRID_SIZE + (item.height - 1) * GRID_GAP;

      // Check intersection
      if (
        itemPixel.x < rect.x + rect.width &&
        itemPixel.x + itemWidth > rect.x &&
        itemPixel.y < rect.y + rect.height &&
        itemPixel.y + itemHeight > rect.y
      ) {
        newSelected.add(item.id);
      }
    }
    setSelectedIds(newSelected);
  }, [items, gridToPixel]);

  // Handle drag start
  const startDrag = useCallback((id: string, clientX: number, clientY: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    // If dragging a non-selected item, select only it
    if (!selectedIds.has(id)) {
      setSelectedIds(new Set([id]));
    }

    setDragState({
      isDragging: true,
      draggedId: id,
      startGrid: { x: item.gridX, y: item.gridY },
      currentOffset: { x: 0, y: 0 },
    });
  }, [items, selectedIds]);

  // Handle drag move
  const updateDrag = useCallback((deltaX: number, deltaY: number) => {
    if (!dragState.isDragging) return;

    setDragState(prev => ({
      ...prev,
      currentOffset: { x: deltaX, y: deltaY },
    }));
  }, [dragState.isDragging]);

  // Handle drag end
  const endDrag = useCallback((deltaX: number, deltaY: number) => {
    if (!dragState.isDragging || !dragState.draggedId) {
      setDragState({
        isDragging: false,
        draggedId: null,
        startGrid: null,
        currentOffset: { x: 0, y: 0 },
      });
      return;
    }

    const gridDeltaX = Math.round(deltaX / (GRID_SIZE + GRID_GAP));
    const gridDeltaY = Math.round(deltaY / (GRID_SIZE + GRID_GAP));

    // Move all selected items
    const movingIds = Array.from(selectedIds);
    if (!movingIds.includes(dragState.draggedId)) {
      movingIds.push(dragState.draggedId);
    }

    setItems(prev => {
      const updated = [...prev];
      
      for (const movingId of movingIds) {
        const itemIndex = updated.findIndex(i => i.id === movingId);
        if (itemIndex === -1) continue;
        
        const item = updated[itemIndex];
        let newX = Math.max(0, item.gridX + gridDeltaX);
        let newY = Math.max(0, item.gridY + gridDeltaY);

        // Check for collision and find available spot
        const otherMovingIds = movingIds.filter(id => id !== movingId);
        const excludeIds = [...movingIds]; // Exclude all moving items from collision
        
        if (isOccupied(newX, newY, item.width, item.height, excludeIds)) {
          const available = findNearestAvailable(newX, newY, item.width, item.height, excludeIds);
          newX = available.x;
          newY = available.y;
        }

        updated[itemIndex] = { ...item, gridX: newX, gridY: newY };
      }
      
      return updated;
    });

    setDragState({
      isDragging: false,
      draggedId: null,
      startGrid: null,
      currentOffset: { x: 0, y: 0 },
    });
  }, [dragState, selectedIds, isOccupied, findNearestAvailable]);

  // Get position for an item (including drag offset if being dragged)
  const getItemPosition = useCallback((id: string): Position & { isDragging: boolean } => {
    const item = items.find(i => i.id === id);
    if (!item) return { x: 0, y: 0, isDragging: false };

    const basePos = gridToPixel(item.gridX, item.gridY);
    
    if (dragState.isDragging && (selectedIds.has(id) || id === dragState.draggedId)) {
      return {
        x: basePos.x + dragState.currentOffset.x,
        y: basePos.y + dragState.currentOffset.y,
        isDragging: true,
      };
    }

    return { ...basePos, isDragging: false };
  }, [items, gridToPixel, dragState, selectedIds]);

  const getItem = useCallback((id: string): GridItem | undefined => {
    return items.find(i => i.id === id);
  }, [items]);

  return {
    items,
    selectedIds,
    selectItem,
    clearSelection,
    selectByRect,
    startDrag,
    updateDrag,
    endDrag,
    getItemPosition,
    getItem,
    gridToPixel,
    pixelToGrid,
    dragState,
    GRID_SIZE,
    GRID_GAP,
  };
}
