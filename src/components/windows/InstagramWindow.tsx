import { Instagram } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/camkaul.prod/';
const INSTAGRAM_HANDLE = '@camkaul.prod';

export function InstagramWindow() {
  const handleOpenInstagram = () => {
    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-full flex items-center justify-center p-8 bg-gradient-to-br from-card to-muted/30">
      <div className="flex flex-col items-center gap-6 max-w-sm text-center">
        {/* Instagram Icon */}
        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)',
            boxShadow: '0 8px 32px rgba(221, 42, 123, 0.3)',
          }}
        >
          <Instagram className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Handle */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Instagram</h2>
          <p className="text-muted-foreground">{INSTAGRAM_HANDLE}</p>
        </div>

        {/* Open Button */}
        <button
          onClick={handleOpenInstagram}
          className="px-6 py-3 rounded-xl font-medium text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)',
            boxShadow: '0 4px 16px rgba(221, 42, 123, 0.25)',
          }}
        >
          Open Instagram
        </button>
      </div>
    </div>
  );
}
