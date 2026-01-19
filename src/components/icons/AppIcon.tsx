import { motion } from 'framer-motion';
import { WindowId } from '@/contexts/WindowContext';

export type AppIconType = 'portfolio' | 'photos' | 'mail' | 'about' | 'resume' | 'runner' | 'trash' | 'instagram';

interface AppIconConfig {
  gradient: string;
  glyph: React.ReactNode;
  label: string;
  accentColor: string;
  highlightColor: string;
}

// Apple SF Symbols-inspired glyphs - clean, geometric, recognizable
const PortfolioGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill="none">
    {/* Photo stack - SF Symbols photo.stack style */}
    <rect x="4" y="6" width="14" height="11" rx="1.5" fill="white" fillOpacity="0.9" />
    <rect x="6" y="4" width="14" height="11" rx="1.5" fill="white" />
    {/* Mountain/sun photo detail */}
    <circle cx="9" cy="7" r="1.5" fill="rgba(0,0,0,0.2)" />
    <path d="M6 13L9.5 10L12 12L16 8L20 13V14C20 14.83 19.33 15.5 18.5 15.5H7.5C6.67 15.5 6 14.83 6 14V13Z" fill="rgba(0,0,0,0.15)" />
  </svg>
);

// iOS Photos app icon - colorful 8-petal pinwheel/flower design with distinct colors
const PhotosGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[70%] h-[70%]" fill="none">
    {/* 8-petal flower design like iOS Photos - each petal is a different color */}
    <ellipse cx="12" cy="7" rx="2.5" ry="4" fill="#FF3B30" /> {/* Red - top */}
    <ellipse cx="15.5" cy="8.5" rx="2.5" ry="4" transform="rotate(45 15.5 8.5)" fill="#FF9500" /> {/* Orange - top right */}
    <ellipse cx="17" cy="12" rx="4" ry="2.5" fill="#FFCC00" /> {/* Yellow - right */}
    <ellipse cx="15.5" cy="15.5" rx="2.5" ry="4" transform="rotate(-45 15.5 15.5)" fill="#34C759" /> {/* Green - bottom right */}
    <ellipse cx="12" cy="17" rx="2.5" ry="4" fill="#00C7BE" /> {/* Teal - bottom */}
    <ellipse cx="8.5" cy="15.5" rx="2.5" ry="4" transform="rotate(45 8.5 15.5)" fill="#007AFF" /> {/* Blue - bottom left */}
    <ellipse cx="7" cy="12" rx="4" ry="2.5" fill="#5856D6" /> {/* Purple - left */}
    <ellipse cx="8.5" cy="8.5" rx="2.5" ry="4" transform="rotate(-45 8.5 8.5)" fill="#AF52DE" /> {/* Magenta - top left */}
    {/* White center circle */}
    <circle cx="12" cy="12" r="2.5" fill="white" />
  </svg>
);

const MailGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill="none">
    {/* Envelope - SF Symbols envelope.fill style */}
    <rect x="3" y="5" width="18" height="14" rx="2" fill="white" />
    <path d="M3 7L12 13L21 7" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NotesGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill="none">
    {/* Note - SF Symbols note.text style */}
    <rect x="4" y="3" width="16" height="18" rx="2" fill="white" />
    <path d="M7.5 8H16.5" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.5 12H14" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.5 16H11" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ResumeGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[75%] h-[75%]" fill="none">
    {/* Minimized Word document file - paper with folded corner */}
    <defs>
      <linearGradient id="wordDocGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f0f0f0" />
      </linearGradient>
    </defs>
    {/* Paper */}
    <path d="M4 2C3.45 2 3 2.45 3 3V21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21V7L16 2H4Z" fill="url(#wordDocGradient)" />
    {/* Folded corner */}
    <path d="M16 2V7H21L16 2Z" fill="#d0d0d0" />
    {/* Word blue bar at top */}
    <rect x="3" y="2" width="13" height="3" fill="#2B579A" rx="1" />
    {/* Text lines */}
    <rect x="5" y="9" width="10" height="1.2" rx="0.6" fill="#2B579A" fillOpacity="0.7" />
    <rect x="5" y="12" width="14" height="1.2" rx="0.6" fill="#ccc" />
    <rect x="5" y="15" width="12" height="1.2" rx="0.6" fill="#ccc" />
    <rect x="5" y="18" width="8" height="1.2" rx="0.6" fill="#ccc" />
  </svg>
);

const RunnerGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill="none">
    {/* Running figure - SF Symbols figure.run style */}
    <circle cx="15" cy="4" r="2.5" fill="white" />
    <path d="M8 10L12 8L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8L10 14L6 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14L14 13L18 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill="none">
    {/* Trash - SF Symbols trash.fill style */}
    <path d="M6 7H18V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V7Z" fill="white" />
    <path d="M4 7H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 7V5C9 4.45 9.45 4 10 4H14C14.55 4 15 4.45 15 5V7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 11V17M14 11V17" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]" fill="none">
    {/* Camera - SF Symbols camera.fill style */}
    <rect x="3" y="3" width="18" height="18" rx="4.5" fill="white" />
    <circle cx="12" cy="12" r="4" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />
    <circle cx="17" cy="7" r="1.2" fill="rgba(0,0,0,0.3)" />
  </svg>
);

