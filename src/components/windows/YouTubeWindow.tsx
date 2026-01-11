import { Play } from 'lucide-react';

const YOUTUBE_URL = 'https://youtube.com/@camkaul?si=RO10_a3M53H47KBj';
const CHANNEL_NAME = 'Cam Kaul';

export function YouTubeWindow() {
  const handleOpenYouTube = () => {
    window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-full flex items-center justify-center p-8 bg-gradient-to-br from-card to-muted/30">
      <div className="flex flex-col items-center gap-6 max-w-sm text-center">
        {/* YouTube Icon */}
        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, #FF6B6B 0%, #FF0000 50%, #CC0000 100%)',
            boxShadow: '0 8px 32px rgba(255, 0, 0, 0.3)',
          }}
        >
          <Play className="w-12 h-12 text-white" strokeWidth={1.5} fill="rgba(255,255,255,0.9)" />
        </div>

        {/* Channel Name */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">YouTube</h2>
          <p className="text-muted-foreground">{CHANNEL_NAME}</p>
        </div>

        {/* Open Button */}
        <button
          onClick={handleOpenYouTube}
          className="px-6 py-3 rounded-xl font-medium text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #FF4444 0%, #FF0000 50%, #CC0000 100%)',
            boxShadow: '0 4px 16px rgba(255, 0, 0, 0.25)',
          }}
        >
          Open YouTube
        </button>
      </div>
    </div>
  );
}
