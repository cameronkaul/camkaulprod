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

export interface Reel {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
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
];

// ============================================
// REELS - Highlight videos for the Reels window
// ============================================
export const reels: Reel[] = [
  {
    id: 'reel-2024',
    title: '2024 Director Reel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'wedding-highlights',
    title: 'Wedding Highlights',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'brand-work',
    title: 'Brand Work Reel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'music-videos',
    title: 'Music Videos',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
  location: 'Austin, Texas',
  bio: `Hey, I'm Cam. I've been telling stories through video for over 8 years, working with brands, artists, and couples who want their moments captured with intention and artistry. Based in Austin, I bring a cinematic eye to every project, whether it's a 30-second social clip or a full brand documentary. Let's make something beautiful together.`,
  services: [
    'Video Production',
    'Post-Production & Editing',
    'Photography',
    'Branded Content',
    'Event Coverage',
    'Music Videos',
  ],
  gear: [
    { name: 'Sony FX6', type: 'Camera' },
    { name: 'Sony A7S III', type: 'Camera' },
    { name: 'Sony A7R V', type: 'Camera' },
    { name: 'DJI RS3 Pro', type: 'Stabilizer' },
    { name: 'DJI Mavic 3 Pro', type: 'Drone' },
    { name: 'Aputure 600d', type: 'Lighting' },
  ],
  software: [
    'DaVinci Resolve',
    'Premiere Pro',
    'After Effects',
    'Lightroom',
    'Capture One',
    'Final Cut Pro',
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
  email: 'hello@camkaul.com',
};