// iOS 18 vibrant, bright color palette - punchy and fresh
const iconConfigs: Record<AppIconType, AppIconConfig> = {
  portfolio: {
    gradient: 'linear-gradient(145deg, #7DD3FC 0%, #38BDF8 40%, #0EA5E9 100%)',
    glyph: <PortfolioGlyph />,
    label: 'Portfolio',
    accentColor: 'hsl(199, 95%, 60%)',
    highlightColor: 'rgba(125, 211, 252, 0.5)',
  },
  photos: {
    gradient: 'linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 50%, #E8E8E8 100%)',
    glyph: <PhotosGlyph />,
    label: 'Photos',
    accentColor: 'hsl(0, 0%, 95%)',
    highlightColor: 'rgba(255, 255, 255, 0.6)',
  },
  mail: {
    gradient: 'linear-gradient(145deg, #93C5FD 0%, #60A5FA 40%, #3B82F6 100%)',
    glyph: <MailGlyph />,
    label: 'Mail',
    accentColor: 'hsl(217, 91%, 65%)',
    highlightColor: 'rgba(147, 197, 253, 0.5)',
  },
  about: {
    gradient: 'linear-gradient(145deg, #FDE68A 0%, #FBBF24 40%, #F59E0B 100%)',
    glyph: <NotesGlyph />,
    label: 'Notes',
    accentColor: 'hsl(45, 96%, 58%)',
    highlightColor: 'rgba(253, 230, 138, 0.5)',
  },
  resume: {
    gradient: 'linear-gradient(145deg, #E8E8E8 0%, #D4D4D4 50%, #BEBEBE 100%)',
    glyph: <ResumeGlyph />,
    label: 'Resume.doc',
    accentColor: 'hsl(0, 0%, 80%)',
    highlightColor: 'rgba(255, 255, 255, 0.5)',
  },
  runner: {
    gradient: 'linear-gradient(145deg, #FCA5A5 0%, #F87171 40%, #EF4444 100%)',
    glyph: <RunnerGlyph />,
    label: 'Runner',
    accentColor: 'hsl(0, 84%, 65%)',
    highlightColor: 'rgba(252, 165, 165, 0.5)',
  },
  trash: {
    gradient: 'linear-gradient(145deg, #D4D4D8 0%, #A1A1AA 40%, #71717A 100%)',
    glyph: <TrashGlyph />,
    label: 'Trash',
    accentColor: 'hsl(240, 5%, 60%)',
    highlightColor: 'rgba(212, 212, 216, 0.4)',
  },
  instagram: {
    gradient: 'linear-gradient(145deg, #FCD34D 0%, #F472B6 35%, #C026D3 65%, #9333EA 100%)',
    glyph: <InstagramGlyph />,
    label: 'Instagram',
    accentColor: 'hsl(328, 85%, 60%)',
    highlightColor: 'rgba(252, 211, 77, 0.5)',
  },
};

interface AppIconProps {
  type: AppIconType;
  size?: number;
  showLabel?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  className?: string;
  labelClassName?: string;
  customLabel?: string;
}

export function AppIcon({
  type,
  size = 60,
  showLabel = true,
  isSelected = false,
  onClick,
  onDoubleClick,
  className = '',
  labelClassName = '',
  customLabel,
}: AppIconProps) {
  const config = iconConfigs[type];
  const borderRadius = size * 0.22;

  return (
    <motion.button
      className={`flex flex-col items-center gap-1 ${className}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: size,
          height: size,
          borderRadius: borderRadius,
          background: config.gradient,
          boxShadow: `
            0 6px 20px rgba(0,0,0,0.28),
            0 2px 6px rgba(0,0,0,0.18),
            inset 0 1.5px 0 ${config.highlightColor},
            inset 0 -1px 0 rgba(0,0,0,0.12)
          `,
        }}
      >
        {/* Glass highlight at top - specular shine */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            borderRadius: borderRadius,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)',
              borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
            }}
          />
        </div>
        
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            borderRadius: borderRadius,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Glyph */}
        {config.glyph}
        
        {/* Selection ring */}
        {isSelected && (
          <div
            className="absolute inset-0 ring-2 ring-white/70 ring-offset-1 ring-offset-transparent"
            style={{ borderRadius: borderRadius }}
          />
        )}
      </div>

      {/* Label - crisp Apple typography */}
      {showLabel && (
        <span
          className={`text-[11px] font-semibold text-center px-1.5 py-0.5 rounded tracking-tight ${labelClassName} ${
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'text-white'
          }`}
          style={{
            textShadow: isSelected ? 'none' : '0 1px 4px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.3)',
            maxWidth: size + 16,
            letterSpacing: '-0.01em',
          }}
        >
          {customLabel || config.label}
        </span>
      )}
    </motion.button>
  );
}

// Export configs for use in Window headers
export function getAppConfig(type: AppIconType) {
  return iconConfigs[type];
}

// Map WindowId to AppIconType
export function windowIdToIconType(id: WindowId): AppIconType | null {
  const mapping: Record<string, AppIconType> = {
    portfolio: 'portfolio',
    photos: 'photos',
    mail: 'mail',
    about: 'about',
    resume: 'resume',
    runner: 'runner',
    trash: 'trash',
    instagram: 'instagram',
  };
  return mapping[id] || null;
}

// Small icon for window headers
interface HeaderIconProps {
  type: AppIconType;
  size?: number;
}

export function HeaderIcon({ type, size = 16 }: HeaderIconProps) {
  const config = iconConfigs[type];
  const borderRadius = size * 0.22;

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: borderRadius,
        background: config.gradient,
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <div className="w-[55%] h-[55%] flex items-center justify-center">
        {config.glyph}
      </div>
    </div>
  );
}
