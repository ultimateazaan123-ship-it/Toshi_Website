import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import Starfield from '../components/ui/Starfield';
import SplitText from '../components/ui/SplitText';

export default function StoryPage() {
  const { t } = useLang();

  return (
    <main className="snap-container" style={{ background: '#050505' }}>
      <Starfield />

      <section className="slide" id="chapter1">
        <div className="slide__bg">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80" alt="Atmospheric Dining" style={{ filter: 'brightness(0.2) saturate(1.2)' }} />
        </div>
        <div className="slide__overlay" />

        <motion.div
          className="slide__content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="slide__number">01</p>
          <h2 className="slide__title">
            <span className="slide__title--outline">KAPITEL 1</span>
            <SplitText text={t.story.chapter1.title} delay={0.5} />
          </h2>
          <div className="about-grid">
            <div className="about-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.8, textAlign: 'center' }}>{t.story.chapter1.p1}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="slide" id="chapter2">
        <div className="slide__bg">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80" alt="Artisan Craft" style={{ filter: 'brightness(0.2) saturate(1.2)' }} />
        </div>
        <div className="slide__overlay" />

        <motion.div
          className="slide__content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="slide__number">02</p>
          <h2 className="slide__title">
            <span className="slide__title--outline">KAPITEL 2</span>
            <SplitText text={t.story.chapter2.title} delay={0.5} />
          </h2>
          <div className="about-grid">
            <div className="about-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.8, textAlign: 'center' }}>{t.story.chapter2.p1}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="slide" id="chapter3">
        <div className="slide__bg">
          <img src="https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=1920&q=80" alt="Vibrant Atmosphere" style={{ filter: 'brightness(0.2) saturate(1.2)' }} />
        </div>
        <div className="slide__overlay" />

        <motion.div
          className="slide__content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="slide__number">03</p>
          <h2 className="slide__title">
            <span className="slide__title--outline">KAPITEL 3</span>
            <SplitText text={t.story.chapter3.title} delay={0.5} />
          </h2>
          <div className="about-grid">
            <div className="about-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.8, textAlign: 'center' }}>{t.story.chapter3.p1}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
