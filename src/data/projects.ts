// ============================================
// PROJECT DATA FILE
// Edit this file to add, remove, or modify projects
// ============================================

export interface Project {
  id: string;
  title: string;
  category: 'brand' | 'weddings' | 'music' | 'social' | 'photo' | 'sports' | 'documentary' | 'events';
  collection?: string; // Group projects into folders
  year: number;
  description: string;
  longDescription: string;
  role: string;
  tools: string[];
  videoUrl?: string;
  thumbnailUrl: string;
  galleryUrls: string[];
  externalLinks?: {
    label: string;
    url: string;
  }[];
}

// Collection definitions for folder display
export const collections = {
  'dvlvd-murals': {
    name: 'DVLVD Murals',
    description: 'Documentary-style videos for DVLVD Murals',
    icon: '🎨',
  },
  'midway-football': {
    name: 'Midway Football',
    description: 'Hype videos and highlights for Midway High School Football',
    icon: '🏈',
  },
  'ato-greek-life': {
    name: 'ATO Greek Life',
    description: 'Fraternity recruitment and championship videos',
    icon: '🏛️',
  },
  'baylor-hockey': {
    name: 'Baylor Hockey',
    description: 'Highlight videos for Baylor University Hockey',
    icon: '🏒',
  },
  'allen-samuels': {
    name: 'Allen Samuels',
    description: 'Dealership promotional content',
    icon: '🚗',
    coverImage: '/thumbnails/allen-samuels-starting-lineup.jpg',
  },
};

