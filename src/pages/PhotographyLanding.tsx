import ScrollReveal from '@/components/ScrollReveal';
import CategoryTile from '@/components/CategoryTile';
import { photographyCategories } from '@/data/portfolioData';

const PhotographyLanding = () => (
  <main className="min-h-screen pt-24">
    <section className="section-padding mood-teal pb-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal variant="left">
          <div className="editorial-divider !mx-0 mb-8" />
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5">Photography</p>
        </ScrollReveal>
        <ScrollReveal variant="left" delay={150}>
          <h1 className="font-photo-heading text-6xl md:text-8xl text-foreground">Photography</h1>
        </ScrollReveal>
        <ScrollReveal variant="right" delay={300}>
          <p className="handwritten text-lg text-muted-foreground mt-4">Moments frozen in time ✦</p>
        </ScrollReveal>
      </div>
    </section>

    <section className="section-padding">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {photographyCategories.map((cat, i) => (
          <CategoryTile
            key={cat.slug}
            slug={cat.slug}
            label={cat.label}
            thumbnail={cat.thumbnail}
            description={cat.description}
            index={i}
          />
        ))}
      </div>
    </section>
  </main>
);

export default PhotographyLanding;
