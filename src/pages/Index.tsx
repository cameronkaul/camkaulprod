import { useState, useEffect, useCallback, useRef } from 'react';
import { Folder, FolderPlus, Image, ArrowUpDown, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { WindowProvider, useWindows, WindowId } from '@/contexts/WindowContext';
import { MenuBar } from '@/components/desktop/MenuBar';
import { Dock } from '@/components/desktop/Dock';
import { DesktopIcon } from '@/components/desktop/DesktopIcon';
import { Window } from '@/components/desktop/Window';
import { Spotlight } from '@/components/desktop/Spotlight';
import { BootOverlay } from '@/components/desktop/BootOverlay';
import { MobileHomeScreen } from '@/components/mobile/MobileHomeScreen';
import { MobileAppOverlay } from '@/components/mobile/MobileAppOverlay';
import { SelectionBox, isElementInSelection } from '@/components/desktop/SelectionBox';
import { PortfolioWindow } from '@/components/windows/PortfolioWindow';
import { ProjectWindow } from '@/components/windows/ProjectWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { MailWindow } from '@/components/windows/MailWindow';
import { ResumeWindow } from '@/components/windows/ResumeWindow';
import { TrashWindow } from '@/components/windows/TrashWindow';
import { RunnerWindow } from '@/components/windows/RunnerWindow';
import { DocumentWindow } from '@/components/windows/DocumentWindow';
import { InstagramWindow } from '@/components/windows/InstagramWindow';
import { VideoCarouselWidget } from '@/components/mobile/widgets/VideoCarouselWidget';
import { PhotoCarouselWidget } from '@/components/mobile/widgets/PhotoCarouselWidget';
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
  id: WindowId;
  type: AppIconType;
  label: string;
}

const desktopIcons: DesktopIconConfig[] = [
  { id: 'portfolio', type: 'portfolio', label: 'Portfolio' },
  { id: 'mail', type: 'mail', label: 'Mail' },
  { id: 'instagram', type: 'instagram', label: 'Instagram' },
];

