import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

const galleryImages = [
  { src: "/images/sushi-platter.jpg", alt: "Sushi platter" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", alt: "Lively restaurant atmosphere" },
  { src: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80", alt: "Ramen bowl" },
  { src: "/images/interior-ceiling.jpg", alt: "Cherry blossoms interior" },
  { src: "/images/interior-bar.jpg", alt: "Sushi bar interior" },
  { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", alt: "Poke bowl" },
];

export default function Gallery() {
  const { t } = useLang();

  return (
    <section className="slide" id="gallery">
      <div className="slide__bg">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80" alt="Vibrant atmosphere" style={{ filter: 'brightness(0.2) saturate(1.2)' }} />
      </div>
      <div className="slide__overlay" />

      <motion.div 
        className="slide__content"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="slide__number">05</p>
        <h2 className="slide__title">
          <span className="slide__title--outline">GALERIE</span>
          {t.gallery.title}
        </h2>

        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <motion.div 
              className="gallery-item" 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <img src={img.src} alt={img.alt} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
