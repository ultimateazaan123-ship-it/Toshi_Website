'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getShowcaseSlide, showcaseSlides } from '../data/showcaseSlides';
import DetailSections from '../components/DetailSections';

export default function ShowcaseDetailPage({ slug }) {
  const slide = getShowcaseSlide(slug) || showcaseSlides[0];
  const nextSlide = showcaseSlides[(showcaseSlides.findIndex((item) => item.slug === slide.slug) + 1) % showcaseSlides.length];

  return (
    <main className="slide-expand slide-expand--page">
      <section className="slide-expand__hero" style={{ '--accent': slide.accent }}>
        <motion.div
          className="slide-expand__image"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="slide-expand__shade" />
        <div className="slide-expand__hero-top">
          <span className="sx-hero-num">{slide.number}</span>
          <span className="sx-hero-mood">{slide.mood}</span>
        </div>
        <div className="slide-expand__center">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.title}
          </motion.h2>
        </div>
        <div className="slide-expand__scroll-cue">
          <span>Scrollen</span>
          <span className="sx-scroll-line" />
        </div>
      </section>

      <DetailSections slide={slide} />

      <footer className="sx-foot">
        <Link href="/" className="sx-foot__back">
          <span className="sx-foot__back-ico" aria-hidden="true">←</span>
          Zur Startseite
        </Link>
        <Link href={`/${nextSlide.slug}`} className="sx-foot__next">
          <span className="sx-foot__next-label">Weiter — {nextSlide.number}</span>
          <span className="sx-foot__next-title">{nextSlide.title}</span>
          <span
            className="sx-foot__next-thumb"
            style={{ backgroundImage: `url(${nextSlide.image})` }}
          />
        </Link>
      </footer>
    </main>
  );
}
