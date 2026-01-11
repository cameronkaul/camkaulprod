import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindows, WindowId } from '@/contexts/WindowContext';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface DockItem {
  id: WindowId;
  type: AppIconType;
}

const dockItems: DockItem[] = [
  { id: 'portfolio', type: 'portfolio' },
  { id: 'instagram', type: 'instagram' },
  { id: 'mail', type: 'mail' },
  { id: 'about', type: 'about' },
  { id: 'resume', type: 'resume' },
  { id: 'runner', type: 'runner' },
  { id: 'trash', type: 'trash' },
];

export function Dock() {
  const { openWindow, windows, focusWindow, closeWindow, isMobile } = useWindows();
  const [bouncingId, setBouncingId] = useState<WindowId | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: WindowId) => {
    const window = windows.find(w => w.id === id);
    if (window?.isOpen && !window.isMinimized) {
      focusWindow(id);
    } else {
      setBouncingId(id);
      setTimeout(() => setBouncingId(null), 600);
      openWindow(id);
    }
  };

  const mobileDockItems = dockItems.filter(item => 
    ['portfolio', 'mail', 'about', 'resume'].includes(item.id)
  );

  const displayItems = isMobile ? mobileDockItems : dockItems;

  return (
    <motion.div
      className={`fixed ${isMobile ? 'bottom-6' : 'bottom-4'} left-0 right-0 flex justify-center z-[9997]`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div 
        ref={dockRef}
        className={`dock-container rounded-3xl ${isMobile ? 'px-4 py-3' : 'px-5 py-3'} flex items-end ${isMobile ? 'gap-4' : 'gap-3'}`}
      >
        {displayItems.map((item, index) => {
          const windowState = windows.find(w => w.id === item.id);
          const isOpen = windowState?.isOpen && !windowState.isMinimized;
          const isBouncing = bouncingId === item.id;

          return (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <motion.div
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                  animate={isBouncing ? {
                    y: [0, -20, 0, -10, 0],
                    transition: { duration: 0.5, ease: 'easeOut' }
                  } : {}}
                  whileHover={!isMobile ? { y: -8 } : {}}
                >
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredIndex === index && !isMobile && (
                      <motion.div 
                        className="absolute -top-10 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AppIcon
                    type={item.type}
                    size={isMobile ? 52 : 56}
                    showLabel={false}
                    onClick={() => handleClick(item.id)}
                  />

                  {/* Open Indicator */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-foreground/70"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </ContextMenuTrigger>
              <ContextMenuContent className="min-w-[160px] bg-popover/95 backdrop-blur-xl border border-border/50">
                <ContextMenuItem onClick={() => handleClick(item.id)}>
                  {isOpen ? 'Show' : 'Open'}
                </ContextMenuItem>
                {isOpen && (
                  <>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => closeWindow(item.id)}>
                      Close
                    </ContextMenuItem>
                  </>
                )}
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
    </motion.div>
  );
}
