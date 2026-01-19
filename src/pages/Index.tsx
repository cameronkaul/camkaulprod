import { useState, useEffect, useCallback, useRef } from 'react';
import { Folder, FolderPlus, Image, ArrowUpDown, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { WindowProvider, useWindows, WindowId } from '@/contexts/WindowContext';
import { MenuBar } from '@/components/desktop/MenuBar';
import { Dock } from '@/components/desktop/Dock';
import { DesktopIcon } from '@/components/desktop/DesktopIcon';
import { DesktopWidget } from '@/components/desktop/DesktopWidget';
import { Window } from '@/components/desktop/Window';
import { Spotlight } from '@/components/desktop/Spotlight';
import { BootOverlay } from '@/components/desktop/BootOverlay';
import { MobileHomeScreen } from '@/components/mobile/MobileHomeScreen';
import { MobileAppOverlay } from '@/components/mobile/MobileAppOverlay';
import { SelectionBox, isElementInSelection } from '@/components/desktop/SelectionBox';
import { PortfolioWindow } from '@/components/windows/PortfolioWindow';
import { PhotosWindow } from '@/components/windows/PhotosWindow';
import { ProjectWindow } from '@/components/windows/ProjectWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { MailWindow } from '@/components/windows/MailWindow';
import { ResumeWindow } from '@/components/windows/ResumeWindow';
import { TrashWindow } from '@/components/windows/TrashWindow';
import { RunnerWindow } from '@/components/windows/RunnerWindow';
import { DocumentWindow } from '@/components/windows/DocumentWindow';
import { InstagramWindow } from '@/components/windows/InstagramWindow';
import { WidgetWindow } from '@/components/windows/WidgetWindow';
import { WorkGalleryWindow } from '@/components/windows/WorkGalleryWindow';
import { VideoCarouselWidget } from '@/components/mobile/widgets/VideoCarouselWidget';
import { PhotoCarouselWidget } from '@/components/mobile/widgets/PhotoCarouselWidget';
import { useDesktopGrid, GRID_SIZE, GRID_GAP } from '@/hooks/useDesktopGrid';
import mobileWallpaper from '@/assets/mobile-wallpaper.jpg';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { AppIconType } from '@/components/icons/AppIcon';

interface DesktopIconConfig {
  id: string;
  type: AppIconType;
  label: string;
}

const desktopIconConfigs: DesktopIconConfig[] = [
  { id: 'portfolio', type: 'portfolio', label: 'Portfolio' },
  { id: 'photos', type: 'photos', label: 'Photos' },
  { id: 'mail', type: 'mail', label: 'Mail' },
];

// Widget size: ~15% larger than before (was 180px, now 210px)
const WIDGET_SIZE = 210;

function DesktopContent() {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [showChrome, setShowChrome] = useState(false);
  const [wallpaperSharp, setWallpaperSharp] = useState(false);
  const { openWindow, windows, isMobile } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Desktop grid system for icon/widget positioning and drag
  const {
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
  } = useDesktopGrid();

  // Check if any window is open on mobile (exclude widget windows which are for desktop only)
  const hasOpenMobileWindow = isMobile && windows.some(w => 
    w.isOpen && !w.isMinimized && w.id !== 'videoWidget' && w.id !== 'photoWidget'
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
      // Clear selection on Escape
      if (e.key === 'Escape') {
        clearSelection();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearSelection]);

  // Deselect items when clicking desktop background
  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('desktop-background')) {
      clearSelection();
    }
  }, [clearSelection]);

  const handleSelectionChange = useCallback((rect: { x: number; y: number; width: number; height: number } | null) => {
    if (!rect || !desktopRef.current) {
      return;
    }
    selectByRect(rect);
  }, [selectByRect]);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    setWallpaperSharp(true);
    setTimeout(() => setShowIcons(true), 50);
    setTimeout(() => setShowChrome(true), 250);
  }, []);

  // Register item ref for selection box intersection
  const registerItemRef = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      itemRefs.current.set(id, element);
    } else {
      itemRefs.current.delete(id);
    }
  }, []);

  const wallpaper = mobileWallpaper;

  // Render desktop icons
  const renderDesktopIcons = () => {
    return desktopIconConfigs.map((config) => {
      const item = getItem(config.id);
      if (!item) return null;
      
      const position = getItemPosition(config.id);
      
      return (
        <motion.div
          key={config.id}
          ref={(el) => registerItemRef(config.id, el)}
          className="absolute desktop-icon"
          animate={{
            x: position.x,
            y: position.y,
          }}
          transition={position.isDragging ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 25 }}
          style={{ zIndex: position.isDragging ? 1000 : selectedIds.has(config.id) ? 20 : 10 }}
        >
          <DesktopIcon
            type={config.type}
            label={config.label}
            isSelected={selectedIds.has(config.id)}
            onSelect={(e) => selectItem(config.id, e?.shiftKey)}
            onClick={() => {}}
            onDoubleClick={() => openWindow(config.id as WindowId)}
            onDragStart={(x, y) => startDrag(config.id, x, y)}
            onDragMove={(dx, dy) => updateDrag(dx, dy)}
            onDragEnd={(dx, dy) => endDrag(dx, dy)}
          />
        </motion.div>
      );
    });
  };

  // Removed - widgets now render as WidgetWindow components

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={desktopRef}
          className="h-screen w-screen overflow-hidden relative"
          onClick={handleDesktopClick}
        >
          {/* Wallpaper with blur transition */}
          <div
            className="absolute inset-0 transition-all ease-out desktop-background"
            style={{
              backgroundImage: `url(${wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 60%',
              backgroundRepeat: 'no-repeat',
              filter: wallpaperSharp 
                ? 'blur(0px) brightness(1.02) saturate(1.12) contrast(1.06)' 
                : 'blur(12px) brightness(1.05) saturate(0.85)',
              transitionDuration: '600ms',
            }}
          />
          
          {/* Very light overlay for readability (6% max) */}
          <div className="absolute inset-0 bg-black/[0.06] pointer-events-none desktop-background" />

          {/* Boot Overlay */}
          {isBooting && <BootOverlay onComplete={handleBootComplete} />}

          {/* Desktop Icons - desktop only */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={showIcons ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              {renderDesktopIcons()}
              
              {/* Selection Box */}
              <SelectionBox
                containerRef={desktopRef as React.RefObject<HTMLElement>}
                onSelectionChange={handleSelectionChange}
                disabled={isMobile}
              />
            </motion.div>
          )}

          {/* Widget Windows - desktop only, animate in with boot */}
          {!isMobile && showChrome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <WidgetWindow id="videoWidget" title="Featured Video">
                <div className="w-full h-full">
                  <VideoCarouselWidget />
                </div>
              </WidgetWindow>
              <WidgetWindow id="photoWidget" title="Photo Gallery">
                <div className="w-full h-full">
                  <PhotoCarouselWidget />
                </div>
              </WidgetWindow>
            </motion.div>
          )}

          {/* Mobile Menu Bar - always visible on home screen */}
          {isMobile && !hasOpenMobileWindow && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={showChrome ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MenuBar onSpotlightOpen={() => setSpotlightOpen(true)} />
            </motion.div>
          )}

          {/* Mobile Home Screen - iOS-style app grid (hidden when app is open) */}
          {isMobile && !hasOpenMobileWindow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={showIcons ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full"
            >
              <MobileHomeScreen />
            </motion.div>
          )}

          {/* Desktop Menu Bar - slides down into place */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={showChrome ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ pointerEvents: showChrome ? 'auto' : 'none' }}
            >
              <MenuBar onSpotlightOpen={() => setSpotlightOpen(true)} />
            </motion.div>
          )}

          {/* Desktop Windows */}
          {!isMobile && (
            <>
              <Window id="portfolio"><PortfolioWindow /></Window>
              <Window id="photos"><PhotosWindow /></Window>
              <Window id="project"><ProjectWindow /></Window>
              <Window id="about"><AboutWindow /></Window>
              <Window id="mail"><MailWindow /></Window>
              <Window id="resume"><ResumeWindow /></Window>
              <Window id="trash"><TrashWindow /></Window>
              <Window id="runner"><RunnerWindow /></Window>
              <Window id="instagram"><InstagramWindow /></Window>
              <Window id="document"><DocumentWindow /></Window>
              <Window id="workGallery"><WorkGalleryWindow /></Window>
            </>
          )}

          {/* Mobile App Overlays - full screen, hides home screen */}
          {isMobile && (
            <>
              <MobileAppOverlay id="portfolio"><PortfolioWindow /></MobileAppOverlay>
              <MobileAppOverlay id="photos"><PhotosWindow /></MobileAppOverlay>
              <MobileAppOverlay id="project"><ProjectWindow /></MobileAppOverlay>
              <MobileAppOverlay id="about"><AboutWindow /></MobileAppOverlay>
              <MobileAppOverlay id="mail"><MailWindow /></MobileAppOverlay>
              <MobileAppOverlay id="resume"><ResumeWindow /></MobileAppOverlay>
              <MobileAppOverlay id="trash"><TrashWindow /></MobileAppOverlay>
              <MobileAppOverlay id="runner"><RunnerWindow /></MobileAppOverlay>
              <MobileAppOverlay id="instagram"><InstagramWindow /></MobileAppOverlay>
              <MobileAppOverlay id="document"><DocumentWindow /></MobileAppOverlay>
              <MobileAppOverlay id="workGallery"><WorkGalleryWindow /></MobileAppOverlay>
            </>
          )}

          {/* Dock - rises from bottom with stronger motion (desktop only) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={showChrome ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Dock />
            </motion.div>
          )}

          {/* Spotlight */}
          <Spotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
        </div>
      </ContextMenuTrigger>
      
      {/* Desktop Context Menu */}
      <ContextMenuContent className="min-w-[180px] bg-popover/95 backdrop-blur-xl border border-border/50">
        <ContextMenuItem disabled>
          <FolderPlus className="w-4 h-4 mr-2" />
          New Folder
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>
          <Image className="w-4 h-4 mr-2" />
          Change Wallpaper
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort By
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="bg-popover/95 backdrop-blur-xl border border-border/50">
            <ContextMenuItem>Name</ContextMenuItem>
            <ContextMenuItem>Kind</ContextMenuItem>
            <ContextMenuItem>Date Modified</ContextMenuItem>
            <ContextMenuItem>Size</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem disabled>
          <LayoutGrid className="w-4 h-4 mr-2" />
          Clean Up
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const Index = () => {
  return (
    <WindowProvider>
      <DesktopContent />
    </WindowProvider>
  );
};

export default Index;
