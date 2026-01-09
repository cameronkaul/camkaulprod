import { Download, Mail, MapPin, Linkedin } from 'lucide-react';
import { resumeData } from '@/data/projects';

export function ResumeWindow() {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{resumeData.name}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {resumeData.contact.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> {resumeData.contact.email}
            </span>
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" /> {resumeData.contact.linkedin}
            </span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" /> PDF
        </button>
      </div>

      {/* Education */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Education</h2>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{resumeData.education.school}</p>
            <p className="text-sm">{resumeData.education.degree}</p>
            <p className="text-sm text-muted-foreground">{resumeData.education.major}</p>
            <p className="text-sm text-muted-foreground">GPA: {resumeData.education.gpa} · {resumeData.education.honors.join(', ')}</p>
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{resumeData.education.graduation}</span>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Experience</h2>
        <div className="space-y-5">
          {resumeData.experience.map((job, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">{job.dates}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {job.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-sm text-foreground/80 pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-muted-foreground">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-muted rounded-full text-xs">{skill}</span>
          ))}
        </div>
      </section>

      {/* Honors & Certifications */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Honors</h2>
          <ul className="space-y-1">
            {resumeData.honors.map((honor, idx) => (
              <li key={idx} className="text-sm text-foreground/80">{honor}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Certifications</h2>
          <ul className="space-y-1">
            {resumeData.certifications.map((cert, idx) => (
              <li key={idx} className="text-sm text-foreground/80">{cert}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
