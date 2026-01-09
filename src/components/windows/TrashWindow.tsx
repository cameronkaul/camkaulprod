import { useState } from 'react';
import { FileText } from 'lucide-react';
import { useWindows } from '@/contexts/WindowContext';

export function TrashWindow() {
  const [isSelected, setIsSelected] = useState(false);
  const { openWindow } = useWindows();

  const handleDoubleClick = () => {
    openWindow('document');
  };

  return (
    <div 
      className="h-full p-4 bg-background/50"
      onClick={() => setIsSelected(false)}
    >
      <div
        className={`inline-flex flex-col items-center gap-1 p-2 rounded-lg cursor-default select-none transition-colors ${
          isSelected ? 'bg-primary/20' : 'hover:bg-muted/50'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsSelected(true);
        }}
        onDoubleClick={handleDoubleClick}
      >
        <FileText className={`w-12 h-12 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
        <span className={`text-xs text-center max-w-[80px] leading-tight ${isSelected ? 'text-primary' : 'text-foreground'}`}>
          Nothing Important.doc
        </span>
      </div>
    </div>
  );
}
