import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DesktopWidgetProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onSelect?: (e?: React.MouseEvent) => void;
  onDragStart?: (clientX: number, clientY: number) => void;
  onDragMove?: (deltaX: number, deltaY: number) => void;
  onDragEnd?: (deltaX: number, deltaY: number) => void;
  size?: number;
}

export function DesktopWidget({
  children,
  isSelected = false,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
  size = 200,
}: DesktopWidgetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragThresholdRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragThresholdRef.current = false;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.x;
      const deltaY = moveEvent.clientY - dragStartRef.current.y;
      
      // Drag threshold to prevent accidental drags
      if (!dragThresholdRef.current && Math.abs(deltaX) + Math.abs(deltaY) > 5) {
        dragThresholdRef.current = true;
        setIsDragging(true);
        onDragStart?.(dragStartRef.current.x, dragStartRef.current.y);
      }

      if (dragThresholdRef.current) {
        onDragMove?.(deltaX, deltaY);
      }
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      const deltaX = upEvent.clientX - dragStartRef.current.x;
      const deltaY = upEvent.clientY - dragStartRef.current.y;

      if (dragThresholdRef.current) {
        onDragEnd?.(deltaX, deltaY);
        setIsDragging(false);
      } else {
        // It was a click, not a drag
        onSelect?.(e);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      className={`relative cursor-pointer ${isSelected ? 'z-20' : 'z-10'}`}
      animate={{
        scale: isDragging ? 1.03 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        width: size,
        height: size,
        zIndex: isDragging ? 1000 : isSelected ? 20 : 10,
        cursor: isDragging ? 'grabbing' : 'pointer',
      }}
    >
      {/* Selection highlight */}
      {isSelected && (
        <motion.div 
          className="absolute inset-[-4px] bg-white/10 rounded-[20px] border border-white/30"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
      
      <div 
        className="w-full h-full rounded-2xl overflow-hidden"
        style={{
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.25),
            0 4px 12px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
