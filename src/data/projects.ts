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
  {
    id: 'aurora-brand-film',
    title: 'Aurora Brand Film',
    category: 'brand',
    year: 2024,
    description: 'Cinematic brand story for a luxury wellness startup',
    longDescription: 'Partnered with Aurora Wellness to create their flagship brand film. The project involved capturing the essence of their holistic approach to health through sweeping visuals of their retreat locations, intimate moments with practitioners, and testimonials from transformed clients. Shot over 5 days across three locations in Texas Hill Country.',
    role: 'Director, DP, Editor',
    tools: ['Sony FX6', 'DaVinci Resolve', 'After Effects'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    ],
    externalLinks: [
      { label: 'Watch Full Film', url: '#' },
      { label: 'Case Study', url: '#' },
    ],
  },
  {
    id: 'sarah-james-wedding',
    title: 'Sarah & James',
    category: 'weddings',
    year: 2024,
    description: 'Intimate hill country wedding celebration',
    longDescription: 'An intimate celebration at a private estate in Fredericksburg. The couple wanted a film that felt like a memory, soft and romantic with an emphasis on the small, genuine moments. Delivered a 12-minute feature film and a 90-second social edit.',
    role: 'Lead Videographer, Editor',
    tools: ['Sony A7S III', 'DJI RS3', 'Premiere Pro'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    ],
  },
  {
    id: 'midnight-waves-mv',
    title: 'Midnight Waves MV',
    category: 'music',
    year: 2023,
    description: 'Music video for indie artist Luna Pier',
    longDescription: 'Directed and shot this moody, atmospheric music video for rising indie artist Luna Pier. The concept revolved around dreams and water imagery, requiring extensive pre-production planning for underwater sequences. The video premiered on YouTube and reached 500K views in the first month.',
    role: 'Director, DP',
    tools: ['RED Komodo', 'Nauticam Housing', 'DaVinci Resolve'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    ],
    externalLinks: [
      { label: 'Watch on YouTube', url: '#' },
    ],
  },
  {
    id: 'austin-eats-series',
    title: 'Austin Eats Series',
    category: 'social',
    year: 2024,
    description: 'Viral food content series for local restaurants',
    longDescription: 'Created a series of 15 and 30-second videos for local Austin restaurants, optimized for TikTok and Instagram Reels. The series generated over 2M combined views and helped drive significant foot traffic to participating venues.',
    role: 'Creator, Editor',
    tools: ['iPhone 15 Pro', 'DJI Mic', 'CapCut Pro'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
  },
  {
    id: 'portrait-session-maya',
    title: 'Maya - Portrait Session',
    category: 'photo',
    year: 2023,
    description: 'Natural light portrait photography',
    longDescription: 'A golden hour portrait session in East Austin. Focused on capturing authentic expressions and movement with a warm, film-inspired color grade. Final delivery included 45 retouched images.',
    role: 'Photographer, Retoucher',
    tools: ['Sony A7R V', 'Lightroom', 'Capture One'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    ],
  },
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
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/6312d86d70ab446993b828c402f1f9e2-1b3422ea45e8d812.jpg',
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
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/c72caeaeb0384b8ea69e3159918b76ba-0ac067445bbc2e36.jpg',
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
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/fefc325627364a40826b7b2165ba9c38-0c41511c2bf6eec0.jpg',
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
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/7935f6b170b14a4785bed14273c1b746-291762084ac08ddb.jpg',
    galleryUrls: [],
  },
  {
    id: 'tech-summit-2024',
    title: 'Tech Summit 2024',
    category: 'other',
    year: 2024,
    description: 'Event coverage and recap video',
    longDescription: 'Full event coverage for Austin Tech Summit, including keynote recordings, attendee interviews, and a 3-minute recap video for social media. Managed a team of 3 camera operators over 2 days.',
    role: 'Lead Producer, Editor',
    tools: ['Sony FX3', 'Blackmagic ATEM', 'Premiere Pro'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    ],
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
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/0b4dcebc6225432fab45da628da79ecd-b01feaf5ef329b0d.jpg',
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
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/885b68b426d8444e84ac5fd275f7c1fe-bb92886ac6893291.jpg',
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
    thumbnailUrl: 'https://cdn.loom.com/sessions/thumbnails/d97bf6262f47420d99eb547606cc93ef-de7a704030186f3f.jpg',
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
