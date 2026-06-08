import ScrollReveal from './ScrollReveal';
import HoverVideo from './HoverVideo';
import { getVideoPoster } from '@/lib/video';
import { Play } from 'lucide-react';

const bgVideo = '/videos/upload-1.mp4';

const showcaseVideos = [
  { src: '/videos/reel-1.mp4', caption: 'Cinematic Reel', credit: "Director's Cut" },
  { src: '/videos/reel-2.mp4', caption: 'Behind the Scenes', credit: 'BTS Footage' },
  { src: '/videos/euphoria.mp4', caption: 'Euphoria', credit: 'Short Film' },
  { src: '/videos/geziret.mp4', caption: 'Geziret El-Dahab', credit: 'Documentary' },
];

const VideoShowcase = () => {
  return (
    <section className="relative overflow-hidden section-deep" id="reels">
      {/* ── Section header with video background ─── */}
      <div className="relative h-[52vh] md:h-[58vh] overflow-hidden">
        <HoverVideo
          src={bgVideo}
          poster={getVideoPoster(bgVideo)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.12)' }}
          preload="none"
          aria-label="Showreel background — hover to play"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <ScrollReveal>
            <div className="text-center px-6">
              <span className="label-overline mb-5 block">Showreel</span>
              <h2
                className="font-fashion-heading text-5xl md:text-7xl lg:text-8xl text-studio-white leading-none"
              >
                From the Lens
              </h2>
              <p className="font-body text-studio-white/60 mt-5 max-w-sm mx-auto text-sm leading-relaxed">
                Selected clips, experimental edits, and candid moments.
              </p>
              <p className="font-body text-studio-white/35 mt-3 text-[10px] tracking-[0.2em] uppercase">
                Hover to preview
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Video grid — 16:9 landscape to preserve cinematic framing ── */}
      <div className="bg-card py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px">
          {showcaseVideos.map((vid, i) => (
            <div
              key={i}
              className="relative group overflow-hidden aspect-video cursor-pointer"
            >
              <HoverVideo
                src={vid.src}
                poster={getVideoPoster(vid.src)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                preload="none"
                aria-label={`${vid.caption} — hover to play`}
              />

              {/* Persistent play icon — disappears when caption appears */}
              <div className="absolute inset-0 flex items-center justify-center z-[3] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Play size={16} className="text-white/75 ml-1" />
                </div>
              </div>

              {/* Caption reveal on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-[4]">
                <p className="font-body text-sm font-semibold text-studio-white tracking-wide">{vid.caption}</p>
                <p className="font-body text-[10px] text-studio-white/50 mt-0.5 tracking-widest uppercase">{vid.credit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom tagline ──────────────────────────── */}
      <div className="relative py-12 overflow-hidden bg-background">
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <p className="font-body text-muted-foreground text-sm">your story, through my lens</p>
            <p className="label-overline mt-4 text-muted-foreground/50">
              Capturing authentic moments
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
