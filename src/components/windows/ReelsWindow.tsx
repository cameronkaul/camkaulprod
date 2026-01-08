import { useState } from 'react';
import { reels } from '@/data/projects';

export function ReelsWindow() {
  const [activeReel, setActiveReel] = useState(reels[0]);

  return (
    <div className="flex h-full">
      {/* Playlist Sidebar */}
      <div className="w-48 bg-sidebar border-r border-sidebar-border p-3 space-y-2 flex-shrink-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase px-2">Playlist</p>
        {reels.map((reel) => (
          <button
            key={reel.id}
            onClick={() => setActiveReel(reel)}
            className={`w-full flex items-center gap-2 p-2 rounded-lg transition ${
              activeReel.id === reel.id ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <img src={reel.thumbnailUrl} alt={reel.title} className="w-12 h-8 rounded object-cover" />
            <span className="text-xs text-left truncate">{reel.title}</span>
          </button>
        ))}
      </div>

      {/* Video Player */}
      <div className="flex-1 p-4 flex items-center justify-center bg-black/5">
        <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden">
          <iframe
            src={activeReel.videoUrl}
            title={activeReel.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
