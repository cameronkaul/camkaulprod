import { Mail, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import { resumeData, clientWorks } from '@/data/projects';
import { useWindows } from '@/contexts/WindowContext';

export function ResumeWindow() {
  const { openWindow } = useWindows();
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Minimal Docs-style Toolbar */}
      <div className="h-10 border-b border-gray-100 flex items-center px-4 bg-white flex-shrink-0">
        <span className="text-sm font-medium text-gray-700">Resume.pdf</span>
      </div>

      {/* Document Viewer Area - Pure white */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-white">
        {/* Paper Document */}
        <div className="w-full max-w-[700px] bg-white p-6 sm:p-10">
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{resumeData.name}</h1>
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
              <div>
                <p className="font-semibold text-gray-900">{resumeData.education.school}</p>
                <p className="text-sm text-gray-700">{resumeData.education.degree}</p>
                <p className="text-sm text-gray-600">{resumeData.education.major}</p>
                <p className="text-sm text-gray-500">GPA: {resumeData.education.gpa} · {resumeData.education.honors.join(', ')}</p>
              </div>
              <span className="text-sm text-gray-500 sm:whitespace-nowrap">{resumeData.education.graduation}</span>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-100 pb-1">
              Experience
            </h2>
            <div className="space-y-5">
              {resumeData.experience.map((job, idx) => {
                const hasGallery = 'galleryId' in job && clientWorks.some(c => c.clientId === (job as any).galleryId);
                
                return (
                  <div key={idx}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        <p className="font-semibold text-gray-900">{job.title}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {job.companyUrl ? (
                            <a
                              href={job.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {job.company}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-600">{job.company}</span>
                          )}
                          {hasGallery && (
                            <>
                              <span className="text-gray-300">·</span>
                              <button
                                onClick={() => openWindow('workGallery', undefined, (job as any).galleryId)}
                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                              >
                                View Design Work
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 sm:whitespace-nowrap">{job.dates}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {job.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
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
          <section className="grid sm:grid-cols-2 gap-6">
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