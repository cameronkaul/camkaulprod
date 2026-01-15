import { motion } from 'framer-motion';
import { WindowId } from '@/contexts/WindowContext';

export type AppIconType = 'portfolio' | 'mail' | 'about' | 'resume' | 'runner' | 'trash' | 'instagram';

interface AppIconConfig {
  gradient: string;
  glyph: React.ReactNode;
  label: string;
  accentColor: string;
}

// Sleek, minimal SVG glyphs matching iOS Files aesthetic
const PortfolioGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <path 
      d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L11.7071 6.70711C11.8946 6.89464 12.149 7 12.4142 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" 
      fill="white"
      fillOpacity="0.95"
    />
    <path 
      d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L11.7071 6.70711C11.8946 6.89464 12.149 7 12.4142 7H19C20.1046 7 21 7.89543 21 9V10H3V7Z" 
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

const MailGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" fill="white" fillOpacity="0.95" />
    <path d="M3 7L12 13L21 7" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const NotesGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" fill="white" fillOpacity="0.95" />
    <path d="M8 8H16M8 12H14M8 16H12" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DocsGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <path d="M6 3H14L18 7V19C18 20.1046 17.1046 21 16 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z" fill="white" fillOpacity="0.95" />
    <path d="M14 3V7H18" fill="white" fillOpacity="0.3" />
    <path d="M8 12H14M8 16H12" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RunnerGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    {/* Simplified running figure */}
    <circle cx="12" cy="6" r="2.5" fill="white" fillOpacity="0.95" />
    <path d="M8 11L12 14L16 11" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 14V18" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 18L9 22M12 18L15 22" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrashGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <path d="M6 7H18V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7Z" fill="white" fillOpacity="0.95" />
    <path d="M4 7H20" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 4H15" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 11V17M14 11V17" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" fill="white" fillOpacity="0.95" />
    <circle cx="12" cy="12" r="4" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
    <circle cx="17" cy="7" r="1.5" fill="white" fillOpacity="0.35" />
  </svg>
);

// Refined, desaturated color palette matching iOS Files aesthetic
const iconConfigs: Record<AppIconType, AppIconConfig> = {
  portfolio: {
    gradient: 'linear-gradient(145deg, #4A90D9 0%, #2E6BB3 50%, #1E4E8C 100%)',
    glyph: <PortfolioGlyph />,
    label: 'Portfolio',
    accentColor: 'hsl(212, 60%, 50%)',
  },
  mail: {
    gradient: 'linear-gradient(145deg, #4AAED9 0%, #2E8BB3 50%, #1E6A8C 100%)',
    glyph: <MailGlyph />,
    label: 'Mail',
    accentColor: 'hsl(195, 60%, 48%)',
  },
  about: {
    gradient: 'linear-gradient(145deg, #D9A84A 0%, #B38A2E 50%, #8C6A1E 100%)',
    glyph: <NotesGlyph />,
    label: 'Notes',
    accentColor: 'hsl(42, 60%, 48%)',
  },
  resume: {
    gradient: 'linear-gradient(145deg, #5A7AD9 0%, #3E5CB3 50%, #2E448C 100%)',
    glyph: <DocsGlyph />,
    label: 'Docs',
    accentColor: 'hsl(224, 55%, 52%)',
  },
  runner: {
    gradient: 'linear-gradient(145deg, #8A7AD9 0%, #6A5CB3 50%, #4E448C 100%)',
    glyph: <RunnerGlyph />,
    label: 'Runner',
    accentColor: 'hsl(250, 45%, 55%)',
  },
  trash: {
    gradient: 'linear-gradient(145deg, #8A8D94 0%, #6A6D73 50%, #4E5054 100%)',
    glyph: <TrashGlyph />,
    label: 'Trash',
    accentColor: 'hsl(220, 5%, 45%)',
  },
  instagram: {
    gradient: 'linear-gradient(145deg, #C9548A 0%, #9A3D6D 50%, #6D2850 100%)',
    glyph: <InstagramGlyph />,
    label: 'Instagram',
    accentColor: 'hsl(330, 50%, 50%)',
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
            0 2px 6px rgba(0,0,0,0.2),
            0 1px 2px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 0 rgba(0,0,0,0.08)
          `,
        }}
      >
        {/* Subtle inner highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: borderRadius,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 40%)',
          }}
        />
        {/* Glyph */}
        {config.glyph}
        
        {/* Selection ring */}
        {isSelected && (
          <div
            className="absolute inset-0 ring-2 ring-white/50"
            style={{ borderRadius: borderRadius }}
          />
        )}
      </div>

      {/* Label - refined typography */}
      {showLabel && (
        <span
          className={`text-[11px] font-semibold text-center px-1.5 py-0.5 rounded tracking-tight ${labelClassName} ${
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'text-white/95'
          }`}
          style={{
            textShadow: isSelected ? 'none' : '0 1px 2px rgba(0,0,0,0.5)',
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
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
      }}
    >
      <div className="w-[55%] h-[55%] flex items-center justify-center">
        {config.glyph}
      </div>
    </div>
  );
}