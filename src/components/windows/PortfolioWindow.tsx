import { useState, useMemo } from 'react';
import { projects, Project } from '@/data/projects';
import { useWindows } from '@/contexts/WindowContext';
import { LayoutGrid, List, Search, ChevronDown, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categories = ['All', 'Brand', 'Weddings', 'Music', 'Social', 'Photo', 'Other'];

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'date' | 'category';

export function PortfolioWindow() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const { openWindow } = useWindows();

  const filteredAndSortedProjects = useMemo(() => {
    let result = activeCategory === 'All'
      ? projects
      : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

    // Apply search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Apply sort
    switch (sortBy) {
      case 'name':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date':
        result = [...result].sort((a, b) => b.year - a.year);
        break;
      case 'category':
        result = [...result].sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-44 bg-sidebar border-r border-sidebar-border p-3 flex-shrink-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">
          Favorites
        </p>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeCategory === cat 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-10 border-b border-border/50 flex items-center justify-between px-3 bg-muted/30">
          {/* Left: Search */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>

          {/* Right: View toggles and sort */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sort</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover/95 backdrop-blur-xl border border-border/50">
                <DropdownMenuItem onClick={() => setSortBy('date')} className={sortBy === 'date' ? 'bg-accent' : ''}>
                  Date (Newest)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')} className={sortBy === 'name' ? 'bg-accent' : ''}>
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('category')} className={sortBy === 'category' ? 'bg-accent' : ''}>
                  Category
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-md p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-background shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Icon View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-background shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-auto custom-scrollbar">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAndSortedProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openWindow('project', project.id)}
                  className="group text-left"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-2 ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-medium truncate">{project.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{project.category} • {project.year}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {/* List Header */}
              <div className="flex items-center gap-4 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border/50">
                <span className="flex-1">Name</span>
                <span className="w-24">Category</span>
                <span className="w-16 text-right">Year</span>
              </div>
              {filteredAndSortedProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openWindow('project', project.id)}
                  className="w-full flex items-center gap-4 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left group"
                >
                  <div className="w-12 h-8 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="flex-1 text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {project.title}
                  </span>
                  <span className="w-24 text-sm text-muted-foreground capitalize">{project.category}</span>
                  <span className="w-16 text-sm text-muted-foreground text-right">{project.year}</span>
                </button>
              ))}
            </div>
          )}

          {filteredAndSortedProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-sm">No projects found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-6 border-t border-border/50 flex items-center px-3 text-xs text-muted-foreground bg-muted/30">
          {filteredAndSortedProjects.length} items
        </div>
      </div>
    </div>
  );
}
