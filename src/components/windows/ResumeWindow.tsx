import { Mail, MapPin, Linkedin, Download, ExternalLink } from 'lucide-react';
import { resumeData } from '@/data/projects';

export function ResumeWindow() {
  const handleDownload = () => {
    // Create a simple text resume for download (in real app, would be PDF)
    const text = `
${resumeData.name}
${resumeData.contact.location} | ${resumeData.contact.email}

EDUCATION
${resumeData.education.school}
${resumeData.education.degree} - ${resumeData.education.major}
GPA: ${resumeData.education.gpa} | ${resumeData.education.graduation}

EXPERIENCE
${resumeData.experience.map(job => `
${job.title} | ${job.company}
${job.dates}
${job.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

SKILLS
${resumeData.skills.join(', ')}
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CamKaul_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-[hsl(220,15%,8%)]">
      {/* Docs-style Toolbar */}
      <div className="h-12 border-b border-border/30 flex items-center justify-between px-4 bg-[hsl(220,15%,10%)]">
        {/* Left: Document title */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Resume.pdf</span>
          <span className="text-xs text-muted-foreground">Cameron Kaul</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <a
            href={`https://${resumeData.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 text-foreground rounded-md transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </div>

      {/* Document Viewer Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center bg-[hsl(220,15%,6%)]">
        {/* Paper Document */}
        <div 
          className="w-full max-w-[700px] min-h-[900px] bg-white shadow-2xl rounded-sm p-10"
          style={{
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{resumeData.name}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" /> {resumeData.contact.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-gray-400" /> {resumeData.contact.email}
              </span>
              <a 
                href={`https://${resumeData.contact.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-100 pb-1">
              Education
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{resumeData.education.school}</p>
                <p className="text-sm text-gray-700">{resumeData.education.degree}</p>
                <p className="text-sm text-gray-600">{resumeData.education.major}</p>
                <p className="text-sm text-gray-500">GPA: {resumeData.education.gpa} · {resumeData.education.honors.join(', ')}</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">{resumeData.education.graduation}</span>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-100 pb-1">
              Experience
            </h2>
            <div className="space-y-5">
              {resumeData.experience.map((job, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{job.dates}</span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {job.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-100 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Honors & Certifications */}
          <section className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-100 pb-1">
                Honors
              </h2>
              <ul className="space-y-1">
                {resumeData.honors.map((honor, idx) => (
                  <li key={idx} className="text-sm text-gray-700">{honor}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-100 pb-1">
                Certifications
              </h2>
              <ul className="space-y-1">
                {resumeData.certifications.map((cert, idx) => (
                  <li key={idx} className="text-sm text-gray-700">{cert}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
