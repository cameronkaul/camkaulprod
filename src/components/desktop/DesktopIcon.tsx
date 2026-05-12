import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';

interface DesktopIconProps {
  type: AppIconType;
  label: string;
  onClick: () => void;
  onDoubleClick: () => void;
  isSelected?: boolean;
  onSelect?: (e?: React.MouseEvent) => void;
  onDragStart?: (clientX: number, clientY: number) => void;
  onDragMove?: (deltaX: number, deltaY: number) => void;
  onDragEnd?: (deltaX: number, deltaY: number) => void;
}

export function DesktopIcon({ 
  type,
  label, 
  onClick, 
  onDoubleClick,
  isSelected = false,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
}: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragThresholdRef = useRef(false);
  const clickCountRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragThresholdRef.current = false;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.x;
      const deltaY = moveEvent.clientY - dragStartRef.current.y;
      
      // Drag threshold to prevent accidental drags (5px)
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
        // Was a drag
        onDragEnd?.(deltaX, deltaY);
        setIsDragging(false);
      } else {
        // Was a click - handle single/double click
        clickCountRef.current += 1;
        
        if (clickCountRef.current === 1) {
          onSelect?.(e);
          onClick();
          
          clickTimeoutRef.current = setTimeout(() => {
            clickCountRef.current = 0;
          }, 300);
        } else if (clickCountRef.current === 2) {
          if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
          }
          clickCountRef.current = 0;
          onDoubleClick();
        }
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
        scale: isDragging ? 1.08 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        zIndex: isDragging ? 1000 : isSelected ? 20 : 10,
        cursor: isDragging ? 'grabbing' : 'pointer',
        touchAction: 'none',
      }}
    >
      {/* Selection highlight background */}
      {isSelected && (
        <motion.div 
          className="absolute inset-[-4px] bg-white/12 rounded-xl border border-white/25"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
      
      <AppIcon
        type={type}
        size={64}
        showLabel={true}
        isSelected={isSelected}
        customLabel={label}
      />
    </motion.div>
  );
}
