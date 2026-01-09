import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  onDoubleClick: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function DesktopIcon({ 
  icon: Icon, 
  label, 
  onClick, 
  onDoubleClick,
  isSelected = false,
  onSelect,
}: DesktopIconProps) {
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      onDoubleClick();
    } else {
      onSelect?.();
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
      className={`desktop-icon w-20 ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-lg mx-auto ${
        isSelected ? 'ring-2 ring-primary/50' : ''
      }`}>
        <Icon className="w-7 h-7 text-foreground" />
      </div>
      <span 
        className={`text-xs font-medium text-center mt-1 px-2 py-0.5 rounded-md block ${
          isSelected 
            ? 'bg-primary text-primary-foreground' 
            : 'text-white bg-black/30 backdrop-blur-sm'
        }`}
        style={{ textShadow: isSelected ? 'none' : '0 1px 3px rgba(0,0,0,0.5)' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
