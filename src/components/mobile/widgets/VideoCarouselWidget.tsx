import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface Video {
  id: string;
  src: string;
  title: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: '1',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Midway Football Hype',
    thumbnail: '/thumbnails/midway-fb-hype-1.jpg',
  },
  {
    id: '2',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'ATO Rush Video',
    thumbnail: '/thumbnails/rush-ato.jpg',
  },
  {
    id: '3',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Baylor Hockey',
    thumbnail: '/thumbnails/baylor-hockey-1.jpg',
  },
];

export function VideoCarouselWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);

  const ROTATION_INTERVAL = 15000; // 15 seconds

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isModalOpen && isPlaying) {
      intervalRef.current = setInterval(nextSlide, ROTATION_INTERVAL);
      progressRef.current = setInterval(() => {
        setProgress((prev) => Math.min(prev + (100 / (ROTATION_INTERVAL / 100)), 100));
      }, 100);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
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

  return (
    <>
      {/* Widget */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden bg-black/90 shadow-lg cursor-pointer"
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={videos[currentIndex].thumbnail}
              alt={videos[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white text-xs font-medium truncate">{videos[currentIndex].title}</p>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {videos.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
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
              <h2 className="text-white text-lg font-semibold">Featured Work</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Video area */}
            <div
              className="flex-1 relative"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <div className="w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden relative">
                    <img
                      src={videos[currentIndex].thumbnail}
                      alt={videos[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Video info and controls */}
            <div className="p-4 pb-8">
              <h3 className="text-white text-xl font-semibold mb-2">
                {videos[currentIndex].title}
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-2 text-white/70"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                  <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {videos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setProgress(0);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
