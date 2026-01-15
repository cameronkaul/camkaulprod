import { useState, useEffect } from 'react';
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
    <div 
      onClick={handleClick}
      className={`relative ${isSelected ? 'ring-2 ring-primary/50 rounded-xl' : ''}`}
    >
      <AppIcon
        type={type}
        size={56}
        showLabel={true}
        isSelected={isSelected}
        customLabel={label}
      />
    </div>
  );
}
