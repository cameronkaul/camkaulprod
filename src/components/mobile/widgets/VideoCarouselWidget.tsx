import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface Video {
  id: string;
  embedUrl: string;
  title: string;
  thumbnail: string;
}

// Featured videos with actual embed URLs
const videos: Video[] = [
  {
    id: '1',
    embedUrl: 'https://www.loom.com/embed/4788fea6356144ff8209e98c95116ccb?autoplay=1',
    title: 'DVLVD - Dr. Pepper Mural',
    thumbnail: '/thumbnails/dvlvd-dr-pepper-mural.jpg',
  },
  {
    id: '2',
    embedUrl: 'https://www.loom.com/embed/b046ba275b704fde8efa373c5c0655b8?autoplay=1',
    title: 'Bolaji Lavish - Music Video',
    thumbnail: '/thumbnails/bolaji-lavish-music-video.jpg',
  },
  {
    id: '3',
    embedUrl: 'https://www.loom.com/embed/2a6cb8c50add4ff2a2078e56d0217d12?autoplay=1',
    title: 'DVLVD - Austin Parque Zaragoza',
    thumbnail: '/thumbnails/dvlvd-austin-parque-zaragoza.jpg',
  },
  {
    id: '4',
    embedUrl: 'https://www.loom.com/embed/6312d86d70ab446993b828c402f1f9e2?autoplay=1',
    title: 'Midway Football - Hype Video 1',
    thumbnail: '/thumbnails/midway-fb-hype-1.jpg',
  },
  {
    id: '5',
    embedUrl: 'https://www.loom.com/embed/181df640ebe642028fb40d2d6c489526?autoplay=1',
    title: 'Rush ATO 2',
    thumbnail: '/thumbnails/rush-ato-2.jpg',
  },
  {
    id: '6',
    embedUrl: 'https://www.loom.com/embed/291fcf1171d9496b98d9b919ba88cce3?autoplay=1',
    title: 'India Short',
    thumbnail: '/thumbnails/india-short.jpg',
  },
];

interface VideoCarouselWidgetProps {
  isRectangular?: boolean;
}

export function VideoCarouselWidget({ isRectangular = false }: VideoCarouselWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number>(0);

  const ROTATION_INTERVAL = 8000; // 8 seconds for thumbnail rotation

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  // Auto-rotate thumbnails when not playing
  useEffect(() => {
    if (!isModalOpen && !isPlaying) {
      intervalRef.current = setInterval(nextSlide, ROTATION_INTERVAL);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isModalOpen, isPlaying, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
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

  const openModal = () => {
    setIsModalOpen(true);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPlaying(false);
  };

  return (
    <>
      {/* Widget - Thumbnail preview with play button */}
      <motion.div
        className={`relative w-full h-full overflow-hidden bg-black shadow-lg cursor-pointer ${isRectangular ? 'rounded-2xl' : 'rounded-3xl'}`}
        whileTap={{ scale: 0.98 }}
        onClick={openModal}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] } }}
            exit={{ opacity: 0, transition: { duration: 1.4, ease: [0.4, 0, 0.6, 1] } }}
            className="absolute inset-0"
            style={{ willChange: 'opacity' }}
          >
            <img
              src={videos[currentIndex].thumbnail}
              alt={videos[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-12">
          <p className="text-white text-xs font-semibold truncate drop-shadow-lg">
            {videos[currentIndex].title}
          </p>
        </div>

      </motion.div>

      {/* Full screen video player modal */}
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
            <div className="flex items-center justify-between p-4 pt-12 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
              <h2 className="text-white text-lg font-semibold">{videos[currentIndex].title}</h2>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Video player area */}
            <div className="flex-1 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {/* Actual video iframe */}
                  <iframe
                    src={videos[currentIndex].embedUrl}
                    title={videos[currentIndex].title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Bottom navigation dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
              {videos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-white w-8' : 'bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}