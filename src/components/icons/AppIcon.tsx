import { motion } from 'framer-motion';
import { 
  FileText, 
  Trash2, 
  Gamepad2,
  StickyNote,
  Aperture,
  Instagram,
  Mail
} from 'lucide-react';
import { WindowId } from '@/contexts/WindowContext';

export type AppIconType = 'portfolio' | 'mail' | 'about' | 'resume' | 'runner' | 'trash' | 'instagram';

interface AppIconConfig {
  gradient: string;
  glyph: React.ReactNode;
  label: string;
  accentColor: string;
}

const iconConfigs: Record<AppIconType, AppIconConfig> = {
  portfolio: {
    gradient: 'linear-gradient(145deg, #FF6B6B 0%, #EE4D4D 50%, #CC3333 100%)',
    glyph: <Aperture className="w-1/2 h-1/2 text-white drop-shadow-sm" strokeWidth={1.5} />,
    label: 'Photos',
    accentColor: 'hsl(0, 75%, 55%)',
  },
  mail: {
    gradient: 'linear-gradient(145deg, #7DD3FC 0%, #38BDF8 50%, #0EA5E9 100%)',
    glyph: <Mail className="w-1/2 h-1/2 text-white drop-shadow-sm" strokeWidth={1.5} />,
    label: 'Mail',
    accentColor: 'hsl(199, 89%, 48%)',
  },
  about: {
    gradient: 'linear-gradient(145deg, #FDE68A 0%, #FCD34D 50%, #F59E0B 100%)',
    glyph: <StickyNote className="w-1/2 h-1/2 text-white drop-shadow-sm" strokeWidth={1.5} />,
    label: 'Notes',
    accentColor: 'hsl(45, 93%, 47%)',
  },
  resume: {
    gradient: 'linear-gradient(145deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%)',
    glyph: <FileText className="w-1/2 h-1/2 text-white drop-shadow-sm" strokeWidth={1.5} />,
    label: 'Docs',
    accentColor: 'hsl(217, 91%, 60%)',
  },
  runner: {
    gradient: 'linear-gradient(145deg, #A78BFA 0%, #8B5CF6 50%, #7C3AED 100%)',
    glyph: <Gamepad2 className="w-1/2 h-1/2 text-white drop-shadow-sm" strokeWidth={1.5} />,
    label: 'Runner',
    accentColor: 'hsl(263, 70%, 50%)',
  },
  trash: {
    gradient: 'linear-gradient(145deg, #9CA3AF 0%, #6B7280 50%, #4B5563 100%)',
    glyph: <Trash2 className="w-1/2 h-1/2 text-white drop-shadow-sm" strokeWidth={1.5} />,
    label: 'Trash',
    accentColor: 'hsl(220, 9%, 46%)',
  },
  instagram: {
    gradient: 'linear-gradient(145deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)',
    glyph: <Instagram className="w-1/2 h-1/2 text-white drop-shadow-sm" strokeWidth={1.5} />,
    label: 'Instagram',
    accentColor: 'hsl(326, 70%, 50%)',
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
}: AppIconProps) {
  const config = iconConfigs[type];
  const borderRadius = size * 0.22; // ~22% corner radius like iOS

  return (
    <motion.button
      className={`flex flex-col items-center gap-1.5 ${className}`}
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
            0 2px 8px rgba(0,0,0,0.25),
            0 1px 3px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.25),
            inset 0 -1px 0 rgba(0,0,0,0.1)
          `,
        }}
      >
        {/* Inner highlight/shine effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: borderRadius,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)',
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

      {/* Label */}
      {showLabel && (
        <span
          className={`text-xs font-medium text-center px-2 py-0.5 rounded-md ${labelClassName} ${
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'text-white bg-black/40 backdrop-blur-sm'
          }`}
          style={{
            textShadow: isSelected ? 'none' : '0 1px 3px rgba(0,0,0,0.6)',
            maxWidth: size + 20,
          }}
        >
          {config.label}
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
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }}
    >
      <div className="w-[60%] h-[60%] text-white flex items-center justify-center">
        {type === 'portfolio' && <Aperture className="w-full h-full" strokeWidth={2} />}
        {type === 'mail' && <Mail className="w-full h-full" strokeWidth={2} />}
        {type === 'about' && <StickyNote className="w-full h-full" strokeWidth={2} />}
        {type === 'resume' && <FileText className="w-full h-full" strokeWidth={2} />}
        {type === 'runner' && <Gamepad2 className="w-full h-full" strokeWidth={2} />}
        {type === 'trash' && <Trash2 className="w-full h-full" strokeWidth={2} />}
        {type === 'instagram' && <Instagram className="w-full h-full" strokeWidth={2} />}
      </div>
    </div>
  );
}
