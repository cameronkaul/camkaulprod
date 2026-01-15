import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  { id: 'mail', type: 'mail' },
  { id: 'about', type: 'about' },
  { id: 'resume', type: 'resume' },
  { id: 'runner', type: 'runner' },
  { id: 'trash', type: 'trash' },
];

const dockLabels: Record<WindowId, string> = {
  portfolio: 'Portfolio',
  mail: 'Mail',
  about: 'Notes',
  resume: 'Docs',
  runner: 'Runner',
  trash: 'Trash',
  instagram: 'Instagram',
  project: 'Project',
  document: 'Document',
  videoWidget: 'Featured Work',
  photoWidget: 'Gallery',
};

// macOS-style magnification constants
const BASE_SIZE = 56;
const MAX_SIZE = 80;
const MAGNIFICATION_RANGE = 160; // How far the effect extends in pixels

function DockIcon({ 
  item, 
  mouseX, 
  isActive,
  onHover,
  onLeave,
}: { 
  item: DockItem; 
  mouseX: ReturnType<typeof useMotionValue>; 
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const { openWindow, windows, focusWindow, closeWindow, isMobile } = useWindows();
  const [bouncingId, setBouncingId] = useState<WindowId | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const windowState = windows.find(w => w.id === item.id);
  const isOpen = windowState?.isOpen && !windowState.isMinimized;
  const isBouncing = bouncingId === item.id;

  // Calculate distance from mouse for magnification
  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current || !isActive) return MAGNIFICATION_RANGE;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  // Smooth spring animation for size
  const sizeValue = useTransform(distance, (d: number) => {
    const scale = 1 - Math.min(d / MAGNIFICATION_RANGE, 1);
    return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * scale;
  });
  const size = useSpring(sizeValue, {
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  });

  const handleClick = () => {
    if (windowState?.isOpen && !windowState.isMinimized) {
      focusWindow(item.id);
    } else {
      setBouncingId(item.id);
      setTimeout(() => setBouncingId(null), 600);
      openWindow(item.id);
    }
  };

  if (isMobile) {
    return (
      <motion.div
        className="relative flex flex-col items-center"
        animate={isBouncing ? {
          y: [0, -20, 0, -10, 0],
          transition: { duration: 0.5, ease: 'easeOut' }
        } : {}}
      >
        <AppIcon
          type={item.type}
          size={52}
          showLabel={false}
          onClick={handleClick}
        />
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
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <motion.div
          ref={ref}
          className="relative flex flex-col items-center origin-bottom cursor-pointer"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          animate={isBouncing ? {
            y: [0, -20, 0, -10, 0],
            transition: { duration: 0.5, ease: 'easeOut' }
          } : {}}
          style={{ 
            width: size,
            height: size,
          }}
          onClick={handleClick}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {isActive && (
              <motion.div 
                className="absolute -top-10 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
              >
                {dockLabels[item.id] || item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="w-full h-full flex items-end justify-center"
            style={{ width: size, height: size }}
          >
            <AppIcon
              type={item.type}
              size={BASE_SIZE}
              showLabel={false}
              className="!w-full !h-full"
            />
          </motion.div>

          {/* Open Indicator */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute -bottom-2 w-1 h-1 rounded-full bg-foreground/70"
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
        <ContextMenuItem onClick={handleClick}>
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
}

export function Dock() {
  const { isMobile } = useWindows();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dockHovered, setDockHovered] = useState(false);
  const [hasLeftOnce, setHasLeftOnce] = useState(false);
  const mouseX = useMotionValue(0);
  const dockRef = useRef<HTMLDivElement>(null);

  // Track mouse position within dock
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      mouseX.set(e.clientX);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile && hasLeftOnce) {
      setDockHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHasLeftOnce(true);
      setDockHovered(false);
      setHoveredIndex(null);
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
      <motion.div 
        ref={dockRef}
        className={`dock-container rounded-3xl ${isMobile ? 'px-4 py-3' : 'px-5 py-3'} flex items-end ${isMobile ? 'gap-4' : 'gap-2'}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayItems.map((item, index) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isActive={dockHovered && hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => {}}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
