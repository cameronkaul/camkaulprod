import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';

interface DesktopIconProps {
  type: AppIconType;
  label: string;
  onClick: () => void;
  onDoubleClick: () => void;
  isSelected?: boolean;
  onSelect?: (e?: React.MouseEvent) => void;
}

export function DesktopIcon({ 
  type,
  label, 
  onClick, 
  onDoubleClick,
  isSelected = false,
  onSelect,
}: DesktopIconProps) {
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      onDoubleClick();
    } else {
      onSelect?.(e);
      onClick();
      const timeout = setTimeout(() => {
        setClickTimeout(null);
      }, 300);
      setClickTimeout(timeout);
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimeout) clearTimeout(clickTimeout);
    };
  }, [clickTimeout]);

  return (
    <motion.div 
      onClick={handleClick}
      className={`relative cursor-pointer ${isSelected ? 'z-20' : 'z-10'}`}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ 
        scale: 1.05, 
        zIndex: 100,
        cursor: 'grabbing',
      }}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Selection highlight background */}
      {isSelected && (
        <motion.div 
          className="absolute inset-[-4px] bg-white/10 rounded-xl border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
      
      <AppIcon
        type={type}
        size={56}
        showLabel={true}
        isSelected={isSelected}
        customLabel={label}
      />
    </motion.div>
  );
}
