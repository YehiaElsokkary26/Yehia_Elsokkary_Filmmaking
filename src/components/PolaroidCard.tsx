import { ProjectEntry } from '@/data/portfolioData';

interface PolaroidCardProps {
  project: ProjectEntry;
  onClick: () => void;
  className?: string;
}

const rotations = [-6, 3, -2, 5, -4, 1, -3, 6, -1, 4];

const PolaroidCard = ({ project, onClick, className = '' }: PolaroidCardProps) => {
  const rot = rotations[project.id.charCodeAt(project.id.length - 1) % rotations.length];
  const thumb = project.media[0];

  return (
    <button
      onClick={onClick}
      className={`group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      aria-label={`View project: ${project.title}`}
    >
      <div
        className="polaroid cursor-pointer"
        style={{ transform: `rotate(${rot}deg)` }}
      >
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          {thumb.type === 'image' ? (
            <img
              src={thumb.src}
              alt={thumb.caption || project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <video
              src={thumb.src}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
            />
          )}
        </div>
        <p className="polaroid-caption">{project.title}</p>
      </div>
    </button>
  );
};

export default PolaroidCard;
