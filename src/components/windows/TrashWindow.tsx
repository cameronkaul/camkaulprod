import { useState } from 'react';
import { deletedScenes } from '@/data/projects';

export function TrashWindow() {
  const [activeScene, setActiveScene] = useState(deletedScenes[0]);

  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold">🎬 Deleted Scenes</h2>
        <p className="text-sm text-muted-foreground">Bloopers, outtakes, and happy accidents</p>
      </div>

      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
        <iframe
          src={activeScene.videoUrl}
          title={activeScene.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex gap-2 justify-center">
        {deletedScenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setActiveScene(scene)}
            className={`p-1 rounded-lg transition ${activeScene.id === scene.id ? 'ring-2 ring-ring' : ''}`}
          >
            <img src={scene.thumbnailUrl} alt={scene.title} className="w-20 h-12 rounded object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
