import { useRef, useEffect, ReactNode } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { useWindows, WindowId } from '@/contexts/WindowContext';

interface WindowProps {
  id: WindowId;
  children: ReactNode;
}

export function Window({ id, children }: WindowProps) {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    focusWindow,
    updateWindowPosition,
    isMobile,
  } = useWindows();

  const windowState = windows.find(w => w.id === id);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

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

  // Mobile: full screen stacked view
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => focusWindow(id)}
        >
          {/* Mobile Title Bar */}
          <div className="window-titlebar">
            <div className="flex items-center gap-2">
              <button
                onClick={() => closeWindow(id)}
                className="window-control window-control-close"
                aria-label="Close window"
              />
              <button
                onClick={() => minimizeWindow(id)}
                className="window-control window-control-minimize"
                aria-label="Minimize window"
              />
              <div className="window-control window-control-maximize" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-foreground/80">
              {windowState.title}
            </span>
          </div>

          {/* Content */}
          <div className="h-[calc(100%-2.75rem)] overflow-auto custom-scrollbar bg-card">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop: draggable windows
  return (
    <AnimatePresence>
      <motion.div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: windowState.zIndex }}
      >
        <motion.div
          className={`window-chrome pointer-events-auto absolute ${isActive ? 'ring-1 ring-ring/20' : ''}`}
          style={{
            width: windowState.size.width,
            height: windowState.size.height,
            left: windowState.position.x,
            top: windowState.position.y,
          }}
          drag
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          dragListener={false}
          onDragEnd={(_, info) => {
            updateWindowPosition(id, {
              x: windowState.position.x + info.offset.x,
              y: windowState.position.y + info.offset.y,
            });
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={() => focusWindow(id)}
        >
          {/* Title Bar - Drag Handle */}
          <div
            className="window-titlebar cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => {
              focusWindow(id);
              dragControls.start(e);
            }}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="window-control window-control-close"
                aria-label="Close window"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="window-control window-control-minimize"
                aria-label="Minimize window"
              />
              <div className="window-control window-control-maximize" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-foreground/80">
              {windowState.title}
            </span>
          </div>

          {/* Content */}
          <div
            className="h-[calc(100%-2.75rem)] overflow-auto custom-scrollbar bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