// ============================================
// PROJECTS - Organized by collection
// ============================================
export const projects: Project[] = [
  // ============================================
  // DVLVD MURALS COLLECTION
  // ============================================
  {
    id: 'dvlvd-dr-pepper-mural',
    title: 'Dr. Pepper Mural',
    collection: 'dvlvd-murals',
    category: 'brand',
    year: 2024,
    description: 'DVLVD Murals documentary video for Dr. Pepper mural project',
    longDescription: 'Documentary-style video capturing the creation of a Dr. Pepper mural by DVLVD Murals, showcasing the artistic process and the final result in an urban setting.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/4788fea6356144ff8209e98c95116ccb',
    thumbnailUrl: '/thumbnails/dvlvd-dr-pepper-mural.jpg',
    galleryUrls: [],
  },
  {
    id: 'dvlvd-austin-parque-zaragoza',
    title: 'Austin Parque Zaragoza',
    collection: 'dvlvd-murals',
    category: 'brand',
    year: 2024,
    description: 'DVLVD Murals documentary video for Austin Parque Zaragoza project',
    longDescription: 'Documentary-style video capturing the creation of a large-scale ground mural at Parque Zaragoza in Austin by DVLVD Murals, featuring stunning aerial drone footage of the colorful traffic garden design.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/2a6cb8c50add4ff2a2078e56d0217d12',
    thumbnailUrl: '/thumbnails/dvlvd-austin-parque-zaragoza.jpg',
    galleryUrls: [],
  },
  {
    id: 'dvlvd-painting-frames',
    title: 'Painting Frames',
    collection: 'dvlvd-murals',
    category: 'brand',
    year: 2024,
    description: 'DVLVD Murals behind-the-scenes painting frames video',
    longDescription: 'Behind-the-scenes video showcasing the DVLVD Murals team at work in their studio, capturing the artistic process of creating and framing large-scale paintings.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/27fca03e032542a28b74c2ea1a1f70a0',
    thumbnailUrl: '/thumbnails/dvlvd-painting-frames.jpg',
    galleryUrls: [],
  },

  // ============================================
  // MIDWAY FOOTBALL COLLECTION
  // ============================================
  {
    id: 'midway-football-captains',
    title: 'Team Captains',
    collection: 'midway-football',
    category: 'sports',
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
    title: 'Hype Vid 1',
    collection: 'midway-football',
    category: 'sports',
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
    title: 'Hype Vid 2',
    collection: 'midway-football',
    category: 'sports',
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
    title: 'Hype Vid 3',
    collection: 'midway-football',
    category: 'sports',
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
    title: 'Hype Vid 4',
    collection: 'midway-football',
    category: 'sports',
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
    title: 'Hype Vid 5',
    collection: 'midway-football',
    category: 'sports',
    year: 2024,
    description: 'Midway Football hype video',
    longDescription: 'High-energy hype video for Midway Football, designed to pump up the team and fans before game day.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/7935f6b170b14a4785bed14273c1b746',
    thumbnailUrl: '/thumbnails/midway-fb-hype-5-v2.jpg',
    galleryUrls: [],
  },

  // ============================================
  // ATO GREEK LIFE COLLECTION
  // ============================================
  {
    id: 'ato-fb-champ-1',
    title: 'FB Championship 1',
    collection: 'ato-greek-life',
    category: 'sports',
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
    title: 'FB Championship 2',
    collection: 'ato-greek-life',
    category: 'sports',
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
    title: 'Rush Video 1',
    collection: 'ato-greek-life',
    category: 'brand',
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
    title: 'Rush Video 2',
    collection: 'ato-greek-life',
    category: 'brand',
    year: 2024,
    description: 'ATO fraternity rush recruitment video',
    longDescription: 'Second rush recruitment video for Alpha Tau Omega fraternity, showcasing the chapter\'s achievements and the bonds of brotherhood.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/181df640ebe642028fb40d2d6c489526',
    thumbnailUrl: '/thumbnails/rush-ato-2.jpg',
    galleryUrls: [],
  },

  // ============================================
  // BAYLOR HOCKEY COLLECTION
  // ============================================
  {
    id: 'baylor-hockey-1',
    title: 'Highlights 1',
    collection: 'baylor-hockey',
    category: 'sports',
    year: 2024,
    description: 'Baylor University hockey highlight video',
    longDescription: 'High-energy highlight video capturing the action and intensity of Baylor University hockey, showcasing the team\'s skills and competitive spirit on the ice.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/e5de1235906547a98898f072a2ae30c1',
    thumbnailUrl: '/thumbnails/baylor-hockey-1.jpg',
    galleryUrls: [],
  },
  {
    id: 'baylor-hockey-2',
    title: 'Highlights 2',
    collection: 'baylor-hockey',
    category: 'sports',
    year: 2024,
    description: 'Baylor University hockey highlight video',
    longDescription: 'Second highlight video capturing the excitement and celebration of Baylor University hockey, featuring the team\'s victories and fan energy at the arena.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/c1e45e0fac3a4a77b5d73dfaa54716fd',
    thumbnailUrl: '/thumbnails/baylor-hockey-2.jpg',
    galleryUrls: [],
  },

  // ============================================
  // ALLEN SAMUELS COLLECTION
  // ============================================
  {
    id: 'allen-samuels-bronco-reel',
    title: 'Bronco Reel',
    collection: 'allen-samuels',
    category: 'brand',
    year: 2024,
    description: 'Ford Bronco promotional reel for Allen Samuels dealership',
    longDescription: 'Cinematic promotional video showcasing a Ford Bronco for Allen Samuels Dodge Jeep Chrysler Ram dealership, featuring scenic outdoor shots highlighting the vehicle\'s rugged appeal.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/ea7ea52827134ab1b6639a7ad6957a8e',
    thumbnailUrl: '/thumbnails/allen-samuels-bronco-reel.jpg',
    galleryUrls: [],
  },
  {
    id: 'allen-samuels-starting-lineup',
    title: 'Starting Lineup',
    collection: 'allen-samuels',
    category: 'brand',
    year: 2024,
    description: 'Fun team video for Allen Samuels dealership staff',
    longDescription: 'Energetic and fun promotional video featuring the Allen Samuels dealership sales team in a football-themed starting lineup introduction, showcasing team spirit and personality.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/9321c697af2740ac902307e40185f615',
    thumbnailUrl: '/thumbnails/allen-samuels-starting-lineup.jpg',
    galleryUrls: [],
  },

  // ============================================
  // STANDALONE PROJECTS (No Collection)
  // ============================================
  {
    id: 'bolaji-lavish-music-video',
    title: 'Bōlají - Lavish',
    category: 'music',
    year: 2023,
    description: 'Official music video for Bōlají\'s "Lavish"',
    longDescription: 'Official music video for artist Bōlají\'s track "Lavish," featuring cinematic nighttime shots with a luxurious, ornate aesthetic that captures the song\'s rich, expensive vibe.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/b046ba275b704fde8efa373c5c0655b8',
    thumbnailUrl: '/thumbnails/bolaji-lavish-music-video.jpg',
    galleryUrls: [],
  },
  {
    id: 'reyna-reyes-real-estate',
    title: 'Reyna Reyes Real Estate',
    category: 'brand',
    year: 2024,
    description: 'Real estate property walkthrough video for Reyna Reyes',
    longDescription: 'Professional real estate walkthrough video for Reyna Reyes, showcasing a property\'s interior with smooth gimbal movement, highlighting the home\'s features and layout for potential buyers.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro', 'Zhiyun Crane Plus'],
    videoUrl: 'https://www.loom.com/embed/92e8750f5116442697a102ef10541f66',
    thumbnailUrl: '/thumbnails/reyna-reyes-real-estate.jpg',
    galleryUrls: [],
  },
  {
    id: 'india-short',
    title: 'India Short',
    category: 'documentary',
    year: 2024,
    description: 'Documentary short film from India',
    longDescription: 'Cinematic short documentary capturing intimate moments and community gatherings in India, featuring beautiful natural lighting and authentic cultural representation.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/291fcf1171d9496b98d9b919ba88cce3',
    thumbnailUrl: '/thumbnails/india-short.jpg',
    galleryUrls: [],
  },
  {
    id: 'clase-event-promo',
    title: 'Clase Event Promo',
    category: 'events',
    year: 2024,
    description: 'Clase event promotional video',
    longDescription: 'Promotional video for a Clase event, capturing the atmosphere and energy of the occasion.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/9d745ee20b844cb0ad078ecd38bcda99',
    thumbnailUrl: '/thumbnails/clase-event-promo.jpg',
    galleryUrls: [],
  },
  {
    id: 'alone-video-essay',
    title: 'Alone - Video Essay',
    category: 'documentary',
    year: 2024,
    description: 'Personal video essay exploring solitude and self-reflection',
    longDescription: 'A personal video essay exploring themes of solitude, self-reflection, and the human experience of being alone. Features thoughtful narration and cinematic visuals.',
    role: 'Writer, Director, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/a6f06f631fb344a3afb72136771629c3',
    thumbnailUrl: '/thumbnails/alone-video-essay.png',
    galleryUrls: [],
  },
  {
    id: 'movement-of-everything',
    title: 'The Movement of Everything - Video Essay',
    category: 'documentary',
    year: 2024,
    description: 'Video essay exploring motion and interconnectedness',
    longDescription: 'A contemplative video essay examining the constant motion that defines our world and the interconnectedness of all things. Features evocative imagery and philosophical narration.',
    role: 'Writer, Director, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/577ff1ea60da4fc0af39d491e7032d6f',
    thumbnailUrl: '/thumbnails/movement-of-everything.png',
    galleryUrls: [],
  },
  {
    id: 'allen-samuels-vertical-reel',
    title: 'Vertical Reel',
    collection: 'allen-samuels',
    category: 'brand',
    year: 2024,
    description: 'Vertical promotional reel for Allen Samuels dealership',
    longDescription: 'A vertical social media reel showcasing vehicles and dealership atmosphere at Allen Samuels, optimized for mobile-first platforms like Instagram and TikTok.',
    role: 'Videographer, Editor',
    tools: ['Panasonic Lumix S5IIX', 'Final Cut Pro'],
    videoUrl: 'https://www.loom.com/embed/0602d4579e774d26946d311539bf93c7',
    thumbnailUrl: '/thumbnails/allen-samuels-bronco-reel.jpg',
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
  bio: "I make cinematic video and design for brands and artists who care about taste. I handle direction, shooting, and editing, and I can carry a project from first idea to final deliverables. I'm always refining the craft, learning more, and pushing the work further.",
  services: [
    'Video Production',
    'Post Production and Editing',
    'Photography',
    'Graphic Design',
    'Campaign Content',
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
      galleryId: 'allen-samuels',
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
      companyUrl: 'https://www.collegebaseballfellowship.org/',
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
      galleryId: 'winnow-wealth',
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
    'Final Cut Pro', 'Adobe Premiere Pro', 'Adobe Photoshop', 'Adobe Illustrator',
    'Cinematography', 'Video Editing', 'Graphic Design', 'Social Media Strategy',
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
// CLIENT WORK GALLERIES (linked from Resume)
// ============================================
export interface ClientWorkItem {
  id: string;
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  type: 'banner' | 'social' | 'email' | 'poster' | 'ad' | 'video';
}

export interface ClientWork {
  clientId: string;
  clientName: string;
  description: string;
  items: ClientWorkItem[];
}

export const clientWorks: ClientWork[] = [
  {
    clientId: 'allen-samuels',
    clientName: 'Allen Samuels',
    description: 'Advertisements, graphics, and promotional materials created as Marketing Director',
    items: [
      { id: 'as-1', title: '4th of July Challengers', imageUrl: '/client-work/allen-samuels/4th-of-july-challengers.png', type: 'social' },
      { id: 'as-2', title: 'Ram 1500 Crew Cab Banner', imageUrl: '/client-work/allen-samuels/ram-1500-crew-cab-banner.png', type: 'banner' },
      { id: 'as-3', title: 'Jeep Grand Wagoneer Banner', imageUrl: '/client-work/allen-samuels/jeep-grand-wagoneer-banner.jpg', type: 'banner' },
      { id: 'as-4', title: 'Jeep Wrangler Rubicon Banner', imageUrl: '/client-work/allen-samuels/jeep-wrangler-rubicon-banner.jpg', type: 'banner' },
      { id: 'as-6', title: 'Ram 1500 Tradesman Banner', imageUrl: '/client-work/allen-samuels/ram-1500-tradesman-banner.jpg', type: 'banner' },
      { id: 'as-7', title: 'Pre-Owned Inventory Fall', imageUrl: '/client-work/allen-samuels/pre-owned-inventory-fall.png', type: 'social' },
      { id: 'as-8', title: 'Congratulations Graduates', imageUrl: '/client-work/allen-samuels/congratulations-graduates.jpg', type: 'social' },
      { id: 'as-9', title: 'Ram & Dodge APR Promo', imageUrl: '/client-work/allen-samuels/ram-dodge-apr-promo.jpg', type: 'social' },
      { id: 'as-10', title: 'Baylor Partnership Poster', imageUrl: '/client-work/allen-samuels/baylor-partnership-poster.png', type: 'poster' },
      { id: 'as-20', title: 'Mammoth Gala Flyer (Front)', imageUrl: '/client-work/allen-samuels/mammoth-gala-flyer-1.jpg', type: 'poster' },
      { id: 'as-21', title: 'Mammoth Gala Flyer (Back)', imageUrl: '/client-work/allen-samuels/mammoth-gala-flyer-2.jpg', type: 'poster' },
      { id: 'as-11', title: 'Memorial Day Email', imageUrl: '/client-work/allen-samuels/memorial-day-email.png', type: 'email' },
      { id: 'as-12', title: 'Jeep Cherokee Email', imageUrl: '/client-work/allen-samuels/jeep-cherokee-email.png', type: 'email' },
      { id: 'as-13', title: 'Blood Drive Promo', imageUrl: '/client-work/allen-samuels/blood-drive-promo.jpg', type: 'social' },
      { id: 'as-14', title: 'Trade Pending Banner', imageUrl: '/client-work/allen-samuels/trade-pending-banner.png', type: 'banner' },
      { id: 'as-15', title: 'Blood Drive Day Of', imageUrl: '/client-work/allen-samuels/blood-drive-day-of.jpg', type: 'social' },
      { id: 'as-16', title: 'Jeep 4xe Email', imageUrl: '/client-work/allen-samuels/jeep-4xe-email.jpg', type: 'email' },
      { id: 'as-17', title: 'Fall Email Blast', imageUrl: '/client-work/allen-samuels/fall-email-blast.jpg', type: 'email' },
      { id: 'as-18', title: 'Hiring Poster', imageUrl: '/client-work/allen-samuels/hiring-poster.jpg', type: 'poster' },
      { id: 'as-19', title: 'Sip & Spin Event', imageUrl: '/client-work/allen-samuels/sip-and-spin-event.jpg', type: 'social' },
      { id: 'as-v1', title: 'Dealership Promo 1', imageUrl: '/client-work/allen-samuels/dealership-promo-1.png', videoUrl: 'https://www.loom.com/embed/3050fdf098c042478817daca616b71b1', type: 'video' },
      { id: 'as-v2', title: 'Dealership Promo 2', imageUrl: '/client-work/allen-samuels/dealership-promo-2.png', videoUrl: 'https://www.loom.com/embed/3de2528259624153a78002a59f6b7d76', type: 'video' },
      { id: 'as-v3', title: 'Dealership Promo 3', imageUrl: '/client-work/allen-samuels/dealership-promo-3.png', videoUrl: 'https://www.loom.com/embed/b8734f15c37b436ebc79a37c54719f4e', type: 'video' },
      { id: 'as-v4', title: 'Dealership Promo 4', imageUrl: '/client-work/allen-samuels/dealership-promo-4.png', videoUrl: 'https://www.loom.com/embed/aaf7cbb0f04a40ae8fdb9bebe580bc65', type: 'video' },
    ],
  },
  {
    clientId: 'winnow-wealth',
    clientName: 'Winnow Wealth',
    description: 'Facebook ads and promotional materials for retirement workshops',
    items: [
      { id: 'ww-1', title: 'Retire Ready Banner 1', imageUrl: '/client-work/winnow-wealth/retire-ready-banner-1.jpg', type: 'ad' },
      { id: 'ww-2', title: 'Retire Ready Banner 2', imageUrl: '/client-work/winnow-wealth/retire-ready-banner-2.jpg', type: 'ad' },
      { id: 'ww-3', title: 'Retire Ready Banner 3', imageUrl: '/client-work/winnow-wealth/retire-ready-banner-3.jpg', type: 'ad' },
      { id: 'ww-4', title: 'Retire Ready Social 1', imageUrl: '/client-work/winnow-wealth/retire-ready-social-1.jpg', type: 'social' },
      { id: 'ww-5', title: 'Retire Ready Poster', imageUrl: '/client-work/winnow-wealth/retire-ready-poster.jpg', type: 'poster' },
      { id: 'ww-6', title: 'Retire Ready Social 2', imageUrl: '/client-work/winnow-wealth/retire-ready-social-2.jpg', type: 'social' },
      { id: 'ww-7', title: 'Retire Ready Social 3', imageUrl: '/client-work/winnow-wealth/retire-ready-social-3.jpg', type: 'social' },
      { id: 'ww-8', title: 'Retire Ready Social 4', imageUrl: '/client-work/winnow-wealth/retire-ready-social-4.jpg', type: 'social' },
    ],
  },
];

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
