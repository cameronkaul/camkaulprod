import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Folder, User, Mail, FileText, Film, Trash2, Gamepad2 } from 'lucide-react';
import { useWindows, WindowId } from '@/contexts/WindowContext';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

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
  { id: 'runner', icon: Gamepad2, label: 'Runner' },
  { id: 'trash', icon: Trash2, label: 'Deleted Scenes' },
];

export function Dock() {
  const { openWindow, windows, focusWindow, closeWindow } = useWindows();
  const [bouncingId, setBouncingId] = useState<WindowId | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    setHoveredIndex(null);
  };

  const handleClick = (id: WindowId) => {
    const window = windows.find(w => w.id === id);
    if (window?.isOpen && !window.isMinimized) {
      focusWindow(id);
    } else {
      // Trigger bounce animation
      setBouncingId(id);
      setTimeout(() => setBouncingId(null), 600);
      openWindow(id);
    }
  };

  // Check if trash has content (for full/empty state)
  const trashHasContent = true; // Placeholder - would check deleted scenes

  return (
    <motion.div
      className="fixed bottom-4 left-0 right-0 flex justify-center z-[9997]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div 
        ref={dockRef}
        className="dock-container rounded-2xl px-3 py-2 flex items-end gap-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {dockItems.map((item, index) => {
          const windowState = windows.find(w => w.id === item.id);
          const isOpen = windowState?.isOpen && !windowState.isMinimized;
          const isBouncing = bouncingId === item.id;
          const isTrash = item.id === 'trash';

          return (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <DockIcon
                  item={item}
                  index={index}
                  mouseX={mouseX}
                  isOpen={isOpen}
                  isBouncing={isBouncing}
                  isTrash={isTrash}
                  trashHasContent={trashHasContent}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  onClick={() => handleClick(item.id)}
                  totalItems={dockItems.length}
                />
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
                <ContextMenuSeparator />
                <ContextMenuItem disabled>
                  Options
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
    </motion.div>
  );
}

interface DockIconProps {
  item: DockItem;
  index: number;
  mouseX: ReturnType<typeof useMotionValue>;
  isOpen: boolean;
  isBouncing: boolean;
  isTrash: boolean;
  trashHasContent: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  onClick: () => void;
  totalItems: number;
}

function DockIcon({ 
  item, 
  index, 
  mouseX, 
  isOpen, 
  isBouncing, 
  isTrash,
  trashHasContent,
  hoveredIndex,
  setHoveredIndex,
  onClick,
  totalItems 
}: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Calculate distance from mouse for magnification
  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return 150;
    const rect = ref.current.getBoundingClientRect();
    const iconCenter = rect.left + rect.width / 2;
    const dockLeft = ref.current.parentElement?.getBoundingClientRect().left || 0;
    return Math.abs(val - (iconCenter - dockLeft));
  });

  // Magnification based on distance
  const baseSize = 48;
  const maxSize = 72;
  const size = useSpring(
    useTransform(distance, [0, 100, 200], [maxSize, baseSize + 8, baseSize]),
    { stiffness: 400, damping: 25 }
  );

  const translateY = useSpring(
    useTransform(distance, [0, 100, 200], [-12, -4, 0]),
    { stiffness: 400, damping: 25 }
  );

  return (
    <motion.button
      ref={ref}
      className="dock-icon flex flex-col items-center group relative"
      onClick={onClick}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ y: translateY }}
      animate={isBouncing ? {
        y: [0, -30, 0, -15, 0],
        transition: { duration: 0.6, ease: 'easeOut' }
      } : {}}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.div 
            className="absolute -top-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div 
        className="rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-lg border border-border/50 overflow-hidden"
        style={{ width: size, height: size }}
      >
      <item.icon 
          className="text-foreground w-1/2 h-1/2"
          strokeWidth={2}
        />
      </motion.div>

      {/* Open Indicator Dot */}
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
    </motion.button>
  );
}
