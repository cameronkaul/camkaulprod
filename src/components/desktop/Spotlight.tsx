import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Folder, Film, User, Mail, FileText, Gamepad2 } from 'lucide-react';
import { projects } from '@/data/projects';
import { useWindows, WindowId } from '@/contexts/WindowContext';

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: 'window' | 'project';
  id: string;
  windowId?: WindowId;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  thumbnailUrl?: string;
}

export function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindows();

  // Build search results
  const getResults = useCallback((): SearchResult[] => {
    const q = query.toLowerCase();
    
    // Window results
    const windowItems: SearchResult[] = [
      { type: 'window', id: 'portfolio', windowId: 'portfolio', title: 'Portfolio', subtitle: 'Browse projects', icon: Folder },
      { type: 'window', id: 'about', windowId: 'about', title: 'About', subtitle: 'Learn about Cam', icon: User },
      { type: 'window', id: 'contact', windowId: 'contact', title: 'Contact', subtitle: 'Get in touch', icon: Mail },
      { type: 'window', id: 'resume', windowId: 'resume', title: 'Resume', subtitle: 'Experience & skills', icon: FileText },
      { type: 'window', id: 'runner', windowId: 'runner', title: 'Runner', subtitle: 'Play the mini game', icon: Gamepad2 },
    ];

    // Project results
    const projectItems: SearchResult[] = projects.map(p => ({
      type: 'project' as const,
      id: p.id,
      title: p.title,
      subtitle: `${p.category} • ${p.year}`,
      icon: Film,
      thumbnailUrl: p.thumbnailUrl,
    }));

    if (!q) {
      return windowItems;
    }

    const filteredWindows = windowItems.filter(w => 
      w.title.toLowerCase().includes(q) || w.subtitle?.toLowerCase().includes(q)
    );

    const filteredProjects = projectItems.filter(p =>
      p.title.toLowerCase().includes(q) || 
      p.subtitle?.toLowerCase().includes(q)
    );

    return [...filteredWindows, ...filteredProjects];
  }, [query]);

  const results = getResults();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, results.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'window' && result.windowId) {
      openWindow(result.windowId);
    } else if (result.type === 'project') {
      openWindow('project', result.id);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop with stronger blur */}
          <motion.div
            className="absolute inset-0 bg-background/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-xl rounded-xl overflow-hidden border border-border/50 bg-popover/95 backdrop-blur-2xl shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search projects and windows..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-lg"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs bg-muted rounded text-muted-foreground border border-border/50">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-80 overflow-auto custom-scrollbar">
              {results.length > 0 ? (
                <div className="p-2">
                  <p className="px-3 py-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {query ? 'Results' : 'Quick Actions'}
                  </p>
                  {results.map((result, index) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                        selectedIndex === index 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      {result.thumbnailUrl ? (
                        <img
                          src={result.thumbnailUrl}
                          alt={result.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedIndex === index ? 'bg-primary-foreground/20' : 'bg-muted'
                        }`}>
                          <result.icon className="w-5 h-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        {result.subtitle && (
                          <p className={`text-sm truncate ${
                            selectedIndex === index ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      {selectedIndex === index && (
                        <kbd className={`hidden sm:inline-block px-2 py-0.5 text-xs rounded ${
                          selectedIndex === index 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          ↵
                        </kbd>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-3 py-8 text-sm text-muted-foreground text-center">
                  No results found for "{query}"
                </p>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-border/50 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border/50">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border/50">↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border/50">↵</kbd>
                Open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
