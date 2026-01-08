import { aboutData } from '@/data/projects';
import { MapPin, Camera, Monitor } from 'lucide-react';

export function AboutWindow() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-muted flex items-center justify-center text-3xl font-bold text-primary-foreground mb-4">
          CK
        </div>
        <h1 className="text-2xl font-bold">{aboutData.name}</h1>
        <p className="text-muted-foreground">{aboutData.title}</p>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
          <MapPin className="w-3 h-3" /> {aboutData.location}
        </p>
      </div>

      {/* Bio */}
      <p className="text-sm text-foreground/80 leading-relaxed">{aboutData.bio}</p>

      {/* Services */}
      <div>
        <h3 className="font-semibold mb-2">Services</h3>
        <div className="flex flex-wrap gap-2">
          {aboutData.services.map(s => (
            <span key={s} className="px-3 py-1 bg-muted rounded-full text-xs">{s}</span>
          ))}
        </div>
      </div>

      {/* Gear & Software */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Camera className="w-4 h-4" /> Gear</h3>
          <div className="space-y-1">
            {aboutData.gear.map(g => (
              <div key={g.name} className="text-sm flex justify-between">
                <span>{g.name}</span>
                <span className="text-muted-foreground">{g.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Monitor className="w-4 h-4" /> Software</h3>
          <div className="flex flex-wrap gap-2">
            {aboutData.software.map(s => (
              <span key={s} className="px-2 py-1 bg-muted rounded text-xs">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
