import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2 } from 'lucide-react';

interface NiviClip {
  id: string;
  title: string;
  description: string;
  role: string;
  tags: string[];
  videoSrc: string;
  year?: string;
  client?: string;
  synopsis?: string;
}

const niviClips: NiviClip[] = [
  {
    id: 'nivi-campaign',
    title: 'NIVI — Campaign',
    description:
      "Campaign concept: 'Who we vibe with' — a comedic sketch where a person not wearing the beanie clearly doesn't 'vibe' with the group.",
    role: 'Director / Creative / Photographer',
    tags: ['campaign', 'sketch', 'comedy'],
    videoSrc: '/videos/nevi-preview.mp4',
    synopsis: 'Playful, sketch-like comedy selling the beanie as a social signal.',
  },
  {
    id: 'nivi-bts',
    title: 'NIVI — Behind the Scenes',
    description:
      'Go behind the camera — capturing candid moments between takes, lighting setups, and the creative energy that brought the campaign to life.',
    role: 'Director / Creative',
    tags: ['bts', 'fashion'],
    videoSrc: '/videos/nevi-2.mp4',
    synopsis: 'Candid moments, lighting setups, raw creative energy.',
  },
  {
    id: 'nivi-lookbook',
    title: 'NIVI — Lookbook',
    description:
      'A cinematic lookbook reel pairing the beanie with street-ready fits. Texture, color blocking, and attitude across multiple Cairo locations.',
    role: 'Director / Photographer',
    tags: ['lookbook', 'cinematic'],
    videoSrc: '/videos/nevi-3.mp4',
    synopsis: 'Cinematic street-style lookbook shot across Cairo.',
  },
];

const BrandsAds = () => {
  const navigate = useNavigate();
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
    [navigate],
  );

  // Switch active clip
  const selectClip = useCallback((idx: number) => {
    setActiveIdx(idx);
    setFeaturePlaying(false);
  }, []);

  // Play feature video with sound
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

  // Ensure background videos autoplay
  useEffect(() => {
    bgRefs.current.forEach((v) => {
      if (v) v.play().catch(() => {});
    });
  }, []);

  const active = niviClips[activeIdx];

  return (
    <main className="min-h-screen pt-16 bg-black" data-project-slug="nivi">
      {/* Header */}
      <section className="px-6 py-10 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">
            Portfolio
          </p>
          <h1 className="font-films-heading text-5xl md:text-7xl text-white">
            NIVI
          </h1>
          <p className="font-body text-sm text-white/40 mt-2 max-w-xl">
            Beanie brand campaign — direction, creative concept &amp; production across three formats.
          </p>
        </div>
      </section>

      {/* Clip selector tabs */}
      <div className="px-6 md:px-12 mb-2">
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap">
          {niviClips.map((clip, i) => (
            <button
              key={clip.id}
              onClick={() => selectClip(i)}
              className={`px-5 py-2.5 rounded-full font-body text-xs font-bold tracking-widest uppercase transition-all ${
                i === activeIdx
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {clip.title.replace('NIVI — ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main content: sequential video sections */}
      <div className="flex flex-col">
        {niviClips.map((clip, i) => {
          const isActive = i === activeIdx;
          return (
            <section
              key={clip.id}
              className={`relative w-full transition-opacity duration-700 cursor-pointer ${
                isActive ? 'opacity-100' : 'opacity-30 hover:opacity-50'
              }`}
              onClick={() => selectClip(i)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${clip.title}`}
              onKeyDown={(e) => e.key === 'Enter' && selectClip(i)}
            >
              <div className="relative w-full aspect-video max-h-[70vh]">
                {/* Background video */}
                <video
                  ref={(el) => { bgRefs.current[i] = el; }}
                  src={clip.videoSrc}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Desktop layout: feature player left, meta right */}
                <div className="absolute inset-0 z-10 hidden lg:flex items-center justify-between px-8 xl:px-16">
                  {/* Left: feature video (only for active) */}
                  {isActive && (
                    <div className="relative w-[40%] max-w-[500px] aspect-video rounded-lg overflow-hidden shadow-2xl">
                      {!featurePlaying ? (
                        <>
                          <video
                            src={clip.videoSrc}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            autoPlay
                            playsInline
                            preload="metadata"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          <button
                            onClick={(e) => { e.stopPropagation(); playFeature(); }}
                            className="absolute inset-0 flex items-center justify-center group/play"
                            aria-label={`Play ${clip.title} with sound`}
                          >
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover/play:scale-110">
                              <Play size={28} className="text-white ml-1" fill="currentColor" />
                            </div>
                          </button>
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/50">
                            <Volume2 size={14} />
                            <span className="font-body text-[10px] tracking-wider uppercase">Click to play with sound</span>
                          </div>
                        </>
                      ) : (
                        <video
                          ref={featureRef}
                          src={clip.videoSrc}
                          className="w-full h-full object-contain bg-black"
                          controls
                          playsInline
                          onPause={pauseFeature}
                          onEnded={pauseFeature}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </div>
                  )}

                  {/* Right: free-floating meta text */}
                  <div className={`flex flex-col justify-center ${isActive ? 'ml-auto pl-8 max-w-[380px]' : 'ml-auto max-w-[400px]'}`}>
                    <h3 className="font-heading text-3xl xl:text-4xl text-white mb-2 drop-shadow-lg">
                      {clip.title}
                    </h3>
                    {clip.synopsis && (
                      <p className="font-body text-white/90 text-base italic mb-3 drop-shadow-md">
                        {clip.synopsis}
                      </p>
                    )}
                    <p className="font-body text-white/60 text-xs tracking-wider uppercase mb-2">
                      {clip.role}
                    </p>
                    <p className="font-body text-white/70 text-sm leading-relaxed mb-4 drop-shadow-sm">
                      {clip.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {clip.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white/60 border border-white/20 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {isActive && (
                      <button
                        onClick={handleContactClick}
                        className="self-start px-6 py-3 rounded-full bg-white font-body text-xs font-bold tracking-widest uppercase text-black transition-transform hover:scale-105"
                      >
                        Contact Me Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile: just play indicator for active */}
                {isActive && !featurePlaying && (
                  <button
                    onClick={(e) => { e.stopPropagation(); playFeature(); }}
                    className="absolute inset-0 z-10 flex items-center justify-center lg:hidden"
                    aria-label={`Play ${clip.title}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={28} className="text-white ml-1" fill="currentColor" />
                    </div>
                  </button>
                )}
                {isActive && featurePlaying && (
                  <div className="absolute inset-0 z-10 bg-black flex items-center justify-center lg:hidden">
                    <video
                      ref={featureRef}
                      src={clip.videoSrc}
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      autoPlay
                      onPause={pauseFeature}
                      onEnded={pauseFeature}
                    />
                  </div>
                )}
              </div>

              {/* Mobile meta */}
              {isActive && (
                <div className="lg:hidden px-6 py-6 bg-black">
                  <h3 className="font-heading text-2xl text-white mb-2">{clip.title}</h3>
                  {clip.synopsis && (
                    <p className="font-body text-white/80 text-sm italic mb-2">{clip.synopsis}</p>
                  )}
                  <p className="font-body text-white/50 text-xs tracking-wider uppercase mb-2">{clip.role}</p>
                  <p className="font-body text-white/60 text-sm leading-relaxed mb-4">{clip.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {clip.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white/50 border border-white/20 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <button onClick={handleContactClick} className="px-6 py-3 rounded-full bg-white font-body text-xs font-bold tracking-widest uppercase text-black">
                    Contact Me Now
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default BrandsAds;
