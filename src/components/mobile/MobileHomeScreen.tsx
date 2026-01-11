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

const dockApps: AppIcon[] = [
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

  return (
    <>
      {/* App Grid - Main apps only */}
      <div className="absolute inset-x-0 top-16 bottom-24 flex flex-col items-center pt-8 px-8">
        <div className="grid grid-cols-3 gap-6">
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
        </div>
      </div>

      {/* iPhone-style Dock at bottom */}
      <div className="fixed bottom-6 inset-x-4 z-[9995]">
        <div className="bg-muted/60 backdrop-blur-xl rounded-3xl px-6 py-3 border border-border/30 shadow-lg">
          <div className="flex items-center justify-around">
            {dockApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shadow-md border border-border/50">
                  <app.icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] text-foreground/80 font-medium">{app.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
