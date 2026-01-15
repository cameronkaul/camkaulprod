import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useWindows } from '@/contexts/WindowContext';

// Instagram white icon SVG
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

interface MenuBarProps {
  onSpotlightOpen: () => void;
}

export function MenuBar({ onSpotlightOpen }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { isMobile } = useWindows();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const fileMenuItems = [
    { label: 'New Window', shortcut: '⌘N' },
    { label: 'Open...', shortcut: '⌘O' },
    { separator: true },
    { label: 'Close Window', shortcut: '⌘W' },
  ];

  const editMenuItems = [
    { label: 'Undo', shortcut: '⌘Z' },
    { label: 'Redo', shortcut: '⇧⌘Z' },
    { separator: true },
    { label: 'Cut', shortcut: '⌘X' },
    { label: 'Copy', shortcut: '⌘C' },
    { label: 'Paste', shortcut: '⌘V' },
  ];

  const viewMenuItems = [
    { label: 'as Icons', shortcut: '⌘1' },
    { label: 'as List', shortcut: '⌘2' },
    { separator: true },
    { label: 'Show Sidebar', shortcut: '⌘S' },
    { label: 'Enter Full Screen', shortcut: '⌃⌘F' },
  ];

  const helpMenuItems = [
    { label: 'Cam Kaul Productions Help' },
    { separator: true },
    { label: 'Keyboard Shortcuts', shortcut: '⌘/' },
    { label: 'About' },
  ];

  const menuConfigs = [
    { label: 'File', items: fileMenuItems },
    { label: 'Edit', items: editMenuItems },
    { label: 'View', items: viewMenuItems },
    { label: 'Help', items: helpMenuItems },
  ];

  // Mobile: iPhone-style status bar with Dynamic Island
  if (isMobile) {
    return (
      <header className="menu-bar h-11 flex items-center justify-between px-6 text-sm select-none fixed top-0 left-0 right-0 z-[9998] pt-1">
        {/* Left side - Time */}
        <div className="text-foreground/90 font-semibold text-[15px]">
          {formatTime(currentTime)}
        </div>

        {/* Center - Dynamic Island style pill */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1">
          <div className="bg-black rounded-full px-5 py-2 flex items-center justify-center min-w-[160px]">
            <span className="text-white text-[11px] font-medium tracking-wide">Cam Kaul Productions</span>
          </div>
        </div>

        {/* Right side - empty spacer for balance */}
        <div className="w-8" />
      </header>
    );
  }

  // Desktop: Full menu bar
  return (
    <header className="menu-bar h-7 flex items-center justify-between px-4 text-sm select-none fixed top-0 left-0 right-0 z-[9998]">
      {/* Left side - Logo and menus */}
      <div className="flex items-center gap-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-[4px] bg-foreground/80 flex items-center justify-center">
            <span className="text-background text-[9px] font-semibold leading-none">CK</span>
          </div>
          <span className="font-medium text-foreground/90 tracking-tight">Cam Kaul Productions</span>
        </div>

        {/* Menu Items with Dropdowns */}
        <nav className="flex items-center">
          {menuConfigs.map((menu) => (
            <DropdownMenu key={menu.label}>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-1 text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors rounded">
                  {menu.label}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                sideOffset={4}
                className="min-w-[200px] bg-popover/95 backdrop-blur-xl border border-border/50 shadow-lg"
              >
                {menu.items.map((item, index) =>
                  'separator' in item ? (
                    <DropdownMenuSeparator key={index} />
                  ) : (
                    <DropdownMenuItem key={item.label} className="flex justify-between">
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-xs text-muted-foreground ml-4">{item.shortcut}</span>
                      )}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
      </div>

      {/* Right side - Instagram, search and time */}
      <div className="flex items-center gap-3">
        {/* Instagram */}
        <a
          href="https://instagram.com/camkaul.prod"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors p-1"
          title="Instagram"
        >
          <InstagramIcon />
        </a>

        {/* Search */}
        <button
          onClick={onSpotlightOpen}
          className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors p-1"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Date/Time with Calendar Popover */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 px-2 py-1 rounded transition-colors">
              <span>{formatDate(currentTime)}</span>
              <span className="ml-2">{formatTime(currentTime)}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent 
            align="end" 
            sideOffset={8}
            className="w-auto p-0 bg-popover/95 backdrop-blur-xl border border-border/50 shadow-lg"
          >
            <Calendar
              mode="single"
              selected={currentTime}
              className="rounded-md"
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
