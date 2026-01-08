import { useState, useEffect, useRef } from 'react';
import { Search, Wifi, Volume2, Battery } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface MenuBarProps {
  onSpotlightOpen: () => void;
}

export function MenuBar({ onSpotlightOpen }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

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

  return (
    <header className="menu-bar h-7 flex items-center justify-between px-4 text-sm select-none fixed top-0 left-0 right-0 z-[9998]">
      {/* Left side - Logo and menus */}
      <div className="flex items-center gap-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">CK</span>
          </div>
          <span className="font-semibold text-foreground">Cam Kaul Productions</span>
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

      {/* Right side - Status icons, search, and time */}
      <div className="flex items-center gap-3">
        {/* Status Icons */}
        <div className="flex items-center gap-2.5 text-foreground/70">
          <button className="hover:text-foreground transition-colors p-1">
            <Volume2 className="w-4 h-4" />
          </button>
          <button className="hover:text-foreground transition-colors p-1">
            <Wifi className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 hover:text-foreground transition-colors p-1">
            <Battery className="w-4 h-4" />
            <span className="text-xs">100%</span>
          </div>
        </div>

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
