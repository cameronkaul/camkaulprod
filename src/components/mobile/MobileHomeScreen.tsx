import { useWindows, WindowId } from '@/contexts/WindowContext';
import { AppIcon } from '@/components/icons/AppIcon';
import { PhotoCarouselWidget } from './widgets/PhotoCarouselWidget';
import { VideoCarouselWidget } from './widgets/VideoCarouselWidget';

// Dock apps
const dockApps: { id: WindowId; type: 'resume' | 'trash' | 'runner'; label: string }[] = [
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
      {/* Main content area - iOS-style widget layout */}
      <div className="absolute inset-x-0 top-14 bottom-28 px-5 pt-6 overflow-hidden flex flex-col gap-4">
        {/* Top: Large rectangular video widget spanning full width */}
        <div className="w-full" style={{ height: '160px' }}>
          <VideoCarouselWidget isRectangular />
        </div>

        {/* Bottom section: Square photo widget on left, app icons on right */}
        <div className="flex gap-4 flex-1">
          {/* Photo widget - square, 2x2 grid equivalent */}
          <div className="aspect-square h-full max-h-[180px]">
            <PhotoCarouselWidget />
          </div>

          {/* App icons grid - 2x2 on the right */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
            <div className="flex items-center justify-center">
              <AppIcon
                type="portfolio"
                size={56}
                showLabel={true}
                onClick={() => handleAppClick('portfolio')}
                labelClassName="mt-1 text-[10px]"
                customLabel="Portfolio"
              />
            </div>
            <div className="flex items-center justify-center">
              <AppIcon
                type="mail"
                size={56}
                showLabel={true}
                onClick={() => handleAppClick('mail')}
                labelClassName="mt-1 text-[10px]"
                customLabel="Mail"
              />
            </div>
            <div className="flex items-center justify-center">
              <AppIcon
                type="about"
                size={56}
                showLabel={true}
                onClick={() => handleAppClick('about')}
                labelClassName="mt-1 text-[10px]"
                customLabel="Notes"
              />
            </div>
            {/* Empty slot for clean look */}
            <div className="flex items-center justify-center" />
          </div>
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