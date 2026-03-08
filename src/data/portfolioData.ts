// TEMP ASSET LIST:
// - placeholder-media-1.jpg (TEMP — replace with user images)
// - placeholder-media-2.jpg (TEMP — replace with user images)
// - placeholder-fashion-1.jpg (TEMP — replace with user images)
// - placeholder-fashion-2.jpg (TEMP — replace with user images)
// - placeholder-street-1.jpg (TEMP — replace with user images)
// - placeholder-street-2.jpg (TEMP — replace with user images)

import mediaImg1 from '@/assets/placeholder-media-1.jpg';
import mediaImg2 from '@/assets/placeholder-media-2.jpg';
import fashionImg1 from '@/assets/placeholder-fashion-1.jpg';
import fashionImg2 from '@/assets/placeholder-fashion-2.jpg';
import streetImg1 from '@/assets/placeholder-street-1.jpg';
import streetImg2 from '@/assets/placeholder-street-2.jpg';

export interface ProjectEntry {
  id: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  media: { type: 'image' | 'video'; src: string; caption?: string }[];
  category: 'media-coverage' | 'fashion' | 'street' | 'short-films' | 'documentaries';
}

export const photographyCategories = [
  { slug: 'media-coverage', label: 'Media Coverage', thumbnail: mediaImg1, description: 'Press, events & editorial coverage' },
  { slug: 'fashion', label: 'Fashion Photography', thumbnail: fashionImg1, description: 'Editorial & high-fashion shoots' },
  { slug: 'street', label: 'Street Photography', thumbnail: streetImg1, description: 'Raw urban moments, candid life' },
] as const;

export const projects: ProjectEntry[] = [
  // Media Coverage
  {
    id: 'mc-1',
    title: 'Press Conference Series',
    year: '2025',
    role: 'Photographer',
    description: 'Behind-the-scenes press event coverage capturing the energy of live media.',
    tags: ['documentary', 'press', 'events'],
    media: [
      { type: 'image', src: mediaImg1, caption: 'Press conference setup — TEMP' },
      { type: 'image', src: mediaImg2, caption: 'Event coverage — TEMP' },
    ],
    category: 'media-coverage',
  },
  {
    id: 'mc-2',
    title: 'Festival Coverage',
    year: '2024',
    role: 'Photographer',
    description: 'Golden hour festival moments — crowds, performers, and atmosphere.',
    tags: ['events', 'documentary'],
    media: [
      { type: 'image', src: mediaImg2, caption: 'Festival crowd — TEMP' },
    ],
    category: 'media-coverage',
  },
  // Fashion
  {
    id: 'f-1',
    title: 'Studio Noir',
    year: '2025',
    role: 'Photographer',
    description: 'Moody studio editorial with dramatic lighting and bold silhouettes.',
    tags: ['fashion', 'editorial', 'studio'],
    media: [
      { type: 'image', src: fashionImg1, caption: 'Studio editorial — TEMP' },
      { type: 'image', src: fashionImg2, caption: 'Rooftop fashion — TEMP' },
    ],
    category: 'fashion',
  },
  {
    id: 'f-2',
    title: 'Rooftop Sunset',
    year: '2024',
    role: 'Photographer',
    description: 'Golden hour fashion on a city rooftop — flowing fabrics and warm light.',
    tags: ['fashion', 'outdoor'],
    media: [
      { type: 'image', src: fashionImg2, caption: 'Sunset shoot — TEMP' },
    ],
    category: 'fashion',
  },
  // Street
  {
    id: 's-1',
    title: 'Neon & Rain',
    year: '2025',
    role: 'Photographer',
    description: 'Night street photography — neon reflections on wet pavement, urban energy.',
    tags: ['street', 'night', 'urban'],
    media: [
      { type: 'image', src: streetImg1, caption: 'Rainy night — TEMP' },
      { type: 'image', src: streetImg2, caption: 'Light beam alley — TEMP' },
    ],
    category: 'street',
  },
  {
    id: 's-2',
    title: 'Light & Shadow',
    year: '2024',
    role: 'Photographer',
    description: 'Film noir-inspired street scenes with dramatic natural light.',
    tags: ['street', 'noir'],
    media: [
      { type: 'image', src: streetImg2, caption: 'Alley silhouette — TEMP' },
    ],
    category: 'street',
  },
  // Short Films
  {
    id: 'sf-1',
    title: 'After Dark',
    year: '2024',
    role: 'Director / Videographer',
    description: 'A cinematic short exploring nightlife energy and neon-lit streets.',
    tags: ['short-film', 'cinematic', 'night'],
    media: [
      { type: 'video', src: '/videos/reel-3.mp4', caption: 'After Dark — short film' },
    ],
    category: 'short-films',
  },
  {
    id: 'sf-2',
    title: 'Euphoria',
    year: '2025',
    role: 'Director',
    description: 'A visual poem about youth, freedom, and fleeting moments.',
    tags: ['short-film', 'experimental'],
    media: [
      { type: 'video', src: '/videos/reel-1.mp4', caption: 'Euphoria — short film' },
    ],
    category: 'short-films',
  },
  // Documentaries
  {
    id: 'd-1',
    title: 'People of the City',
    year: '2025',
    role: 'Director / Videographer',
    description: 'Documenting everyday people, their stories, and the places they inhabit.',
    tags: ['documentary', 'people'],
    media: [
      { type: 'video', src: '/videos/reel-2.mp4', caption: 'People of the City' },
    ],
    category: 'documentaries',
  },
  {
    id: 'd-2',
    title: 'Hidden Corners',
    year: '2024',
    role: 'Director / Videographer',
    description: 'Exploring hidden spots and untold stories in urban landscapes.',
    tags: ['documentary', 'urban'],
    media: [
      { type: 'video', src: '/videos/reel-4.mp4', caption: 'Hidden Corners' },
    ],
    category: 'documentaries',
  },
];

export const getProjectsByCategory = (cat: ProjectEntry['category']) =>
  projects.filter((p) => p.category === cat);
