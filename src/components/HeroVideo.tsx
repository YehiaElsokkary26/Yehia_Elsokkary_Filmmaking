import { useState, useEffect, useCallback, useRef } from 'react';
import { Shuffle, Pause, Play, Volume2, VolumeX, Settings } from 'lucide-react';
import { getVideoPoster } from '@/lib/video';

const heroVideoReel = [
  { src: '/videos/aswan.mp4', poster: getVideoPoster('/videos/aswan.mp4') },
];

const HeroVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [grainOn, setGrainOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const handleScroll = () => setScrollY(window.scrollY);
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

  // Manage play/pause/mute for all videos — only the active one plays
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = i === currentVideo ? isMuted : true;
      if (i === currentVideo && !isPaused) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [currentVideo, isPaused, isMuted]);

  const togglePause = useCallback(() => {
    const v = videoRefs.current[currentVideo];
    if (!isPaused) v?.pause();
    else v?.play().catch(() => {});
    setIsPaused((prev) => !prev);
  }, [isPaused, currentVideo]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const parallaxBg = scrollY * 0.25;
  const parallaxTitle = scrollY * 0.9;
  const titleOpacity = Math.max(0, 1 - scrollY / 450);

  return (
    <section 
      className={`hero-video-shell relative min-h-[100svh] w-full overflow-hidden ${grainOn ? 'film-grain' : ''}`}
      style={{ backgroundColor: '#1a1a1a' }}
      aria-label="Hero video showcase"
    >
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translate3d(0, ${parallaxBg}px, 0) scale(1.2)` }}
      >
        {/* Render all videos stacked; only active one is visible */}
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
            preload="none"
            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
            aria-label="Background video preview"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/30 via-transparent to-[#1a1a1a]/70" />
        {grainOn && <div className="absolute inset-0 vignette pointer-events-none" />}
      </div>

      <div
        className={`relative z-10 min-h-[100svh] flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24 will-change-transform transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
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
      <div className="absolute bottom-6 left-6 md:left-16 z-20 flex items-center gap-3">
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
            <div className="absolute bottom-12 left-0 bg-[#1a1a1a]/90 backdrop-blur-md rounded-lg p-3 min-w-[180px] border border-studio-white/10">
              <label className="flex items-center justify-between gap-3 text-studio-white/80 text-xs">
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

      <div className="absolute bottom-6 right-6 md:right-16 z-20 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-studio-white/20" />
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-studio-white/30 rotate-90 origin-center">scroll</span>
      </div>

      {/* Video Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroVideoReel.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentVideo(i)}
            className={`transition-all duration-300 rounded-full ${
              currentVideo === i ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-studio-white/30 hover:bg-studio-white/50'
            }`}
            aria-label={`Play clip ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroVideo;