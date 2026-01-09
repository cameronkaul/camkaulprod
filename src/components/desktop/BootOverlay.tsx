import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootOverlayProps {
  onComplete: () => void;
}

export function BootOverlay({ onComplete }: BootOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2400; // 2.4 seconds - intentional and premium
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Ease out quart for ultra-smooth settle
      const eased = 1 - Math.pow(1 - rawProgress, 4);
      setProgress(eased * 100);
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Brief pause at 100%, then fade out
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 350);
        }, 250);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Boot panel - frosted glass */}
          <motion.div
            className="relative px-12 py-10 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Welcome text */}
            <h1 
              className="text-4xl font-semibold text-center mb-1"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                color: 'rgba(0, 0, 0, 0.85)',
                letterSpacing: '-0.02em',
              }}
            >
              Welcome
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-sm text-center mb-8"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                color: 'rgba(0, 0, 0, 0.45)',
                fontWeight: 400,
              }}
            >
              Cam Kaul Productions
            </p>
            
            {/* Loading bar track */}
            <div 
              className="relative w-64 h-1.5 rounded-full overflow-hidden"
              style={{ 
                background: 'rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Loading bar fill */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Shimmer highlight */}
              <motion.div
                className="absolute inset-y-0 w-12 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  left: 0,
                }}
                animate={{
                  left: ['0%', '100%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
