import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import ProjectModal from './ProjectModal';
import { useState, useCallback, useEffect, useRef } from 'react';
import { photographyCategories, getProjectsByCategory, scatteredPolaroids, projects } from '@/data/portfolioData';

// All project videos — USER UPLOADS
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
    title: 'Brand shoots and ADVERTISEMENTS',
    category: 'Short Film',
    date: '2025',
    description: 'NIVI - NOVEL WEER ',
    link: '/video/short-films',
  },
  {
    title: 'documentries',
    category: 'Music Video',
    date: '2025',
    description: 'Documenting people, Places, Moments',
    link: '/video/documentaries',
  },
  {
    title: 'Filmmaking',
    category: 'Films',
    date: '2024',
    description: 'Cinematic stories — Euphoria and Geziret El-Dahab. Urban euphoria meets intimate landscapes.',
    link: '/filmmaking',
  },
  {
    title: 'Short \nFilms',
    category: 'Commercial',
    date: '2024',
    description: 'After-dark energy brought to life. Neon, shadows, and the pulse of the night.',
    link: '/video/short-films',
  },
];

// Extended polaroids - all user images, then TEMP AI placeholders if needed
const allPolaroids = [
  ...scatteredPolaroids,
  // Mark any extra as TEMP — AI placeholder if user images exhausted
  { src: scatteredPolaroids[0].src, caption: 'captured moment', alt: 'Kazdura — extra 1' },
  { src: scatteredPolaroids[1].src, caption: 'behind the lens', alt: 'Kazdura — extra 2' },
  { src: scatteredPolaroids[2].src, caption: 'golden light', alt: 'Kazdura — extra 3' },
];

