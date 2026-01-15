import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SelectionBoxProps {
  onSelectionChange: (rect: SelectionRect | null) => void;
  containerRef: React.RefObject<HTMLElement>;
  disabled?: boolean;
}

export function SelectionBox({ onSelectionChange, containerRef, disabled }: SelectionBoxProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionRect, setSelectionRect] = useState<SelectionRect | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (disabled) return;
    
    // Only start selection on left mouse button and on the container itself
    if (e.button !== 0) return;
    
    // Check if clicking on an interactive element
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('.desktop-icon') ||
      target.closest('.dock-container') ||
      target.closest('.window-chrome') ||
      target.closest('[data-no-selection]')
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    startPosRef.current = { x, y };
    setIsSelecting(true);
    setSelectionRect({ x, y, width: 0, height: 0 });
  }, [containerRef, disabled]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isSelecting) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const x = Math.min(startPosRef.current.x, currentX);
    const y = Math.min(startPosRef.current.y, currentY);
    const width = Math.abs(currentX - startPosRef.current.x);
    const height = Math.abs(currentY - startPosRef.current.y);

    const newRect = { x, y, width, height };
    setSelectionRect(newRect);
    onSelectionChange(newRect);
  }, [isSelecting, containerRef, onSelectionChange]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting) {
      setIsSelecting(false);
      // Keep selection rect visible briefly, then clear
      setTimeout(() => {
        setSelectionRect(null);
      }, 100);
    }
  }, [isSelecting]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, containerRef]);

  // Handle Escape to clear selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSelecting(false);
        setSelectionRect(null);
        onSelectionChange(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectionChange]);

  if (!selectionRect || selectionRect.width < 5 || selectionRect.height < 5) {
    return null;
  }

  return (
    <motion.div
      className="absolute pointer-events-none z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        left: selectionRect.x,
        top: selectionRect.y,
        width: selectionRect.width,
        height: selectionRect.height,
        background: 'hsla(217, 91%, 60%, 0.15)',
        border: '1px solid hsla(217, 91%, 60%, 0.5)',
        borderRadius: '4px',
      }}
    />
  );
}

// Helper to check if an element intersects with a selection rectangle
export function isElementInSelection(
  elementRect: DOMRect,
  selectionRect: SelectionRect,
  containerRect: DOMRect
): boolean {
  const elLeft = elementRect.left - containerRect.left;
  const elTop = elementRect.top - containerRect.top;
  const elRight = elLeft + elementRect.width;
  const elBottom = elTop + elementRect.height;

  const selRight = selectionRect.x + selectionRect.width;
  const selBottom = selectionRect.y + selectionRect.height;

  return !(
    elRight < selectionRect.x ||
    elLeft > selRight ||
    elBottom < selectionRect.y ||
    elTop > selBottom
  );
}