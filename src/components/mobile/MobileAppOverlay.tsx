import { ReactNode, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { useWindows, WindowId } from '@/contexts/WindowContext';
import { HeaderIcon, windowIdToIconType, getAppConfig } from '@/components/icons/AppIcon';

interface MobileAppOverlayProps {
  id: WindowId;
  children: ReactNode;
}

// App-specific window titles
const windowTitles: Record<WindowId, string> = {
  portfolio: 'Portfolio',
  photos: 'Photos',
  mail: 'Mail',
  about: 'Notes',
  resume: 'Docs',
  runner: 'Runner',
  trash: 'Trash',
  project: 'Project',
  document: 'Document',
  instagram: 'Instagram',
  videoWidget: 'Featured Video',
  photoWidget: 'Photo Gallery',
  workGallery: 'Design Work',
};

export function MobileAppOverlay({ id, children }: MobileAppOverlayProps) {
  const { windows, closeWindow } = useWindows();
  const windowState = windows.find(w => w.id === id);
  const constraintsRef = useRef(null);
  
  const iconType = windowIdToIconType(id);
  const appConfig = iconType ? getAppConfig(iconType) : null;
  const displayTitle = id === 'project' ? windowState?.title : windowTitles[id] || windowState?.title;

  if (!windowState || !windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    // If dragged down more than 100px with velocity, close the app
    if (info.offset.y > 100 && info.velocity.y > 200) {
      closeWindow(id);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={constraintsRef}
        className="fixed inset-0 z-[10000] flex flex-col"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={handleDragEnd}
      >
        {/* App background - covers entire viewport */}
        <div 
          className="absolute inset-0 bg-card"
          style={{
            background: appConfig 
              ? `linear-gradient(180deg, ${appConfig.accentColor}08 0%, hsl(var(--card)) 10%)`
              : 'hsl(var(--card))',
          }}
        />
        
        {/* Drag handle indicator at top */}
        <div className="relative flex justify-center pt-3 pb-1 z-10">
          <div className="w-10 h-1 rounded-full bg-foreground/30" />
        </div>
        
        {/* App Header with close button */}
        <div 
          className="relative flex items-center justify-between px-4 py-2 border-b border-border/30 z-10"
          style={{
            background: appConfig 
              ? `linear-gradient(180deg, ${appConfig.accentColor}15 0%, transparent 100%)`
              : 'transparent',
          }}
        >
          {/* Close button - prominent circular X */}
          <button
            onClick={() => closeWindow(id)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/80 hover:bg-muted active:scale-95 transition-all"
            aria-label="Close app"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          
          {/* App title with icon */}
          <div className="flex items-center gap-2">
            {iconType && <HeaderIcon type={iconType} size={20} />}
            <span className="text-sm font-semibold text-foreground">
              {displayTitle}
            </span>
          </div>
          
          {/* Spacer for balance */}
          <div className="w-10" />
        </div>

        {/* App content - scrollable */}
        <div className="relative flex-1 overflow-auto custom-scrollbar z-10">
          {children}
        </div>

        {/* Bottom safe area */}
        <div className="relative h-6 bg-card z-10" />
      </motion.div>
    </AnimatePresence>
  );
}