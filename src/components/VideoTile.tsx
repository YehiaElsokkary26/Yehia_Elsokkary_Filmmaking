import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { ProjectEntry } from '@/data/portfolioData';
import { getVideoPoster } from '@/lib/video';

interface VideoTileProps {
  project: ProjectEntry;
  onClick: () => void;
}

const VideoTile = ({ project, onClick }: VideoTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoMedia = project.media.find((m) => m.type === 'video');
  if (!videoMedia) return null;

  const poster = getVideoPoster(videoMedia.src);

  return (
    <button
      onClick={onClick}
      className="group relative block w-full text-left overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Play ${project.title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-foreground/10">
        <video
          ref={videoRef}
          src={videoMedia.src}
          poster={poster}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsVideoReady(true)}
          onMouseEnter={() => videoRef.current?.play().catch(() => {})}
          onMouseLeave={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
        />
        {!isVideoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-foreground/20 border-t-accent" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
          <Play size={40} className="text-studio-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-xl text-foreground">{project.title}</h3>
        <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
        <div className="flex gap-2 mt-2 font-body text-[10px] tracking-wider uppercase text-muted-foreground">
          <span>{project.year}</span>
          <span>·</span>
          <span>{project.role}</span>
        </div>
      </div>
    </button>
  );
};

export default VideoTile;
