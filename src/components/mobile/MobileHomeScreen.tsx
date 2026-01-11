import { useWindows, WindowId } from '@/contexts/WindowContext';
import { openContactEmail } from '@/components/windows/ContactWindow';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';

interface AppItem {
  id: WindowId;
  type: AppIconType;
}

const mainApps: AppItem[] = [
  { id: 'portfolio', type: 'portfolio' },
  { id: 'contact', type: 'contact' },
  { id: 'about', type: 'about' },
];

const dockApps: AppItem[] = [
  { id: 'resume', type: 'resume' },
  { id: 'trash', type: 'trash' },
  { id: 'runner', type: 'runner' },
];

export function MobileHomeScreen() {
  const { openWindow } = useWindows();

  const handleAppClick = (id: WindowId) => {
    if (id === 'contact') {
      openContactEmail();
    } else {
      openWindow(id);
    }
  };

  return (
    <>
      {/* App Grid - Main apps */}
      <div className="absolute inset-x-0 top-16 bottom-24 flex flex-col items-center pt-12 px-8">
        <div className="grid grid-cols-3 gap-8">
          {mainApps.map((app) => (
            <AppIcon
              key={app.id}
              type={app.type}
              size={64}
              showLabel={true}
              onClick={() => handleAppClick(app.id)}
              labelClassName="mt-1"
            />
          ))}
        </div>
      </div>

      {/* iPhone-style Dock at bottom */}
      <div className="fixed bottom-6 inset-x-4 z-[9995]">
        <div className="bg-muted/60 backdrop-blur-xl rounded-3xl px-6 py-3 border border-border/30 shadow-lg">
          <div className="flex items-center justify-around">
            {dockApps.map((app) => (
              <AppIcon
                key={app.id}
                type={app.type}
                size={56}
                showLabel={true}
                onClick={() => handleAppClick(app.id)}
                labelClassName="text-[10px]"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
