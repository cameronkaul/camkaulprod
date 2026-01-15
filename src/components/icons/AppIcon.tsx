import { motion } from 'framer-motion';
import { WindowId } from '@/contexts/WindowContext';

export type AppIconType = 'portfolio' | 'mail' | 'about' | 'resume' | 'runner' | 'trash' | 'instagram';

interface AppIconConfig {
  gradient: string;
  glyph: React.ReactNode;
  label: string;
  accentColor: string;
}

// Vibrant iOS-style SVG glyphs
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
      fillOpacity="0.25"
    />
  </svg>
);

const MailGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" fill="white" fillOpacity="0.95" />
    <path d="M3 7L12 13L21 7" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const NotesGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" fill="white" fillOpacity="0.95" />
    <path d="M8 8H16M8 12H14M8 16H12" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DocsGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <path d="M6 3H14L18 7V19C18 20.1046 17.1046 21 16 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z" fill="white" fillOpacity="0.95" />
    <path d="M14 3V7H18" fill="white" fillOpacity="0.25" />
    <path d="M8 12H14M8 16H12" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RunnerGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    {/* Dynamic running figure */}
    <circle cx="14" cy="5" r="2.5" fill="white" fillOpacity="0.95" />
    <path d="M10 9L14 12L18 10" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 12L12 17" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 17L8 21M12 17L16 20" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 9L6 11" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrashGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <path d="M6 7H18V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7Z" fill="white" fillOpacity="0.95" />
    <path d="M4 7H20" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 4H15" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 11V17M14 11V17" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" fill="white" fillOpacity="0.95" />
    <circle cx="12" cy="12" r="4" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
    <circle cx="17" cy="7" r="1.5" fill="white" fillOpacity="0.3" />
  </svg>
);

// Vibrant Apple-style color palette
const iconConfigs: Record<AppIconType, AppIconConfig> = {
  portfolio: {
    gradient: 'linear-gradient(145deg, #5AC8FA 0%, #007AFF 50%, #0056CC 100%)',
    glyph: <PortfolioGlyph />,
    label: 'Portfolio',
    accentColor: 'hsl(211, 100%, 50%)',
  },
  mail: {
    gradient: 'linear-gradient(145deg, #5AC8FA 0%, #34AADC 50%, #1E88C7 100%)',
    glyph: <MailGlyph />,
    label: 'Mail',
    accentColor: 'hsl(199, 70%, 53%)',
  },
  about: {
    gradient: 'linear-gradient(145deg, #FFCC00 0%, #FF9500 50%, #E67E00 100%)',
    glyph: <NotesGlyph />,
    label: 'Notes',
    accentColor: 'hsl(38, 100%, 50%)',
  },
  resume: {
    gradient: 'linear-gradient(145deg, #5856D6 0%, #4240B3 50%, #2E2C8F 100%)',
    glyph: <DocsGlyph />,
    label: 'Docs',
    accentColor: 'hsl(241, 60%, 59%)',
  },
  runner: {
    gradient: 'linear-gradient(145deg, #FF6B6B 0%, #FF3B30 50%, #CC2F26 100%)',
    glyph: <RunnerGlyph />,
    label: 'Runner',
    accentColor: 'hsl(4, 100%, 59%)',
  },
  trash: {
    gradient: 'linear-gradient(145deg, #8E8E93 0%, #636366 50%, #48484A 100%)',
    glyph: <TrashGlyph />,
    label: 'Trash',
    accentColor: 'hsl(240, 2%, 48%)',
  },
  instagram: {
    gradient: 'linear-gradient(145deg, #F58529 0%, #DD2A7B 40%, #8134AF 80%, #515BD4 100%)',
    glyph: <InstagramGlyph />,
    label: 'Instagram',
    accentColor: 'hsl(330, 70%, 50%)',
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
            0 4px 12px rgba(0,0,0,0.25),
            0 2px 4px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.25),
            inset 0 -1px 0 rgba(0,0,0,0.1)
          `,
        }}
      >
        {/* Glass highlight at top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: borderRadius,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%)',
          }}
        />
        {/* Glyph */}
        {config.glyph}
        
        {/* Selection ring */}
        {isSelected && (
          <div
            className="absolute inset-0 ring-2 ring-white/60"
            style={{ borderRadius: borderRadius }}
          />
        )}
      </div>

      {/* Label - crisp Apple typography */}
      {showLabel && (
        <span
          className={`text-[11px] font-medium text-center px-1.5 py-0.5 rounded tracking-tight ${labelClassName} ${
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'text-white'
          }`}
          style={{
            textShadow: isSelected ? 'none' : '0 1px 3px rgba(0,0,0,0.6)',
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
