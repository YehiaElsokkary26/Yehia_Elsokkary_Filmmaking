// ASSET LIST:
// - kazdura-1.jpg to kazdura-10.jpg → Kazdura Music Shoot — USER UPLOAD
// - rani-1.jpg to rani-10.jpg → Rani Shoot — USER UPLOAD
// - ahmad-1.jpg to ahmad-10.jpg → Ahmad Dawood Moez Shoot — USER UPLOAD
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

import rani1 from '@/assets/rani-1.jpg';
import rani2 from '@/assets/rani-2.jpg';
import rani3 from '@/assets/rani-3.jpg';
import rani4 from '@/assets/rani-4.jpg';
import rani5 from '@/assets/rani-5.jpg';
import rani6 from '@/assets/rani-6.jpg';
import rani7 from '@/assets/rani-7.jpg';
import rani8 from '@/assets/rani-8.jpg';
import rani9 from '@/assets/rani-9.jpg';
import rani10 from '@/assets/rani-10.jpg';

import ahmad1 from '@/assets/ahmad-1.jpg';
import ahmad2 from '@/assets/ahmad-2.jpg';
import ahmad3 from '@/assets/ahmad-3.jpg';
import ahmad4 from '@/assets/ahmad-4.jpg';
import ahmad5 from '@/assets/ahmad-5.jpg';
import ahmad6 from '@/assets/ahmad-6.jpg';
import ahmad7 from '@/assets/ahmad-7.jpg';
import ahmad8 from '@/assets/ahmad-8.jpg';
import ahmad9 from '@/assets/ahmad-9.jpg';
import ahmad10 from '@/assets/ahmad-10.jpg';

export interface ProjectEntry {
  id: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  media: { type: 'image' | 'video'; src: string; caption?: string }[];
  category: 'studio' | 'fashion' | 'street' | 'short-films' | 'documentaries';
}

