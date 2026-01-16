import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindows, WindowId } from '@/contexts/WindowContext';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WidgetWindowProps {
  id: WindowId;
  title: string;
  children: ReactNode;
}

export function WidgetWindow({ id, title, children }: WidgetWindowProps) {
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

  if (!windowState || !windowState.isOpen || windowState.isMinimized || isMobile) {
    return null;
  }

  const isActive = activeWindowId === id;

  // Handle drag end
  const handleDragEnd = (_: never, info: { offset: { x: number; y: number } }) => {
    updateWindowPosition(id, {
      x: windowState.position.x + info.offset.x,
      y: windowState.position.y + info.offset.y,
    });
  };

  // Handle resize
  const handleResizeStart = (direction: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

      if (direction.includes('e')) newWidth = Math.max(200, startWidth + deltaX);
      if (direction.includes('w')) {
        newWidth = Math.max(200, startWidth - deltaX);
        newX = startPosX + (startWidth - newWidth);
      }
      if (direction.includes('s')) newHeight = Math.max(150, startHeight + deltaY);
      if (direction.includes('n')) {
        newHeight = Math.max(150, startHeight - deltaY);
        newY = startPosY + (startHeight - newHeight);
      }

      updateWindowSize(id, { width: newWidth, height: newHeight });
      updateWindowPosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: windowState.zIndex + 10 }}
      >
        <motion.div
          className={`widget-window pointer-events-auto absolute rounded-2xl overflow-hidden transition-shadow duration-200 ${
            isActive 
              ? 'shadow-[0_20px_40px_-8px_rgba(0,0,0,0.4)] ring-1 ring-white/10' 
              : 'shadow-[0_12px_24px_-6px_rgba(0,0,0,0.3)] opacity-90'
          }`}
          style={{
            width: windowState.size.width,
            height: windowState.size.height,
            left: windowState.position.x,
            top: windowState.position.y,
            background: 'linear-gradient(180deg, rgba(30,30,35,0.95) 0%, rgba(20,20,25,0.98) 100%)',
            backdropFilter: 'blur(20px)',
          }}
          drag
          dragMomentum={false}
          dragElastic={0}
          dragListener={false}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => focusWindow(id)}
        >
          {/* Title Bar - Always on top of content */}
          <motion.div
            className={`relative z-20 flex items-center justify-between px-4 py-3 cursor-grab active:cursor-grabbing border-b border-white/5 ${
              isActive ? '' : 'opacity-80'
            }`}
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            }}
            onPointerDown={(e) => {
              // Don't start drag if clicking on buttons
              if ((e.target as HTMLElement).closest('button')) {
                return;
              }
              focusWindow(id);
              // Start drag from title bar
              const target = e.currentTarget.closest('.widget-window') as HTMLElement;
              if (target) {
                const startX = e.clientX;
                const startY = e.clientY;
                const startPosX = windowState.position.x;
                const startPosY = windowState.position.y;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaX = moveEvent.clientX - startX;
                  const deltaY = moveEvent.clientY - startY;
                  updateWindowPosition(id, {
                    x: startPosX + deltaX,
                    y: startPosY + deltaY,
                  });
                };

                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }
            }}
          >
            {/* Title */}
            <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-white/60'}`}>
              {title}
            </span>

            {/* Controls - Higher z-index to stay clickable */}
            <div className="flex items-center gap-2 relative z-30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  minimizeWindow(id);
                }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Minimize"
              >
                <Minus className="w-3 h-3 text-white/70" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  closeWindow(id);
                }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors group"
                aria-label="Close"
              >
                <X className="w-3 h-3 text-white/70 group-hover:text-white" />
              </button>
            </div>
          </motion.div>

          {/* Content - Lower z-index so title bar stays on top */}
          <div className="relative z-10 w-full h-[calc(100%-52px)] overflow-hidden">
            {children}
          </div>

          {/* Resize Handles */}
          <div
            className="absolute right-0 top-12 bottom-0 w-2 cursor-e-resize hover:bg-white/10 transition-colors"
            onPointerDown={handleResizeStart('e')}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize hover:bg-white/10 transition-colors"
            onPointerDown={handleResizeStart('s')}
          />
          <div
            className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize hover:bg-white/10 transition-colors"
            onPointerDown={handleResizeStart('se')}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}