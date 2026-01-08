import { useState, useEffect } from 'react';
import { Folder, User, Mail, FileText, Film } from 'lucide-react';
import { WindowProvider, useWindows } from '@/contexts/WindowContext';
import { MenuBar } from '@/components/desktop/MenuBar';
import { Dock } from '@/components/desktop/Dock';
import { DesktopIcon } from '@/components/desktop/DesktopIcon';
import { Window } from '@/components/desktop/Window';
import { Spotlight } from '@/components/desktop/Spotlight';
import { PortfolioWindow } from '@/components/windows/PortfolioWindow';
import { ProjectWindow } from '@/components/windows/ProjectWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { ResumeWindow } from '@/components/windows/ResumeWindow';
import { ReelsWindow } from '@/components/windows/ReelsWindow';
import { TrashWindow } from '@/components/windows/TrashWindow';

const desktopIcons = [
  { id: 'portfolio' as const, icon: Folder, label: 'Portfolio' },
  { id: 'about' as const, icon: User, label: 'About' },
  { id: 'contact' as const, icon: Mail, label: 'Contact' },
  { id: 'resume' as const, icon: FileText, label: 'Resume' },
  { id: 'reels' as const, icon: Film, label: 'Reels' },
];

function DesktopContent() {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const { openWindow } = useWindows();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{
        backgroundImage: 'linear-gradient(135deg, hsl(210 40% 80%) 0%, hsl(200 50% 90%) 50%, hsl(180 40% 85%) 100%)',
      }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Menu Bar */}
      <MenuBar onSpotlightOpen={() => setSpotlightOpen(true)} />

      {/* Desktop Icons */}
      <div className="absolute top-12 right-6 flex flex-col gap-2 z-10">
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => {}}
            onDoubleClick={() => openWindow(item.id)}
          />
        ))}
      </div>

      {/* Windows */}
      <Window id="portfolio"><PortfolioWindow /></Window>
      <Window id="project"><ProjectWindow /></Window>
      <Window id="about"><AboutWindow /></Window>
      <Window id="contact"><ContactWindow /></Window>
      <Window id="resume"><ResumeWindow /></Window>
      <Window id="reels"><ReelsWindow /></Window>
      <Window id="trash"><TrashWindow /></Window>

      {/* Dock */}
      <Dock />

      {/* Spotlight */}
      <Spotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
    </div>
  );
}

const Index = () => {
  return (
    <WindowProvider>
      <DesktopContent />
    </WindowProvider>
  );
};

export default Index;
