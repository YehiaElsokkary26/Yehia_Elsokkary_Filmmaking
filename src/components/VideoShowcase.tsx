import ScrollReveal from './ScrollReveal';

// Background videos — USER UPLOAD — do not regenerate
const bgVideo = '/videos/upload-1.mp4';
const bottomBgVideo = '/videos/upload-2.mp4';

const showcaseVideos = [
  { src: '/videos/reel-1.mp4', caption: 'cinematic reel ✦', credit: 'Director\'s cut' },
  { src: '/videos/reel-2.mp4', caption: 'behind the scenes', credit: 'BTS footage' },
  { src: '/videos/euphoria.mp4', caption: 'euphoria ✦', credit: 'Short film' },
  { src: '/videos/geziret.mp4', caption: 'geziret el-dahab', credit: 'Documentary' },
];

const VideoShowcase = () => {
  return (
    <section className="relative overflow-hidden" id="reels">
      {/* Main "From the Lens" header with video background */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
         <video
          src={bgVideo}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.15)' }}
          autoPlay muted loop playsInline
          preload="auto"
          aria-label="From the Lens background video — USER UPLOAD"
        />
        <div className="absolute inset-0 bg-studio-dark/70" />
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <ScrollReveal variant="left">
            <div className="text-center">
              <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">Showreel</p>
              <h2 className="editorial-heading text-5xl md:text-7xl lg:text-8xl text-studio-cream">From the Lens</h2>
              <p className="font-body text-studio-cream/50 mt-5 font-medium max-w-md mx-auto text-sm">
                Selected clips, experimental edits, and candid moments.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Immersive video collage — no borders, overlapping, autoplay */}
      <div className="relative py-16 md:py-24 overflow-hidden bg-studio-dark">
        {/* Background layer: all videos playing as a collage */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-0">
          {showcaseVideos.map((vid, i) => (
            <div key={i} className="relative overflow-hidden">
              <video
                src={vid.src}
                className="w-full h-full object-cover scale-110"
                autoPlay muted loop playsInline
                preload="auto"
                aria-label={`Video: ${vid.caption}`}
              />
              <div className="absolute inset-0 bg-studio-dark/30 mix-blend-multiply" />
            </div>
          ))}
        </div>

        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-studio-dark/60 via-transparent to-studio-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-studio-dark/40 via-transparent to-studio-dark/40" />

        {/* Floating captions */}
        <div className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-16 px-6">
          {showcaseVideos.map((vid, i) => (
            <ScrollReveal key={i} delay={i * 150} variant={i % 2 === 0 ? 'left' : 'right'}>
              <div className="text-center">
                <p className="handwritten text-lg md:text-xl text-studio-white drop-shadow-lg">{vid.caption}</p>
                <p className="font-body text-[10px] text-studio-white/50 mt-1 tracking-wider uppercase">{vid.credit}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Bottom subtle background video — 30% opacity (texture only) */}
      <div className="relative py-20 overflow-hidden">
        <video
          src={bottomBgVideo}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay muted loop playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <p className="handwritten text-xl text-muted-foreground">your story, through my lens ✦</p>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground/60 mt-4">
              Capturing authentic moments
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
