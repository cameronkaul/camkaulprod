// ============================================
// PROJECT DATA FILE
// Edit this file to add, remove, or modify projects
// ============================================

export interface Project {
  id: string;
  title: string;
  category: 'brand' | 'weddings' | 'music' | 'social' | 'photo' | 'other';
  year: number;
  description: string;
  longDescription: string;
  role: string;
  tools: string[];
  videoUrl?: string; // YouTube or Vimeo embed URL
  thumbnailUrl: string;
  galleryUrls: string[];
  externalLinks?: {
    label: string;
    url: string;
  }[];
}

// ============================================
// PROJECTS - Add your projects here
// ============================================
export const projects: Project[] = [
  // Loom thumbnail workflow (use this whenever we add new Loom videos):
  // 1) Copy VIDEO_ID from videoUrl (the part after "/embed/")
  // 2) Open https://www.loom.com/embed/VIDEO_ID
  // 3) Inspect the poster image URL (format: https://cdn.loom.com/sessions/thumbnails/VIDEO_ID-HASH.jpg)
  // 4) Use that exact CDN URL as thumbnailUrl (no query params - Loom CDN doesn't support them)
  {
    id: 'midway-football-captains',
    title: 'Midway Football Captains',
    category: 'other',
    year: 2024,
    description: 'Midway Football team captains highlight video',
    longDescription: 'A highlight video showcasing the Midway Football team captains. Captured the leadership, dedication, and team spirit of the captains both on and off the field.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/82084a8f09c4453580927e390018628c',
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/82084a8f09c4453580927e390018628c-9989a7b9ff8aa4e4.jpg',
    galleryUrls: [],
  },
  {
    id: 'midway-fb-hype-1',
    title: 'Midway FB Hype Vid 1',
    category: 'other',
    year: 2024,
    description: 'Midway Football hype video',
    longDescription: 'High-energy hype video for Midway Football, designed to pump up the team and fans before game day.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/6312d86d70ab446993b828c402f1f9e2',
    thumbnailUrl: '/thumbnails/midway-fb-hype-1.jpg',
    galleryUrls: [],
  },
  {
    id: 'midway-fb-hype-2',
    title: 'Midway FB Hype Vid 2',
    category: 'other',
    year: 2024,
    description: 'Midway Football hype video',
    longDescription: 'High-energy hype video for Midway Football, designed to pump up the team and fans before game day.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/c72caeaeb0384b8ea69e3159918b76ba',
    thumbnailUrl: '/thumbnails/midway-fb-hype-2.jpg',
    galleryUrls: [],
  },
  {
    id: 'midway-fb-hype-3',
    title: 'Midway FB Hype Vid 3',
    category: 'other',
    year: 2024,
    description: 'Midway Football hype video',
    longDescription: 'High-energy hype video for Midway Football, designed to pump up the team and fans before game day.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/fefc325627364a40826b7b2165ba9c38',
    thumbnailUrl: '/thumbnails/midway-fb-hype-3.jpg',
    galleryUrls: [],
  },
  {
    id: 'midway-fb-hype-4',
    title: 'Midway FB Hype Vid 4',
    category: 'other',
    year: 2024,
    description: 'Midway Football hype video',
    longDescription: 'High-energy hype video for Midway Football, designed to pump up the team and fans before game day.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/8a3275fdc3fa4f4dbcaa6284dcda4de1',
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/8a3275fdc3fa4f4dbcaa6284dcda4de1-407e6fdf920cac2e.jpg',
    galleryUrls: [],
  },
  {
    id: 'midway-fb-hype-5',
    title: 'Midway FB Hype Vid 5',
    category: 'other',
    year: 2024,
    description: 'Midway Football hype video',
    longDescription: 'High-energy hype video for Midway Football, designed to pump up the team and fans before game day.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/7935f6b170b14a4785bed14273c1b746',
    thumbnailUrl: '/thumbnails/midway-fb-hype-5-v2.jpg',
    galleryUrls: [],
  },
  {
    id: 'ato-fb-champ-1',
    title: 'ATO FB Champ 1',
    category: 'other',
    year: 2024,
    description: 'ATO vs KOT fraternity flag football championship video',
    longDescription: 'Exciting fraternity flag football championship game coverage featuring ATO vs KOT. Captured the intensity and brotherhood on the field.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/0b4dcebc6225432fab45da628da79ecd',
    thumbnailUrl: '/thumbnails/ato-fb-champ-1.jpg',
    galleryUrls: [],
  },
  {
    id: 'ato-fb-champ-2',
    title: 'ATO FB Champ 2',
    category: 'other',
    year: 2024,
    description: 'ATO fraternity flag football championship video',
    longDescription: 'Part two of the fraternity flag football championship coverage, showcasing ATO\'s competitive spirit and team dynamics.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/885b68b426d8444e84ac5fd275f7c1fe',
    thumbnailUrl: '/thumbnails/ato-fb-champ-2-v2.jpg',
    galleryUrls: [],
  },
  {
    id: 'rush-ato-lr',
    title: 'Rush ATO L&R',
    category: 'other',
    year: 2024,
    description: 'ATO fraternity rush recruitment video',
    longDescription: 'Rush recruitment video for Alpha Tau Omega fraternity, highlighting the brotherhood, values, and unity of great men.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/d97bf6262f47420d99eb547606cc93ef',
    thumbnailUrl: '/thumbnails/rush-ato.jpg',
    galleryUrls: [],
  },
  {
    id: 'rush-ato-2-lr',
    title: 'Rush ATO 2 L&R',
    category: 'other',
    year: 2024,
    description: 'ATO fraternity rush recruitment video',
    longDescription: 'Second rush recruitment video for Alpha Tau Omega fraternity, showcasing the chapter\'s achievements and the bonds of brotherhood.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/181df640ebe642028fb40d2d6c489526',
    thumbnailUrl: '/thumbnails/rush-ato-2.jpg',
    galleryUrls: [],
  },
];

