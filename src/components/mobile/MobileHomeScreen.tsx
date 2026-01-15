import { useWindows, WindowId } from '@/contexts/WindowContext';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';
import { PhotoCarouselWidget } from './widgets/PhotoCarouselWidget';
import { VideoCarouselWidget } from './widgets/VideoCarouselWidget';

interface AppItem {
  id: WindowId;
  type: AppIconType;
  label?: string;
}

// Apps for the main grid (under widgets)
const gridApps: AppItem[] = [
  { id: 'portfolio', type: 'portfolio', label: 'Portfolio' },
  { id: 'about', type: 'about', label: 'Notes' },
  { id: 'mail', type: 'mail', label: 'Mail' },
  { id: 'instagram', type: 'instagram', label: 'Instagram' },
];

// Dock apps
const dockApps: AppItem[] = [
  { id: 'resume', type: 'resume', label: 'Docs' },
  { id: 'trash', type: 'trash', label: 'Trash' },
  { id: 'runner', type: 'runner', label: 'Runner' },
];

export function MobileHomeScreen() {
  const { openWindow } = useWindows();

  const handleAppClick = (id: WindowId) => {
    openWindow(id);
  };

  return (
    <>
      {/* Main content area - widgets and app grid */}
      <div className="absolute inset-x-0 top-14 bottom-28 flex flex-col px-5 pt-6 overflow-hidden">
        {/* Widget row - 4 column grid, widgets span 2 columns each */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {/* PhotoCarouselWidget - spans columns 1-2 (2x2) */}
          <div className="col-span-2 aspect-square">
            <PhotoCarouselWidget />
          </div>
          {/* VideoCarouselWidget - spans columns 3-4 (2x2) */}
          <div className="col-span-2 aspect-square">
            <VideoCarouselWidget />
          </div>
        </div>

        {/* App grid - 4 column grid */}
        <div className="grid grid-cols-4 gap-x-3 gap-y-6">
          {gridApps.map((app) => (
            <div key={app.id} className="flex flex-col items-center">
              <AppIcon
                type={app.type}
                size={60}
                showLabel={true}
                onClick={() => handleAppClick(app.id)}
                labelClassName="mt-1.5 text-[11px]"
                customLabel={app.label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* iPhone-style Dock at bottom with safe area */}
      <div className="fixed bottom-0 inset-x-0 pb-2 pt-2 z-[9995]">
        <div className="mx-4 bg-muted/60 backdrop-blur-xl rounded-3xl px-6 py-3 border border-border/30 shadow-lg">
          <div className="flex items-center justify-around">
            {dockApps.map((app) => (
              <AppIcon
                key={app.id}
                type={app.type}
                size={52}
                showLabel={false}
                onClick={() => handleAppClick(app.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
