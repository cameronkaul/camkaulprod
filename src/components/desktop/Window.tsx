import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useDragControls, AnimatePresence, PanInfo } from 'framer-motion';
import { useWindows, WindowId } from '@/contexts/WindowContext';
import { X } from 'lucide-react';
import { HeaderIcon, windowIdToIconType, getAppConfig, AppIconType } from '@/components/icons/AppIcon';

interface WindowProps {
  id: WindowId;
  children: ReactNode;
}

const windowTitles: Record<WindowId, string> = {
  portfolio: 'Portfolio',
  photos: 'Photos',
  mail: 'Mail',
  about: 'Notes',
  resume: 'Resume',
  runner: 'Runner',
  trash: 'Trash',
  project: 'Project',
  document: 'Document',
  instagram: 'Instagram',
  videoWidget: 'Featured Work',
  photoWidget: 'Gallery',
  workGallery: 'Design Work',
};

export function Window({ id, children }: WindowProps) {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    isMobile,
  } = useWindows();

  const windowState = windows.find(w => w.id === id);
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);

  const iconType = windowIdToIconType(id);
  const appConfig = iconType ? getAppConfig(iconType) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeWindowId === id) {
        closeWindow(id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId, id, closeWindow]);

  if (!windowState || !windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const isActive = activeWindowId === id;
  const displayTitle = id === 'project' ? windowState.title : windowTitles[id] || windowState.title;

  // Handle resize
  const handleResizeStart = (direction: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowState.size.width;
    const startHeight = windowState.size.height;
    const startPosX = windowState.position.x;
    const startPosY = windowState.position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      if (direction.includes('e')) newWidth = Math.max(300, startWidth + deltaX);
      if (direction.includes('w')) {
        newWidth = Math.max(300, startWidth - deltaX);
        newX = startPosX + (startWidth - newWidth);
      }
      if (direction.includes('s')) newHeight = Math.max(200, startHeight + deltaY);
      if (direction.includes('n')) {
        newHeight = Math.max(200, startHeight - deltaY);
        newY = startPosY + (startHeight - newHeight);
      }

      updateWindowSize(id, { width: newWidth, height: newHeight });
      updateWindowPosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Mobile: full screen with easy close
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-x-0 top-7 bottom-0 z-50 bg-card flex flex-col rounded-t-xl overflow-hidden"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={() => focusWindow(id)}
        >
          {/* Drag handle indicator */}
          <div className="flex justify-center pt-2 pb-1 bg-card/95 backdrop-blur-xl">
            <div className="w-10 h-1 rounded-full bg-foreground/30" />
          </div>
          
          {/* Mobile Title Bar - iOS style with app icon */}
          <div 
            className="flex items-center justify-between px-3 py-2 backdrop-blur-xl border-b border-border/30"
            style={{
              background: appConfig 
                ? `linear-gradient(180deg, ${appConfig.accentColor}15 0%, transparent 100%)`
                : 'hsl(var(--card) / 0.95)',
            }}
          >
            <button
              onClick={() => closeWindow(id)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 hover:bg-muted active:scale-95 transition-all"
              aria-label="Close window"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {iconType && <HeaderIcon type={iconType} size={20} />}
              <span className="text-sm font-semibold text-foreground">
                {displayTitle}
              </span>
            </div>
            <div className="w-10" /> {/* Spacer for balance */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto custom-scrollbar bg-card">
            {children}
          </div>

          {/* Bottom safe area for iOS */}
          <div className="h-6 bg-card" />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop: draggable windows
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 pointer-events-none relative"
        style={{ zIndex: windowState.zIndex }}
      >
        {/* Hard walls: keep draggable windows inside the visible desktop area */}
        <div
          ref={dragConstraintsRef}
          className="absolute inset-x-0 top-7 bottom-24 pointer-events-none"
        />

        <motion.div
          ref={windowRef}
          className={`window-chrome pointer-events-auto absolute transition-shadow duration-200 ${
            isActive 
              ? 'shadow-[0_25px_50px_-12px_hsl(220_30%_10%_/_0.35)] ring-1 ring-ring/20' 
              : 'shadow-[0_15px_30px_-10px_hsl(220_30%_10%_/_0.2)] opacity-95'
          }`}
          style={{
            width: windowState.size.width,
            height: windowState.size.height,
            left: windowState.position.x,
            top: windowState.position.y,
          }}
          drag
          dragConstraints={dragConstraintsRef}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          dragListener={false}
          onDragEnd={(_, info: PanInfo) => {
            updateWindowPosition(id, {
              x: windowState.position.x + info.offset.x,
              y: windowState.position.y + info.offset.y,
            });
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => focusWindow(id)}
        >
          {/* Title Bar - Drag Handle with app-specific styling */}
          <div
            className={`window-titlebar cursor-grab active:cursor-grabbing ${
              isActive ? '' : 'opacity-80'
            }`}
            style={{
              background: appConfig 
                ? `linear-gradient(180deg, ${appConfig.accentColor}20 0%, hsl(220 15% 14%) 100%)`
                : undefined,
            }}
            onPointerDown={(e) => {
              if (isResizing) return;
              focusWindow(id);
              dragControls.start(e);
            }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="window-control window-control-close group relative"
                aria-label="Close window"
              >
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-[8px] font-bold text-window-close-fg">×</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="window-control window-control-minimize group relative"
                aria-label="Minimize window"
              >
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-[8px] font-bold text-window-minimize-fg">−</span>
              </button>
              <div className="window-control window-control-maximize group relative">
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-[8px] font-bold text-window-maximize-fg">+</span>
              </div>
            </div>

            {/* App icon and title - left aligned after traffic lights */}
            <div className="flex items-center gap-2 ml-4">
              {iconType && <HeaderIcon type={iconType} size={16} />}
              <span className={`text-sm font-medium ${
                isActive ? 'text-foreground/90' : 'text-foreground/50'
              }`}>
                {displayTitle}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className="h-[calc(100%-2.75rem)] overflow-auto custom-scrollbar bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>

          {/* Resize Handles */}
          {/* Right edge */}
          <div
            className="absolute right-0 top-11 bottom-0 w-1 cursor-e-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('e')}
          />
          {/* Bottom edge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('s')}
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('se')}
          />
          {/* Left edge */}
          <div
            className="absolute left-0 top-11 bottom-0 w-1 cursor-w-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('w')}
          />
          {/* Top edge (below title bar) */}
          <div
            className="absolute top-11 left-0 right-0 h-1 cursor-n-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('n')}
          />
          {/* Corners */}
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('sw')}
          />
          <div
            className="absolute top-11 right-0 w-4 h-4 cursor-ne-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('ne')}
          />
          <div
            className="absolute top-11 left-0 w-4 h-4 cursor-nw-resize hover:bg-primary/20"
            onPointerDown={handleResizeStart('nw')}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
