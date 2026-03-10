import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import PolaroidCard from '@/components/PolaroidCard';
import ProjectModal from '@/components/ProjectModal';
import { getProjectsByCategory, ProjectEntry, photographyCategories } from '@/data/portfolioData';

const sectionFonts: Record<string, string> = {
  studio: 'font-heading',
  fashion: 'font-fashion-heading',
  street: 'font-street-heading',
};

const CategoryGallery = () => {
  const { category } = useParams<{ category: string }>();
  const catMeta = photographyCategories.find((c) => c.slug === category);
  const items = getProjectsByCategory(category as ProjectEntry['category']);

  const [selected, setSelected] = useState<number | null>(null);

  const openModal = useCallback((idx: number) => setSelected(idx), []);
  const closeModal = useCallback(() => setSelected(null), []);
  const prev = useCallback(() => setSelected((s) => (s !== null && s > 0 ? s - 1 : s)), []);
  const next = useCallback(() => setSelected((s) => (s !== null && s < items.length - 1 ? s + 1 : s)), [items.length]);

  if (!catMeta) return <div className="min-h-screen pt-32 text-center font-body text-muted-foreground">Category not found</div>;

  const headingFont = sectionFonts[category || ''] || 'font-heading';

  return (
    <main className="min-h-screen pt-24">
      <section className="section-padding pb-12">
        <div className="max-w-6xl mx-auto">
          <Link to="/photography" className="font-body text-xs tracking-[0.2em] uppercase text-primary hover:underline mb-6 inline-block">
            ← Photography
          </Link>
          <ScrollReveal variant="left">
            <h1 className={`${headingFont} text-5xl md:text-7xl text-foreground mt-4`}>{catMeta.label}</h1>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={200}>
            <p className="handwritten text-lg text-muted-foreground mt-3">{catMeta.description} ✦</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} variant="scale" delay={i * 100}>
              <PolaroidCard project={p} onClick={() => openModal(i)} />
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

export default CategoryGallery;
