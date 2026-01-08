import { motion } from 'framer-motion';
import { Folder, User, Mail, FileText, Film, Trash2 } from 'lucide-react';
import { useWindows, WindowId } from '@/contexts/WindowContext';

interface DockItem {
  id: WindowId;
  icon: React.ElementType;
  label: string;
}

const dockItems: DockItem[] = [
  { id: 'portfolio', icon: Folder, label: 'Portfolio' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'contact', icon: Mail, label: 'Contact' },
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'reels', icon: Film, label: 'Reels' },
  { id: 'trash', icon: Trash2, label: 'Deleted Scenes' },
];

export function Dock() {
  const { openWindow, windows, focusWindow } = useWindows();

  const handleClick = (id: WindowId) => {
    const window = windows.find(w => w.id === id);
    if (window?.isOpen && !window.isMinimized) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9997]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="dock-container rounded-2xl px-3 py-2 flex items-end gap-2">
        {dockItems.map((item, index) => {
          const window = windows.find(w => w.id === item.id);
          const isOpen = window?.isOpen && !window.isMinimized;

          return (
            <motion.button
              key={item.id}
              className="dock-icon flex flex-col items-center group relative"
              onClick={() => handleClick(item.id)}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ y: -8, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                {item.label}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-lg border border-border/50">
                <item.icon className="w-6 h-6 text-foreground" />
              </div>

              {/* Open Indicator */}
              {isOpen && (
                <motion.div
                  className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-foreground/60"
                  layoutId={`indicator-${item.id}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
