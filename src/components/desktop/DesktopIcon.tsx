import { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  onDoubleClick: () => void;
}

export function DesktopIcon({ icon: Icon, label, onClick, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    onClick();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick();
  };

  return (
    <motion.button
      className={`desktop-icon w-20 ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={() => setIsSelected(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-md">
        <Icon className="w-7 h-7 text-foreground" />
      </div>
      <span className="text-xs text-center mt-1 text-shadow-sm text-foreground font-medium leading-tight">
        {label}
      </span>
    </motion.button>
  );
}