export const photographyCategories = [
  { slug: 'studio', label: 'Studio', thumbnail: kazdura2, description: 'Studio sessions & editorial coverage' },
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
  // Fashion — Rani Shoot
  {
    id: 'f-rani',
    title: 'Rani Shoot',
    year: '',
    role: 'Photographer',
    description: 'A fashion editorial shot in rural Egypt — capturing timeless elegance against rustic landscapes, fields, and the Nile.',
    tags: ['fashion', 'editorial', 'portrait'],
    media: [
      { type: 'image', src: rani1, caption: 'Rani Shoot — 1' },
      { type: 'image', src: rani2, caption: 'Rani Shoot — 2' },
      { type: 'image', src: rani3, caption: 'Rani Shoot — 3' },
      { type: 'image', src: rani4, caption: 'Rani Shoot — 4' },
      { type: 'image', src: rani5, caption: 'Rani Shoot — 5' },
      { type: 'image', src: rani6, caption: 'Rani Shoot — 6' },
      { type: 'image', src: rani7, caption: 'Rani Shoot — 7' },
      { type: 'image', src: rani8, caption: 'Rani Shoot — 8' },
      { type: 'image', src: rani9, caption: 'Rani Shoot — 9' },
      { type: 'image', src: rani10, caption: 'Rani Shoot — 10' },
    ],
    category: 'fashion',
  },
  // Fashion — Ahmad Dawood Moez Shoot
  {
    id: 'f-ahmad',
    title: 'Ahmad Dawood Moez Shoot',
    year: '',
    role: 'Photographer',
    description: 'A cinematic portrait series shot across Old Cairo — blending classic tailoring with gritty urban textures, Vespa reds, and golden-hour light.',
    tags: ['fashion', 'portrait', 'editorial', 'cairo'],
    media: [
      { type: 'image', src: ahmad1, caption: 'Ahmad Dawood Moez — 1' },
      { type: 'image', src: ahmad2, caption: 'Ahmad Dawood Moez — 2' },
      { type: 'image', src: ahmad3, caption: 'Ahmad Dawood Moez — 3' },
      { type: 'image', src: ahmad4, caption: 'Ahmad Dawood Moez — 4' },
      { type: 'image', src: ahmad5, caption: 'Ahmad Dawood Moez — 5' },
      { type: 'image', src: ahmad6, caption: 'Ahmad Dawood Moez — 6' },
      { type: 'image', src: ahmad7, caption: 'Ahmad Dawood Moez — 7' },
      { type: 'image', src: ahmad8, caption: 'Ahmad Dawood Moez — 8' },
      { type: 'image', src: ahmad9, caption: 'Ahmad Dawood Moez — 9' },
      { type: 'image', src: ahmad10, caption: 'Ahmad Dawood Moez — 10' },
    ],
    category: 'fashion',
  },
  // Fashion — Novel Wear (placeholder images — replace when real ones uploaded)
  {
    id: 'f-novel-wear',
    title: 'Novel Wear Project',
    year: '',
    role: 'Photographer / Creative Director',
    description: 'Editorial / studio campaign for Novel Wear — creative direction & fashion stills. Modern silhouettes meet bold studio lighting.',
    tags: ['fashion', 'studio', 'editorial', 'campaign'],
    media: [
      { type: 'image', src: kazdura3, caption: 'Novel Wear — look 1' },
      { type: 'image', src: kazdura5, caption: 'Novel Wear — look 2' },
      { type: 'image', src: kazdura7, caption: 'Novel Wear — look 3' },
    ],
    category: 'fashion',
  },
  // Studio (formerly Media Coverage)
  {
    id: 'st-1',
    title: 'Press Conference Series',
    year: '2025',
    role: 'Photographer',
    description: 'Behind-the-scenes press event coverage capturing the energy of live media.',
    tags: ['documentary', 'press', 'events'],
    media: [
      { type: 'image', src: kazdura10, caption: 'Press conference setup' },
      { type: 'image', src: kazdura9, caption: 'Event coverage' },
    ],
    category: 'studio',
  },
  {
    id: 'st-2',
    title: 'Festival Coverage',
    year: '2024',
    role: 'Photographer',
    description: 'Golden hour festival moments — crowds, performers, and atmosphere.',
    tags: ['events', 'documentary'],
    media: [
      { type: 'image', src: kazdura4, caption: 'Festival crowd' },
    ],
    category: 'studio',
  },
  // Studio — Novel Wear (also appears in fashion)
  {
    id: 'st-novel-wear',
    title: 'Novel Wear Project',
    year: '',
    role: 'Photographer / Creative Director',
    description: 'Novel Wear — studio editorial exploring modern silhouettes. Photographed & directed by Yehia Elsokkary.',
    tags: ['studio', 'fashion', 'editorial', 'campaign'],
    media: [
      { type: 'image', src: kazdura3, caption: 'Novel Wear — look 1' },
      { type: 'image', src: kazdura5, caption: 'Novel Wear — look 2' },
      { type: 'image', src: kazdura7, caption: 'Novel Wear — look 3' },
    ],
    category: 'studio',
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
  // Documentaries — only People of Moiz
  {
    id: 'd-moiz',
    title: 'People of Moiz',
    year: '',
    role: 'Filmmaker / Videographer',
    description: 'A short documentary series capturing the daily lives, stories, and spirit of the people in Khan al-Khalili, Cairo — one of the oldest and most vibrant markets in the Middle East. Intimate street portraits meet ambient sound design.',
    tags: ['documentary', 'cairo', 'street', 'people', 'culture'],
    media: [
      { type: 'video', src: '/videos/people-of-moiz.mp4', caption: 'People of Moiz — USER UPLOAD' },
    ],
    category: 'documentaries',
  },
];

export const getProjectsByCategory = (cat: ProjectEntry['category']) =>
  projects.filter((p) => p.category === cat);

// Scattered polaroid images for homepage use — USER UPLOADS
// Each entry includes projectId so clicks navigate to the correct project
export const scatteredPolaroids = [
  { src: kazdura1, caption: 'Kazdura — guitar session', alt: 'Kazdura Music Shoot — image 1', projectId: 'f-kazdura' },
  { src: kazdura3, caption: 'Kazdura — portrait', alt: 'Kazdura Music Shoot — image 3', projectId: 'f-kazdura' },
  { src: kazdura4, caption: 'Kazdura — golden hour', alt: 'Kazdura Music Shoot — image 4', projectId: 'f-kazdura' },
  { src: kazdura6, caption: 'Kazdura — duo', alt: 'Kazdura Music Shoot — image 6', projectId: 'f-kazdura' },
  { src: kazdura8, caption: 'Kazdura — rooftop', alt: 'Kazdura Music Shoot — image 8', projectId: 'f-kazdura' },
  { src: kazdura9, caption: 'Kazdura — back to back', alt: 'Kazdura Music Shoot — image 9', projectId: 'f-kazdura' },
  { src: kazdura10, caption: 'Kazdura — close up', alt: 'Kazdura Music Shoot — image 10', projectId: 'f-kazdura' },
  { src: rani1, caption: 'Rani — hay bales', alt: 'Rani Shoot — image 1', projectId: 'f-rani' },
  { src: rani2, caption: 'Rani — church', alt: 'Rani Shoot — image 2', projectId: 'f-rani' },
  { src: rani3, caption: 'Rani — barn', alt: 'Rani Shoot — image 3', projectId: 'f-rani' },
  { src: rani4, caption: 'Rani — adobe wall', alt: 'Rani Shoot — image 4', projectId: 'f-rani' },
  { src: rani5, caption: 'Rani — boat', alt: 'Rani Shoot — image 5', projectId: 'f-rani' },
  { src: rani6, caption: 'Rani — field', alt: 'Rani Shoot — image 6', projectId: 'f-rani' },
  { src: rani7, caption: 'Rani — tall grass', alt: 'Rani Shoot — image 7', projectId: 'f-rani' },
  { src: rani8, caption: 'Rani — ruins', alt: 'Rani Shoot — image 8', projectId: 'f-rani' },
  { src: rani9, caption: 'Rani — brick wall', alt: 'Rani Shoot — image 9', projectId: 'f-rani' },
  { src: rani10, caption: 'Rani — Nile', alt: 'Rani Shoot — image 10', projectId: 'f-rani' },
  // Ahmad Dawood Moez
  { src: ahmad1, caption: 'Ahmad — leaves', alt: 'Ahmad Dawood Moez — image 1', projectId: 'f-ahmad' },
  { src: ahmad2, caption: 'Ahmad — close-up', alt: 'Ahmad Dawood Moez — image 2', projectId: 'f-ahmad' },
  { src: ahmad3, caption: 'Ahmad — red door', alt: 'Ahmad Dawood Moez — image 3', projectId: 'f-ahmad' },
  { src: ahmad4, caption: 'Ahmad — Vespa', alt: 'Ahmad Dawood Moez — image 4', projectId: 'f-ahmad' },
  { src: ahmad5, caption: 'Ahmad — stone wall', alt: 'Ahmad Dawood Moez — image 5', projectId: 'f-ahmad' },
  { src: ahmad6, caption: 'Ahmad — iron fence', alt: 'Ahmad Dawood Moez — image 6', projectId: 'f-ahmad' },
  { src: ahmad7, caption: 'Ahmad — golden light', alt: 'Ahmad Dawood Moez — image 7', projectId: 'f-ahmad' },
  { src: ahmad8, caption: 'Ahmad — Vespa 2', alt: 'Ahmad Dawood Moez — image 8', projectId: 'f-ahmad' },
  { src: ahmad9, caption: 'Ahmad — graffiti wall', alt: 'Ahmad Dawood Moez — image 9', projectId: 'f-ahmad' },
  { src: ahmad10, caption: 'Ahmad — alley', alt: 'Ahmad Dawood Moez — image 10', projectId: 'f-ahmad' },
  // Novel Wear (placeholder — replace with real images when uploaded)
  { src: kazdura3, caption: 'Novel Wear — look 1', alt: 'Novel Wear — image 1', projectId: 'f-novel-wear' },
  { src: kazdura5, caption: 'Novel Wear — look 2', alt: 'Novel Wear — image 2', projectId: 'f-novel-wear' },
  { src: kazdura7, caption: 'Novel Wear — look 3', alt: 'Novel Wear — image 3', projectId: 'f-novel-wear' },
];
