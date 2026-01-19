import { useWindows, WindowId } from '@/contexts/WindowContext';
import { AppIcon } from '@/components/icons/AppIcon';
import { PhotoCarouselWidget } from './widgets/PhotoCarouselWidget';
import { VideoCarouselWidget } from './widgets/VideoCarouselWidget';

// Dock apps
const dockApps: { id: WindowId; type: 'resume' | 'trash' | 'runner'; label: string }[] = [
  { id: 'resume', type: 'resume', label: 'Resume.doc' },
  { id: 'runner', type: 'runner', label: 'Runner' },
  { id: 'trash', type: 'trash', label: 'Trash' },
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
        <div className="flex gap-3">
          {/* Photo widget - square, matches 2x2 app grid height */}
          <div className="w-[156px] h-[156px] flex-shrink-0">
            <PhotoCarouselWidget />
          </div>

          {/* App icons grid - 2x2, proper iOS spacing */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1" style={{ width: '156px', height: '156px' }}>
            <div className="flex flex-col items-center justify-center">
              <AppIcon
                type="portfolio"
                size={60}
                showLabel={true}
                onClick={() => handleAppClick('portfolio')}
                labelClassName="mt-1.5 text-[11px] font-medium text-white drop-shadow-sm"
                customLabel="Portfolio"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <AppIcon
                type="photos"
                size={60}
                showLabel={true}
                onClick={() => handleAppClick('photos')}
                labelClassName="mt-1.5 text-[11px] font-medium text-white drop-shadow-sm"
                customLabel="Photos"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <AppIcon
                type="mail"
                size={60}
                showLabel={true}
                onClick={() => handleAppClick('mail')}
                labelClassName="mt-1.5 text-[11px] font-medium text-white drop-shadow-sm"
                customLabel="Mail"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <AppIcon
                type="about"
                size={60}
                showLabel={true}
                onClick={() => handleAppClick('about')}
                labelClassName="mt-1.5 text-[11px] font-medium text-white drop-shadow-sm"
                customLabel="Notes"
              />
            </div>
          </div>
        </div>
      </div>

      {/* iPhone-style Dock at bottom with safe area */}
      <div className="fixed bottom-0 inset-x-0 pb-2 pt-2 z-[9995]">
        <div className="mx-4 bg-muted/60 backdrop-blur-xl rounded-3xl px-4 py-2.5 border border-border/30 shadow-lg">
          <div className="flex items-center justify-around">
            {dockApps.map((app) => (
              <div key={app.id} className="flex flex-col items-center gap-0.5">
                <AppIcon
                  type={app.type}
                  size={48}
                  showLabel={false}
                  onClick={() => handleAppClick(app.id)}
                />
                <span className="text-[10px] font-medium text-white/80 truncate max-w-[60px]">
                  {app.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}