import { aboutData } from '@/data/projects';
import { MapPin, Wrench } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function AboutWindow() {
  const { tools } = aboutData;

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

      {/* Tools Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="tools" className="border-muted">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2 font-semibold">
              <Wrench className="w-4 h-4" /> Tools
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <ToolSection title="Camera" items={tools.camera} />
              <ToolSection title="Lenses" items={tools.lenses} />
              <ToolSection title="Backup" items={tools.backup} />
              <ToolSection title="Audio" items={tools.audio} />
              <ToolSection title="Stabilization" items={tools.stabilization} />
              <ToolSection title="Lighting" items={tools.lighting} />
              <ToolSection title="Software" items={tools.software} />
              <ToolSection title="Familiar" items={tools.familiar} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function ToolSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{title}</h4>
      <ul className="text-sm space-y-0.5">
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
