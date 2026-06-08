import { useState, useEffect, useCallback, useRef } from 'react';
import { Pause, Play, Volume2, VolumeX, Film } from 'lucide-react';
import { getVideoPoster } from '@/lib/video';

const heroVideoReel = [
  { src: '/videos/aswan.mp4', poster: getVideoPoster('/videos/aswan.mp4') },
];

const HeroVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [grainOn, setGrainOn] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const parallaxTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRefs.current[0];
    if (video) video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const handleScroll = () => {
      const y = window.scrollY;
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.2)`;
      }
      if (parallaxTitleRef.current) {
        const opacity = Math.max(0, 1 - y / 450);
        parallaxTitleRef.current.style.transform = `translate3d(0, -${y * 0.09}px, 0)`;
        parallaxTitleRef.current.style.opacity = String(opacity);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const crossfadeToNext = useCallback(() => {
    setCurrentVideo((prev) => (prev + 1) % heroVideoReel.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => crossfadeToNext(), 8000);
    return () => clearInterval(interval);
  }, [isPaused, crossfadeToNext]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = i === currentVideo ? isMuted : true;
    });
  }, [currentVideo, isMuted]);

  const togglePause = useCallback(() => {
    const v = videoRefs.current[currentVideo];
    if (!isPaused) v?.pause();
    else v?.play().catch(() => {});
    setIsPaused((prev) => !prev);
  }, [isPaused, currentVideo]);

  const toggleMute = useCallback(() => setIsMuted((prev) => !prev), []);

  return (
    <section
      className={`hero-video-shell relative min-h-[100svh] w-full overflow-hidden ${grainOn ? 'film-grain' : ''}`}
      style={{ backgroundColor: '#0d0d0d' }}
      aria-label="Hero video showcase"
    >
      {/* Parallax background */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0) scale(1.2)' }}
      >
        {heroVideoReel.map((clip, i) => (
          <video
            key={clip.src}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={clip.src}
            poster={clip.poster}
            className="absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: currentVideo === i ? 1 : 0 }}
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Background video preview"
          />
        ))}
        {/* Cinematic dark overlay — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />
        {grainOn && <div className="absolute inset-0 vignette pointer-events-none" aria-hidden="true" />}
      </div>

      {/* Title layer */}
      <div
        ref={parallaxTitleRef}
        className={`relative z-10 min-h-[100svh] flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24 will-change-transform transition-all duration-1000 ${
          loaded ? 'opacity-100' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="max-w-5xl">
          {/* Overline */}
          <p className="label-overline mb-5 text-accent/80">
            Visual storyteller
          </p>

          {/* Hero name */}
          <h1 className="font-hero text-[18vw] md:text-[13vw] lg:text-[10vw] xl:text-[148px] text-studio-white uppercase leading-none mb-6 tracking-tight">
            Yehia<br />Elsokkary
          </h1>

          {/* Descriptor */}
          <p className="font-body text-studio-white/70 text-sm md:text-base max-w-md mb-10 tracking-wide font-normal leading-relaxed drop-shadow-lg">
            Photographer · Videographer · Filmmaker — capturing moments that move.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#work"
              className="btn-pill bg-accent text-accent-foreground hover:bg-accent/85"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn-pill border border-studio-white/35 text-studio-white hover:border-studio-white/60 hover:bg-studio-white/8"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Playback controls — bottom left */}
      <div className="absolute bottom-7 left-6 md:left-16 z-20 flex items-center gap-2">
        <button
          onClick={togglePause}
          className="bg-white/8 backdrop-blur-sm text-studio-white p-2.5 rounded-full hover:bg-white/15 transition-all border border-white/8"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play size={13} /> : <Pause size={13} />}
        </button>
        <button
          onClick={toggleMute}
          className="bg-white/8 backdrop-blur-sm text-studio-white p-2.5 rounded-full hover:bg-white/15 transition-all border border-white/8"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>
        <button
          onClick={() => setGrainOn(!grainOn)}
          className="bg-white/8 backdrop-blur-sm text-studio-white p-2.5 rounded-full hover:bg-white/15 transition-all border border-white/8"
          aria-label={grainOn ? 'Disable grain' : 'Enable grain'}
          title={grainOn ? 'Grain On' : 'Grain Off'}
        >
          <Film size={13} className={grainOn ? 'text-accent/80' : 'text-white/35'} />
        </button>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-7 right-6 md:right-16 z-20 hidden md:flex flex-col items-center gap-3">
        <span
          className="font-body text-[9px] tracking-[0.25em] uppercase text-studio-white/50"
          style={{ writingMode: 'vertical-rl' }}
        >
          scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-studio-white/35 to-transparent" />
      </div>

      {/* Video dot indicators */}
      {heroVideoReel.length > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroVideoReel.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentVideo(i)}
              className={`transition-all duration-300 rounded-full ${
                currentVideo === i ? 'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/45'
              }`}
              aria-label={`Play clip ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroVideo;
