import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BrandProject {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: string;
  role: string;
  tags: string[];
  videoSrc: string;
  fontClass: string;
  accentVar: string;
}

const brandProjects: BrandProject[] = [
  {
    id: 'nevi',
    title: 'Nevi',
    shortDescription: 'Nevi — a light-hearted sketch campaign about who we vibe with.',
    fullDescription:
      "Campaign concept: 'Who we vibe with' — a comedic sketch where a person not wearing the beanie clearly doesn't 'vibe' with the group and is gently nudged to leave. The spot is playful and sketch-like, using timing and reactions to sell the beanie as a social signal. Tone: light, comedic, cheeky.",
    year: '',
    role: 'Director / Creative / Photographer',
    tags: ['campaign', 'sketch', 'comedy', 'fashion', 'beanie'],
    videoSrc: '/videos/nevi-preview.mp4',
    fontClass: 'font-nevi-heading',
    accentVar: '--project-nevi-accent',
  },
  {
    id: 'nevi-bts',
    title: 'Nevi — Behind the Scenes',
    shortDescription: 'A raw look at the making of the "Who we vibe with" campaign.',
    fullDescription:
      "Go behind the camera on the Nevi shoot — capturing candid moments between takes, lighting setups, and the creative energy that brought the beanie campaign to life. From location scouting to final wrap, every frame tells the story behind the story.",
    year: '',
    role: 'Director / Creative',
    tags: ['campaign', 'bts', 'fashion'],
    videoSrc: '/videos/nevi-2.mp4',
    fontClass: 'font-nevi-heading',
    accentVar: '--project-nevi-accent',
  },
  {
    id: 'nevi-lookbook',
    title: 'Nevi — Lookbook',
    shortDescription: 'A cinematic lookbook reel — styling, attitude, and street-ready fits.',
    fullDescription:
      "A cinematic lookbook reel pairing the beanie with street-ready fits. Each look emphasises texture, color blocking, and attitude. Shot across multiple Cairo locations, the lookbook captures the brand's urban identity.",
    year: '',
    role: 'Director / Photographer',
    tags: ['lookbook', 'fashion', 'cinematic'],
    videoSrc: '/videos/nevi-3.mp4',
    fontClass: 'font-nevi-heading',
    accentVar: '--project-nevi-accent',
  },
];

