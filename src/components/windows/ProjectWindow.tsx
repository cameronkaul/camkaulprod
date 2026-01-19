import { projects } from '@/data/projects';
import { useWindows } from '@/contexts/WindowContext';
import { ExternalLink, Play } from 'lucide-react';

export function ProjectWindow() {
  const { windows } = useWindows();
  const projectWindow = windows.find(w => w.id === 'project');
  const project = projects.find(p => p.id === projectWindow?.projectId);

  if (!project) {
    return <div className="p-6 text-center text-muted-foreground">Project not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Hero Video/Image */}
      {project.videoUrl ? (
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <iframe
            src={project.videoUrl}
            title={project.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Title & Meta */}
      <div>
        <h1 className="text-2xl font-bold mb-1">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          <span><strong>Role:</strong> {project.role}</span>
        </div>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-2">
        {project.tools.map(tool => (
          <span key={tool} className="px-2 py-1 bg-muted rounded text-xs">{tool}</span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/80 leading-relaxed">{project.longDescription}</p>

      {/* External Links */}
      {project.externalLinks && project.externalLinks.length > 0 && (
        <div className="flex gap-3">
          {project.externalLinks.map(link => (
            <a
              key={link.label}
              href={link.url}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition"
            >
              <ExternalLink className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Gallery */}
      {project.galleryUrls.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.galleryUrls.map((url, i) => (
              <img key={i} src={url} alt={`${project.title} gallery ${i + 1}`} className="rounded-lg object-cover aspect-video" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
