import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import Link from 'next/link';
import SplitText from './ui/SplitText';

export default function StoryTeaser() {
  const { t } = useLang();

  return (
    <section className="slide" id="story-teaser" style={{ background: '#0a0a0a' }}>
      <div className="slide__bg">
        <img src="/images/interior-ceiling.jpg" alt="Atmospheric Interior" style={{ opacity: 0.4 }} />
      </div>
      <div className="slide__overlay" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.9), transparent)' }} />
      
      <motion.div 
        className="slide__content"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'left', alignItems: 'flex-start' }}
      >
        <p className="slide__number" style={{ alignSelf: 'flex-start' }}>02</p>
        <h2 className="slide__title" style={{ textAlign: 'left' }}>
          <span className="slide__title--outline">{t.nav.about.toUpperCase()}</span>
          <SplitText text={t.nav.about} delay={0.5} />
        </h2>
        
        <p style={{ maxWidth: '500px', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem' }}>
          {t.story.chapter1.p1}
        </p>
        
        <Link href="/story" className="btn-primary" style={{ display: 'inline-block' }}>
          {t.hero.cta1}
        </Link>
      </motion.div>
    </section>
  );
}
