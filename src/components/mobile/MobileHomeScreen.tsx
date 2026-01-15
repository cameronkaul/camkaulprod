import { useWindows, WindowId } from '@/contexts/WindowContext';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';
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
      {/* Main content area - iOS-style mixed grid */}
      <div className="absolute inset-x-0 top-14 bottom-28 px-5 pt-6 overflow-hidden flex flex-col">
        {/* Top section: 4-column grid with apps and photo widget */}
        <div 
          className="grid gap-4 flex-1"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
          }}
        >
          {/* Portfolio icon - row 1, col 1 */}
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

          {/* Mail icon - row 1, col 2 */}
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

          {/* PhotoCarouselWidget - rows 1-2, cols 3-4 (2x2 square) */}
          <div 
            className="w-full h-full"
            style={{ gridArea: '1 / 3 / 3 / 5' }}
          >
            <PhotoCarouselWidget />
          </div>

          {/* Notes icon - row 2, col 1 */}
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

          {/* Empty slot - row 2, col 2 */}
          <div className="flex items-center justify-center">
            {/* Empty for clean look */}
          </div>
        </div>

        {/* Bottom section: Wide rectangular video widget spanning full width */}
        <div className="mt-4 w-full" style={{ height: '140px' }}>
          <VideoCarouselWidget isRectangular />
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