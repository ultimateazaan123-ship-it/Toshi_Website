import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { showcaseSlides as slides } from '../data/showcaseSlides';

const menuItems = [
  ['Sushi Menus', '10 Nigiri, maki sets, inside-out rolls', '/images/sushi-platter.jpg'],
  ['Nigiri', 'Sake, maguro, ebi, unagi and tamago', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=900&q=80'],
  ['Maki', 'Clean classics with salmon, tuna, avocado and cucumber', 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=900&q=80'],
  ['Warm Kitchen', 'Noodles, curry, teriyaki salmon and crispy duck', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&q=80'],
  ['Bowls', 'Poke, buddha bowls and teriyaki rice bowls', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80'],
];

const slideVariants = {
  enter: (direction) => ({
    y: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    y: '0%',
  },
  exit: (direction) => ({
    y: direction > 0 ? '-100%' : '100%',
  }),
};

const imageVariants = {
  enter: (direction) => ({
    y: direction > 0 ? '-18%' : '18%',
  }),
  center: {
    y: '0%',
  },
  exit: (direction) => ({
    y: direction > 0 ? '18%' : '-18%',
  }),
};

const smallTextVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 22 : -22,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    y: direction > 0 ? -22 : 22,
    opacity: 0,
  }),
};

export default function OkamiShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [quickOpen, setQuickOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [expandedSlide, setExpandedSlide] = useState(null);
  const [titleOffset, setTitleOffset] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);
  const expandRef = useRef(null);
  const isLocked = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const goTo = useCallback((nextIndex) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, nextIndex));
    if (clamped === active) return;
    setDirection(clamped > active ? 1 : -1);
    setActive(clamped);
  }, [active]);

  const step = useCallback((delta) => {
    if (isLocked.current) return;
    const next = active + delta;
    if (next < 0 || next >= slides.length) return;
    isLocked.current = true;
    goTo(next);
    window.setTimeout(() => {
      isLocked.current = false;
    }, prefersReducedMotion ? 120 : 1150);
  }, [active, goTo, prefersReducedMotion]);

  useEffect(() => {
    let touchStart = 0;

    const onWheel = (event) => {
      if (quickOpen || expandedSlide || Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    };

    const onKey = (event) => {
      if (quickOpen || expandedSlide) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') step(1);
      if (event.key === 'ArrowUp' || event.key === 'PageUp') step(-1);
    };

    const onTouchStart = (event) => {
      touchStart = event.touches[0].clientY;
    };

    const onTouchEnd = (event) => {
      const touchEnd = event.changedTouches[0].clientY;
      const delta = touchStart - touchEnd;
      if (Math.abs(delta) > 45) step(delta > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [quickOpen, expandedSlide, step]);

  useEffect(() => {
    let raf = 0;

    const onMove = (event) => {
      setPointer({ x: event.clientX, y: event.clientY });

      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        stageRef.current?.style.setProperty('--pointer-x', `${event.clientX}px`);
        stageRef.current?.style.setProperty('--pointer-y', `${event.clientY}px`);
        stageRef.current?.style.setProperty('--depth-x', `${x * -24}px`);
        stageRef.current?.style.setProperty('--depth-y', `${y * -18}px`);
        stageRef.current?.style.setProperty('--copy-x', `${x * 8}px`);
        stageRef.current?.style.setProperty('--copy-y', `${y * 6}px`);
        raf = 0;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const transition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 1.08, ease: [0.76, 0, 0.24, 1] };

  const textTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.72, ease: [0.22, 1, 0.36, 1] };

  const current = slides[active];
  const titleShift = `${active * (-100 / slides.length)}%`;
  const strokeShift = `${(active + 1) * (-100 / (slides.length + 1))}%`;

  const openSlide = useCallback((slide, event) => {
    if (expandedSlide) return;
    if (event) {
      const el = event.currentTarget.querySelector('.okami-title-word');
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setTitleOffset({
          x: cx - window.innerWidth / 2,
          y: cy - window.innerHeight / 2,
        });
      }
    } else {
      setTitleOffset({ x: 0, y: 0 });
    }
    setExpandedSlide(slide);
  }, [expandedSlide]);

  useEffect(() => {
    document.body.style.overflow = expandedSlide ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [expandedSlide]);

  return (
    <main className="okami-showcase snap-container" aria-live="polite">
      <div
        className="okami-stage"
        ref={stageRef}
        style={{
          '--slide-accent': current.accent,
          '--title-shift': titleShift,
          '--stroke-shift': strokeShift,
        }}
      >
        <div className="okami-ambient" aria-hidden="true" />
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current.id}
            className="okami-slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <motion.div
              className="okami-slide__image-shell"
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <div className="okami-slide__image" style={{ backgroundImage: `url(${current.image})` }} />
            </motion.div>
            <div className="okami-slide__shade" />
          </motion.div>
        </AnimatePresence>

        <div className="okami-copy">
          <div className="okami-title-mask">
            <div className="okami-title-track">
              {slides.map((item, index) => (
                <h1
                  className={`okami-title-row${index === active ? ' is-active' : ''}`}
                  key={item.id}
                  role={index === active ? 'button' : undefined}
                  tabIndex={index === active ? 0 : -1}
                  onClick={(e) => index === active && openSlide(item, e)}
                  onKeyDown={(event) => {
                    if (index === active && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      openSlide(item, null);
                    }
                  }}
                >
                  <span className="okami-title-word" data-title={item.title}>{item.title}</span>
                  <span className="okami-title-number">{item.number}</span>
                </h1>
              ))}
            </div>
          </div>
        </div>

        <div className="okami-rail">
          <button type="button" onClick={() => step(-1)} aria-label="Previous slide">Up</button>
          <div className="okami-progress">
            <span style={{ height: `${((active + 1) / slides.length) * 100}%` }} />
          </div>
          <button type="button" onClick={() => step(1)} aria-label="Next slide">Down</button>
        </div>

        <div className="okami-bottom-caption">
          <button type="button" onClick={() => step(-1)} aria-label="Previous slide">Up</button>
          <button type="button" onClick={() => step(1)} aria-label="Next slide">Down</button>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={current.note}
              custom={direction}
              variants={smallTextVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={textTransition}
            >
              {current.note}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="okami-social">
          <a href="https://www.instagram.com/toshi.dresden/" target="_blank" rel="noopener noreferrer">In</a>
          <a href="https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche-freital" target="_blank" rel="noopener noreferrer">Order</a>
        </div>
      </div>

      <section id="menu" className="okami-menu-anchor">
        <h2>{t.menu.title}</h2>
      </section>
      <section id="gallery" className="okami-menu-anchor" />
      <section id="contact" className="okami-menu-anchor" />

      <AnimatePresence>
        {quickOpen && (
          <motion.div
            className="okami-quickmenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button className="okami-quickmenu__close" type="button" onClick={() => setQuickOpen(false)} aria-label="Close menu" />
            <div className="okami-quickmenu__inner">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="quick-project"
                  onMouseEnter={() => setHoveredMenu({ title: item.title, image: item.image })}
                  onMouseLeave={() => setHoveredMenu(null)}
                  onClick={() => {
                    setQuickOpen(false);
                    goTo(index);
                  }}
                >
                  <span>{item.title}<em>{item.number}</em></span>
                  <small>{item.eyebrow}</small>
                </button>
              ))}

              <div className="quick-menu-list">
                {menuItems.map(([name, desc, image]) => (
                  <a
                    href="/speisekarte"
                    key={name}
                    onMouseEnter={() => setHoveredMenu({ title: name, image })}
                    onMouseLeave={() => setHoveredMenu(null)}
                    onClick={() => setQuickOpen(false)}
                  >
                    <span>{name}</span>
                    <small>{desc}</small>
                  </a>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {hoveredMenu && (
                <motion.div
                  className="hover-reveal"
                  initial={{ opacity: 0, scale: 0.82, clipPath: 'inset(0 100% 0 0)' }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    clipPath: 'inset(0 0% 0 0)',
                    x: pointer.x + 26,
                    y: pointer.y - 150,
                  }}
                  exit={{ opacity: 0, scale: 0.9, clipPath: 'inset(0 0 0 100%)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{ backgroundImage: `url(${hoveredMenu.image})` }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedSlide && (
          <motion.div
            ref={expandRef}
            className="slide-expand"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              className="slide-expand__close"
              type="button"
              onClick={() => setExpandedSlide(null)}
              aria-label="Close"
            />

            <section className="slide-expand__hero">
              <motion.div
                className="slide-expand__image"
                style={{ backgroundImage: `url(${expandedSlide.image})` }}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="slide-expand__shade" />
              <div className="slide-expand__center">
                <motion.h2
                  initial={{ x: titleOffset.x, y: titleOffset.y }}
                  animate={{ x: 0, y: 0 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  {expandedSlide.title}
                </motion.h2>
              </div>
              <div className="slide-expand__scroll-hint">
                <span>Scroll Down</span>
                <span>2026</span>
              </div>
            </section>

            <section className="detail-copy-section">
              <div>
                <p className="detail-kicker">{expandedSlide.mood}</p>
                <h2>{expandedSlide.title}</h2>
              </div>
              <div className="detail-copy">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
              </div>
            </section>

            <section className="detail-image-band">
              <img src="/images/interior-ceiling.jpg" alt="Toshi interior" />
            </section>

            <section className="detail-copy-section detail-copy-section--reverse">
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
              <button type="button" className="slide-expand__back" onClick={() => setExpandedSlide(null)}>
                ← Back
              </button>
              <div>
                <span>Weiter zu:</span>
                <button
                  type="button"
                  className="slide-expand__next"
                  onClick={() => {
                    if (expandRef.current) expandRef.current.scrollTop = 0;
                    setTitleOffset({ x: 0, y: 0 });
                    setExpandedSlide(slides[(slides.findIndex((s) => s.id === expandedSlide.id) + 1) % slides.length]);
                  }}
                >
                  {slides[(slides.findIndex((s) => s.id === expandedSlide.id) + 1) % slides.length].title}
                </button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
