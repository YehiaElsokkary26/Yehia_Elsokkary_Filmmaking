import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

interface CategoryTileProps {
  slug: string;
  label: string;
  thumbnail: string;
  description: string;
  index: number;
}

const CategoryTile = ({ slug, label, thumbnail, description, index }: CategoryTileProps) => (
  <ScrollReveal variant={index % 2 === 0 ? 'left' : 'right'} delay={index * 150}>
    <Link
      to={`/photography/${slug}`}
      className="group block polaroid cursor-pointer"
      style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="pt-3 pb-1 text-center">
        <p className="font-handwriting text-lg text-foreground">{label}</p>
        <p className="font-body text-[10px] text-muted-foreground tracking-wider uppercase mt-1">{description}</p>
      </div>
    </Link>
  </ScrollReveal>
);

export default CategoryTile;
