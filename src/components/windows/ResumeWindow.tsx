import { Download } from 'lucide-react';

export function ResumeWindow() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Cam Kaul</h1>
          <p className="text-muted-foreground">Videographer & Editor</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      <section>
        <h2 className="font-semibold border-b border-border pb-1 mb-3">Experience</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Freelance Videographer & Editor</p>
            <p className="text-sm text-muted-foreground">2019 - Present</p>
            <p className="text-sm mt-1">Full-service video production for brands, weddings, and artists. Over 100 projects delivered.</p>
          </div>
          <div>
            <p className="font-medium">Video Editor - Creative Agency</p>
            <p className="text-sm text-muted-foreground">2017 - 2019</p>
            <p className="text-sm mt-1">Edited commercial content for Fortune 500 clients including product launches and brand campaigns.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-semibold border-b border-border pb-1 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {['Cinematography', 'Color Grading', 'Motion Graphics', 'Sound Design', 'Drone Operation', 'Client Management'].map(s => (
            <span key={s} className="px-3 py-1 bg-muted rounded text-xs">{s}</span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold border-b border-border pb-1 mb-3">Education</h2>
        <div>
          <p className="font-medium">B.A. Film & Media Studies</p>
          <p className="text-sm text-muted-foreground">University of Texas at Austin, 2017</p>
        </div>
      </section>
    </div>
  );
}