const BrandsAds = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const focusedVideoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const openProject = useCallback((index: number) => {
    setFocusedIndex(index);
    setIsPlaying(false);
  }, []);

  const closeProject = useCallback(() => {
    setFocusedIndex(null);
    setIsPlaying(false);
    if (focusedVideoRef.current) {
      focusedVideoRef.current.pause();
      focusedVideoRef.current.currentTime = 0;
    }
  }, []);

  const switchProject = useCallback((direction: 'prev' | 'next') => {
    setFocusedIndex((prev) => {
      if (prev === null) return null;
      if (direction === 'prev' && prev > 0) return prev - 1;
      if (direction === 'next' && prev < brandProjects.length - 1) return prev + 1;
      return prev;
    });
    setIsPlaying(false);
  }, []);

  const handlePlay = useCallback(() => {
    if (focusedVideoRef.current) {
      focusedVideoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusedIndex !== null) {
        if (e.key === 'Escape') closeProject();
        if (e.key === 'ArrowLeft') switchProject('prev');
        if (e.key === 'ArrowRight') switchProject('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, closeProject, switchProject]);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video && focusedIndex === null) video.play().catch(() => {});
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video && focusedIndex === null) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <main className="min-h-screen pt-16" ref={containerRef}>
      <section className="px-6 py-8 md:px-12 mood-brown">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">
            Portfolio
          </p>
          <h1 className="font-films-heading text-5xl md:text-7xl">Brands &amp; Advertisements</h1>
          <p className="font-handwriting text-lg opacity-60 mt-3">Campaigns that connect ✦</p>
        </div>
      </section>

      <div
        className="flex flex-col"
        style={{ gap: 'var(--film-panel-gap)' }}
        role="list"
        aria-label="Brand & advertisement projects"
      >
        {brandProjects.map((project, index) => {
          const isFocused = focusedIndex === index;
          const isOtherFocused = focusedIndex !== null && focusedIndex !== index;

          return (
            <article
              key={project.id}
              role="listitem"
              aria-expanded={isFocused}
              className={`
                relative overflow-hidden cursor-pointer transition-all group
                ${prefersReducedMotion ? '' : 'duration-[var(--film-expand-duration)]'}
                ${isFocused ? 'z-20' : 'z-10'}
                ${isOtherFocused ? 'opacity-40 pointer-events-auto' : 'opacity-100'}
              `}
              style={{
                height: isFocused ? 'auto' : 'var(--film-panel-height)',
                minHeight: isFocused ? '70vh' : 'var(--film-panel-height)',
              }}
              onClick={() => !isFocused && openProject(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && !isFocused && openProject(index)}
            >
              {/* Background Video */}
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={project.videoSrc}
                className={`
                  absolute inset-0 w-full h-full object-cover transition-transform
                  ${prefersReducedMotion ? '' : 'duration-[var(--film-hover-duration)]'}
                  ${!isFocused ? 'group-hover:scale-[1.04]' : ''}
                `}
                muted loop playsInline autoPlay preload="metadata"
                aria-label={`${project.title} video preview`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {!isFocused && (
                <div
                  className={`
                    absolute inset-0 pointer-events-none border-2 border-white/0 transition-all
                    ${prefersReducedMotion ? '' : 'duration-[var(--film-hover-duration)]'}
                    group-hover:border-white/80 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                  `}
                />
              )}

              {/* Collapsed state */}
              {!isFocused && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  <div className="max-w-2xl">
                    <h2
                      className={`${project.fontClass} text-4xl md:text-6xl lg:text-7xl text-white mb-3`}
                      style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                    >
                      {project.title}
                    </h2>
                    <p className="font-body text-white/80 text-sm md:text-base max-w-lg">
                      {project.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <Play size={20} className="text-white/70" aria-hidden="true" />
                      <span className="font-body text-xs tracking-wider uppercase text-white/60">
                        Click to explore
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded Detail View */}
              {isFocused && (
                <div
                  className={`relative z-30 min-h-[70vh] flex flex-col ${prefersReducedMotion ? '' : 'animate-fade-in'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-16 z-40 flex items-center justify-between p-4 bg-black/60 backdrop-blur-sm">
                    <div className="flex gap-2">
                      {focusedIndex > 0 && (
                        <button onClick={() => switchProject('prev')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Previous project">
                          <ChevronLeft size={20} />
                        </button>
                      )}
                      {focusedIndex < brandProjects.length - 1 && (
                        <button onClick={() => switchProject('next')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Next project">
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </div>
                    <button onClick={closeProject} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Close project">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 p-6 md:p-10 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          ref={focusedVideoRef}
                          src={project.videoSrc}
                          className="w-full h-full object-cover"
                          controls={isPlaying}
                          playsInline preload="metadata"
                          aria-label={`${project.title} full video`}
                        />
                        {!isPlaying && (
                          <button
                            onClick={handlePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group/play"
                            aria-label={`Play ${project.title}`}
                          >
                            <div className="w-20 h-20 rounded-full flex items-center justify-center group-hover/play:scale-110 transition-transform"
                              style={{ backgroundColor: `hsl(var(${project.accentVar}) / 0.9)` }}
                            >
                              <Play size={32} className="text-white ml-1" fill="currentColor" />
                            </div>
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col justify-center text-white">
                        <h2 className={`${project.fontClass} text-4xl md:text-5xl lg:text-6xl mb-4`}>{project.title}</h2>
                        <div className="flex flex-wrap gap-3 font-body text-xs tracking-wider uppercase text-white/60 mb-6">
                          {project.year && <><span>{project.year}</span><span>·</span></>}
                          <span>{project.role}</span>
                        </div>
                        <p className="font-body text-white/80 leading-relaxed mb-6">{project.fullDescription}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/30 text-white/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={handleContactClick}
                          className="self-start inline-block px-6 py-3 rounded-full font-body text-xs font-bold tracking-widest uppercase text-white transition-transform hover:scale-105"
                          style={{ backgroundColor: `hsl(var(${project.accentVar}))` }}
                        >
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

      {focusedIndex !== null && (
        <div className="fixed inset-0 bg-black/50 z-0 pointer-events-none" aria-hidden="true" />
      )}
    </main>
  );
};

export default BrandsAds;
