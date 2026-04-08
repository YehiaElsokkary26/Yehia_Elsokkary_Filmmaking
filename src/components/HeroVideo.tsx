import { useState, useEffect, useCallback, useRef } from 'react';
import { Shuffle, Pause, Play, Volume2, VolumeX, Settings } from 'lucide-react';

// All project videos for hero rotation — USER UPLOADS
const allHeroVideos = [
  '/videos/reel-1.mp4',
  '/videos/reel-2.mp4',
  '/videos/reel-3.mp4',
  '/videos/reel-4.mp4',
  '/videos/people-of-moiz.mp4',
  '/videos/euphoria.mp4',
  '/videos/geziret.mp4',
  '/videos/dalal-preview.mp4',
  '/videos/upload-1.mp4',
  '/videos/upload-2.mp4',
];

// Fisher-Yates shuffle
const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const HeroVideo = () => {
  const [heroVideos, setHeroVideos] = useState<string[]>(() => shuffleArray(allHeroVideos));
  const [currentVideo, setCurrentVideo] = useState(0);
  const [nextVideo, setNextVideo] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [grainOn, setGrainOn] = useState(true);
  const [shuffleEnabled, setShuffleEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [crossfading, setCrossfading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  // Initial shuffle on mount if enabled
  useEffect(() => {
    if (shuffleEnabled) {
      setHeroVideos(shuffleArray(allHeroVideos));
    }
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Preload next video in advance so crossfade is instant
  useEffect(() => {
    const next = (currentVideo + 1) % heroVideos.length;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = heroVideos[next];
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [currentVideo, heroVideos]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const crossfadeToNext = useCallback(() => {
    const next = (currentVideo + 1) % heroVideos.length;
    setNextVideo(next);
    setCrossfading(true);
    setTimeout(() => {
      setCurrentVideo(next);
      setCrossfading(false);
    }, 1200);
  }, [currentVideo, heroVideos.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => crossfadeToNext(), 6000);
    return () => clearInterval(interval);
  }, [isPaused, currentVideo, crossfadeToNext]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideo]);

  useEffect(() => {
    if (crossfading && nextVideoRef.current) {
      nextVideoRef.current.load();
      nextVideoRef.current.play().catch(() => {});
    }
  }, [crossfading, nextVideo]);

  const togglePause = useCallback(() => {
    if (videoRef.current) {
      if (isPaused) videoRef.current.play();
      else videoRef.current.pause();
    }
    setIsPaused(!isPaused);
  }, [isPaused]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleShuffle = useCallback(() => {
    const newValue = !shuffleEnabled;
    setShuffleEnabled(newValue);
    if (newValue) {
      setHeroVideos(shuffleArray(allHeroVideos));
      setCurrentVideo(0);
    }
  }, [shuffleEnabled]);

  const parallaxBg = scrollY * 0.25;
  const parallaxTitle = scrollY * 0.9;
  const titleOpacity = Math.max(0, 1 - scrollY / 450);

  return (
    <section 
      className={`relative min-h-[100svh] w-full overflow-hidden ${grainOn ? 'film-grain' : ''}`}
      aria-label="Hero video showcase"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${parallaxBg}px, 0) scale(1.2)` }}
      >
        <video
          ref={videoRef}
          src={heroVideos[currentVideo]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${crossfading ? 'opacity-0' : 'opacity-100'}`}
          autoPlay muted={isMuted} loop playsInline
          preload="auto"
          aria-label="Background video preview"
        />
        {crossfading && (
          <video
            ref={nextVideoRef}
            src={heroVideos[nextVideo]}
            className="absolute inset-0 w-full h-full object-cover animate-fade-in"
            autoPlay muted loop playsInline
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-studio-dark/30 via-transparent to-studio-dark/70" />
        {grainOn && <div className="absolute inset-0 vignette pointer-events-none" />}
      </div>

      <div
        className={`relative z-[2] min-h-[100svh] flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24 will-change-transform transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
        style={{ transform: `translate3d(0, -${parallaxTitle * 0.1}px, 0)`, opacity: titleOpacity }}
      >
        <div className="max-w-5xl">
          <p className="handwritten text-xl md:text-2xl text-studio-white/70 mb-4">
            Visual storyteller ✦
          </p>
          <h1 className="font-hero text-8xl md:text-[12vw] lg:text-[9vw] xl:text-[160px] text-studio-white uppercase mb-6">
            Yehia<br />elsokkary
          </h1>
          <p className="font-body text-studio-white/55 text-sm md:text-base max-w-lg mb-10 tracking-wide font-medium">
            Photographer · Videographer · Filmmaker. Capturing moments that move.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#work" className="btn-pill bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground shadow-2xl">
              View My Work
            </a>
            <a href="#contact" className="btn-pill border-2 border-studio-white/30 text-studio-white hover:bg-studio-white/10">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-6 md:left-16 z-[4] flex items-center gap-3">
        <button 
          onClick={() => crossfadeToNext()} 
          className="bg-studio-white/10 backdrop-blur-sm text-studio-white p-2.5 rounded-full hover:bg-studio-white/20 transition-all border border-studio-white/10" 
          aria-label="Next clip"
        >
          <Shuffle size={14} />
        </button>
        <button 
          onClick={togglePause} 
          className="bg-studio-white/10 backdrop-blur-sm text-studio-white p-2.5 rounded-full hover:bg-studio-white/20 transition-all border border-studio-white/10" 
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>
        <button 
          onClick={toggleMute} 
          className="bg-studio-white/10 backdrop-blur-sm text-studio-white p-2.5 rounded-full hover:bg-studio-white/20 transition-all border border-studio-white/10" 
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        
        {/* Settings Toggle */}
        <div className="relative">
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            className="bg-studio-white/10 backdrop-blur-sm text-studio-white p-2.5 rounded-full hover:bg-studio-white/20 transition-all border border-studio-white/10" 
            aria-label="Settings"
            aria-expanded={showSettings}
          >
            <Settings size={14} />
          </button>
          {showSettings && (
            <div className="absolute bottom-12 left-0 bg-studio-dark/90 backdrop-blur-md rounded-lg p-3 min-w-[180px] border border-studio-white/10">
              <label className="flex items-center justify-between gap-3 text-studio-white/80 text-xs">
                <span>Shuffle videos</span>
                <button 
                  onClick={toggleShuffle}
                  className={`w-10 h-5 rounded-full transition-colors ${shuffleEnabled ? 'bg-accent' : 'bg-studio-white/20'}`}
                  role="switch"
                  aria-checked={shuffleEnabled}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${shuffleEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </label>
              <label className="flex items-center justify-between gap-3 text-studio-white/80 text-xs mt-2">
                <span>Film grain</span>
                <button 
                  onClick={() => setGrainOn(!grainOn)}
                  className={`w-10 h-5 rounded-full transition-colors ${grainOn ? 'bg-accent' : 'bg-studio-white/20'}`}
                  role="switch"
                  aria-checked={grainOn}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${grainOn ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 md:right-16 z-[4] hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-studio-white/20" />
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-studio-white/30 rotate-90 origin-center">scroll</span>
      </div>

      {/* Video Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[4] flex gap-2">
        {heroVideos.slice(0, 6).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentVideo(i)}
            className={`transition-all duration-300 rounded-full ${
              currentVideo === i ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-studio-white/30 hover:bg-studio-white/50'
            }`}
            aria-label={`Play clip ${i + 1}`}
          />
        ))}
        {heroVideos.length > 6 && (
          <span className="text-studio-white/40 text-xs ml-1">+{heroVideos.length - 6}</span>
        )}
      </div>
    </section>
  );
};

export default HeroVideo;
