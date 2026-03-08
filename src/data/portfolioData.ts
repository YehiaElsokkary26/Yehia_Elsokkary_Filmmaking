// ASSET LIST:
// - kazdura-1.jpg  → Kazdura Music Shoot — 1 (DSCF0997.jpg) — TEMP: user assets
// - kazdura-2.jpg  → Kazdura Music Shoot — 2 (DSCF1073.jpg) — TEMP: user assets
// - kazdura-3.jpg  → Kazdura Music Shoot — 3 (DSCF1134.jpg) — TEMP: user assets
// - kazdura-4.jpg  → Kazdura Music Shoot — 4 (DSCF1220.jpg) — TEMP: user assets
// - kazdura-5.jpg  → Kazdura Music Shoot — 5 (DSCF1245.jpg) — TEMP: user assets
// - kazdura-6.jpg  → Kazdura Music Shoot — 6 (DSCF1280.jpg) — TEMP: user assets
// - kazdura-7.jpg  → Kazdura Music Shoot — 7 (DSCF1282.jpg) — TEMP: user assets
// - kazdura-8.jpg  → Kazdura Music Shoot — 8 (DSCF1302.jpg) — TEMP: user assets
// - kazdura-9.jpg  → Kazdura Music Shoot — 9 (DSCF1308.jpg) — TEMP: user assets
// - kazdura-10.jpg → Kazdura Music Shoot — 10 (DSCF1396.jpg) — TEMP: user assets
// - people-of-moiz.mp4 → People of Moiz documentary — USER UPLOAD — do not regenerate

import kazdura1 from '@/assets/kazdura-1.jpg';
import kazdura2 from '@/assets/kazdura-2.jpg';
import kazdura3 from '@/assets/kazdura-3.jpg';
import kazdura4 from '@/assets/kazdura-4.jpg';
import kazdura5 from '@/assets/kazdura-5.jpg';
import kazdura6 from '@/assets/kazdura-6.jpg';
import kazdura7 from '@/assets/kazdura-7.jpg';
import kazdura8 from '@/assets/kazdura-8.jpg';
import kazdura9 from '@/assets/kazdura-9.jpg';
import kazdura10 from '@/assets/kazdura-10.jpg';

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

// Use Kazdura images as thumbnails for all photography categories
export const photographyCategories = [
  { slug: 'media-coverage', label: 'Media Coverage', thumbnail: kazdura2, description: 'Press, events & editorial coverage' },
  { slug: 'fashion', label: 'Fashion Photography', thumbnail: kazdura1, description: 'Editorial & high-fashion shoots' },
  { slug: 'street', label: 'Street Photography', thumbnail: kazdura8, description: 'Raw urban moments, candid life' },
] as const;

export const projects: ProjectEntry[] = [
  // Fashion — Kazdura Music Shoot
  {
    id: 'f-kazdura',
    title: 'Kazdura Music Shoot',
    year: '',
    role: 'Photographer',
    description: 'Kazdura are a band who visited Egypt seeking a fresh visual style. This shoot captures their new aesthetic and stage persona during a location session in Egypt.',
    tags: ['fashion', 'music', 'band'],
    media: [
      { type: 'image', src: kazdura1, caption: 'Kazdura Music Shoot — 1' },
      { type: 'image', src: kazdura2, caption: 'Kazdura Music Shoot — 2' },
      { type: 'image', src: kazdura3, caption: 'Kazdura Music Shoot — 3' },
      { type: 'image', src: kazdura4, caption: 'Kazdura Music Shoot — 4' },
      { type: 'image', src: kazdura5, caption: 'Kazdura Music Shoot — 5' },
      { type: 'image', src: kazdura6, caption: 'Kazdura Music Shoot — 6' },
      { type: 'image', src: kazdura7, caption: 'Kazdura Music Shoot — 7' },
      { type: 'image', src: kazdura8, caption: 'Kazdura Music Shoot — 8' },
      { type: 'image', src: kazdura9, caption: 'Kazdura Music Shoot — 9' },
      { type: 'image', src: kazdura10, caption: 'Kazdura Music Shoot — 10' },
    ],
    category: 'fashion',
  },
  // Media Coverage — reuse Kazdura images as placeholders
  {
    id: 'mc-1',
    title: 'Press Conference Series',
    year: '2025',
    role: 'Photographer',
    description: 'Behind-the-scenes press event coverage capturing the energy of live media.',
    tags: ['documentary', 'press', 'events'],
    media: [
      { type: 'image', src: kazdura10, caption: 'Press conference setup' },
      { type: 'image', src: kazdura9, caption: 'Event coverage' },
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
      { type: 'image', src: kazdura4, caption: 'Festival crowd' },
    ],
    category: 'media-coverage',
  },
  // Street — reuse Kazdura images as placeholders
  {
    id: 's-1',
    title: 'Neon & Rain',
    year: '2025',
    role: 'Photographer',
    description: 'Night street photography — neon reflections on wet pavement, urban energy.',
    tags: ['street', 'night', 'urban'],
    media: [
      { type: 'image', src: kazdura5, caption: 'Rainy night' },
      { type: 'image', src: kazdura6, caption: 'Light beam alley' },
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
      { type: 'image', src: kazdura7, caption: 'Alley silhouette' },
    ],
    category: 'street',
  },
  // Short Films
  {
    id: 'sf-dalal',
    title: 'Dalal',
    year: '',
    role: 'Filmmaker / Videographer',
    description: 'Dalal — short film (5:00). Preview compilation of key moments from the film.',
    tags: ['short-film', 'preview', 'snippets'],
    media: [
      { type: 'video', src: '/videos/dalal-preview.mp4', caption: 'Dalal — preview snippet' },
    ],
    category: 'short-films',
  },
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
    id: 'd-moiz',
    title: 'People of Moiz',
    year: '',
    role: 'Filmmaker / Videographer',
    description: 'A short series documenting people\'s lives in Khan al-Khalili, Cairo — intimate street portraits and daily moments.',
    tags: ['documentary', 'cairo', 'street', 'people', 'culture'],
    media: [
      { type: 'video', src: '/videos/people-of-moiz.mp4', caption: 'People of Moiz — USER UPLOAD' },
    ],
    category: 'documentaries',
  },
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

// Scattered polaroid images for homepage use
export const scatteredPolaroids = [
  { src: kazdura1, caption: 'Kazdura — guitar session', alt: 'Kazdura Music Shoot — image 1' },
  { src: kazdura3, caption: 'Kazdura — portrait', alt: 'Kazdura Music Shoot — image 3' },
  { src: kazdura4, caption: 'Kazdura — golden hour', alt: 'Kazdura Music Shoot — image 4' },
  { src: kazdura6, caption: 'Kazdura — duo', alt: 'Kazdura Music Shoot — image 6' },
  { src: kazdura8, caption: 'Kazdura — rooftop', alt: 'Kazdura Music Shoot — image 8' },
  { src: kazdura9, caption: 'Kazdura — back to back', alt: 'Kazdura Music Shoot — image 9' },
  { src: kazdura10, caption: 'Kazdura — close up', alt: 'Kazdura Music Shoot — image 10' },
];
