import { useState, useEffect } from 'react';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';

interface DesktopIconProps {
  type: AppIconType;
  label: string;
  onClick: () => void;
  onDoubleClick: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
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
    <div onClick={handleClick}>
      <AppIcon
        type={type}
        size={56}
        showLabel={true}
        isSelected={isSelected}
      />
    </div>
  );
}
