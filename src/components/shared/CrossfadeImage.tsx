import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface CrossfadeImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fadeDurationMs?: number;
  easing?: string;
  children?: ReactNode;
}

export function CrossfadeImage({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  fadeDurationMs = 1600,
  easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
  children,
}: CrossfadeImageProps) {
  const [layers, setLayers] = useState<[string, string]>([src, src]);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const frameRef = useRef<number | null>(null);
  const activeSrc = layers[activeLayer];

  useEffect(() => {
    if (src === activeSrc) return;

    let cancelled = false;
    const nextLayer: 0 | 1 = activeLayer === 0 ? 1 : 0;
    const nextImage = new Image();
    nextImage.decoding = 'async';

    const commit = () => {
      if (cancelled) return;

      setLayers((prev) => {
        const updated: [string, string] = [...prev] as [string, string];
        updated[nextLayer] = src;
        return updated;
      });

      frameRef.current = window.requestAnimationFrame(() => {
        if (!cancelled) {
          setActiveLayer(nextLayer);
        }
      });
    };

    nextImage.src = src;

    if (nextImage.complete) {
      commit();
    } else {
      nextImage.onload = commit;
      nextImage.onerror = commit;
    }

    return () => {
      cancelled = true;

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      nextImage.onload = null;
      nextImage.onerror = null;
    };
  }, [activeLayer, activeSrc, src]);

  const transitionStyle = useMemo<CSSProperties>(
    () => ({
      transition: `opacity ${fadeDurationMs}ms ${easing}`,
      willChange: 'opacity',
    }),
    [easing, fadeDurationMs],
  );

  return (
    <div className={`absolute inset-0 ${className}`}>
      {[0, 1].map((layerIndex) => {
        const isActive = activeLayer === layerIndex;

        return (
          <div
            key={layerIndex}
            className="absolute inset-0"
            style={{ ...transitionStyle, opacity: isActive ? 1 : 0 }}
          >
            <img
              src={layers[layerIndex as 0 | 1]}
              alt={isActive ? alt : ''}
              aria-hidden={!isActive}
              className={imgClassName}
              draggable={false}
            />
          </div>
        );
      })}

      {children}
    </div>
  );
}