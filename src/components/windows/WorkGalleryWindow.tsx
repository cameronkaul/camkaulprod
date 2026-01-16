import { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useWindows } from '@/contexts/WindowContext';
import { clientWorks } from '@/data/projects';

const typeLabels: Record<string, { label: string; color: string }> = {
  banner: { label: 'Banner', color: 'bg-blue-100 text-blue-700' },
  social: { label: 'Social', color: 'bg-green-100 text-green-700' },
  email: { label: 'Email', color: 'bg-purple-100 text-purple-700' },
  poster: { label: 'Poster', color: 'bg-orange-100 text-orange-700' },
  ad: { label: 'Ad', color: 'bg-red-100 text-red-700' },
};

export function WorkGalleryWindow() {
  const { windows } = useWindows();
  const workGalleryWindow = windows.find(w => w.id === 'workGallery');
  const clientId = workGalleryWindow?.clientId;
  
  const clientWork = clientWorks.find(c => c.clientId === clientId);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!clientWork) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500">No work gallery found</p>
      </div>
    );
  }

  const selectedItem = selectedIndex !== null ? clientWork.items[selectedIndex] : null;

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < clientWork.items.length - 1) {
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

      {/* Gallery Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {clientWork.items.map((item, index) => {
            const typeInfo = typeLabels[item.type] || { label: item.type, color: 'bg-gray-100 text-gray-700' };
            
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 hover:ring-2 hover:ring-blue-400 transition-all"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
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
          className="absolute inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
          )}
          {selectedIndex !== null && selectedIndex < clientWork.items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowRight className="w-8 h-8" />
            </button>
          )}

          {/* Image */}
          <div 
            className="max-w-[90%] max-h-[85%] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="max-w-full max-h-[calc(100vh-140px)] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
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