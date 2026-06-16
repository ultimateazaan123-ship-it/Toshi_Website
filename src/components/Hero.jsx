import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import SplitText from './ui/SplitText';

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="slide hero-slide" id="hero">
      <div className="slide__bg">
        <img src="https://images.unsplash.com/photo-1554679665-f5537f187268?w=1920&q=80" alt="People enjoying vibrant Asian cuisine" />
      </div>
      <div className="slide__overlay" />
      
      <motion.div 
        className="slide__content" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <p className="slide__number" style={{ alignSelf: 'center', paddingLeft: 0, paddingBottom: '2rem' }}>
          01 <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--text-muted)' }}>— {t.hero.tag}</span>
        </p>
        
        <h1 className="slide__title">
          <span className="slide__title--outline">TOSHI</span>
          <SplitText text={t.hero.title} delay={0.5} />
        </h1>
        
        <p className="slide__subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <SplitText text={t.hero.subtitle} delay={1.2} />
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#menu" className="btn-primary">{t.hero.cta1}</a>
        </div>
      </motion.div>

      <div className="scroll-indicator">
        Scroll
      </div>
    </section>
  );
}
