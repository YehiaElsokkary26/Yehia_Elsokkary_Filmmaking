import { useState, useRef, useCallback } from 'react';
import { Play } from 'lucide-react';

interface ProjectHeroProps {
  title: string;
  description: string;
  role: string;
  year?: string;
  client?: string;
  credits?: string;
  synopsis?: string;
  tags: string[];
  videoSrc: string;
  ctaLabel?: string;
  onCtaClick?: (e: React.MouseEvent) => void;
  projectSlug: string;
}

const ProjectHero = ({
  title,
  description,
  role,
  year,
  tags,
  videoSrc,
  ctaLabel = 'View project',
  onCtaClick,
  projectSlug,
}: ProjectHeroProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);

  const handlePlay = useCallback(() => {
    if (bgRef.current) bgRef.current.pause();
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
    if (bgRef.current) bgRef.current.play().catch(() => {});
    setIsPlaying(false);
  }, []);

  return (
    <div
      className="project-hero relative w-full overflow-hidden"
      data-project-slug={projectSlug}
    >
      {/* Desktop: side-by-side. Mobile: stacked */}
      <div className="flex flex-col lg:flex-row min-h-[50vh] lg:min-h-[56vh]">
        {/* Video area */}
        <div className="relative w-full lg:w-2/3 aspect-video lg:aspect-auto">
          {/* Background video — always loops */}
          <video
            ref={bgRef}
            src={videoSrc}
            className="project-bg absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            data-bg="true"
            aria-label={`${title} background video`}
          />

          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Play overlay or active player */}
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="absolute inset-0 z-10 flex items-center justify-center group/play focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Play ${title}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover/play:scale-110 group-hover/play:bg-white/30">
                <Play size={36} className="text-white ml-1" fill="currentColor" />
              </div>
            </button>
          ) : (
            <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
              <video
                ref={playerRef}
                src={videoSrc}
                className="w-full h-full object-contain"
                controls
                playsInline
                autoPlay
                onPause={handlePause}
                onEnded={handlePause}
                aria-label={`${title} full video`}
              />
            </div>
          )}
        </div>

        {/* Meta panel */}
        <div className="w-full lg:w-1/3 bg-background/95 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground mb-3">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 font-body text-xs tracking-wider uppercase text-muted-foreground mb-4">
            {year && <span>{year}</span>}
            {year && <span>·</span>}
            <span>{role}</span>
          </div>
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          {onCtaClick && (
            <button
              onClick={onCtaClick}
              className="self-start px-6 py-3 rounded-full bg-primary font-body text-xs font-bold tracking-widest uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
