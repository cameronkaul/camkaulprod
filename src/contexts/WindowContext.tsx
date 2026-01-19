import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type WindowId = 'portfolio' | 'photos' | 'about' | 'mail' | 'resume' | 'trash' | 'project' | 'runner' | 'document' | 'instagram' | 'videoWidget' | 'photoWidget' | 'workGallery';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  projectId?: string;
  clientId?: string;
}

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  openWindow: (id: WindowId, projectId?: string, clientId?: string) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void;
  getHighestZIndex: () => number;
  isMobile: boolean;
}

const defaultWindows: WindowState[] = [
  { id: 'portfolio', title: 'Portfolio', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 80, y: 60 }, size: { width: 1000, height: 680 } },
  { id: 'photos', title: 'Photos', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 100, y: 70 }, size: { width: 900, height: 650 } },
  { id: 'about', title: 'About', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 120, y: 80 }, size: { width: 800, height: 600 } },
  { id: 'mail', title: 'Mail', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 160, y: 100 }, size: { width: 500, height: 400 } },
  { id: 'resume', title: 'Resume', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 250, y: 60 }, size: { width: 680, height: 580 } },
  { id: 'trash', title: 'Trash', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 200, y: 120 }, size: { width: 400, height: 300 } },
  { id: 'project', title: 'Project', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 100, y: 50 }, size: { width: 900, height: 700 } },
  { id: 'runner', title: 'Runner', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 150, y: 80 }, size: { width: 700, height: 420 } },
  { id: 'document', title: 'Nothing Important.doc', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 180, y: 70 }, size: { width: 650, height: 550 } },
  { id: 'instagram', title: 'Instagram', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 200, y: 80 }, size: { width: 400, height: 350 } },
  { id: 'videoWidget', title: 'Featured Video', isOpen: true, isMinimized: false, zIndex: -10, position: { x: 850, y: 60 }, size: { width: 500, height: 320 } },
  { id: 'photoWidget', title: 'Photo Gallery', isOpen: true, isMinimized: false, zIndex: -10, position: { x: 320, y: 250 }, size: { width: 340, height: 340 } },
  { id: 'workGallery', title: 'Design Work', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 140, y: 70 }, size: { width: 850, height: 620 } },
];

const WIDGET_WINDOW_IDS: WindowId[] = ['videoWidget', 'photoWidget'];

const clampNumber = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(value, max));
};

const getDesktopSafeArea = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const menuBarHeight =
    document.querySelector('.menu-bar')?.getBoundingClientRect().height ?? 28;
  const dockHeight =
    document.querySelector('.dock-container')?.getBoundingClientRect().height ?? 96;

  const margin = 8;

  return {
    minX: margin,
    minY: menuBarHeight + margin,
    maxX: vw - margin,
    maxY: vh - dockHeight - margin,
  };
};

const clampWindowToViewport = (
  id: WindowId,
  position: { x: number; y: number },
  size: { width: number; height: number },
) => {
  // Only clamp on desktop; mobile windows are fullscreen overlays.
  if (window.innerWidth < 768) return { position, size };

  const isWidget = WIDGET_WINDOW_IDS.includes(id);
  const minWidth = isWidget ? 200 : 300;
  const minHeight = isWidget ? 150 : 200;

  const area = getDesktopSafeArea();
  const maxWidth = Math.max(minWidth, area.maxX - area.minX);
  const maxHeight = Math.max(minHeight, area.maxY - area.minY);

  const width = clampNumber(size.width, minWidth, maxWidth);
  const height = clampNumber(size.height, minHeight, maxHeight);

  const x = clampNumber(position.x, area.minX, area.maxX - width);
  const y = clampNumber(position.y, area.minY, area.maxY - height);

  return { position: { x, y }, size: { width, height } };
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [highestZ, setHighestZ] = useState(100); // Start windows at z-index 100+ to ensure they're above widgets
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      // Keep all windows inside the viewport when the browser size changes.
      if (window.innerWidth >= 768) {
        setWindows(prev =>
          prev.map(w => {
            const clamped = clampWindowToViewport(w.id, w.position, w.size);
            return { ...w, position: clamped.position, size: clamped.size };
          })
        );
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getHighestZIndex = useCallback(() => highestZ, [highestZ]);

  const openWindow = useCallback((id: WindowId, projectId?: string, clientId?: string) => {
    const isWidget = WIDGET_WINDOW_IDS.includes(id);

    const newZ = isWidget ? -10 : highestZ + 1;
    if (!isWidget) setHighestZ(newZ);

    setActiveWindowId(id);

    setWindows(prev =>
      prev.map(w => {
        if (w.id !== id) return w;

        const next: WindowState = {
          ...w,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
          projectId: projectId || w.projectId,
          clientId: clientId || w.clientId,
          title: id === 'project' && projectId ? 'Project' : w.title,
        };

        const clamped = clampWindowToViewport(id, next.position, next.size);
        return { ...next, position: clamped.position, size: clamped.size };
      })
    );
  }, [highestZ]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false, isMinimized: false } : w
    ));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const focusWindow = useCallback((id: WindowId) => {
    const isWidget = WIDGET_WINDOW_IDS.includes(id);

    const newZ = isWidget ? -10 : highestZ + 1;
    if (!isWidget) setHighestZ(newZ);

    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => {
        if (w.id !== id) return w;

        const next: WindowState = { ...w, zIndex: newZ, isMinimized: false };
        const clamped = clampWindowToViewport(id, next.position, next.size);
        return { ...next, position: clamped.position, size: clamped.size };
      })
    );
  }, [highestZ]);

  const updateWindowPosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;
      const clamped = clampWindowToViewport(id, position, w.size);
      return { ...w, position: clamped.position, size: clamped.size };
    }));
  }, []);

  const updateWindowSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;
      const clamped = clampWindowToViewport(id, w.position, size);
      return { ...w, size: clamped.size, position: clamped.position };
    }));
  }, []);

  return (
    <WindowContext.Provider value={{
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      getHighestZIndex,
      isMobile,
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
}
