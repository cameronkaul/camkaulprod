import { useWindows, WindowId } from '@/contexts/WindowContext';
import { AppIcon, AppIconType } from '@/components/icons/AppIcon';
import { PhotoCarouselWidget } from './widgets/PhotoCarouselWidget';
import { VideoCarouselWidget } from './widgets/VideoCarouselWidget';

interface AppItem {
  id: WindowId;
  type: AppIconType;
  label?: string;
  gridArea: string; // CSS grid area placement
}

// Apps positioned in specific grid cells
const gridApps: AppItem[] = [
  { id: 'portfolio', type: 'portfolio', label: 'Portfolio', gridArea: '1 / 1 / 2 / 2' },
  { id: 'mail', type: 'mail', label: 'Mail', gridArea: '1 / 2 / 2 / 3' },
  { id: 'about', type: 'about', label: 'Notes', gridArea: '2 / 1 / 3 / 2' },
  { id: 'instagram', type: 'instagram', label: 'Instagram', gridArea: '2 / 2 / 3 / 3' },
];

// Dock apps
const dockApps: AppItem[] = [
  { id: 'resume', type: 'resume', label: 'Docs', gridArea: '' },
  { id: 'trash', type: 'trash', label: 'Trash', gridArea: '' },
  { id: 'runner', type: 'runner', label: 'Runner', gridArea: '' },
];

export function MobileHomeScreen() {
  const { openWindow } = useWindows();

  const handleAppClick = (id: WindowId) => {
    openWindow(id);
  };

  return (
    <>
      {/* Main content area - iOS-style mixed grid */}
      <div className="absolute inset-x-0 top-14 bottom-28 px-5 pt-6 overflow-hidden">
        {/* 4-column grid with fixed row heights */}
        <div 
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
            aspectRatio: '1 / 1.1',
          }}
        >
          {/* Row 1-2: App icons on left (cols 1-2), VideoCarouselWidget on right (cols 3-4) */}
          
          {/* Portfolio icon - row 1, col 1 */}
          <div 
            className="flex items-center justify-center"
            style={{ gridArea: '1 / 1 / 2 / 2' }}
          >
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
          <div 
            className="flex items-center justify-center"
            style={{ gridArea: '1 / 2 / 2 / 3' }}
          >
            <AppIcon
              type="mail"
              size={56}
              showLabel={true}
              onClick={() => handleAppClick('mail')}
              labelClassName="mt-1 text-[10px]"
              customLabel="Mail"
            />
          </div>

          {/* Notes icon - row 2, col 1 */}
          <div 
            className="flex items-center justify-center"
            style={{ gridArea: '2 / 1 / 3 / 2' }}
          >
            <AppIcon
              type="about"
              size={56}
              showLabel={true}
              onClick={() => handleAppClick('about')}
              labelClassName="mt-1 text-[10px]"
              customLabel="Notes"
            />
          </div>

          {/* Instagram icon - row 2, col 2 */}
          <div 
            className="flex items-center justify-center"
            style={{ gridArea: '2 / 2 / 3 / 3' }}
          >
            <AppIcon
              type="instagram"
              size={56}
              showLabel={true}
              onClick={() => handleAppClick('instagram')}
              labelClassName="mt-1 text-[10px]"
              customLabel="Instagram"
            />
          </div>

          {/* VideoCarouselWidget - rows 1-2, cols 3-4 (2x2) */}
          <div 
            className="w-full h-full"
            style={{ gridArea: '1 / 3 / 3 / 5' }}
          >
            <VideoCarouselWidget />
          </div>

          {/* Row 3-4: PhotoCarouselWidget on left (cols 1-2), empty or future icons on right */}
          
          {/* PhotoCarouselWidget - rows 3-4, cols 1-2 (2x2) */}
          <div 
            className="w-full h-full"
            style={{ gridArea: '3 / 1 / 5 / 3' }}
          >
            <PhotoCarouselWidget />
          </div>

          {/* Empty slots rows 3-4, cols 3-4 can hold more icons if needed */}
          {/* Currently left empty for clean look - can add more apps here later */}
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
