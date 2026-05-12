import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getAllPhotos, type Photo } from '@/data/photos';

// This is the exact photo you want first: artist on the lift against the blue sky.
const PREFERRED_START_URL = '/photos/dr-pepper-mural/P1220766.jpg';
const TAO_ROCKET_PREFIX = '/photos/tao-rocket/';

function orderPhotosForWidget(all: Photo[]): Photo[] {
  const preferred = all.filter((p) => p.url === PREFERRED_START_URL);
  const rest = all.filter((p) => p.url !== PREFERRED_START_URL);

  // Push Tao Rocket toward the end.
  const tao = rest.filter((p) => p.url.startsWith(TAO_ROCKET_PREFIX));
  const nonTao = rest.filter((p) => !p.url.startsWith(TAO_ROCKET_PREFIX));

  return [...preferred, ...nonTao, ...tao];
}

export function PhotoCarouselWidget() {
  const photos = orderPhotosForWidget(getAllPhotos());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number>(0);

  const ROTATION_INTERVAL = 5000; // 5 seconds

  const nextSlide = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (!isModalOpen && photos.length > 1) {
      // Offset start so photos and videos don't rotate in lockstep
      const startDelay = setTimeout(() => {
        nextSlide();
        intervalRef.current = setInterval(nextSlide, ROTATION_INTERVAL);
      }, 2500);

      return () => {
        clearTimeout(startDelay);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isModalOpen, nextSlide, photos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (photos.length <= 1) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
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
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
                style={{ willChange: 'opacity' }}
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

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}

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
              <button onClick={() => setIsModalOpen(false)} className="flex items-center gap-1 text-blue-400">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h2 className="text-white text-lg font-semibold">Photo Gallery</h2>
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
                    <img src={photo.url} alt={photo.title || ''} className="w-full h-full object-cover" />
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
