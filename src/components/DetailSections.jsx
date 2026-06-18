'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const up = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

const viewport = { once: true, amount: 0.35 };

export default function DetailSections({ slide }) {
  const d = slide.detail || {};
  const highlights = d.highlights || [];

  return (
    <>
      {/* LEAD */}
      <section className="sx-lead" style={{ '--accent': slide.accent }}>
        <div className="sx-lead__meta">
          <span className="sx-num">{slide.number}</span>
          <span className="sx-meta-line" />
          <span className="sx-meta-label">{slide.mood}</span>
        </div>
        <div className="sx-lead__body">
          <motion.p
            className="sx-lead__text"
            variants={up}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {d.lead || slide.detailLead}
          </motion.p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      {highlights.length > 0 && (
        <section className="sx-highlights" style={{ '--accent': slide.accent }}>
          <motion.div
            className="sx-sec-head"
            variants={up}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <span className="sx-kicker">Das erwartet dich</span>
            <span className="sx-sec-line" />
          </motion.div>

          <div className="sx-grid">
            {highlights.map(([title, text], i) => (
              <motion.article
                key={title}
                className="sx-card"
                initial={{ opacity: 0, y: 46 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease, delay: i * 0.1 }}
              >
                <span className="sx-card__idx">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="sx-card__rule" />
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* FEATURE IMAGE */}
      <section className="sx-feature">
        <motion.div
          className="sx-feature__frame"
          initial={{ clipPath: 'inset(14% 14% 14% 14%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.15, ease }}
        >
          <motion.div
            className="sx-feature__img"
            style={{ backgroundImage: `url(${slide.image})` }}
            initial={{ scale: 1.25 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease }}
          />
          <div className="sx-feature__cap">
            <span>{slide.mood}</span>
            <span>{slide.title}</span>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="sx-cta" style={{ '--accent': slide.accent }}>
        <motion.span
          className="sx-cta__kicker"
          variants={up}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          {slide.eyebrow}
        </motion.span>
        <motion.h2
          variants={up}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease, delay: 0.06 }}
        >
          {d.ctaTitle || 'Bereit, wenn du es bist'}
        </motion.h2>
        {d.ctaText && (
          <motion.p
            variants={up}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, ease, delay: 0.12 }}
          >
            {d.ctaText}
          </motion.p>
        )}
        <motion.a
          className="sx-cta__btn"
          href={d.ctaHref || '#'}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <span>{slide.cta}</span>
          <span className="sx-cta__arrow" aria-hidden="true">→</span>
        </motion.a>
      </section>
    </>
  );
}
