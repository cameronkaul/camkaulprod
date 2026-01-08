import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Folder, Film } from 'lucide-react';
import { projects } from '@/data/projects';
import { useWindows } from '@/contexts/WindowContext';

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow } = useWindows();

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.category.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleProjectClick = (projectId: string) => {
    openWindow('project', projectId);
    onClose();
  };

  const handleOpenPortfolio = () => {
    openWindow('portfolio');
    onClose();
  };

  const handleOpenReels = () => {
    openWindow('reels');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="spotlight-overlay fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="spotlight-input w-full max-w-xl rounded-xl overflow-hidden border border-border"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs bg-muted rounded text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-auto custom-scrollbar">
              {/* Quick Actions */}
              {query === '' && (
                <div className="p-2">
                  <p className="px-3 py-1.5 text-xs text-muted-foreground font-medium">Quick Actions</p>
                  <button
                    onClick={handleOpenPortfolio}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <Folder className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Open Portfolio</span>
                  </button>
                  <button
                    onClick={handleOpenReels}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <Film className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Open Reels</span>
                  </button>
                </div>
              )}

              {/* Project Results */}
              {query !== '' && (
                <div className="p-2">
                  {filteredProjects.length > 0 ? (
                    <>
                      <p className="px-3 py-1.5 text-xs text-muted-foreground font-medium">Projects</p>
                      {filteredProjects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => handleProjectClick(project.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                          <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{project.title}</p>
                            <p className="text-xs text-muted-foreground capitalize">{project.category} • {project.year}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                      No projects found for "{query}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
