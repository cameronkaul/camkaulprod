import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type WindowId = 'portfolio' | 'about' | 'mail' | 'resume' | 'trash' | 'project' | 'runner' | 'document' | 'instagram' | 'videoWidget' | 'photoWidget';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  projectId?: string;
}

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  openWindow: (id: WindowId, projectId?: string) => void;
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
  { id: 'about', title: 'About', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 120, y: 80 }, size: { width: 800, height: 600 } },
  { id: 'mail', title: 'Mail', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 160, y: 100 }, size: { width: 500, height: 400 } },
  { id: 'resume', title: 'Resume', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 250, y: 60 }, size: { width: 680, height: 580 } },
  { id: 'trash', title: 'Trash', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 200, y: 120 }, size: { width: 400, height: 300 } },
  { id: 'project', title: 'Project', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 100, y: 50 }, size: { width: 900, height: 700 } },
  { id: 'runner', title: 'Runner', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 150, y: 80 }, size: { width: 700, height: 420 } },
  { id: 'document', title: 'Nothing Important.doc', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 180, y: 70 }, size: { width: 650, height: 550 } },
  { id: 'instagram', title: 'Instagram', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 200, y: 80 }, size: { width: 400, height: 350 } },
  { id: 'videoWidget', title: 'Featured Work', isOpen: true, isMinimized: false, zIndex: -10, position: { x: 720, y: 60 }, size: { width: 500, height: 320 } },
  { id: 'photoWidget', title: 'Gallery', isOpen: true, isMinimized: false, zIndex: -10, position: { x: 560, y: 420 }, size: { width: 280, height: 280 } },
];

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [highestZ, setHighestZ] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getHighestZIndex = useCallback(() => highestZ, [highestZ]);

  const openWindow = useCallback((id: WindowId, projectId?: string) => {
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    setActiveWindowId(id);
    
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { 
          ...w, 
          isOpen: true, 
          isMinimized: false, 
          zIndex: newZ,
          projectId: projectId || w.projectId,
          title: id === 'project' && projectId ? 'Project' : w.title
        };
      }
      return w;
    }));
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
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
    ));
  }, [highestZ]);

  const updateWindowPosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, size } : w
    ));
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
