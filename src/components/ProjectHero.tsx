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

  const handlePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (bgRef.current) bgRef.current.pause();
    setIsPlaying(true);
    // Wait for the player video to mount, then play
    requestAnimationFrame(() => {
      if (playerRef.current) {
        playerRef.current.currentTime = 0;
        playerRef.current.play().catch(() => {});
      }
    });
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (bgRef.current) bgRef.current.play().catch(() => {});
  }, []);

  return (
    <div
      className="project-hero relative w-full overflow-hidden"
      data-project-slug={projectSlug}
      data-playing={isPlaying ? 'true' : undefined}
    >
      {/* Full-width with overlay meta */}
      <div className="relative w-full aspect-video min-h-[50vh]">
        {/* Background video — hover to play */}
        <video
          ref={bgRef}
          src={videoSrc}
          poster={(() => { try { /* attempt poster lookup */ return undefined; } catch { return undefined; } })()}
          className="project-bg absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={() => bgRef.current?.play().catch(() => {})}
          onMouseLeave={() => { if (bgRef.current) { bgRef.current.pause(); bgRef.current.currentTime = 0; } }}
          data-bg="true"
          aria-label={`${title} background video — hover to play`}
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
              onPause={handlePause}
              onEnded={handlePause}
              aria-label={`${title} full video`}
            />
          </div>
        )}

        {/* Right-side meta overlay — desktop only */}
        <div className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none hidden lg:flex items-center">
          <div className="w-[340px] xl:w-[400px] bg-black/60 backdrop-blur-sm p-8 xl:p-10 pointer-events-auto flex flex-col justify-center h-full">
            <h3 className="font-heading text-2xl xl:text-3xl text-white mb-3">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2 font-body text-xs tracking-wider uppercase text-white/60 mb-4">
              {year && <span>{year}</span>}
              {year && <span>·</span>}
              <span>{role}</span>
            </div>
            <p className="font-body text-white/80 text-sm leading-relaxed mb-5">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/30 text-white/70"
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

      {/* Mobile meta — stacked below video */}
      <div className="lg:hidden bg-background/95 p-6 md:p-8">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
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
  );
};

export default ProjectHero;
