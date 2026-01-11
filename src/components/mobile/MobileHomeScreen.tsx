import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, User, Mail, FileText, Trash2, Gamepad2, X } from 'lucide-react';
import { useWindows, WindowId } from '@/contexts/WindowContext';
import { openContactEmail } from '@/components/windows/ContactWindow';

interface AppIcon {
  id: WindowId;
  icon: React.ElementType;
  label: string;
}

const mainApps: AppIcon[] = [
  { id: 'portfolio', icon: Folder, label: 'Portfolio' },
  { id: 'contact', icon: Mail, label: 'Contact' },
  { id: 'about', icon: User, label: 'About' },
];

const folderApps: AppIcon[] = [
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'trash', icon: Trash2, label: 'Trash' },
  { id: 'runner', icon: Gamepad2, label: 'Runner' },
];

export function MobileHomeScreen() {
  const { openWindow } = useWindows();
  const [folderOpen, setFolderOpen] = useState(false);

  const handleAppClick = (id: WindowId) => {
    if (id === 'contact') {
      openContactEmail();
    } else {
      openWindow(id);
    }
  };

  const handleFolderAppClick = (id: WindowId) => {
    setFolderOpen(false);
    setTimeout(() => {
      if (id === 'contact') {
        openContactEmail();
      } else {
        openWindow(id);
      }
    }, 200);
  };

  return (
    <>
      {/* App Grid */}
      <div className="absolute inset-x-0 top-16 bottom-0 flex flex-col items-center pt-8 px-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Apps */}
          {mainApps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-lg border border-border/50">
                <app.icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
              </div>
              <span className="text-xs text-foreground/90 font-medium">{app.label}</span>
            </button>
          ))}

          {/* Folder */}
          <button
            onClick={() => setFolderOpen(true)}
            className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/60 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 p-1.5">
              {/* Mini icons grid inside folder */}
              <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                {folderApps.slice(0, 4).map((app) => (
                  <div
                    key={app.id}
                    className="rounded-md bg-gradient-to-br from-secondary/80 to-muted flex items-center justify-center"
                  >
                    <app.icon className="w-3 h-3 text-foreground/80" strokeWidth={2} />
                  </div>
                ))}
              </div>
            </div>
            <span className="text-xs text-foreground/90 font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Folder Overlay */}
      <AnimatePresence>
        {folderOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9990]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFolderOpen(false)}
            />

            {/* Folder Content */}
            <motion.div
              className="fixed inset-x-6 top-1/3 z-[9991] bg-muted/90 backdrop-blur-xl rounded-3xl p-5 border border-border/50"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Folder header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">More</h3>
                <button
                  onClick={() => setFolderOpen(false)}
                  className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-foreground/70" />
                </button>
              </div>

              {/* Folder apps grid */}
              <div className="grid grid-cols-3 gap-4">
                {folderApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleFolderAppClick(app.id)}
                    className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-lg border border-border/50">
                      <app.icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs text-foreground/90 font-medium">{app.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