const FeaturedWork = () => {
  const kazduraProject = projects.find(p => p.id === 'f-kazdura')!;
  const photoProjects = [kazduraProject, ...getProjectsByCategory('street').slice(0, 1), ...getProjectsByCategory('media-coverage').slice(0, 1)];
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const closeModal = useCallback(() => setModalIdx(null), []);

  // Photography shuffle state - cast to mutable array
  const [shuffledCategories, setShuffledCategories] = useState([...photographyCategories]);
  const shuffleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastShuffleRef = useRef(0);

  // Shuffle on scroll — throttled to 600ms
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastShuffleRef.current < 600) return;
      
      // Only shuffle when in photography section viewport
      const photoSection = document.getElementById('photography');
      if (!photoSection) return;
      
      const rect = photoSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inView) {
        lastShuffleRef.current = now;
        // Shuffle with fade effect
        setShuffledCategories(prev => {
          const arr = [...prev];
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (shuffleTimeoutRef.current) clearTimeout(shuffleTimeoutRef.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden" id="work">
      <div className="section-padding mood-teal pb-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="mb-4">
              <div className="editorial-divider !mx-0 mb-8" />
              <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5">Portfolio</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={150}>
            <h2 className="editorial-display text-6xl md:text-8xl lg:text-9xl text-foreground" style={{ transform: 'rotate(-2deg)' }}>My Work</h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={300}>
            <p className="handwritten text-lg text-muted-foreground mt-4">Every frame tells a story ✦</p>
          </ScrollReveal>
        </div>
      </div>

      {featuredProjects.map((project, i) => {
        const isEven = i % 2 === 0;
        const videoSrc = videoBackgrounds[i % videoBackgrounds.length];
        const isFullHeight = i % 3 === 0;

        return (
          <Link to={project.link} key={project.title} className="block relative group">
            <div className={`relative ${isFullHeight ? 'h-[90vh]' : 'h-[60vh] md:h-[75vh]'} overflow-hidden`}>
              <div className="absolute inset-0 will-change-transform">
                <video
                  src={videoSrc}
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.2)' }}
                  autoPlay muted loop playsInline
                  aria-label={`Video background for ${project.title}`}
                />
                <div className={`absolute inset-0 ${
                  i % 4 === 0 ? 'bg-studio-teal/15' :
                  i % 4 === 1 ? 'bg-accent/10' :
                  i % 4 === 2 ? 'bg-studio-brown/20' :
                  'bg-studio-dark/15'} mix-blend-multiply`}
                />
                <div className={`absolute inset-0 ${
                  isEven
                    ? 'bg-gradient-to-r from-studio-dark/80 via-studio-dark/35 to-transparent'
                    : 'bg-gradient-to-l from-studio-dark/80 via-studio-dark/35 to-transparent'}`}
                />
              </div>

              <div className="absolute inset-0 flex items-center z-[2] px-8 md:px-20 lg:px-32">
                <div className={`max-w-xl ${isEven ? '' : 'ml-auto text-right'}`}>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={100}>
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent font-bold">
                      {project.category} — {project.date}
                    </span>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={250}>
                    <h3 className="editorial-display md:text-7xl lg:text-8xl text-studio-white mt-4 leading-[0.92] py-[4px] my-[24px] mx-[81px] px-0 text-5xl text-justify whitespace-pre-line">
                      {project.title}
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={400}>
                    <p className="font-body text-studio-white/60 mt-6 text-sm md:text-base max-w-md leading-relaxed">
                      {project.description}
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>

            {i < featuredProjects.length - 1 && (
              <div className="h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            )}
          </Link>
        );
      })}

      {/* Photography Section — reduced vertical spacing */}
      <div className="px-6 py-6 md:px-12 lg:px-24 lg:py-8" id="photography">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="editorial-divider !mx-0 mb-4" />
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">Photography</p>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={150}>
            <h2 className="font-photo-heading text-5xl md:text-7xl lg:text-8xl text-foreground">PHOTOGRAPHY</h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={300}>
            <p className="handwritten text-lg text-muted-foreground mt-3 mb-3">Browse categories below ✦</p>
          </ScrollReveal>

          {/* Reduced gap: 12px desktop, 10px mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] md:gap-[12px] mt-3">
            {shuffledCategories.map((cat, i) => (
              <ScrollReveal key={cat.slug} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
                <Link
                  to={`/photography/${cat.slug}`}
                  className="group block polaroid cursor-pointer transition-all duration-500"
                  style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={cat.thumbnail}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-3 pb-1 text-center">
                    <p className="font-handwriting text-lg text-foreground">{cat.label}</p>
                    <p className="font-body text-[10px] text-muted-foreground tracking-wider uppercase mt-1">{cat.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Scattered polaroids section — shuffled on each render */}
      <div className="px-6 py-4 md:px-12 lg:px-24 lg:py-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="handwritten text-center text-muted-foreground mb-6">some recent captures ✦</p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[...scatteredPolaroids]
              .sort(() => Math.random() - 0.5)
              .slice(0, 12)
              .map((img, i) => {
                const rot = [-5, 3, -2, 4, -3, 2, -4, 5, -1, 3, -2, 4][i % 12];
                return (
                  <ScrollReveal key={`${img.alt}-${i}`} variant="scale" delay={i * 80} className="w-36 md:w-44">
                    <button
                      onClick={() => setModalIdx(0)}
                      className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full"
                      aria-label={`View: ${img.alt}`}
                    >
                      <div className="polaroid cursor-pointer" style={{ transform: `rotate(${rot}deg)` }}>
                        <div className="aspect-[4/5] overflow-hidden bg-muted">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <p className="polaroid-caption text-xs">{img.caption}</p>
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
          </div>
        </div>
      </div>

      {modalIdx !== null && photoProjects[modalIdx] && (
        <ProjectModal
          project={photoProjects[modalIdx]}
          onClose={closeModal}
          onPrev={modalIdx > 0 ? () => setModalIdx(modalIdx - 1) : undefined}
          onNext={modalIdx < photoProjects.length - 1 ? () => setModalIdx(modalIdx + 1) : undefined}
        />
      )}
    </section>
  );
};

export default FeaturedWork;
