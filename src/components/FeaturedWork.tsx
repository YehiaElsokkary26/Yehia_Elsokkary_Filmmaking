import ScrollReveal from './ScrollReveal';

const videoBackgrounds = [
'/videos/reel-1.mp4',
'/videos/reel-2.mp4',
'/videos/reel-3.mp4',
'/videos/reel-4.mp4'];


const featuredProjects = [
{
  title: 'Urban Stories',
  category: 'Short Film',
  date: '2025',
  description: 'A cinematic exploration of city life through the eyes of its people. Raw, real, and unfiltered.'
},
{
  title: 'Golden Hour',
  category: 'Music Video',
  date: '2025',
  description: 'Capturing the magic of sunset sessions — music, movement, and golden light.'
},
{
  title: 'The Portrait Series',
  category: 'Photography',
  date: '2024',
  description: 'Intimate portraits that reveal character. Natural light, real emotions, no filters.'
},
{
  title: 'Night Vision',
  category: 'Commercial',
  date: '2024',
  description: 'After-dark energy brought to life. Neon, shadows, and the pulse of the night.'
}];


const FeaturedWork = () => {
  return (
    <section className="relative overflow-hidden" id="work">
      <div className="section-padding mood-teal pb-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="mb-4">
              <div className="editorial-divider !mx-0 mb-8" />
              <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5">Portfolio</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="left" delay={150}>
            <h2 className="editorial-display text-6xl md:text-8xl lg:text-9xl text-foreground" style={{ transform: 'rotate(-2deg)' }}>My Work</h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={300}>
            <p className="handwritten text-lg text-muted-foreground mt-4">Every frame tells a story ✦</p>
          </ScrollReveal>
        </div>
      </div>

      {featuredProjects.map((project, i) => {
        const isEven = i % 2 === 0;
        const videoSrc = videoBackgrounds[i % videoBackgrounds.length];
        const isFullHeight = i % 3 === 0;

        return (
          <div key={project.title} className="relative group">
            <div className={`relative ${isFullHeight ? 'h-[90vh]' : 'h-[60vh] md:h-[75vh]'} overflow-hidden`}>
              <div className="absolute inset-0 will-change-transform">
                <video
                  src={videoSrc}
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.2)' }}
                  autoPlay muted loop playsInline />
                
                <div className={`absolute inset-0 ${
                i % 4 === 0 ? 'bg-studio-teal/15' :
                i % 4 === 1 ? 'bg-accent/10' :
                i % 4 === 2 ? 'bg-studio-brown/20' :
                'bg-studio-dark/15'} mix-blend-multiply`
                } />
                <div className={`absolute inset-0 ${
                isEven ?
                'bg-gradient-to-r from-studio-dark/80 via-studio-dark/35 to-transparent' :
                'bg-gradient-to-l from-studio-dark/80 via-studio-dark/35 to-transparent'}`
                } />
              </div>

              <div className="absolute inset-0 flex items-center z-[2] px-8 md:px-20 lg:px-32">
                <div className={`max-w-xl ${isEven ? '' : 'ml-auto text-right'}`}>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={100}>
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent font-bold">
                      {project.category} — {project.date}
                    </span>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={250}>
                    <h3 className="editorial-display md:text-7xl lg:text-8xl text-studio-white mt-4 leading-[0.92] py-[4px] my-[24px] mx-[81px] px-0 text-5xl text-justify">
                      {project.title}
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? 'left' : 'right'} delay={400}>
                    <p className="font-body text-studio-white/60 mt-6 text-sm md:text-base max-w-md leading-relaxed">
                      {project.description}
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>

            {i < featuredProjects.length - 1 &&
            <div className="h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            }
          </div>);

      })}
    </section>);

};

export default FeaturedWork;