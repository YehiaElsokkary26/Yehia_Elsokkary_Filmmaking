import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2 } from 'lucide-react';

interface BrandProject {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  role: string;
  tags: string[];
  videoSrc: string;
  year?: string;
  synopsis?: string;
  aspectRatio?: '16:9' | '9:16';
  theme?: 'default' | 'red';
  clips?: {id: string;label: string;title: string;description: string;role: string;tags: string[];videoSrc: string;synopsis?: string;}[];
}

const brandProjects: BrandProject[] = [
{
  id: 'nivi',
  title: 'NIVI',
  subtitle: 'Beanie brand campaign — Latest as a Directior, creative direction, DOP, Colorist and Editor. ',
  description: '',
  role: '',
  tags: [],
  videoSrc: '/videos/nevi-preview.mp4',
  clips: [
  {
    id: 'nivi-campaign',
    label: 'to who we vibe with ep3',
    title: 'NIVI — Stand By NIVI',
    description:
    "Campaign concept: 'Who we vibe with' — a comedic sketch where a person not wearing the beanie clearly doesn't 'vibe' with the group.",
    role: 'Director / Creative / Photographer',
    tags: ['FILMMAKING', 'color grading', 'cinematic'],
    videoSrc: '/videos/nevi-preview.mp4',
    synopsis: 'a fashion film video portrying them in a cinematic way '
  },
  {
    id: 'nivi-bts',
    label: 'to who we vibe with ep2',
    title: 'NIVI — Behind the Scenes',
    description:
    'Go behind the camera — capturing candid moments between takes, lighting setups, and the creative energy that brought the campaign to life.',
    role: 'Director / Creative',
    tags: ['bts', 'fashion'],
    videoSrc: '/videos/nevi-2.mp4',
    synopsis: 'Candid moments, lighting setups, raw creative energy.'
  },
  {
    id: 'nivi-lookbook',
    label: 'to who we vibe with ep1',
    title: 'NIVI — Lookbook',
    description:
    'A cinematic lookbook reel pairing the beanie with street-ready fits. Texture, color blocking, and attitude across multiple Cairo locations.',
    role: 'Director / Photographer',
    tags: ['lookbook', 'cinematic'],
    videoSrc: '/videos/nevi-3.mp4',
    synopsis: 'Cinematic street-style lookbook shot across Cairo.'
  }]

},
{
  id: 'wtvr-bts',
  title: 'THE WTVR BTS Shoot',
  subtitle: 'Behind the scenes of a creative shoot — pure energy and good vibes.',
  description:
  'This was a BTS shoot for THE WTVR and honestly, I had a lot of fun with it. The energy on set was electric — capturing candid moments, raw reactions, and the creative chaos that makes every shoot memorable. Sometimes the best content comes from what happens between the takes.',
  role: 'Videographer / Editor',
  tags: ['BTS', 'brand', 'creative', 'fun'],
  videoSrc: '/videos/wtvr-bts.mp4',
  year: '2024',
  synopsis: 'A fun, energetic behind-the-scenes shoot.',
  aspectRatio: '16:9'
},
{
  id: 'ameto',
  title: 'AMETO',
  subtitle: 'Suhoor Food Truck in New Cairo',
  description:
  'a simple, but professional portrayal of my work shooting Brands.',
  role: 'Videographer / Editor / Colorist',
  tags: ['brand film', 'color grading', 'vertical', 'editorial'],
  videoSrc: '/videos/ameto.mp4',
  year: '2024',
  synopsis: 'High-contrast vertical brand film — red meets black.',
  aspectRatio: '9:16',
  theme: 'red'
}];


