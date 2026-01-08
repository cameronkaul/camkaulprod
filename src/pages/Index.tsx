import { useState, useEffect, useCallback } from 'react';
import { Folder, User, Mail, FileText, Film, FolderPlus, Image, ArrowUpDown, LayoutGrid, LucideIcon } from 'lucide-react';
import { WindowProvider, useWindows, WindowId } from '@/contexts/WindowContext';
import { MenuBar } from '@/components/desktop/MenuBar';
import { Dock } from '@/components/desktop/Dock';
import { DesktopIcon } from '@/components/desktop/DesktopIcon';
import { Window } from '@/components/desktop/Window';
import { Spotlight } from '@/components/desktop/Spotlight';
import { PortfolioWindow } from '@/components/windows/PortfolioWindow';
import { ProjectWindow } from '@/components/windows/ProjectWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { ResumeWindow } from '@/components/windows/ResumeWindow';
import { ReelsWindow } from '@/components/windows/ReelsWindow';
import { TrashWindow } from '@/components/windows/TrashWindow';
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
  { id: 'about', icon: User, label: 'About' },
  { id: 'contact', icon: Mail, label: 'Contact' },
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'reels', icon: Film, label: 'Reels' },
];

function DesktopContent() {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState<WindowId | null>(null);
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

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="h-screen w-screen overflow-hidden relative"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(210 40% 80%) 0%, hsl(200 50% 90%) 50%, hsl(180 40% 85%) 100%)',
          }}
          onClick={handleDesktopClick}
        >
          {/* Grain overlay */}
          <div className="grain-overlay" />

          {/* Menu Bar */}
          <MenuBar onSpotlightOpen={() => setSpotlightOpen(true)} />

          {/* Desktop Icons */}
          <div className="absolute top-12 right-6 flex flex-col gap-2 z-10">
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
          </div>

          {/* Windows */}
          <Window id="portfolio"><PortfolioWindow /></Window>
          <Window id="project"><ProjectWindow /></Window>
          <Window id="about"><AboutWindow /></Window>
          <Window id="contact"><ContactWindow /></Window>
          <Window id="resume"><ResumeWindow /></Window>
          <Window id="reels"><ReelsWindow /></Window>
          <Window id="trash"><TrashWindow /></Window>

          {/* Dock */}
          <Dock />

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
