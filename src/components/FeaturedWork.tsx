import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import ProjectModal from './ProjectModal';
import { useState, useCallback } from 'react';
import { photographyCategories, scatteredPolaroids, projects, ProjectEntry } from '@/data/portfolioData';
import { getVideoPoster } from '@/lib/video';
import HoverVideo from './HoverVideo';
import { ArrowUpRight } from 'lucide-react';

const videoBackgrounds = [
  '/videos/reel-1.mp4',
  '/videos/people-of-moiz.mp4',
  '/videos/euphoria.mp4',
  '/videos/geziret.mp4',
  '/videos/upload-1.mp4',
  '/videos/upload-2.mp4',
];

const featuredProjects = [
  {
    title: 'Brand Shoots & Ads',
    category: 'Fashion Films & More',
    description: 'NIVI · Novel Wear — commercial fashion work from concept to final cut.',
    link: '/brands',
  },
  {
    title: 'Documentaries',
    category: 'Stories, Writing, Documentation',
    description: 'Documenting people, places, and moments that deserve to be remembered.',
    link: '/video/documentaries',
  },
  {
    title: 'Filmmaking',
    category: 'Short Film-like Videos',
    description: 'Cinematic stories — Euphoria and Geziret El-Dahab. Urban euphoria meets intimate landscapes.',
    link: '/filmmaking',
  },
  {
    title: 'Short Films',
    category: 'Dalal — Out Now',
    description: 'Writing, experimentation, artistic and non-commercial work.',
    link: '/video/short-films',
  },
];

// Deliberate ascending pacing — builds to a crescendo at the final card
const cardHeights = [
  'h-[72vh]',
  'h-[82vh] md:h-[88vh]',
  'h-[76vh] md:h-[82vh]',
  'h-[90vh]',
];

const FeaturedWork = () => {
  const [modalProject, setModalProject] = useState<ProjectEntry | null>(null);
  const closeModal = useCallback(() => setModalProject(null), []);

  const [shuffledCategories] = useState(() => {
    const arr = [...photographyCategories];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const [displayPolaroids] = useState(() =>
    [...scatteredPolaroids].sort(() => Math.random() - 0.5).slice(0, 12)
  );

  const handlePolaroidClick = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) setModalProject(project);
  }, []);

  return (
    <section className="relative overflow-hidden" id="work">

      {/* ── Portfolio Header ─────────────────────────── */}
      <div className="section-padding section-elevated pb-16 relative overflow-hidden">
        {/* Accent top border — marks the section start */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent/50 via-accent/25 to-transparent" />
        {/* Ghost section number watermark */}
        <div
          className="absolute right-6 md:right-12 lg:right-24 top-4 font-hero leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(120px, 18vw, 220px)', opacity: 0.035 }}
          aria-hidden="true"
        >
          01
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal variant="left">
            <span className="label-overline">Portfolio</span>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={120}>
            <h2
              className="font-fashion-heading mt-4 text-6xl md:text-8xl lg:text-[7rem] leading-none text-foreground"
            >
              My Work
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={240}>
            <p className="font-body text-muted-foreground text-sm mt-4 max-w-sm">
              Four disciplines — one creative vision.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Featured Project Cards ─────────────────── */}
      {featuredProjects.map((project, i) => {
        const isEven = i % 2 === 0;
        const videoSrc = videoBackgrounds[i % videoBackgrounds.length];

        return (
          <Link
            to={project.link}
            key={project.title}
            className="block relative group"
            data-project-link
          >
            <div className={`relative ${cardHeights[i]} overflow-hidden hero-video-shell`}>
              {/* Video background */}
              <div className="absolute inset-0 z-0 will-change-transform">
                <HoverVideo
                  src={videoSrc}
                  poster={getVideoPoster(videoSrc)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ transform: 'scale(1.08)' }}
                  preload="none"
                  aria-label={`Video background for ${project.title} — hover to play`}
                />
                {/* Directional gradient for text legibility */}
                <div
                  className={`absolute inset-0 ${
                    isEven
                      ? 'bg-gradient-to-r from-black/85 via-black/45 to-transparent'
                      : 'bg-gradient-to-l from-black/85 via-black/45 to-transparent'
                  }`}
                />
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Text content */}
              <div className="absolute inset-0 flex items-center z-10 px-8 md:px-20 lg:px-28">
                <div className={`max-w-lg ${isEven ? '' : 'ml-auto text-right'}`}>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={80}>
                    <span
                      className="label-overline-video"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.95)' }}
                    >
                      {project.category}
                    </span>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={200}>
                    <h3
                      className="font-fashion-heading text-4xl md:text-6xl lg:text-7xl text-studio-white mt-3 leading-tight"
                      style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
                    >
                      {project.title}
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={340}>
                    <p
                      className="font-body text-studio-white/70 mt-4 text-sm md:text-base leading-relaxed font-normal"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                    >
                      {project.description}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={440}>
                    <div className={`mt-6 inline-flex items-center gap-2 text-accent font-body text-xs font-semibold tracking-[0.18em] uppercase group-hover:gap-3 transition-all`}>
                      Explore
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>

            {/* Section rule between cards */}
            {i < featuredProjects.length - 1 && (
              <div className="section-rule" />
            )}
          </Link>
        );
      })}

      {/* ── Photography Section ────────────────────── */}
      <div className="section-padding pb-12 pt-20 section-warm relative overflow-hidden" id="photography">
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        {/* Ghost section number */}
        <div
          className="absolute right-6 md:right-12 lg:right-24 top-4 font-hero leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(120px, 18vw, 220px)', opacity: 0.035 }}
          aria-hidden="true"
        >
          02
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal variant="left">
            <span className="label-overline">Photography</span>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={120}>
            {/* Renamed from "Photography" to avoid redundancy with overline */}
            <h2 className="font-fashion-heading mt-4 text-5xl md:text-7xl lg:text-8xl text-foreground">
              Still Frames
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={240}>
            <p className="font-body text-muted-foreground text-sm mt-3 mb-10">
              Browse categories below
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {shuffledCategories.map((cat, i) => (
              <ScrollReveal key={cat.slug} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 90}>
                <Link
                  to={`/photography/${cat.slug}`}
                  className="group block cursor-pointer"
                  style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
                >
                  <div className="polaroid">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={cat.thumbnail}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-2 pb-1 text-center">
                      <p className="font-handwriting text-base text-foreground/80 mt-1">{cat.label}</p>
                      <p className="font-body text-[10px] text-foreground/50 tracking-widest uppercase mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Section rule */}
      <div className="section-warm">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="section-rule" />
        </div>
      </div>

      {/* ── Scattered Polaroids ────────────────────── */}
      <div className="px-6 py-10 md:px-12 lg:px-24 lg:py-14 section-warm">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <span className="label-overline block text-center mb-8">Recent Captures</span>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {displayPolaroids.map((img, i) => {
              const rot = [-4, 3, -2, 3.5, -3, 2, -3.5, 4, -1, 2.5, -2, 3.5][i % 12];
              return (
                <div key={`${img.projectId}-${img.alt}-${i}`} className="w-36 md:w-44 transition-opacity duration-700">
                  <button
                    onClick={() => handlePolaroidClick(img.projectId)}
                    className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full"
                    aria-label={`View: ${img.alt}`}
                  >
                    <div className="polaroid cursor-pointer" style={{ transform: `rotate(${rot}deg)` }}>
                      <div className="aspect-[4/5] overflow-hidden bg-muted">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <p className="polaroid-caption">{img.caption}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {modalProject && (
        <ProjectModal project={modalProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default FeaturedWork;
