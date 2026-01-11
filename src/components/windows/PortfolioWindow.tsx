import { useState, useMemo } from 'react';
import { projects, collections, Project } from '@/data/projects';
import { useWindows } from '@/contexts/WindowContext';
import { LayoutGrid, List, Search, ChevronDown, ArrowUpDown, Folder, ChevronRight, ArrowLeft, Image, Calendar, Heart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80';

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'date' | 'category';
type SidebarSection = 'library' | 'albums';

export function PortfolioWindow() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [currentCollection, setCurrentCollection] = useState<string | null>(null);
  const [sidebarSection, setSidebarSection] = useState<SidebarSection>('library');
  const { openWindow } = useWindows();

  // Get unique collections from projects
  const projectCollections = useMemo(() => {
    const collectionIds = [...new Set(projects.filter(p => p.collection).map(p => p.collection!))];
    return collectionIds.map(id => {
      const collection = collections[id as keyof typeof collections];
      return {
        id,
        ...collection,
        projectCount: projects.filter(p => p.collection === id).length,
        thumbnail: (collection as any).coverImage || projects.find(p => p.collection === id)?.thumbnailUrl || FALLBACK_THUMBNAIL,
      };
    });
  }, []);

  // Get standalone projects (no collection)
  const standaloneProjects = useMemo(() => {
    return projects.filter(p => !p.collection);
  }, []);

  // Get projects in current collection
  const collectionProjects = useMemo(() => {
    if (!currentCollection) return [];
    return projects.filter(p => p.collection === currentCollection);
  }, [currentCollection]);

  // All projects for "All Photos" view
  const allProjects = useMemo(() => projects, []);

  const filteredAndSortedProjects = useMemo(() => {
    let result: Project[] = [];
    
    if (currentCollection) {
      result = collectionProjects;
    } else if (sidebarSection === 'library') {
      result = allProjects;
    } else {
      result = standaloneProjects;
    }

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
  }, [searchQuery, sortBy, currentCollection, collectionProjects, standaloneProjects, allProjects, sidebarSection]);

  // Filter collections based on search
  const filteredCollections = useMemo(() => {
    if (currentCollection || sidebarSection === 'library') return [];
    if (!searchQuery) return projectCollections;
    const q = searchQuery.toLowerCase();
    return projectCollections.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }, [searchQuery, projectCollections, currentCollection, sidebarSection]);

  const currentCollectionData = currentCollection 
    ? collections[currentCollection as keyof typeof collections] 
    : null;

  return (
    <div className="flex h-full bg-[hsl(220,15%,8%)]">
      {/* Photos-style Sidebar */}
      <div className="w-48 bg-[hsl(220,15%,10%)] border-r border-border/30 flex flex-col">
        {/* Library Section */}
        <div className="p-3">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Library
          </p>
          <button
            onClick={() => {
              setCurrentCollection(null);
              setSidebarSection('library');
            }}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 ${
              !currentCollection && sidebarSection === 'library'
                ? 'bg-primary/20 text-primary font-medium' 
                : 'text-foreground/80 hover:bg-muted/50'
            }`}
          >
            <Image className="w-4 h-4" />
            All Photos
          </button>
          <button
            disabled
            className="w-full text-left px-3 py-1.5 rounded-md text-sm text-muted-foreground/50 flex items-center gap-2 cursor-not-allowed"
          >
            <Heart className="w-4 h-4" />
            Favorites
          </button>
          <button
            disabled
            className="w-full text-left px-3 py-1.5 rounded-md text-sm text-muted-foreground/50 flex items-center gap-2 cursor-not-allowed"
          >
            <Calendar className="w-4 h-4" />
            Recents
          </button>
        </div>

        {/* Albums Section */}
        <div className="p-3 pt-0 flex-1 overflow-auto custom-scrollbar">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Albums
          </p>
          {projectCollections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => {
                setCurrentCollection(collection.id);
                setSidebarSection('albums');
              }}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 ${
                currentCollection === collection.id 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'text-foreground/80 hover:bg-muted/50'
              }`}
            >
              <Folder className="w-4 h-4 text-primary/70" />
              <span className="truncate">{collection.name}</span>
            </button>
          ))}

          {/* Standalone Projects as individual "albums" */}
          <div className="mt-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              Projects
            </p>
            {standaloneProjects.slice(0, 5).map((project) => (
              <button
                key={project.id}
                onClick={() => openWindow('project', project.id)}
                className="w-full text-left px-3 py-1.5 rounded-md text-sm text-foreground/80 hover:bg-muted/50 transition-colors flex items-center gap-2"
              >
                <div className="w-4 h-4 rounded overflow-hidden bg-muted">
                  <img 
                    src={project.thumbnailUrl} 
                    alt="" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                  />
                </div>
                <span className="truncate">{project.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Photos-style Toolbar */}
        <div className="h-11 border-b border-border/30 flex items-center justify-between px-3 bg-[hsl(220,15%,10%)]">
          {/* Left: Back button and title */}
          <div className="flex items-center gap-2 flex-1">
            {currentCollection && (
              <button
                onClick={() => setCurrentCollection(null)}
                className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-sm">
              <span className="font-semibold text-foreground">
                {currentCollection && currentCollectionData 
                  ? currentCollectionData.name 
                  : 'All Photos'
                }
              </span>
              <span className="text-muted-foreground text-xs ml-2">
                {filteredAndSortedProjects.length} {filteredAndSortedProjects.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          {/* Right: Search, Sort, View */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex items-center gap-1.5 bg-muted/50 rounded-md px-2 py-1">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="bg-transparent outline-none text-sm placeholder:text-muted-foreground w-24 focus:w-32 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors">
                  <ArrowUpDown className="w-3.5 h-3.5" />
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
            <div className="flex items-center bg-muted/50 rounded-md p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-background shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-background shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Photo Grid Content Area */}
        <div className="flex-1 p-4 overflow-auto custom-scrollbar bg-[hsl(220,15%,8%)]">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
              {/* Albums/Folders (only when not in a collection and in albums view) */}
              {filteredCollections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setCurrentCollection(collection.id)}
                  className="group relative aspect-square overflow-hidden rounded-sm"
                >
                  <img
                    src={collection.thumbnail}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate">{collection.name}</p>
                    <p className="text-white/70 text-[10px]">{collection.projectCount} items</p>
                  </div>
                </button>
              ))}

              {/* Projects - Photos style grid */}
              {filteredAndSortedProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openWindow('project', project.id)}
                  className="group relative aspect-square overflow-hidden rounded-sm"
                >
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate">{project.title}</p>
                    <p className="text-white/70 text-[10px]">{project.year}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-px">
              {/* List Header */}
              <div className="flex items-center gap-4 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border/30">
                <span className="w-12"></span>
                <span className="flex-1">Name</span>
                <span className="w-24">Type</span>
                <span className="w-16 text-right">Year</span>
              </div>

              {/* Folders in list view */}
              {filteredCollections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setCurrentCollection(collection.id)}
                  className="w-full flex items-center gap-4 px-3 py-2 hover:bg-muted/30 transition-colors text-left group"
                >
                  <div className="w-12 h-8 rounded overflow-hidden bg-muted">
                    <img
                      src={collection.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = FALLBACK_THUMBNAIL; }}
                    />
                  </div>
                  <span className="flex-1 text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {collection.name}
                  </span>
                  <span className="w-24 text-sm text-muted-foreground">Album</span>
                  <span className="w-16 text-sm text-muted-foreground text-right">{collection.projectCount} items</span>
                </button>
              ))}

              {/* Projects in list view */}
              {filteredAndSortedProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => openWindow('project', project.id)}
                  className="w-full flex items-center gap-4 px-3 py-2 hover:bg-muted/30 transition-colors text-left group"
                >
                  <div className="w-12 h-8 rounded overflow-hidden bg-muted">
                    <img
                      src={project.thumbnailUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = FALLBACK_THUMBNAIL; }}
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

          {filteredAndSortedProjects.length === 0 && filteredCollections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-sm">No photos found</p>
              <p className="text-xs mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
