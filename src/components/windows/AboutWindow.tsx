import { useState } from 'react';
import { aboutData } from '@/data/projects';
import { MapPin, Camera, Monitor, Briefcase, GraduationCap } from 'lucide-react';
import camProfile from '@/assets/cam-profile.jpg';

type NoteId = 'about' | 'services' | 'gear' | 'education';

interface Note {
  id: NoteId;
  title: string;
  preview: string;
  date: string;
}

const notes: Note[] = [
  { id: 'about', title: 'About Me', preview: "Hey, I'm Cam. I make cinematic video...", date: 'Today' },
  { id: 'services', title: 'Services', preview: 'Video Production, Editing, Photography...', date: 'Yesterday' },
  { id: 'gear', title: 'Gear & Software', preview: 'Panasonic Lumix S5IIX, Final Cut Pro...', date: 'Last week' },
  { id: 'education', title: 'Education', preview: 'Baylor University, Film & Digital Media', date: 'Last month' },
];

export function AboutWindow() {
  const [selectedNote, setSelectedNote] = useState<NoteId>('about');

  const renderNoteContent = () => {
    switch (selectedNote) {
      case 'about':
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-border/30">
                <img 
                  src={camProfile} 
                  alt="Cam Kaul" 
                  className="w-full h-full object-cover scale-150 object-[center_15%]"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{aboutData.name}</h1>
                <p className="text-muted-foreground">{aboutData.title}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {aboutData.location}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-foreground/90 leading-relaxed">{aboutData.bio}</p>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Services
            </h2>
            <div className="grid gap-2">
              {aboutData.services.map(s => (
                <div key={s} className="px-4 py-3 bg-muted/30 rounded-lg border border-border/30">
                  <span className="text-sm font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gear':
        return (
          <div className="space-y-6">
            {/* Gear */}
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5 text-primary" />
                Gear
              </h2>
              <div className="space-y-2">
                {aboutData.gear.map(item => (
                  <div key={item} className="px-4 py-2 bg-muted/30 rounded-lg border border-border/30 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Software */}
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-primary" />
                Software
              </h2>
              <div className="flex flex-wrap gap-2">
                {aboutData.software.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Familiar With</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {aboutData.familiar.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education
            </h2>
            <div className="px-4 py-4 bg-muted/30 rounded-lg border border-border/30">
              <p className="font-semibold">Baylor University</p>
              <p className="text-sm text-muted-foreground">Bachelor of Arts in Film & Digital Media</p>
              <p className="text-sm text-muted-foreground">Minor in Business Administration</p>
              <p className="text-xs text-muted-foreground mt-2">Waco, Texas</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full bg-[hsl(220,15%,8%)]">
      {/* Notes-style Left Column - Note List */}
      <div className="w-64 bg-[hsl(220,15%,10%)] border-r border-border/30 flex flex-col">
        {/* Search bar placeholder */}
        <div className="p-3 border-b border-border/30">
          <div className="px-3 py-1.5 bg-muted/30 rounded-md text-sm text-muted-foreground">
            Search Notes
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={`w-full text-left p-3 border-b border-border/20 transition-colors ${
                selectedNote === note.id 
                  ? 'bg-primary/20' 
                  : 'hover:bg-muted/30'
              }`}
            >
              <p className={`text-sm font-medium truncate ${
                selectedNote === note.id ? 'text-primary' : 'text-foreground'
              }`}>
                {note.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{note.date}</p>
              <p className="text-xs text-muted-foreground/70 truncate mt-1">{note.preview}</p>
            </button>
          ))}
        </div>

        {/* Notes count */}
        <div className="p-3 border-t border-border/30 text-center">
          <span className="text-xs text-muted-foreground">{notes.length} Notes</span>
        </div>
      </div>

      {/* Right Column - Note Content (paper-like) */}
      <div className="flex-1 flex flex-col">
        {/* Note header */}
        <div className="px-6 py-4 border-b border-border/30 bg-[hsl(220,15%,10%)]">
          <h1 className="text-lg font-semibold text-foreground">
            {notes.find(n => n.id === selectedNote)?.title}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {notes.find(n => n.id === selectedNote)?.date}
          </p>
        </div>

        {/* Note content - subtle paper feel */}
        <div 
          className="flex-1 overflow-auto custom-scrollbar p-6"
          style={{
            background: 'linear-gradient(180deg, hsl(220, 15%, 11%) 0%, hsl(220, 15%, 9%) 100%)',
          }}
        >
          {renderNoteContent()}
        </div>
      </div>
    </div>
  );
}
