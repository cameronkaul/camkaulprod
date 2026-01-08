import { useState } from 'react';
import { projects, Project } from '@/data/projects';
import { useWindows } from '@/contexts/WindowContext';

const categories = ['All', 'Brand', 'Weddings', 'Music', 'Social', 'Photo', 'Other'];

export function PortfolioWindow() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { openWindow } = useWindows();

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-44 bg-sidebar border-r border-sidebar-border p-3 flex-shrink-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">Categories</p>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeCategory === cat ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => openWindow('project', project.id)}
              className="group text-left"
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-2">
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
      </div>
    </div>
  );
}
