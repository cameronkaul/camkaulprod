import { useState, useMemo } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useWindows } from '@/contexts/WindowContext';
import { clientWorks } from '@/data/projects';

const typeLabels: Record<string, { label: string; color: string }> = {
  banner: { label: 'Banner', color: 'bg-blue-100 text-blue-700' },
  social: { label: 'Social', color: 'bg-green-100 text-green-700' },
  email: { label: 'Email', color: 'bg-purple-100 text-purple-700' },
  poster: { label: 'Poster', color: 'bg-orange-100 text-orange-700' },
  ad: { label: 'Ad', color: 'bg-red-100 text-red-700' },
  video: { label: 'Video', color: 'bg-pink-100 text-pink-700' },
};

// Seeded random shuffle for consistent order per session
function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomValue: number;
  
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  while (currentIndex !== 0) {
    randomValue = Math.floor(seededRandom() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomValue]] = [shuffled[randomValue], shuffled[currentIndex]];
  }
  return shuffled;
}

export function WorkGalleryWindow() {
  const { windows } = useWindows();
  const workGalleryWindow = windows.find(w => w.id === 'workGallery');
  const clientId = workGalleryWindow?.clientId;
  
  const clientWork = clientWorks.find(c => c.clientId === clientId);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Shuffle items once per mount with a consistent seed
  const shuffledItems = useMemo(() => {
    if (!clientWork) return [];
    const seed = clientWork.clientId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now() % 1000;
    return seededShuffle(clientWork.items, seed);
  }, [clientWork]);

  if (!clientWork) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500">No work gallery found</p>
      </div>
    );
  }

  const selectedItem = selectedIndex !== null ? shuffledItems[selectedIndex] : null;

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < shuffledItems.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-gray-50 flex-shrink-0">
        <div>
          <h2 className="font-semibold text-gray-900">{clientWork.clientName}</h2>
          <p className="text-xs text-gray-500">{clientWork.description}</p>
        </div>
      </div>

      {/* Gallery Grid - Masonry-style with auto-sizing */}
      <div className="flex-1 overflow-auto p-4">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {shuffledItems.map((item, index) => {
            const typeInfo = typeLabels[item.type] || { label: item.type, color: 'bg-gray-100 text-gray-700' };
            const isBanner = item.type === 'banner';
            const isVideo = item.type === 'video';
            
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(index)}
                className={`group relative w-full overflow-hidden rounded-lg bg-gray-100 hover:ring-2 hover:ring-blue-400 transition-all break-inside-avoid mb-4 ${isBanner ? 'scale-105 my-2' : ''}`}
              >
                {isVideo ? (
                  <div className="aspect-[9/16] bg-black flex items-center justify-center">
                    <div className="text-white/70 text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <p className="text-xs">{item.title}</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${typeInfo.color}`}>
                    {typeInfo.label}
                  </span>
                  <p className="text-white text-xs mt-1 line-clamp-1">{item.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 overflow-auto p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
          )}
          {selectedIndex !== null && selectedIndex < shuffledItems.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ArrowRight className="w-8 h-8" />
            </button>
          )}

          {/* Content - Video or Image */}
          <div 
            className="flex flex-col items-center max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.videoUrl ? (
              <div className="w-full max-w-sm" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                <div className="relative" style={{ paddingBottom: '177.77%' }}>
                  <iframe
                    src={selectedItem.videoUrl}
                    title={selectedItem.title}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full w-auto h-auto object-contain rounded-lg"
                style={{ maxHeight: 'calc(100vh - 120px)' }}
              />
            )}
            <div className="mt-4 text-center flex-shrink-0 pb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${typeLabels[selectedItem.type]?.color || 'bg-gray-100 text-gray-700'}`}>
                {typeLabels[selectedItem.type]?.label || selectedItem.type}
              </span>
              <p className="text-white text-lg mt-2">{selectedItem.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}