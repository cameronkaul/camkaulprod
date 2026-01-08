import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface MenuBarProps {
  onSpotlightOpen: () => void;
}

export function MenuBar({ onSpotlightOpen }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const menuItems = ['File', 'Edit', 'View', 'Help'];

  return (
    <header className="menu-bar h-7 flex items-center justify-between px-4 text-sm select-none fixed top-0 left-0 right-0 z-[9998]">
      {/* Left side - Logo and menus */}
      <div className="flex items-center gap-5">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">CK</span>
          </div>
          <span className="font-semibold text-foreground">Cam Kaul Productions</span>
        </div>

        {/* Menu Items */}
        <nav className="flex items-center gap-4">
          {menuItems.map((item) => (
            <button
              key={item}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Right side - Search and time */}
      <div className="flex items-center gap-4">
        <button
          onClick={onSpotlightOpen}
          className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>
        <div className="text-foreground/80">
          <span>{formatDate(currentTime)}</span>
          <span className="ml-2">{formatTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
}
