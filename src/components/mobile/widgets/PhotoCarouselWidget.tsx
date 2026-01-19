import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Images } from 'lucide-react';
import { getAllPhotos } from '@/data/photos';

export function PhotoCarouselWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);

  // Get photos from the photos data
  const photos = useMemo(() => getAllPhotos(), []);

  const ROTATION_INTERVAL = 5000; // 5 seconds

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (!isModalOpen) {
      intervalRef.current = setInterval(nextSlide, ROTATION_INTERVAL);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isModalOpen, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    }
  };

  const hasPhotos = photos.length > 0;

  return (
    <>
      {/* Widget */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {hasPhotos ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].title || ''}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Photo icon */}
            <div className="absolute top-3 left-3">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Images className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-xs font-medium truncate">{photos[currentIndex].title || 'Photo'}</p>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-3 right-3 flex gap-1">
              {photos.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          /* Placeholder state */
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-500/30 backdrop-blur-xl flex flex-col items-center justify-center">
            <Images className="w-8 h-8 text-white/60 mb-2" />
            <p className="text-white/80 text-xs font-medium">Gallery coming soon</p>
          </div>
        )}
      </motion.div>

      {/* Full screen modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 pt-12">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-1 text-blue-400"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h2 className="text-white text-lg font-semibold">Gallery</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Gallery grid */}
            <div className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-2 gap-2">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square rounded-xl overflow-hidden"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
