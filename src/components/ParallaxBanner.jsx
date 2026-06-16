import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

export default function ParallaxBanner() {
  const { t } = useLang();

  return (
    <section className="parallax-banner">
      <div className="parallax-banner__bg">
        <img src="/images/interior-ceiling.jpg" alt="Japanese cuisine atmosphere" />
      </div>
      <div className="hero__overlay" />
      <div className="parallax-banner__content" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2 className="parallax-banner__title" style={{ whiteSpace: 'pre-line' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}>
          {t.banner.title}
        </motion.h2>
        <motion.p className="parallax-banner__text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {t.banner.text}
        </motion.p>
      </div>
    </section>
  );
}