// ============================================
// DELETED SCENES - Fun bloopers/extras for Trash
// ============================================
export const deletedScenes = [
  {
    id: 'blooper-1',
    title: 'Drone Almost Crashes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'blooper-2',
    title: 'Audio Fail Compilation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

// ============================================
// ABOUT DATA
// ============================================
export const aboutData = {
  name: 'Cam Kaul',
  title: 'Videographer & Editor',
  location: 'Waco, Texas',
  bio: "Hey, I'm Cam. I make cinematic video for brands and artists who care about taste. I can handle the full process, concept to shoot to edit, or jump in wherever you need help, content, campaigns, socials, design, whatever moves the project forward.",
  services: [
    'Video Production',
    'Post-Production & Editing',
    'Photography',
    'Branded Content',
    'Event Coverage',
    'Music Videos',
  ],
  gear: [
    'Panasonic Lumix S5IIX',
    'Panasonic Lumix 50mm f/1.8',
    'Panasonic Lumix 20-60mm f/3.5-5.6',
    'Panasonic Lumix G7',
    'Rode Wireless GO',
    'Rode VideoMic GO',
    'Zhiyun Crane Plus 3-Axis Gimbal',
    'Portable softbox light',
    'Compact flash',
  ],
  software: [
    'Final Cut Pro',
    'Adobe Premiere Pro',
    'Adobe Lightroom',
    'Adobe Photoshop',
    'Adobe Illustrator',
  ],
  familiar: [
    'After Effects',
    'Apple Motion',
    'Logic Pro',
  ],
};

// ============================================
// RESUME DATA
// ============================================
export const resumeData = {
  name: 'Cameron J. Kaul',
  contact: {
    location: 'Waco, TX',
    email: 'cameronkaul12@gmail.com',
    phone: '(254) 651-8325',
    linkedin: 'linkedin.com/in/camkaul',
  },
  education: {
    school: 'Baylor University',
    location: 'Waco, Texas',
    degree: 'Bachelor of Business Administration',
    major: 'Marketing / Entrepreneurship and Corporate Innovation',
    gpa: '3.49',
    graduation: 'May 2025',
    honors: ['Dean\'s List: Fall 2023, Fall 2024'],
  },
  experience: [
    {
      title: 'Marketing Director',
      company: 'Allen Samuels Dodge Jeep Chrysler Ram Fiat',
      dates: 'May 2024 – August 2025',
      bullets: [
        'Revitalized social media by increasing organic reach to 110,000+ on Facebook and 12,000+ accounts on Instagram.',
        'Drove 800,000+ impressions through SEO and targeted advertising campaigns on Google and Microsoft platforms.',
        'Supported a $40,000 monthly marketing effort budget across sponsorships, campaigns, and promotional events.',
        'Created wide range of visual assets for internal and external use including advertisements, graphics, and video.',
      ],
    },
    {
      title: 'Website Designer',
      company: 'College Baseball Fellowship',
      dates: 'March 2025',
      bullets: [
        'Transformed the nonprofit\'s website into a modern responsive platform aligned with CBF\'s mission.',
        'Integrated donation capabilities and streamlined navigation to improve supporter engagement.',
        'Directed all creative elements of the site; layout, design, and graphics to deliver a unified brand experience.',
      ],
    },
    {
      title: 'Marketing Consultant',
      company: 'Winnow Wealth Financial Management',
      dates: 'Aug 2024 – December 2024',
      bullets: [
        'Developed and launched 10 targeted Facebook ads, generating >110 conversions and >170 event registrations.',
        'Collaborated with the team to optimize audience targeting, increasing ad momentum and efficiency.',
        'Reduced advertising costs while maximizing lead generation.',
      ],
    },
    {
      title: 'Marketing Intern',
      company: 'Charity Champions',
      dates: 'September 2023 – May 2024',
      bullets: [
        'Partnered with local non-profits to develop targeted, data-driven marketing strategies.',
        'Leveraged end-to-end video production skills to create promotional videos, including filming, editing, and delivery.',
      ],
    },
  ],
  skills: [
    'Adobe Photoshop', 'Adobe Premiere', 'Adobe Illustrator', 'Final Cut Pro',
    'Cinematography', 'Video Editing', 'Graphic Design', 'Social Media Marketing',
  ],
  certifications: [
    'Microsoft Office Specialist: Excel 2019 Associate',
    'Google Ads Search Certified',
  ],
  honors: [
    'Eagle Scout – National Life Saving Medal of Honor',
    'Business Professionals of America – President, 2nd place individual & 3rd place team nationals',
  ],
};

// ============================================
// SOCIAL LINKS
// ============================================
export const socialLinks = {
  instagram: 'https://instagram.com/camkaul',
  youtube: 'https://youtube.com/@camkaul',
  vimeo: 'https://vimeo.com/camkaul',
  tiktok: 'https://tiktok.com/@camkaul',
  email: 'cameronkaul12@gmail.com',
};
