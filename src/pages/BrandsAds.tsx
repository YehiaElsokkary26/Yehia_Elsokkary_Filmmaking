import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHero from '@/components/ProjectHero';

interface NeviBrand {
  id: string;
  title: string;
  description: string;
  role: string;
  tags: string[];
  videoSrc: string;
  year?: string;
}

// All Nevi clips in one unified section
const neviClips: NeviBrand[] = [
  {
    id: 'nevi-main',
    title: 'Nevi — Campaign',
    description:
      "Campaign concept: 'Who we vibe with' — a comedic sketch where a person not wearing the beanie clearly doesn't 'vibe' with the group. The spot is playful and sketch-like, using timing and reactions to sell the beanie as a social signal. Tone: light, comedic, cheeky.",
    role: 'Director / Creative / Photographer',
    tags: ['campaign', 'sketch', 'comedy', 'fashion', 'beanie'],
    videoSrc: '/videos/nevi-preview.mp4',
  },
  {
    id: 'nevi-bts',
    title: 'Nevi — Behind the Scenes',
    description:
      'Go behind the camera on the Nevi shoot — capturing candid moments between takes, lighting setups, and the creative energy that brought the beanie campaign to life.',
    role: 'Director / Creative',
    tags: ['campaign', 'bts', 'fashion'],
    videoSrc: '/videos/nevi-2.mp4',
  },
  {
    id: 'nevi-lookbook',
    title: 'Nevi — Lookbook',
    description:
      "A cinematic lookbook reel pairing the beanie with street-ready fits. Each look emphasises texture, color blocking, and attitude. Shot across multiple Cairo locations.",
    role: 'Director / Photographer',
    tags: ['lookbook', 'fashion', 'cinematic'],
    videoSrc: '/videos/nevi-3.mp4',
  },
];

const BrandsAds = () => {
  const navigate = useNavigate();

  const handleContactClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    },
    [navigate],
  );

  return (
    <main className="min-h-screen pt-16" data-project-slug="nevi">
      {/* Header */}
      <section className="px-6 py-8 md:px-12 mood-brown">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">
            Portfolio
          </p>
          <h1 className="font-films-heading text-5xl md:text-7xl">
            Brands &amp; Advertisements
          </h1>
          <p className="font-handwriting text-lg opacity-60 mt-3">
            Campaigns that connect ✦
          </p>
        </div>
      </section>

      {/* Unified Nevi clips — each uses ProjectHero */}
      <div className="flex flex-col gap-1" role="list" aria-label="Nevi campaign clips">
        {neviClips.map((clip) => (
          <div key={clip.id} role="listitem">
            <ProjectHero
              title={clip.title}
              description={clip.description}
              role={clip.role}
              year={clip.year}
              tags={clip.tags}
              videoSrc={clip.videoSrc}
              projectSlug={clip.id}
              ctaLabel="Contact Me Now"
              onCtaClick={handleContactClick}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default BrandsAds;
