import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import PolaroidCard from './PolaroidCard';
import ProjectModal from './ProjectModal';
import { useState, useCallback } from 'react';
import { photographyCategories, getProjectsByCategory, scatteredPolaroids, projects } from '@/data/portfolioData';

const videoBackgrounds = [
  '/videos/reel-1.mp4',
  '/videos/people-of-moiz.mp4',
  '/videos/euphoria.mp4',
  '/videos/geziret.mp4',
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

const FeaturedWork = () => {
  // Use Kazdura project for scattered polaroids
  const kazduraProject = projects.find(p => p.id === 'f-kazdura')!;
  // Create sub-projects from individual Kazdura images for the scattered section
  const photoProjects = [kazduraProject, ...getProjectsByCategory('street').slice(0, 1), ...getProjectsByCategory('media-coverage').slice(0, 1)];
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const closeModal = useCallback(() => setModalIdx(null), []);

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

      {/* Photography Section */}
      <div className="section-padding" id="photography">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="editorial-divider !mx-0 mb-8" />
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5">Photography</p>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={150}>
            <h2 className="font-photo-heading text-5xl md:text-7xl lg:text-8xl text-foreground">PHOTOGRAPHY</h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={300}>
            <p className="handwritten text-lg text-muted-foreground mt-4 mb-12">Browse categories below ✦</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {photographyCategories.map((cat, i) => (
              <ScrollReveal key={cat.slug} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 150}>
                <Link
                  to={`/photography/${cat.slug}`}
                  className="group block polaroid cursor-pointer"
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

      {/* Scattered polaroids section */}
      <div className="section-padding bg-background pb-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="handwritten text-center text-muted-foreground mb-10">some recent captures ✦</p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {scatteredPolaroids.slice(0, 5).map((img, i) => {
              const rot = [-5, 3, -2, 4, -3][i];
              return (
                <ScrollReveal key={i} variant="scale" delay={i * 150} className="w-44 md:w-52">
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
                      <p className="polaroid-caption">{img.caption}</p>
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
