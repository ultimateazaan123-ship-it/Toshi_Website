import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { highlights } from '../data/menuData';
import SpotlightCard from './ui/SpotlightCard';

function HighlightItem({ item, i }) {
  const { t } = useLang();
  const tagKeys = ['signature', 'bestseller', 'favorit'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.1 }}
    >
      <SpotlightCard className="highlight-card" style={{ height: '100%' }}>
        <div style={{ height: '250px', overflow: 'hidden' }}>
          <img src={item.img || "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80"} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{ color: 'var(--accent)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
            {t.highlights.tags[tagKeys[i % 3]]}
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>{item.name}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{item.desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.price}</span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Highlights() {
  const { t } = useLang();

  return (
    <section className="slide" id="highlights">
      <div className="slide__bg">
        <img src="/images/sushi-platter.jpg" alt="Sushi Platter" />
      </div>
      <div className="slide__overlay" />

      <motion.div 
        className="slide__content"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="slide__number">03</p>
        <h2 className="slide__title">
          <span className="slide__title--outline">HIGHLIGHTS</span>
          {t.highlights.title}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
          {highlights.map((item, i) => (
            <HighlightItem key={i} item={item} i={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
