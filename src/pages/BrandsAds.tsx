import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NeviBrand {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  tags: string[];
  videoSrc: string;
}

// All Nevi videos as one unified project with multiple clips
const neviClips: NeviBrand[] = [
  {
    id: 'nevi-main',
    title: 'Nevi — Campaign',
    shortDescription: 'Nevi — a light-hearted sketch campaign about who we vibe with.',
    fullDescription:
      "Campaign concept: 'Who we vibe with' — a comedic sketch where a person not wearing the beanie clearly doesn't 'vibe' with the group and is gently nudged to leave. The spot is playful and sketch-like, using timing and reactions to sell the beanie as a social signal. Tone: light, comedic, cheeky.",
    role: 'Director / Creative / Photographer',
    tags: ['campaign', 'sketch', 'comedy', 'fashion', 'beanie'],
    videoSrc: '/videos/nevi-preview.mp4',
  },
  {
    id: 'nevi-bts',
    title: 'Nevi — Behind the Scenes',
    shortDescription: 'A raw look at the making of the "Who we vibe with" campaign.',
    fullDescription:
      "Go behind the camera on the Nevi shoot — capturing candid moments between takes, lighting setups, and the creative energy that brought the beanie campaign to life. From location scouting to final wrap, every frame tells the story behind the story.",
    role: 'Director / Creative',
    tags: ['campaign', 'bts', 'fashion'],
    videoSrc: '/videos/nevi-2.mp4',
  },
  {
    id: 'nevi-lookbook',
    title: 'Nevi — Lookbook',
    shortDescription: 'A cinematic lookbook reel — styling, attitude, and street-ready fits.',
    fullDescription:
      "A cinematic lookbook reel pairing the beanie with street-ready fits. Each look emphasises texture, color blocking, and attitude. Shot across multiple Cairo locations, the lookbook captures the brand's urban identity.",
    role: 'Director / Photographer',
    tags: ['lookbook', 'fashion', 'cinematic'],
    videoSrc: '/videos/nevi-3.mp4',
  },
];

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const BrandsAds = () => {
  const [expandedClip, setExpandedClip] = useState<number | null>(null);
  const [playingClip, setPlayingClip] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const playerRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const navigate = useNavigate();

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, [navigate]);

  const expandClip = useCallback((idx: number) => {
    setExpandedClip(idx);
    setPlayingClip(null);
  }, []);

  const collapseClip = useCallback(() => {
    if (playingClip !== null && playerRefs.current[playingClip]) {
      playerRefs.current[playingClip]!.pause();
    }
    setExpandedClip(null);
    setPlayingClip(null);
  }, [playingClip]);

  const playClip = useCallback((idx: number) => {
    const player = playerRefs.current[idx];
    if (player) {
      player.play();
      setPlayingClip(idx);
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (expandedClip !== null && e.key === 'Escape') collapseClip();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [expandedClip, collapseClip]);

  const handleMouseEnter = (idx: number) => {
    if (expandedClip !== null) return;
    videoRefs.current[idx]?.play().catch(() => {});
  };
  const handleMouseLeave = (idx: number) => {
    if (expandedClip !== null) return;
    const v = videoRefs.current[idx];
    if (v) { v.pause(); v.currentTime = 0; }
  };

  return (
    <main className="min-h-screen pt-16" data-project-slug="nevi">
      {/* Header */}
      <section className="px-6 py-8 md:px-12 mood-brown">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Portfolio</p>
          <h1 className="font-films-heading text-5xl md:text-7xl">Brands &amp; Advertisements</h1>
          <p className="font-handwriting text-lg opacity-60 mt-3">Campaigns that connect ✦</p>
        </div>
      </section>

      {/* All clips in unified grid */}
      <div className="flex flex-col" style={{ gap: 'var(--film-panel-gap)' }} role="list" aria-label="Nevi campaign clips">
        {neviClips.map((clip, idx) => {
          const isExpanded = expandedClip === idx;
          const isOtherExpanded = expandedClip !== null && expandedClip !== idx;

          return (
            <article
              key={clip.id}
              role="listitem"
              aria-expanded={isExpanded}
              data-project-slug={clip.id}
              className={`
                project-hero relative overflow-hidden cursor-pointer transition-all group
                ${prefersReducedMotion ? '' : 'duration-[var(--film-expand-duration)]'}
                ${isExpanded ? 'z-20' : 'z-10'}
                ${isOtherExpanded ? 'opacity-40 pointer-events-auto' : 'opacity-100'}
              `}
              style={{
                height: isExpanded ? 'auto' : 'var(--film-panel-height)',
                minHeight: isExpanded ? '70vh' : 'var(--film-panel-height)',
              }}
              onClick={() => !isExpanded && expandClip(idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && !isExpanded && expandClip(idx)}
            >
              {/* Background video */}
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={clip.videoSrc}
                className={`
                  project-bg absolute inset-0 w-full h-full object-cover transition-transform
                  ${prefersReducedMotion ? '' : 'duration-[var(--film-hover-duration)]'}
                  ${!isExpanded ? 'group-hover:scale-[1.04]' : ''}
                `}
                muted loop playsInline autoPlay preload="metadata"
                data-bg="true"
                aria-label={`${clip.title} video preview`}
              />

              {/* Overlay */}
              <div className={`absolute inset-0 ${isExpanded ? 'bg-black/30' : 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'}`} />

              {/* Hover border */}
              {!isExpanded && (
                <div className={`absolute inset-0 pointer-events-none border-2 border-white/0 transition-all ${prefersReducedMotion ? '' : 'duration-[var(--film-hover-duration)]'} group-hover:border-white/80 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`} />
              )}

              {/* Collapsed state */}
              {!isExpanded && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  <div className="max-w-2xl">
                    <h2 className="font-nevi-heading text-4xl md:text-6xl lg:text-7xl text-white mb-3" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                      {clip.title}
                    </h2>
                    <p className="font-body text-white/80 text-sm md:text-base max-w-lg">{clip.shortDescription}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <Play size={20} className="text-white/70" aria-hidden="true" />
                      <span className="font-body text-xs tracking-wider uppercase text-white/60">Click to explore</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded detail view */}
              {isExpanded && (
                <div className={`relative z-30 min-h-[70vh] flex flex-col ${prefersReducedMotion ? '' : 'animate-fade-in'}`} onClick={(e) => e.stopPropagation()}>
                  <div className="sticky top-16 z-40 flex items-center justify-between p-4 bg-black/60 backdrop-blur-sm">
                    <div className="flex gap-2">
                      {expandedClip > 0 && (
                        <button onClick={() => expandClip(expandedClip - 1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Previous clip">
                          <ChevronLeft size={20} />
                        </button>
                      )}
                      {expandedClip < neviClips.length - 1 && (
                        <button onClick={() => expandClip(expandedClip + 1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Next clip">
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </div>
                    <button onClick={collapseClip} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Close">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 p-6 md:p-10 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                      {/* Video player */}
                      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          ref={(el) => { playerRefs.current[idx] = el; }}
                          src={clip.videoSrc}
                          className="w-full h-full object-cover"
                          controls={playingClip === idx}
                          playsInline preload="metadata"
                          aria-label={`${clip.title} full video`}
                        />
                        {playingClip !== idx && (
                          <button
                            onClick={() => playClip(idx)}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group/play"
                            aria-label={`Play ${clip.title}`}
                          >
                            <div className="w-20 h-20 rounded-full flex items-center justify-center group-hover/play:scale-110 transition-transform" style={{ backgroundColor: 'hsl(var(--project-nevi-accent) / 0.9)' }}>
                              <Play size={32} className="text-white ml-1" fill="currentColor" />
                            </div>
                          </button>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-col justify-center text-white">
                        <h2 className="font-nevi-heading text-4xl md:text-5xl lg:text-6xl mb-4">{clip.title}</h2>
                        <div className="flex flex-wrap gap-3 font-body text-xs tracking-wider uppercase text-white/60 mb-6">
                          <span>{clip.role}</span>
                        </div>
                        <p className="font-body text-white/80 leading-relaxed mb-6">{clip.fullDescription}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {clip.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/30 text-white/70">{tag}</span>
                          ))}
                        </div>
                        <button onClick={handleContactClick} className="self-start inline-block px-6 py-3 rounded-full font-body text-xs font-bold tracking-widest uppercase text-white transition-transform hover:scale-105" style={{ backgroundColor: 'hsl(var(--project-nevi-accent))' }}>
                          Contact Me Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {expandedClip !== null && (
        <div className="fixed inset-0 bg-black/50 z-0 pointer-events-none" aria-hidden="true" />
      )}
    </main>
  );
};

export default BrandsAds;
