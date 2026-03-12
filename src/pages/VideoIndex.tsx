import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, X } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import VideoTile from '@/components/VideoTile';
import ProjectModal from '@/components/ProjectModal';
import { getProjectsByCategory, ProjectEntry } from '@/data/portfolioData';

const meta: Record<string, { title: string; subtitle: string; headingClass: string }> = {
  'short-films': {
    title: 'Short Films',
    subtitle: 'Cinematic stories, frame by frame ✦',
    headingClass: 'font-films-heading',
  },
  documentaries: {
    title: 'Documentaries',
    subtitle: 'Documenting people, places, moments ✦',
    headingClass: 'font-films-heading',
  },
};

const VideoIndex = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const info = meta[type || ''];
  const allItems = getProjectsByCategory((type || '') as ProjectEntry['category']);

  // For documentaries, only show People of Moiz
  const items = type === 'documentaries'
    ? allItems.filter(p => p.id === 'd-moiz')
    : allItems;

  const isDocumentary = type === 'documentaries';

  const [selected, setSelected] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [focusedDoc, setFocusedDoc] = useState(false);
  const focusedVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  const openModal = useCallback((idx: number) => setSelected(idx), []);
  const closeModal = useCallback(() => setSelected(null), []);
  const prev = useCallback(() => setSelected((s) => (s !== null && s > 0 ? s - 1 : s)), []);
  const next = useCallback(() => setSelected((s) => (s !== null && s < items.length - 1 ? s + 1 : s)), [items.length]);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, [navigate]);

  const handlePlayDoc = useCallback(() => {
    if (focusedVideoRef.current) {
      focusedVideoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const closeDocFocus = useCallback(() => {
    setFocusedDoc(false);
    setIsPlaying(false);
    if (focusedVideoRef.current) {
      focusedVideoRef.current.pause();
      focusedVideoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (!isDocumentary || !focusedDoc) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDocFocus();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDocumentary, focusedDoc, closeDocFocus]);

  if (!info) return <div className="min-h-screen pt-32 text-center font-body text-muted-foreground">Not found</div>;

  // Documentary immersive layout
  if (isDocumentary && items.length > 0) {
    const project = items[0];
    const videoMedia = project.media.find(m => m.type === 'video');
    const videoSrc = videoMedia?.src || '';

    return (
      <main className="min-h-screen pt-16">
        <article
          className={`relative overflow-hidden cursor-pointer transition-all duration-[360ms] group ${focusedDoc ? 'z-20' : 'z-10'}`}
          style={{
            height: focusedDoc ? 'auto' : '50vh',
            minHeight: focusedDoc ? '70vh' : '50vh',
          }}
          onClick={() => !focusedDoc && setFocusedDoc(true)}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && !focusedDoc && setFocusedDoc(true)}
        >
          {/* Background Video */}
          <video
            ref={bgVideoRef}
            src={videoSrc}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${!focusedDoc ? 'group-hover:scale-[1.04]' : ''}`}
            muted loop playsInline autoPlay preload="auto"
            aria-label={`${project.title} video preview`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {!focusedDoc && (
            <div className="absolute inset-0 pointer-events-none border-2 border-white/0 group-hover:border-white/80 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300" />
          )}

          {/* Collapsed */}
          {!focusedDoc && (
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-2xl">
                <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Documentaries</p>
                <h2 className="font-films-heading text-4xl md:text-6xl lg:text-7xl text-white mb-3" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                  {project.title}
                </h2>
                <p className="font-body text-white/80 text-sm md:text-base max-w-lg">{project.description}</p>
                <div className="flex items-center gap-3 mt-4">
                  <Play size={20} className="text-white/70" aria-hidden="true" />
                  <span className="font-body text-xs tracking-wider uppercase text-white/60">Click to explore</span>
                </div>
              </div>
            </div>
          )}

          {/* Expanded */}
          {focusedDoc && (
            <div className="relative z-30 min-h-[70vh] flex flex-col animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-16 z-40 flex items-center justify-end p-4 bg-black/60 backdrop-blur-sm">
                <button onClick={closeDocFocus} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Close project">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-6 md:p-10 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      ref={focusedVideoRef}
                      src={videoSrc}
                      className="w-full h-full object-cover"
                      controls={isPlaying}
                      playsInline preload="metadata"
                      aria-label={`${project.title} full video`}
                    />
                    {!isPlaying && (
                      <button
                        onClick={handlePlayDoc}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group/play"
                        aria-label={`Play ${project.title}`}
                      >
                        <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center group-hover/play:scale-110 transition-transform">
                          <Play size={32} className="text-white ml-1" fill="currentColor" />
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col justify-center text-white">
                    <h2 className="font-films-heading text-4xl md:text-5xl lg:text-6xl mb-4">{project.title}</h2>
                    <div className="flex flex-wrap gap-3 font-body text-xs tracking-wider uppercase text-white/60 mb-6">
                      {project.year && <><span>{project.year}</span><span>·</span></>}
                      <span>{project.role}</span>
                    </div>
                    <p className="font-body text-white/80 leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/30 text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={handleContactClick}
                      className="self-start inline-block px-6 py-3 rounded-full bg-accent font-body text-xs font-bold tracking-widest uppercase text-white transition-transform hover:scale-105"
                    >
                      Contact Me Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <section className="section-padding mood-brown pb-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="editorial-divider !mx-0 mb-8 !bg-accent/30" />
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">Video</p>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={150}>
            <h1 className={`${info.headingClass} text-6xl md:text-8xl`}>{info.title}</h1>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={300}>
            <p className="font-handwriting text-lg opacity-60 mt-4">{info.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 150}>
              <VideoTile project={p} onClick={() => openModal(i)} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {selected !== null && items[selected] && (
        <ProjectModal
          project={items[selected]}
          onClose={closeModal}
          onPrev={selected > 0 ? prev : undefined}
          onNext={selected < items.length - 1 ? next : undefined}
        />
      )}
    </main>
  );
};

export default VideoIndex;
