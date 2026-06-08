import { useEffect, useLayoutEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectEntry } from '@/data/portfolioData';
import { getVideoPoster } from '@/lib/video';

interface ProjectModalProps {
  project: ProjectEntry;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const ProjectModal = ({ project, onClose, onPrev, onNext }: ProjectModalProps) => {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && onPrev) onPrev();
    if (e.key === 'ArrowRight' && onNext) onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Synchronous DOM mutation before paint — prevents scroll jank on modal open
  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="absolute inset-0 bg-foreground/90 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4 bg-background rounded-lg shadow-lg">
        {/* Controls */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm border-b border-border/20">
          <div className="flex gap-2">
            {onPrev && (
              <button onClick={onPrev} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Previous project">
                <ChevronLeft size={20} />
              </button>
            )}
            {onNext && (
              <button onClick={onNext} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Next project">
                <ChevronRight size={20} />
              </button>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Media */}
        <div className="p-6">
          <div className={`grid gap-4 ${
            project.media.length > 1 && project.media[0].type === 'image'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}>
            {project.media.map((m, i) => (
              <div key={i} className="overflow-hidden rounded-sm">
                {m.type === 'image' ? (
                  <img src={m.src} alt={m.caption || project.title} className="w-full h-auto object-cover aspect-[4/5]" loading="eager" />
                ) : (
                  <video src={m.src} poster={getVideoPoster(m.src)} controls className="w-full" playsInline preload="none" />
                )}
                {m.caption && <p className="font-handwriting text-sm text-muted-foreground mt-2">{m.caption}</p>}
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="mt-8 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground">{project.title}</h2>
            <div className="flex flex-wrap gap-3 font-body text-xs tracking-wider uppercase text-muted-foreground">
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.role}</span>
            </div>
            <p className="font-body text-muted-foreground leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-border text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
