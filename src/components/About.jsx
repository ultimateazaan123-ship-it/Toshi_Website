import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

export default function About() {
  const { t } = useLang();

  return (
    <section className="slide" id="about">
      <div className="slide__bg">
        <img src="/images/interior-bar.jpg" alt="Sushi bar interior" />
      </div>
      <div className="slide__overlay" />
      
      <motion.div 
        className="slide__content"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="slide__number">02</p>
        <h2 className="slide__title">
          <span className="slide__title--outline">ÜBER UNS</span>
          {t.about.title}
        </h2>
        
        <div className="about-grid">
          <div className="about-text">
            <p style={{ marginBottom: '2rem' }}>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
