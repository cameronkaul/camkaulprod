import { useState, useEffect, useCallback } from 'react';
import { Folder, Mail, FolderPlus, Image, ArrowUpDown, LayoutGrid, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { WindowProvider, useWindows, WindowId } from '@/contexts/WindowContext';
import { MenuBar } from '@/components/desktop/MenuBar';
import { Dock } from '@/components/desktop/Dock';
import { DesktopIcon } from '@/components/desktop/DesktopIcon';
import { Window } from '@/components/desktop/Window';
import { Spotlight } from '@/components/desktop/Spotlight';
import { BootOverlay } from '@/components/desktop/BootOverlay';
import { PortfolioWindow } from '@/components/windows/PortfolioWindow';
import { ProjectWindow } from '@/components/windows/ProjectWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { ResumeWindow } from '@/components/windows/ResumeWindow';
import { TrashWindow } from '@/components/windows/TrashWindow';
import { RunnerWindow } from '@/components/windows/RunnerWindow';
import desktopWallpaper from '@/assets/desktop-wallpaper.jpg';
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

interface DesktopIconConfig {
  id: WindowId;
  icon: LucideIcon;
  label: string;
}

const desktopIcons: DesktopIconConfig[] = [
  { id: 'portfolio', icon: Folder, label: 'Portfolio' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

function DesktopContent() {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<WindowId | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [showChrome, setShowChrome] = useState(false);
  const [wallpaperSharp, setWallpaperSharp] = useState(false);
  const { openWindow } = useWindows();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Deselect icons when clicking desktop background
  const handleDesktopClick = useCallback(() => {
    setSelectedIconId(null);
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

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="h-screen w-screen overflow-hidden relative"
          onClick={handleDesktopClick}
        >
          {/* Wallpaper with blur transition */}
          <div
            className="absolute inset-0 transition-all ease-out"
            style={{
              backgroundImage: `url(${desktopWallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: wallpaperSharp 
                ? 'blur(0px) brightness(1) saturate(1)' 
                : 'blur(12px) brightness(1.05) saturate(0.85)',
              transitionDuration: '600ms',
            }}
          />
          {/* Boot Overlay */}
          {isBooting && <BootOverlay onComplete={handleBootComplete} />}

          {/* Desktop Icons - appear first */}
          <motion.div 
            className="absolute top-14 left-4 flex flex-col gap-1 z-10"
            initial={{ opacity: 0 }}
            animate={showIcons ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {desktopIcons.map((item) => (
              <DesktopIcon
                key={item.id}
                icon={item.icon}
                label={item.label}
                isSelected={selectedIconId === item.id}
                onSelect={() => setSelectedIconId(item.id)}
                onClick={() => {}}
                onDoubleClick={() => openWindow(item.id)}
              />
            ))}
          </motion.div>

          {/* Menu Bar - slides down into place with dock */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={showChrome ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ pointerEvents: showChrome ? 'auto' : 'none' }}
          >
            <MenuBar onSpotlightOpen={() => setSpotlightOpen(true)} />
          </motion.div>

          {/* Windows */}
          <Window id="portfolio"><PortfolioWindow /></Window>
          <Window id="project"><ProjectWindow /></Window>
          <Window id="about"><AboutWindow /></Window>
          <Window id="contact"><ContactWindow /></Window>
          <Window id="resume"><ResumeWindow /></Window>
          <Window id="trash"><TrashWindow /></Window>
          <Window id="runner"><RunnerWindow /></Window>

          {/* Dock - rises from bottom with stronger motion */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={showChrome ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Dock />
          </motion.div>

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