/* ─── NIVI Section (multi-clip tabs) ─── */
const NiviSection = ({ project }: {project: BrandProject;}) => {
  const navigate = useNavigate();
  const clips = project.clips!;
  const [activeIdx, setActiveIdx] = useState(0);
  const [featurePlaying, setFeaturePlaying] = useState(false);
  const featureRef = useRef<HTMLVideoElement>(null);
  const bgRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleContactClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    },
    [navigate]
  );

  const selectClip = useCallback((idx: number) => {
    setActiveIdx(idx);
    setFeaturePlaying(false);
  }, []);

  const playFeature = useCallback(() => {
    setFeaturePlaying(true);
    requestAnimationFrame(() => {
      if (featureRef.current) {
        featureRef.current.currentTime = 0;
        featureRef.current.play().catch(() => {});
      }
    });
  }, []);

  const pauseFeature = useCallback(() => {
    setFeaturePlaying(false);
  }, []);

  useEffect(() => {
    bgRefs.current.forEach((v) => {
      if (v) v.play().catch(() => {});
    });
  }, []);

  const active = clips[activeIdx];

  return (
    <section data-project-slug="nivi">
      {/* Header */}
      <div className="px-6 py-10 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Portfolio</p>
          <h2 className="font-films-heading text-5xl md:text-7xl text-white">{project.title}</h2>
          <p className="font-body text-sm text-white/40 mt-2 max-w-xl my-[6px] mx-0 px-[2px] py-0">{project.subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 md:px-12 mb-2">
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap">
          {clips.map((clip, i) =>
          <button
            key={clip.id}
            onClick={() => selectClip(i)}
            className={`px-5 py-2.5 rounded-full font-body text-xs font-bold tracking-widest uppercase transition-all ${
            i === activeIdx ? 'bg-white text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'}`
            }>
            
              {clip.label}
            </button>
          )}
        </div>
      </div>

      {/* Clips */}
      <div className="flex flex-col">
        {clips.map((clip, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={clip.id}
              className={`relative w-full transition-opacity duration-700 cursor-pointer ${
              isActive ? 'opacity-100' : 'opacity-30 hover:opacity-50'}`
              }
              onClick={() => selectClip(i)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${clip.title}`}
              onKeyDown={(e) => e.key === 'Enter' && selectClip(i)}>
              
              <div className="relative w-full aspect-video max-h-[70vh]">
                <video
                  ref={(el) => {bgRefs.current[i] = el;}}
                  src={clip.videoSrc}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay muted loop playsInline preload="metadata" />
                
                <div className="absolute inset-0 bg-black/40" />

                {/* Desktop: feature player left, meta right */}
                <div className="absolute inset-0 z-10 hidden lg:flex items-center justify-between px-8 xl:px-16">
                  {isActive &&
                  <div className="relative w-[40%] max-w-[500px] aspect-video rounded-lg overflow-hidden shadow-2xl">
                      {!featurePlaying ?
                    <>
                          <video src={clip.videoSrc} className="w-full h-full object-cover" muted loop autoPlay playsInline preload="metadata" />
                          <div className="absolute inset-0 bg-black/20" />
                          <button
                        onClick={(e) => {e.stopPropagation();playFeature();}}
                        className="absolute inset-0 flex items-center justify-center group/play"
                        aria-label={`Play ${clip.title} with sound`}>
                        
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover/play:scale-110">
                              <Play size={28} className="text-white ml-1" fill="currentColor" />
                            </div>
                          </button>
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/50">
                            <Volume2 size={14} />
                            <span className="font-body text-[10px] tracking-wider uppercase">Click to play with sound</span>
                          </div>
                        </> :

                    <video
                      ref={featureRef}
                      src={clip.videoSrc}
                      className="w-full h-full object-contain bg-black"
                      controls playsInline
                      onPause={pauseFeature}
                      onEnded={pauseFeature}
                      onClick={(e) => e.stopPropagation()} />

                    }
                    </div>
                  }
                  <div className={`flex flex-col justify-center ${isActive ? 'ml-auto pl-8 max-w-[380px]' : 'ml-auto max-w-[400px]'}`}>
                    <h3 className="font-heading text-3xl xl:text-4xl text-white mb-2 drop-shadow-lg">{clip.title}</h3>
                    {clip.synopsis && <p className="font-body text-white/90 text-base italic mb-3 drop-shadow-md">{clip.synopsis}</p>}
                    <p className="font-body text-white/60 text-xs tracking-wider uppercase mb-2">{clip.role}</p>
                    <p className="font-body text-white/70 text-sm leading-relaxed mb-4 drop-shadow-sm">{clip.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {clip.tags.map((tag) =>
                      <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white/60 border border-white/20 rounded-full">{tag}</span>
                      )}
                    </div>
                    {isActive &&
                    <button onClick={handleContactClick} className="self-start px-6 py-3 rounded-full bg-white font-body text-xs font-bold tracking-widest uppercase text-black transition-transform hover:scale-105">
                        Contact Me Now
                      </button>
                    }
                  </div>
                </div>

                {/* Mobile play */}
                {isActive && !featurePlaying &&
                <button
                  onClick={(e) => {e.stopPropagation();playFeature();}}
                  className="absolute inset-0 z-10 flex items-center justify-center lg:hidden"
                  aria-label={`Play ${clip.title}`}>
                  
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={28} className="text-white ml-1" fill="currentColor" />
                    </div>
                  </button>
                }
                {isActive && featurePlaying &&
                <div className="absolute inset-0 z-10 bg-black flex items-center justify-center lg:hidden">
                    <video ref={featureRef} src={clip.videoSrc} className="w-full h-full object-contain" controls playsInline autoPlay onPause={pauseFeature} onEnded={pauseFeature} />
                  </div>
                }
              </div>

              {/* Mobile meta */}
              {isActive &&
              <div className="lg:hidden px-6 py-6 bg-black">
                  <h3 className="font-heading text-2xl text-white mb-2">{clip.title}</h3>
                  {clip.synopsis && <p className="font-body text-white/80 text-sm italic mb-2">{clip.synopsis}</p>}
                  <p className="font-body text-white/50 text-xs tracking-wider uppercase mb-2">{clip.role}</p>
                  <p className="font-body text-white/60 text-sm leading-relaxed mb-4">{clip.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {clip.tags.map((tag) =>
                  <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white/50 border border-white/20 rounded-full">{tag}</span>
                  )}
                  </div>
                  <button onClick={handleContactClick} className="px-6 py-3 rounded-full bg-white font-body text-xs font-bold tracking-widest uppercase text-black">Contact Me Now</button>
                </div>
              }
            </div>);

        })}
      </div>
    </section>);

};

/* ─── AMETO Section (single vertical video, red/black theme) ─── */
const AmetoSection = ({ project }: {project: BrandProject;}) => {
  const navigate = useNavigate();
  const [featurePlaying, setFeaturePlaying] = useState(false);
  const featureRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);

  const handleContactClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    },
    [navigate]
  );

  const playFeature = useCallback(() => {
    setFeaturePlaying(true);
    requestAnimationFrame(() => {
      if (featureRef.current) {
        featureRef.current.currentTime = 0;
        featureRef.current.play().catch(() => {});
      }
    });
  }, []);

  const pauseFeature = useCallback(() => {
    setFeaturePlaying(false);
  }, []);

  useEffect(() => {
    if (bgRef.current) bgRef.current.play().catch(() => {});
  }, []);

  return (
    <section data-project-slug="ameto" className="relative overflow-hidden">
      {/* Red/black accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-900" />

      {/* Header */}
      <div className="px-6 py-10 md:px-12 bg-gradient-to-b from-red-950/40 to-transparent">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-red-400 mb-3">Portfolio</p>
          <h2 className="font-films-heading text-5xl md:text-7xl text-white">{project.title}</h2>
          <p className="font-body text-sm text-white/40 mt-2 max-w-xl">{project.subtitle}</p>
        </div>
      </div>

      {/* Main content — vertical video layout */}
      <div className="relative w-full min-h-[80vh]">
        {/* Background video (covers full section, looping) */}
        <video
          ref={bgRef}
          src={project.videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline preload="metadata" />
        
        {/* Dark + red tinted overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-red-950/40" />

        {/* Desktop layout */}
        <div className="relative z-10 hidden lg:flex items-center justify-center min-h-[80vh] px-8 xl:px-16 gap-12">
          {/* Left: vertical feature video */}
          <div className="relative w-[280px] xl:w-[320px] rounded-xl overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)] border border-red-900/30" style={{ aspectRatio: '9/16' }}>
            {!featurePlaying ?
            <>
                <video src={project.videoSrc} className="w-full h-full object-cover" muted loop autoPlay playsInline preload="metadata" />
                <div className="absolute inset-0 bg-black/20" />
                <button
                onClick={playFeature}
                className="absolute inset-0 flex items-center justify-center group/play"
                aria-label={`Play ${project.title} with sound`}>
                
                  <div className="w-16 h-16 rounded-full bg-red-600/30 backdrop-blur-sm flex items-center justify-center transition-transform group-hover/play:scale-110 border border-red-500/40">
                    <Play size={28} className="text-white ml-1" fill="currentColor" />
                  </div>
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/50">
                  <Volume2 size={14} />
                  <span className="font-body text-[10px] tracking-wider uppercase">Play with sound</span>
                </div>
              </> :

            <video
              ref={featureRef}
              src={project.videoSrc}
              className="w-full h-full object-contain bg-black"
              controls playsInline
              onPause={pauseFeature}
              onEnded={pauseFeature} />

            }
          </div>

          {/* Right: free-floating meta */}
          <div className="flex flex-col justify-center max-w-[420px]">
            <h3 className="font-heading text-4xl xl:text-5xl text-white mb-3 drop-shadow-lg">
              {project.title}
            </h3>
            {project.synopsis &&
            <p className="font-body text-red-300/90 text-base italic mb-3 drop-shadow-md">
                {project.synopsis}
              </p>
            }
            <p className="font-body text-white/60 text-xs tracking-wider uppercase mb-2">
              {project.year} · {project.role}
            </p>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-5 drop-shadow-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) =>
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-red-300/70 border border-red-500/30 rounded-full">
                
                  {tag}
                </span>
              )}
            </div>
            <button
              onClick={handleContactClick}
              className="self-start px-6 py-3 rounded-full bg-red-600 font-body text-xs font-bold tracking-widest uppercase text-white transition-transform hover:scale-105 hover:bg-red-500">
              
              Contact Me Now
            </button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="relative z-10 lg:hidden flex flex-col items-center px-6 py-10">
          {/* Vertical video */}
          <div className="relative w-[70vw] max-w-[300px] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.3)] border border-red-900/30" style={{ aspectRatio: '9/16' }}>
            {!featurePlaying ?
            <>
                <video src={project.videoSrc} className="w-full h-full object-cover" muted loop autoPlay playsInline preload="metadata" />
                <div className="absolute inset-0 bg-black/20" />
                <button
                onClick={playFeature}
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Play ${project.title}`}>
                
                  <div className="w-16 h-16 rounded-full bg-red-600/30 backdrop-blur-sm flex items-center justify-center border border-red-500/40">
                    <Play size={28} className="text-white ml-1" fill="currentColor" />
                  </div>
                </button>
              </> :

            <video
              ref={featureRef}
              src={project.videoSrc}
              className="w-full h-full object-contain bg-black"
              controls playsInline autoPlay
              onPause={pauseFeature}
              onEnded={pauseFeature} />

            }
          </div>

          {/* Meta below */}
          <div className="mt-6 text-center">
            <h3 className="font-heading text-3xl text-white mb-2">{project.title}</h3>
            {project.synopsis && <p className="font-body text-red-300/80 text-sm italic mb-2">{project.synopsis}</p>}
            <p className="font-body text-white/50 text-xs tracking-wider uppercase mb-2">{project.year} · {project.role}</p>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-4 max-w-md mx-auto">{project.description}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {project.tags.map((tag) =>
              <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-red-300/60 border border-red-500/30 rounded-full">{tag}</span>
              )}
            </div>
            <button onClick={handleContactClick} className="px-6 py-3 rounded-full bg-red-600 font-body text-xs font-bold tracking-widest uppercase text-white">Contact Me Now</button>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 w-full bg-gradient-to-r from-red-900 via-red-500 to-red-700" />
    </section>);

};

/* ─── Main Page ─── */
const BrandsAds = () => {
  return (
    <main className="min-h-screen pt-16 bg-black">
      <h1 className="sr-only">Brands &amp; Advertisements</h1>
      {brandProjects.map((project) =>
      project.clips ?
      <NiviSection key={project.id} project={project} /> :
      project.theme === 'red' ?
      <AmetoSection key={project.id} project={project} /> :
      <WtvrSection key={project.id} project={project} />
      )}
    </main>);

};

export default BrandsAds;