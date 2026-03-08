import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import VideoTile from '@/components/VideoTile';
import ProjectModal from '@/components/ProjectModal';
import { getProjectsByCategory, ProjectEntry } from '@/data/portfolioData';

const meta: Record<string, { title: string; subtitle: string; headingClass: string }> = {
  'short-films': {
    title: 'Short Films',
    subtitle: 'Cinematic stories, frame by frame ✦',
    headingClass: 'font-films-heading',
  },
  documentaries: {
    title: 'Documentaries',
    subtitle: 'Documenting people, places, moments ✦',
    headingClass: 'font-films-heading',
  },
};

const VideoIndex = () => {
  const { type } = useParams<{ type: string }>();
  const info = meta[type || ''];
  const items = getProjectsByCategory((type || '') as ProjectEntry['category']);

  const [selected, setSelected] = useState<number | null>(null);
  const openModal = useCallback((idx: number) => setSelected(idx), []);
  const closeModal = useCallback(() => setSelected(null), []);
  const prev = useCallback(() => setSelected((s) => (s !== null && s > 0 ? s - 1 : s)), []);
  const next = useCallback(() => setSelected((s) => (s !== null && s < items.length - 1 ? s + 1 : s)), [items.length]);

  if (!info) return <div className="min-h-screen pt-32 text-center font-body text-muted-foreground">Not found</div>;

  return (
    <main className="min-h-screen pt-24">
      <section className="section-padding mood-brown pb-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="editorial-divider !mx-0 mb-8 !bg-accent/30" />
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-5">Video</p>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={150}>
            <h1 className={`${info.headingClass} text-6xl md:text-8xl`}>{info.title}</h1>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={300}>
            <p className="font-handwriting text-lg opacity-60 mt-4">{info.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 150}>
              <VideoTile project={p} onClick={() => openModal(i)} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {selected !== null && items[selected] && (
        <ProjectModal
          project={items[selected]}
          onClose={closeModal}
          onPrev={selected > 0 ? prev : undefined}
          onNext={selected < items.length - 1 ? next : undefined}
        />
      )}
    </main>
  );
};

export default VideoIndex;