function DesktopContent() {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [selectedIconIds, setSelectedIconIds] = useState<Set<WindowId>>(new Set());
  const [isBooting, setIsBooting] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [showChrome, setShowChrome] = useState(false);
  const [wallpaperSharp, setWallpaperSharp] = useState(false);
  const { openWindow, windows, isMobile } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Map<WindowId, HTMLElement>>(new Map());

  // Check if any window is open on mobile
  const hasOpenMobileWindow = isMobile && windows.some(w => w.isOpen && !w.isMinimized);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
      // Clear selection on Escape
      if (e.key === 'Escape') {
        setSelectedIconIds(new Set());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Deselect icons when clicking desktop background
  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if clicking directly on the desktop background
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('desktop-background')) {
      setSelectedIconIds(new Set());
    }
  }, []);

  const handleIconSelect = useCallback((id: WindowId, e?: React.MouseEvent) => {
    if (e?.shiftKey) {
      // Shift-click: toggle selection
      setSelectedIconIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } else {
      // Regular click: select only this icon
      setSelectedIconIds(new Set([id]));
    }
  }, []);

  const handleSelectionChange = useCallback((rect: { x: number; y: number; width: number; height: number } | null) => {
    if (!rect || !desktopRef.current) {
      return;
    }

    const containerRect = desktopRef.current.getBoundingClientRect();
    const newSelectedIds = new Set<WindowId>();

    iconRefs.current.forEach((element, id) => {
      const elementRect = element.getBoundingClientRect();
      if (isElementInSelection(elementRect, rect, containerRect)) {
        newSelectedIds.add(id);
      }
    });

    setSelectedIconIds(newSelectedIds);
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    // Start sharpening wallpaper immediately
    setWallpaperSharp(true);
    // Step 1: Desktop icons appear first
    setTimeout(() => setShowIcons(true), 50);
    // Step 2: Dock and menu bar rise in after icons
    setTimeout(() => setShowChrome(true), 250);
  }, []);

  // Register icon ref
  const registerIconRef = useCallback((id: WindowId, element: HTMLElement | null) => {
    if (element) {
      iconRefs.current.set(id, element);
    } else {
      iconRefs.current.delete(id);
    }
  }, []);

  // Use the same wallpaper for both desktop and mobile
  const wallpaper = mobileWallpaper;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={desktopRef}
          className="h-screen w-screen overflow-hidden relative"
          onClick={handleDesktopClick}
        >
          {/* Wallpaper with blur transition and dark overlay */}
          <div
            className="absolute inset-0 transition-all ease-out desktop-background"
            style={{
              backgroundImage: `url(${wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: wallpaperSharp 
                ? 'blur(0px) brightness(1) saturate(1)' 
                : 'blur(12px) brightness(1.05) saturate(0.85)',
              transitionDuration: '600ms',
            }}
          />
          
          {/* Light overlay for readability - Apple style (only 8% opacity) */}
          <div className="absolute inset-0 bg-black/[0.08] pointer-events-none desktop-background" />

          {/* Boot Overlay */}
          {isBooting && <BootOverlay onComplete={handleBootComplete} />}

          {/* Desktop Icons and Widgets with selection support - desktop only */}
          {!isMobile && (
            <>
              {/* Left column: App icons */}
              <motion.div 
                className="absolute top-14 left-4 flex flex-col gap-1 z-10"
                initial={{ opacity: 0 }}
                animate={showIcons ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {desktopIcons.map((item) => (
                  <div
                    key={item.id}
                    ref={(el) => registerIconRef(item.id, el)}
                    className="desktop-icon"
                  >
                    <DesktopIcon
                      type={item.type}
                      label={item.label}
                      isSelected={selectedIconIds.has(item.id)}
                      onSelect={(e) => handleIconSelect(item.id, e)}
                      onClick={() => {}}
                      onDoubleClick={() => openWindow(item.id)}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Desktop Widgets - positioned to the right of icons */}
              <motion.div
                className="absolute top-14 left-28 flex flex-col gap-4 z-10"
                initial={{ opacity: 0 }}
                animate={showIcons ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              >
                {/* Video Widget - 2x2 size */}
                <div className="w-[180px] h-[180px] rounded-2xl overflow-hidden shadow-lg">
                  <VideoCarouselWidget />
                </div>
                
                {/* Photo Widget - 2x2 size */}
                <div className="w-[180px] h-[180px] rounded-2xl overflow-hidden shadow-lg">
                  <PhotoCarouselWidget />
                </div>
              </motion.div>

              {/* Selection Box - desktop only */}
              <SelectionBox
                containerRef={desktopRef as React.RefObject<HTMLElement>}
                onSelectionChange={handleSelectionChange}
                disabled={isMobile}
              />
            </>
          )}

          {/* Mobile Home Screen - iOS-style app grid (hidden when app is open) */}
          {isMobile && !hasOpenMobileWindow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={showIcons ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full"
            >
              {/* Menu Bar - iOS status bar style */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={showChrome ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <MenuBar onSpotlightOpen={() => setSpotlightOpen(true)} />
              </motion.div>
              
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
              <Window id="project"><ProjectWindow /></Window>
              <Window id="about"><AboutWindow /></Window>
              <Window id="mail"><MailWindow /></Window>
              <Window id="resume"><ResumeWindow /></Window>
              <Window id="trash"><TrashWindow /></Window>
              <Window id="runner"><RunnerWindow /></Window>
              <Window id="instagram"><InstagramWindow /></Window>
              <Window id="document"><DocumentWindow /></Window>
            </>
          )}

          {/* Mobile App Overlays - full screen, hides home screen */}
          {isMobile && (
            <>
              <MobileAppOverlay id="portfolio"><PortfolioWindow /></MobileAppOverlay>
              <MobileAppOverlay id="project"><ProjectWindow /></MobileAppOverlay>
              <MobileAppOverlay id="about"><AboutWindow /></MobileAppOverlay>
              <MobileAppOverlay id="mail"><MailWindow /></MobileAppOverlay>
              <MobileAppOverlay id="resume"><ResumeWindow /></MobileAppOverlay>
              <MobileAppOverlay id="trash"><TrashWindow /></MobileAppOverlay>
              <MobileAppOverlay id="runner"><RunnerWindow /></MobileAppOverlay>
              <MobileAppOverlay id="instagram"><InstagramWindow /></MobileAppOverlay>
              <MobileAppOverlay id="document"><DocumentWindow /></MobileAppOverlay>
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
