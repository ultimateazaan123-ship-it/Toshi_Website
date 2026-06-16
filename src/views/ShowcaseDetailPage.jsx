'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getShowcaseSlide, showcaseSlides } from '../data/showcaseSlides';

const placeholderCopy = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.',
];

export default function ShowcaseDetailPage({ slug }) {
  const slide = getShowcaseSlide(slug) || showcaseSlides[0];
  const nextSlide = showcaseSlides[(showcaseSlides.findIndex((item) => item.slug === slide.slug) + 1) % showcaseSlides.length];

  return (
    <main className="detail-page">
      <section className="detail-hero" style={{ '--detail-image': `url(${slide.image})`, '--detail-accent': slide.accent }}>
        <motion.div
          className="detail-hero__image"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="detail-hero__shade" />
        <div className="detail-hero__content">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.title}
          </motion.h1>
        </div>
        <div className="detail-hero__footer">
          <span>Scroll Down</span>
          <span>2026</span>
        </div>
      </section>

      <section className="detail-copy-section">
        <div>
          <p className="detail-kicker">{slide.mood}</p>
          <h2>{slide.title}</h2>
          <Link href="#more">{slide.cta}</Link>
        </div>
        <div className="detail-copy">
          {placeholderCopy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="detail-image-band">
        <img src="/images/interior-ceiling.jpg" alt="Toshi interior" />
      </section>

      <section className="detail-copy-section detail-copy-section--reverse" id="more">
        <div>
          <p className="detail-kicker">Details</p>
          <h2>Experience more</h2>
        </div>
        <div className="detail-copy">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
        </div>
      </section>

      <footer className="detail-footer">
        <Link href="/">Back to Home</Link>
        <div>
          <span>Weiter zu:</span>
          <Link href={`/${nextSlide.slug}`}>{nextSlide.title}</Link>
        </div>
      </footer>
    </main>
  );
}
