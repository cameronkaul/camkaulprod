import { motion } from 'framer-motion';
import { WindowId } from '@/contexts/WindowContext';

export type AppIconType = 'portfolio' | 'mail' | 'about' | 'resume' | 'runner' | 'trash' | 'instagram';

interface AppIconConfig {
  gradient: string;
  glyph: React.ReactNode;
  label: string;
  accentColor: string;
  highlightColor: string;
}

// Premium iOS-style SVG glyphs with enhanced detail
const PortfolioGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    {/* Folder body with depth */}
    <defs>
      <linearGradient id="folderBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    <path 
      d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L11.7071 6.70711C11.8946 6.89464 12.149 7 12.4142 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" 
      fill="url(#folderBody)"
    />
    {/* Tab highlight */}
    <path 
      d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L11.7071 6.70711C11.8946 6.89464 12.149 7 12.4142 7H19C20.1046 7 21 7.89543 21 9V10H3V7Z" 
      fill="white"
      fillOpacity="0.35"
    />
    {/* Specular highlight */}
    <path
      d="M4 8H10.5L11.5 7H5C4.44772 7 4 7.44772 4 8Z"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
);

const MailGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <defs>
      <linearGradient id="mailBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.88" />
      </linearGradient>
    </defs>
    <rect x="3" y="5" width="18" height="14" rx="2.5" fill="url(#mailBody)" />
    {/* Envelope flap */}
    <path d="M3 7L12 13L21 7" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Top highlight */}
    <path d="M5.5 5H18.5C19.88 5 21 6.12 21 7.5L12 13L3 7.5C3 6.12 4.12 5 5.5 5Z" fill="white" fillOpacity="0.15" />
  </svg>
);

const NotesGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <defs>
      <linearGradient id="notesBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <rect x="4" y="3" width="16" height="18" rx="2.5" fill="url(#notesBody)" />
    {/* Lines */}
    <path d="M7.5 8H16.5" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.5 12H14.5" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.5 16H12" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeLinecap="round" />
    {/* Top highlight */}
    <rect x="4" y="3" width="16" height="4" rx="2.5" fill="white" fillOpacity="0.2" />
  </svg>
);

const DocsGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <defs>
      <linearGradient id="docsBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.88" />
      </linearGradient>
    </defs>
    <path d="M6 3H14L18 7V19C18 20.1046 17.1046 21 16 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z" fill="url(#docsBody)" />
    {/* Folded corner */}
    <path d="M14 3V7H18L14 3Z" fill="white" fillOpacity="0.5" />
    {/* Lines */}
    <path d="M7 12H15" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7 15H12" stroke="rgba(0,0,0,0.1)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const RunnerGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <defs>
      <filter id="runnerGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#runnerGlow)">
      {/* Head */}
      <circle cx="14" cy="5" r="2.5" fill="white" />
      {/* Body */}
      <path d="M10 9L14 12L18 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 12L12 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      {/* Legs */}
      <path d="M12 17L8 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 17L16 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      {/* Arm */}
      <path d="M10 9L6 11" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  </svg>
);

const TrashGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <defs>
      <linearGradient id="trashBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    {/* Can body */}
    <path d="M6 7H18V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7Z" fill="url(#trashBody)" />
    {/* Lid */}
    <path d="M4 7H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 4H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Lines */}
    <path d="M10 11V17" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 11V17" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <defs>
      <linearGradient id="igBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#igBody)" />
    {/* Camera lens */}
    <circle cx="12" cy="12" r="4" stroke="rgba(0,0,0,0.2)" strokeWidth="1.8" fill="none" />
    {/* Flash */}
    <circle cx="17" cy="7" r="1.5" fill="rgba(0,0,0,0.2)" />
    {/* Inner highlight */}
    <rect x="4" y="4" width="16" height="6" rx="4" fill="white" fillOpacity="0.15" />
  </svg>
);

// Vibrant Apple-style color palette with enhanced saturation
const iconConfigs: Record<AppIconType, AppIconConfig> = {
  portfolio: {
    gradient: 'linear-gradient(145deg, #64D2FF 0%, #0A84FF 45%, #0066CC 100%)',
    glyph: <PortfolioGlyph />,
    label: 'Portfolio',
    accentColor: 'hsl(211, 100%, 55%)',
    highlightColor: 'rgba(100, 210, 255, 0.4)',
  },
  mail: {
    gradient: 'linear-gradient(145deg, #6EE7FF 0%, #32ADE6 45%, #0891C9 100%)',
    glyph: <MailGlyph />,
    label: 'Mail',
    accentColor: 'hsl(199, 80%, 58%)',
    highlightColor: 'rgba(110, 231, 255, 0.4)',
  },
  about: {
    gradient: 'linear-gradient(145deg, #FFE066 0%, #FF9F0A 45%, #E67E00 100%)',
    glyph: <NotesGlyph />,
    label: 'Notes',
    accentColor: 'hsl(38, 100%, 55%)',
    highlightColor: 'rgba(255, 224, 102, 0.4)',
  },
  resume: {
    gradient: 'linear-gradient(145deg, #8B85FF 0%, #5E5CE6 45%, #4240B3 100%)',
    glyph: <DocsGlyph />,
    label: 'Docs',
    accentColor: 'hsl(242, 70%, 62%)',
    highlightColor: 'rgba(139, 133, 255, 0.4)',
  },
  runner: {
    gradient: 'linear-gradient(145deg, #FF8080 0%, #FF453A 45%, #D93025 100%)',
    glyph: <RunnerGlyph />,
    label: 'Runner',
    accentColor: 'hsl(4, 100%, 62%)',
    highlightColor: 'rgba(255, 128, 128, 0.4)',
  },
  trash: {
    gradient: 'linear-gradient(145deg, #B0B0B5 0%, #8E8E93 45%, #636366 100%)',
    glyph: <TrashGlyph />,
    label: 'Trash',
    accentColor: 'hsl(240, 3%, 55%)',
    highlightColor: 'rgba(176, 176, 181, 0.3)',
  },
  instagram: {
    gradient: 'linear-gradient(145deg, #FCAF45 0%, #E1306C 35%, #C13584 60%, #833AB4 100%)',
    glyph: <InstagramGlyph />,
    label: 'Instagram',
    accentColor: 'hsl(330, 75%, 55%)',
    highlightColor: 'rgba(252, 175, 69, 0.4)',
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
