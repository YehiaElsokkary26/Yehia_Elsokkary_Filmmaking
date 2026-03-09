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
          loading="lazy"
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

      {/* Video grid */}
      <div className="section-padding mood-brown">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcaseVideos.map((vid, i) => (
            <ScrollReveal key={i} delay={i * 150} variant={i % 2 === 0 ? 'left' : 'right'}>
              <div className="film-frame-border">
                <div className="aspect-[9/16] md:aspect-[3/4] overflow-hidden relative group">
                  <video
                    src={vid.src}
                    className="w-full h-full object-cover"
                    muted loop playsInline
                    preload="metadata"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    aria-label={`Video preview: ${vid.caption}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
                    <p className="handwritten text-sm text-studio-white">{vid.caption}</p>
                    <p className="font-body text-[10px] text-studio-white/50 mt-1">{vid.credit}</p>
                  </div>
                </div>
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
          loading="lazy"
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
