import { useState } from 'react';
import { FileText, ChevronRight, Star, Clock, Folder, Download, File } from 'lucide-react';

// Finder-style sidebar items
const sidebarFavorites = [
  { id: 'recents', label: 'Recents', icon: Clock },
  { id: 'documents', label: 'Documents', icon: Folder },
];

// Documents in the file list
const documents = [
  { id: 'resume', name: 'Cam_Kaul_Resume.pdf', type: 'pdf', size: '124 KB', modified: 'Jan 15, 2026' },
];

export function ResumeWindow() {
  const [selectedDoc, setSelectedDoc] = useState<string>('resume');
  const [selectedSidebar, setSelectedSidebar] = useState<string>('documents');

  return (
    <div className="flex h-full bg-[#1c1c1e]">
      {/* Sidebar - Finder style */}
      <div className="w-44 flex-shrink-0 bg-[#2c2c2e]/60 border-r border-white/10 flex flex-col">
        {/* Favorites section */}
        <div className="p-2">
          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider px-2 mb-1">
            Favorites
          </div>
          {sidebarFavorites.map((item) => {
            const Icon = item.icon;
            const isActive = selectedSidebar === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSidebar(item.id)}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-sm transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-10 border-b border-white/10 flex items-center justify-between px-3 bg-[#2c2c2e]/40 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Folder className="w-4 h-4 text-blue-400" />
            <span>Documents</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-white">Resume</span>
          </div>
          <button 
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* File list and preview */}
        <div className="flex-1 flex min-h-0">
          {/* File list */}
          <div className="w-56 border-r border-white/10 overflow-auto bg-[#1c1c1e]">
            {/* Column headers */}
            <div className="sticky top-0 bg-[#2c2c2e]/80 backdrop-blur-sm border-b border-white/10 px-3 py-1.5 text-[10px] font-medium text-white/50 uppercase tracking-wider">
              Name
            </div>
            
            {/* Files */}
            <div className="p-1">
              {documents.map((doc) => {
                const isSelected = selectedDoc === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                      isSelected 
                        ? 'bg-blue-500/30 text-white' 
                        : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div className="w-8 h-10 bg-white rounded flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FileText className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium truncate">{doc.name}</div>
                      <div className="text-[10px] text-white/40">{doc.size}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview pane */}
          <div className="flex-1 bg-[#1c1c1e] overflow-auto p-6 flex flex-col items-center">
            {selectedDoc === 'resume' && (
              <div className="w-full max-w-lg">
                {/* Document preview card */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  {/* PDF header bar */}
                  <div className="h-8 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">Cam_Kaul_Resume.pdf</span>
                  </div>
                  
                  {/* Document content */}
                  <div className="p-6 text-gray-900">
                    {/* Header */}
                    <div className="border-b-2 border-gray-200 pb-3 mb-4">
                      <h1 className="text-xl font-bold tracking-tight">Cameron Kaul</h1>
                      <p className="text-xs text-gray-500 mt-1">
                        Waco, TX • camkaul@gmail.com • linkedin.com/in/cameronkaul
                      </p>
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                      <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Education
                      </h2>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-semibold">Baylor University</p>
                          <p className="text-xs text-gray-600">BBA Film & Digital Media</p>
                        </div>
                        <span className="text-xs text-gray-400">Dec 2025</span>
                      </div>
                    </div>

                    {/* Experience preview */}
                    <div className="mb-4">
                      <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Experience
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-semibold">Video Director & Editor</p>
                            <span className="text-xs text-gray-400">2022 - Present</span>
                          </div>
                          <p className="text-xs text-gray-600">Freelance</p>
                        </div>
                        <div>
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-semibold">Director of Content</p>
                            <span className="text-xs text-gray-400">2023 - 2024</span>
                          </div>
                          <p className="text-xs text-gray-600">Baylor Club Hockey</p>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-1">
                        {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinematography', 'Color Grading'].map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* File info below preview */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-white/40">PDF Document • 124 KB</p>
                  <p className="text-[10px] text-white/30 mt-0.5">Modified Jan 15, 2026</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}