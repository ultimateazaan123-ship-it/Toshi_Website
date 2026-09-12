'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import ToshiPreloader from './ToshiPreloader';
import ToshiCursor from './ToshiCursor';

/* ══════════════════════════════════════════════════
   TOSHI SUSHI & ASIA KÜCHE — one-page site
   Palette: ink lacquer #14110d · aged brass #c9a876 · parchment #f3ead9 · hanko red #8c2a26
   Type: Marcellus (serif headline) · Zen Kaku Gothic New (sans body) · Cormorant italic (accent)
   ══════════════════════════════════════════════════ */

const LIEFERANDO = 'https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche-freital';
const INSTAGRAM = 'https://www.instagram.com/toshi.dresden/';

const GOLD = '#c9a876';
const STAMP = '#8c2a26';
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: EASE } },
};

// Mo–Do 11–22 · Fr–Sa 11–23 · So 12–22
function isOpenNow() {
  const now = new Date();
  const de = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
  const day = de.getDay(); // 0 = So
  const total = de.getHours() * 60 + de.getMinutes();
  if (day === 0) return total >= 12 * 60 && total < 22 * 60;
  if (day === 5 || day === 6) return total >= 11 * 60 && total < 23 * 60;
  return total >= 11 * 60 && total < 22 * 60;
}

/* ---------- Ornament (Japanese diamond divider) ---------- */
function Ornament({ tone = 'gold' }) {
  const line = tone === 'gold' ? 'rgba(201,168,118,0.5)' : 'rgba(140,42,38,0.45)';
  const dot = tone === 'gold' ? GOLD : STAMP;
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${line})` }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: dot }} />
      <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${line})` }} />
    </div>
  );
}

/* ---------- Corner frame (luxury picture-frame detail) ---------- */
function CornerFrame({ inset = -12 }) {
  const style = { width: 30, height: 30 };
  return (
    <>
      <span className="absolute border-t border-l border-[#c9a876]/60 pointer-events-none" style={{ top: inset, left: inset, ...style }} aria-hidden="true" />
      <span className="absolute border-b border-r border-[#c9a876]/60 pointer-events-none" style={{ bottom: inset, right: inset, ...style }} aria-hidden="true" />
    </>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const LINKS = [
    { label: 'Speisekarte', href: '#speisekarte' },
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.1, ease: EASE }}
      className="fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 z-50"
    >
      <div
        className={`mx-auto max-w-7xl relative flex items-center justify-between px-4 md:px-8 py-2.5 md:py-3 rounded-full border transition-all duration-500 ${
          scrolled
            ? 'border-[#c9a876]/25 bg-[#14110d]/90 md:bg-[#14110d]/80 shadow-[0_12px_44px_rgba(0,0,0,0.5)]'
            : 'border-[#c9a876]/15 bg-[#14110d]/75 md:bg-[#14110d]/40 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
        } md:backdrop-blur-xl md:backdrop-saturate-150`}
      >
        {/* Logo */}
        <a href="#" className="group relative flex items-center" data-cursor-hover>
          <img
            src="/images/Toshi_Logo.webp"
            alt="Toshi Sushi & Asia Küche"
            className="h-11 md:h-13 w-auto object-contain transition-all duration-500 group-hover:scale-105"
          />
        </a>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-cursor-hover
              className="group/link relative px-4 py-1.5 text-[12px] tracking-[0.14em] uppercase text-[#f3ead9]/75 hover:text-[#f3ead9] transition-all duration-300 font-medium rounded-lg"
            >
              {item.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-[#c9a876] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-400 ease-out" />
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <a
            href={LIEFERANDO}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="group hidden sm:flex items-center gap-1.5 px-5 md:px-6 py-2 md:py-2.5 rounded-full border border-[#c9a876]/45 hover:border-[#c9a876] hover:bg-[#c9a876] text-[#f3ead9] hover:text-[#14110d] text-[10.5px] md:text-[11.5px] tracking-[0.16em] uppercase font-medium transition-all duration-400"
          >
            Bestellen
          </a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-full border border-[#c9a876]/20 bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-300 gap-[5px]"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="w-[14px] h-[1px] bg-[#c9a876] rounded-full" />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }} className="w-[14px] h-[1px] bg-[#c9a876] rounded-full" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="w-[14px] h-[1px] bg-[#c9a876] rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden mt-2 rounded-3xl border border-[#c9a876]/20 bg-[#14110d]/95 backdrop-blur-xl overflow-hidden"
          >
            {LINKS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-sm tracking-[0.1em] uppercase text-[#f3ead9]/70 hover:text-[#f3ead9] hover:bg-white/[0.03] transition-all duration-300 font-medium border-b border-white/[0.06] last:border-b-0"
              >
                {item.label}
                <span className="w-1 h-1 rotate-45" style={{ background: GOLD }} />
              </motion.a>
            ))}
            <a
              href={LIEFERANDO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 mx-5 my-4 py-3.5 rounded-full border border-[#c9a876]/50 text-[#c9a876] text-xs tracking-[0.14em] uppercase font-medium"
            >
              Online Bestellen
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ---------- Hero ---------- */
const HERO_IMAGES = ['/images/TOSHI_img2.webp', '/images/TOSHI_img4.webp', '/images/TOSHI_img6.webp'];
const WORDMARK = 'Toshi'.split('');

function HeroSection() {
  const [openNow, setOpenNow] = useState(false);
  const [slide, setSlide] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => { setOpenNow(isOpenNow()); }, []);
  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % HERO_IMAGES.length), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#0c0a08]">
      {/* Crossfading Ken Burns slideshow with scroll parallax */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 animate-kenburns bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGES[slide]})` }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Warm ink overlay — no neon */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,17,13,0.6) 0%, rgba(20,17,13,0.4) 40%, rgba(12,10,8,0.8) 100%)' }} />
      <div className="absolute inset-0 grain-overlay opacity-[0.18] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 45%, transparent 50%, rgba(12,10,8,0.6) 100%)' }} />
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #14110d 0%, rgba(20,17,13,0.85) 40%, transparent 100%)' }}
      />

      {/* Vertical Japanese accents — desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.6 }}
        className="hidden lg:flex absolute left-9 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a876]/25" />
        <p className="font-serif text-[#c9a876]/50 text-sm tracking-[0.5em]" style={{ writingMode: 'vertical-rl' }}>
          寿司・鮨・匠
        </p>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#c9a876]/25" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.6 }}
        className="hidden lg:flex absolute right-9 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a876]/25" />
        <p className="font-serif text-[#c9a876]/50 text-sm tracking-[0.5em]" style={{ writingMode: 'vertical-rl' }}>
          鮮度・職人・心
        </p>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#c9a876]/25" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="font-accent text-lg md:text-xl text-[#e5cb99] mb-7"
        >
          Asiatisch · Authentisch · Anders
        </motion.p>

        <motion.h1
          className="font-serif text-[#f6efdf] leading-[1.05]"
          style={{ fontSize: 'clamp(3.4rem, 9vw, 8rem)' }}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } } }}
        >
          {WORDMARK.map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 26, filter: 'blur(7px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.15 }}
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#f3ead9]/65 font-medium mt-5 mb-11"
        >
          Sushi &amp; Asia Küche — Freital
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href={LIEFERANDO}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="btn-shimmer flex items-center gap-3 px-10 py-4 md:px-12 md:py-[1.15rem] bg-[#c9a876] hover:bg-[#ddc59a] text-[#14110d] font-medium text-xs md:text-[13px] tracking-[0.2em] uppercase rounded-full transition-colors duration-400 shadow-[0_10px_36px_rgba(201,168,118,0.22)]"
          >
            Online Bestellen
          </a>
          <a
            href="#kontakt"
            data-cursor-hover
            className="group inline-flex items-center gap-2 text-[#f3ead9]/75 hover:text-[#c9a876] text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-400"
          >
            <span className="relative pb-0.5 border-b border-current/40 group-hover:border-current">Tisch reservieren</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Location pill — bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6, ease: EASE }}
        className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-center pb-6 md:pb-7"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#14110d]/55 backdrop-blur-sm border border-[#c9a876]/25">
          <span className="relative flex w-1.5 h-1.5 flex-shrink-0">
            {openNow && <span className="absolute inline-flex h-full w-full rounded-full bg-[#8fae86] opacity-60 animate-ping" />}
            <span className={`relative inline-flex w-1.5 h-1.5 rounded-full ${openNow ? 'bg-[#8fae86]' : 'bg-[#8c2a26]'}`} />
          </span>
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] leading-none text-[#f3ead9]">Freital</p>
            <p className="text-[10.5px] font-normal leading-none mt-1 text-[#f3ead9]/55">Dresdner Str. 106</p>
          </div>
          <div className="w-px h-6 bg-[#c9a876]/20 mx-1" />
          <p className="text-[10.5px] font-normal text-[#f3ead9]/55">{openNow ? 'Jetzt geöffnet' : 'Täglich ab 11:00 Uhr'}</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Ticker ---------- */
function TickerStrip() {
  const WORDS = ['Sushi', '鮨', 'Maki', '巻', 'Nigiri', '握り', 'Poké Bowls', '丼', 'Teriyaki', '照り焼き', 'Gyoza', '餃子'];
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative z-20 bg-[#14110d] border-y border-[#c9a876]/[0.14] py-3.5 md:py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((w, i) => (
              <span key={`${half}-${i}`} className={`flex items-center text-[#e5d6ae]/80 uppercase tracking-[0.24em] text-[10.5px] md:text-[11.5px] ${/[぀-鿿]/.test(w) ? 'font-serif normal-case tracking-[0.1em] text-[#c9a876]/75' : 'font-medium'}`}>
                <span className="px-5 md:px-7">{w}</span>
                <span className="text-[#c9a876]/30 text-[10px]">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Order Section ---------- */
function OrderSection() {
  return (
    <section id="bestellen" className="relative bg-[#f3ead9] overflow-hidden">
      {/* Subtle texture watermark */}
      <div className="absolute -right-16 top-8 pointer-events-none select-none hidden md:block" aria-hidden="true">
        <span className="font-serif text-[16rem] leading-none text-[#14110d]/[0.035]">出前</span>
      </div>

      {/* MOBILE */}
      <div className="relative md:hidden" style={{ minHeight: '86vh' }}>
        <div className="absolute bottom-0 left-0 right-0 h-[54%]">
          <img src="/images/sushi-platter.jpg" alt="Toshi Sushi Platte" className="w-full h-full object-cover object-center" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #f3ead9 0%, #f3ead9 12%, rgba(243,234,217,0.3) 45%, rgba(243,234,217,0) 100%)' }}
          />
        </div>

        <div className="relative z-10 pt-16 px-6 pb-0 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="font-accent text-lg text-[#8c2a26] mb-4">Lieferung &amp; Abholung</p>
            <h2 className="font-serif text-[#14110d] leading-[1.02] mb-6" style={{ fontSize: 'clamp(2.6rem, 11vw, 3.4rem)' }}>
              Jetzt bestellen.
            </h2>
            <p className="text-[15px] text-[#14110d]/65 font-normal leading-relaxed max-w-[280px] mx-auto mb-8">
              Bestell dein Lieblings-Sushi zur Lieferung oder Abholung — frisch gerollt, mit Sorgfalt verpackt.
            </p>
            <a
              href={LIEFERANDO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#14110d] hover:bg-[#221d17] text-[#f3ead9] font-medium text-xs tracking-[0.16em] uppercase rounded-full transition-all duration-400 border border-[#c9a876]/40"
            >
              Online Bestellen
            </a>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: EASE }}
              className="flex-1 text-left"
            >
              <p className="font-accent text-2xl text-[#8c2a26] mb-4">Lieferung &amp; Abholung</p>
              <h2 className="font-serif text-[#14110d] leading-[1.02] mb-8" style={{ fontSize: 'clamp(3.5rem, 5.5vw, 5.5rem)' }}>
                Jetzt bestellen.
              </h2>
              <p className="text-xl text-[#14110d]/65 font-normal leading-relaxed mb-10 max-w-sm">
                Bestell dein Lieblings-Sushi zur Lieferung oder Abholung — frisch gerollt, mit Sorgfalt verpackt.
              </p>
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#14110d] hover:bg-[#221d17] text-[#f3ead9] font-medium text-xs tracking-[0.16em] uppercase rounded-full transition-all duration-400 border border-[#c9a876]/40 hover:border-[#c9a876] hover:-translate-y-0.5"
              >
                Online Bestellen
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.3, delay: 0.1, ease: EASE }}
              className="flex-1 relative flex justify-end"
            >
              <div className="relative w-full max-w-[500px] group">
                <CornerFrame />
                <div className="card-sheen relative rounded-[4px] overflow-hidden aspect-[4/3] shadow-[0_24px_64px_rgba(20,17,13,0.25)]">
                  <img src="/images/sushi-platter.jpg" alt="Toshi Sushi Platte" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Menu (3D Carousel — museum-label card chrome) ---------- */
const DISHES = [
  { src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', name: 'Rainbow Roll', category: 'Signature', price: '12,50 €', description: 'Lachs, Thunfisch, Avocado und Surimi — kunstvoll drapiert auf einer Inside-Out-Rolle. Unser Meisterwerk (8 Stk.)' },
  { src: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=800&q=80', name: 'Dragon Roll', category: 'Bestseller', price: '11,90 €', description: 'Garnele Tempura umhüllt von zarter Avocado, verfeinert mit süßer Unagi Sauce (8 Stk.)' },
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', name: 'Lachs Poké Bowl', category: 'Bowls', price: '12,90 €', description: 'Frischer Lachs auf Sushireis mit Avocado, Edamame und tropischer Mango' },
  { src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80', name: 'Sushi Menü Deluxe', category: 'Menüs', price: '32,90 €', description: '8 Stk. Nigiri, 12 Stk. Maki, 8 Stk. Inside Out und 4 Stk. Sashimi — das volle Toshi-Erlebnis' },
  { src: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80', name: 'Ebi Tempura Roll', category: 'Inside Out', price: '9,90 €', description: 'Knusprige Garnele Tempura mit Avocado und Sesam (8 Stk.)' },
  { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', name: 'Teriyaki Lachs', category: 'Warme Küche', price: '14,90 €', description: 'Gegrillter Lachs mit hausgemachter Teriyaki Sauce, Jasminreis und Wok-Gemüse' },
  { src: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80', name: 'Gyoza', category: 'Vorspeisen', price: '5,90 €', description: 'Japanische Teigtaschen mit Hühnchen-Füllung, knusprig gebraten (6 Stk.)' },
  { src: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80', name: 'Vulcano Roll', category: 'Spicy', price: '10,90 €', description: 'Lachs, Frischkäse und Avocado mit feuriger Sriracha — für alle, die es scharf mögen (8 Stk.)' },
];

function MenuSection({ onItemClick }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = DISHES.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % total), 4200);
    return () => clearInterval(t);
  }, [paused, total]);

  const getOffset = (i) => {
    let off = i - active;
    if (off > total / 2) off -= total;
    if (off < -total / 2) off += total;
    return off;
  };

  const CARD_W = 296;
  const CARD_H = 460;
  const SLOT = 326;

  return (
    <section
      id="speisekarte"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: 'linear-gradient(180deg, #0c0a08 0%, #16130f 45%, #0c0a08 100%)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow + watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(201,168,118,0.05) 0%, transparent 65%)' }} />
        <div className="absolute top-0 inset-x-0 h-px hairline-gold" />
        <div className="absolute bottom-0 inset-x-0 h-px hairline-gold" />
        <span className="font-serif absolute -left-6 top-24 text-[18rem] leading-none text-[#c9a876]/[0.025] select-none hidden lg:block" style={{ writingMode: 'vertical-rl' }}>鮨匠</span>
      </div>

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative text-center mb-16 md:mb-24 px-6"
      >
        <div className="mb-5"><Ornament /></div>
        <span className="block text-[11.5px] tracking-[0.42em] uppercase text-[#c9a876]/80 font-medium mb-4">Ausgewählte Gerichte</span>
        <h2 className="font-serif text-[#f6efdf] leading-[1.05]" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)' }}>
          Unsere Karte
        </h2>
      </motion.div>

      {/* 3D Carousel */}
      <div className="relative mx-auto" style={{ height: CARD_H, maxWidth: '100%', perspective: '1400px', perspectiveOrigin: '50% 40%' }}>
        {DISHES.map((dish, i) => {
          const off = getOffset(i);
          const absOff = Math.abs(off);
          if (absOff > 2.4) return null;

          const isCenter = off === 0;
          const brightness = 1 - absOff * 0.28;

          return (
            <motion.div
              key={dish.name}
              className="absolute cursor-pointer"
              data-cursor-hover
              style={{
                width: CARD_W,
                height: CARD_H,
                top: '50%',
                left: '50%',
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2,
                transformStyle: 'preserve-3d',
                filter: `brightness(${brightness})`,
                willChange: 'transform, opacity',
              }}
              animate={{
                x: off * SLOT,
                rotateY: off * -30,
                scale: 1 - absOff * 0.13,
                opacity: absOff > 2 ? 0 : 1 - absOff * 0.22,
                zIndex: Math.round(10 - absOff * 3),
              }}
              transition={{ type: 'tween', duration: 0.6, ease: EASE }}
              onClick={() => (isCenter ? onItemClick(dish) : setActive(i))}
            >
              <div
                className="card-sheen relative w-full h-full overflow-hidden rounded-[3px] group flex flex-col"
                style={{
                  boxShadow: isCenter
                    ? '0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,118,0.5)'
                    : '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                {/* Image */}
                <div className="relative flex-1 overflow-hidden">
                  <img src={dish.src} alt={dish.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(12,10,8,0.35) 0%, transparent 30%, transparent 100%)' }} />
                  <span className="absolute top-4 right-4 font-serif text-[11px] tracking-[0.2em] text-white/35">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {/* Museum-label caption strip */}
                <div className="relative bg-[#16130f] px-5 py-4 border-t border-[#c9a876]/[0.14]">
                  <span className="block text-[9px] tracking-[0.32em] uppercase text-[#c9a876]/70 font-medium mb-1.5">{dish.category}</span>
                  <div className="flex items-baseline gap-2">
                    <p className="font-serif text-[17px] text-[#f6efdf] leading-tight whitespace-nowrap">{dish.name}</p>
                    <span className="flex-1 border-b border-dotted border-[#f3ead9]/[0.16] translate-y-[-3px]" aria-hidden="true" />
                    <p className="text-[13px] font-medium text-[#c9a876] whitespace-nowrap">{dish.price}</p>
                  </div>

                  <AnimatePresence>
                    {isCenter && (
                      <motion.button
                        key="cta"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        onClick={(e) => { e.stopPropagation(); onItemClick(dish); }}
                        className="flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-[#f3ead9]/55 hover:text-[#c9a876] transition-colors duration-300 overflow-hidden"
                      >
                        Details ansehen
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {isCenter && (
                  <div className="absolute inset-0 rounded-[3px] pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,118,0.5)' }} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="relative flex flex-col items-center gap-5 mt-12 md:mt-16"
      >
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActive((p) => (p - 1 + total) % total)}
            aria-label="Vorheriges Gericht"
            data-cursor-hover
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[#c9a876]/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#c9a876]/50 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 text-[#e5d6ae]/40 group-hover:text-[#e5d6ae]/80 transition-all duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {DISHES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Gericht ${i + 1}`} data-cursor-hover className="flex items-center justify-center transition-all duration-300">
                <motion.div
                  className="rounded-full"
                  animate={{ width: i === active ? 20 : 5, height: 5, background: i === active ? GOLD : 'rgba(255,255,255,0.14)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => setActive((p) => (p + 1) % total)}
            aria-label="Nächstes Gericht"
            data-cursor-hover
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[#c9a876]/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#c9a876]/50 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 text-[#e5d6ae]/40 group-hover:text-[#e5d6ae]/80 transition-all duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <span className="text-[9px] tracking-[0.5em] uppercase text-[#f3ead9]/15 font-normal select-none">
          {String(active + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{String(total).padStart(2, '0')}
        </span>

        <a
          href={LIEFERANDO}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group mt-2 inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#c9a876]/25 text-[#e5d6ae]/75 hover:text-[#14110d] hover:border-[#c9a876] hover:bg-[#c9a876] text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-400"
        >
          Ganze Speisekarte ansehen
        </a>
      </motion.div>

      {/* Closing pull-quote — the kitchen's philosophy */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-xl mx-auto mt-24 md:mt-32 px-6 text-center"
      >
        <div className="mb-7"><Ornament /></div>
        <p className="font-accent text-2xl md:text-3xl text-[#e5d6ae] leading-relaxed">
          „Wahres Handwerk liegt in der Stille — im ruhigen Schnitt, in der Geduld des Reises, im Respekt vor jeder Zutat.“
        </p>
        <p className="mt-6 text-[10.5px] tracking-[0.32em] uppercase text-[#c9a876]/55 font-medium">Toshi Küchenteam</p>
      </motion.div>
    </section>
  );
}

/* ---------- Product Modal ---------- */
function ProductModal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#0c0a08]/90 backdrop-blur-3xl"
      onClick={onClose}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(201,168,118,0.1) 0%, transparent 65%)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 280, damping: 26 }}
        className="relative w-full max-w-sm md:max-w-3xl rounded-3xl overflow-hidden border border-[#c9a876]/25"
        style={{ background: '#16130f', boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 40px rgba(201,168,118,0.06)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,118,0.1) 0%, transparent 70%)' }} />

        <button
          onClick={onClose}
          aria-label="Schließen"
          data-cursor-hover
          className="absolute top-3 right-3 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-[#0c0a08]/60 border border-[#c9a876]/25 backdrop-blur-sm hover:bg-[#0c0a08]/85 hover:border-[#c9a876]/50 hover:rotate-90 transition-all duration-300"
        >
          <svg className="w-4 h-4 text-[#f3ead9]/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full h-48 flex-shrink-0 md:w-[48%] md:h-auto md:min-h-[400px]">
            <img src={item.src} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="md:hidden absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #16130f)' }} />
            <div className="hidden md:block absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, #16130f)' }} />
          </div>

          {/* Info */}
          <div className="relative z-10 flex flex-col p-5 md:p-8 md:pl-5 md:justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-[1px] bg-[#c9a876]/50" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a876]/70 font-normal">Toshi Sushi</span>
                <span className="font-serif text-[11px] text-[#f3ead9]/25">鮨</span>
              </div>

              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-serif text-2xl md:text-3xl text-[#f6efdf] leading-[1.05]">{item.name}</h2>
                <span className="text-lg md:text-xl font-semibold text-[#c9a876] whitespace-nowrap mt-0.5">{item.price}</span>
              </div>

              <p className="text-[15px] font-normal text-[#f3ead9]/75 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#c9a876] hover:bg-[#ddc59a] text-[#14110d] font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300"
              >
                Online Bestellen
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- About / Story ---------- */
function AboutSection() {
  const STATS = [
    { value: '100%', label: 'Frischer Fisch' },
    { value: '60+', label: 'Gerichte auf der Karte' },
    { value: '7 Tage', label: 'Die Woche geöffnet' },
  ];

  return (
    <section id="ueber-uns" className="relative bg-[#f3ead9] overflow-hidden py-24 md:py-36">
      {/* Watermark */}
      <div className="absolute right-6 bottom-4 pointer-events-none select-none hidden lg:block" aria-hidden="true">
        <span className="font-serif text-[22rem] leading-none text-[#14110d]/[0.03]">匠</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-[480px]">
              <CornerFrame />
              <div className="card-sheen relative rounded-[4px] overflow-hidden aspect-[4/5] shadow-[0_24px_64px_rgba(20,17,13,0.25)] group">
                <img src="/images/interior-bar.jpg" alt="Toshi Restaurant Interieur" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]" loading="lazy" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
              className="absolute -bottom-8 -right-2 md:-right-8 w-[52%] rounded-[3px] overflow-hidden aspect-square shadow-[0_20px_50px_rgba(20,17,13,0.35)] border-4 border-[#f3ead9]"
            >
              <img src="/images/ramen-person.jpg" alt="Toshi Küche" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </motion.div>
            {/* Hanko stamp — small, quiet, on-brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              className="absolute -top-5 -left-3 md:-left-6 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_10px_28px_rgba(140,42,38,0.3)]"
              style={{ background: STAMP }}
            >
              <span className="font-serif text-[#f3ead9] text-xl md:text-2xl">鮨</span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="order-1 lg:order-2"
          >
            <p className="font-accent text-2xl text-[#8c2a26] mb-4">Über uns</p>
            <h2 className="font-serif text-[#14110d] leading-[1.05] mb-8" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.6rem)' }}>
              Wenn Sushi, dann Toshi.
            </h2>
            <p className="text-lg text-[#14110d]/65 font-normal leading-relaxed mb-5 max-w-lg">
              Bei Toshi beginnt alles mit Respekt — vor der Zutat, vor dem Handwerk und vor unseren Gästen.
              Jede Rolle wird von Hand geformt, jeder Fisch täglich frisch geschnitten, jedes Gericht mit Sorgfalt angerichtet.
            </p>
            <p className="text-lg text-[#14110d]/65 font-normal leading-relaxed mb-12 max-w-lg">
              Mitten in Freital vereinen wir japanische Präzision mit der Wärme asiatischer Küche —
              vom feinen Nigiri bis zur dampfenden Wok-Pfanne.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-9 border-t border-[#14110d]/10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                >
                  <p className="font-serif text-2xl md:text-3xl text-[#8c2a26] mb-1">{s.value}</p>
                  <p className="text-[10.5px] md:text-xs tracking-[0.1em] uppercase text-[#14110d]/50 font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Photo Wall ---------- */
function PhotoWall() {
  const cardVariants = (i) => ({
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, delay: i * 0.12, ease: EASE } },
  });

  const PHOTOS = [
    { src: '/images/TOSHI_img1.webp', label: 'Sushi Art' },
    { src: '/images/TOSHI_img3.webp', label: 'Frische' },
    { src: '/images/TOSHI_img5.webp', label: 'Handwerk' },
    { src: '/images/interior-ceiling.jpg', label: 'Interieur' },
    { src: '/images/TOSHI_img2.webp', label: 'Atmosphäre' },
  ];

  const Caption = ({ label }) => (
    <>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(12,10,8,0.8) 0%, transparent 45%)' }} />
      <div className="absolute bottom-4 left-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#f3ead9] font-medium">
          <span className="w-1 h-1 rotate-45" style={{ background: GOLD }} />
          {label}
        </span>
      </div>
    </>
  );

  return (
    <section className="relative overflow-hidden py-24 md:py-36" style={{ background: 'linear-gradient(160deg, #0c0a08 0%, #100d0a 60%, #0c0a08 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,118,0.06) 0%, transparent 70%)' }} />

      {/* Label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-14 md:mb-20 px-6 relative z-10"
      >
        <div className="mb-5"><Ornament /></div>
        <span className="block text-[11.5px] tracking-[0.42em] uppercase text-[#c9a876]/80 font-medium mb-4">Jetzt entdecken</span>
        <h2 className="font-serif text-[#f6efdf] leading-[1.05]" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
          Erlebe Toshi Sushi.
        </h2>
      </motion.div>

      {/* DESKTOP bento */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-12 grid-rows-2 gap-3" style={{ height: 640 }}>
          {[
            { p: PHOTOS[0], cls: 'col-span-5 row-span-2' },
            { p: PHOTOS[1], cls: 'col-span-4 row-span-1' },
            { p: PHOTOS[2], cls: 'col-span-3 row-span-1' },
            { p: PHOTOS[3], cls: 'col-span-3 row-span-1' },
            { p: PHOTOS[4], cls: 'col-span-4 row-span-1' },
          ].map(({ p, cls }, i) => (
            <motion.div
              key={p.src}
              variants={cardVariants(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ scale: 1.015, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className={`${cls} relative rounded-[3px] overflow-hidden cursor-pointer group border border-[#c9a876]/10`}
              style={{ boxShadow: '0 20px 56px rgba(0,0,0,0.45)' }}
              data-cursor-hover
            >
              <img src={p.src} alt={`Toshi Sushi — ${p.label}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <Caption label={p.label} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* MOBILE stacked */}
      <div className="md:hidden px-4 space-y-3 relative z-10">
        <motion.div variants={cardVariants(0)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full rounded-[3px] overflow-hidden group border border-[#c9a876]/10" style={{ aspectRatio: '4/3', boxShadow: '0 16px 48px rgba(0,0,0,0.45)' }}>
          <img src={PHOTOS[0].src} alt="Toshi Sushi" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {[PHOTOS[1], PHOTOS[2]].map((p, i) => (
            <motion.div key={p.src} variants={cardVariants(i + 1)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative rounded-[3px] overflow-hidden border border-[#c9a876]/10" style={{ aspectRatio: '1/1', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              <img src={p.src} alt="Toshi Sushi" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
        <motion.div variants={cardVariants(3)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full rounded-[3px] overflow-hidden border border-[#c9a876]/10" style={{ aspectRatio: '16/9', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          <img src={PHOTOS[3].src} alt="Toshi Sushi" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Kontakt / Location ---------- */
function LocationSection() {
  const HOURS = [
    { days: 'Mo – Do', time: '11:00 – 22:00' },
    { days: 'Fr – Sa', time: '11:00 – 23:00' },
    { days: 'Sonntag', time: '12:00 – 22:00' },
  ];

  return (
    <section id="kontakt" className="relative py-24 md:py-36 overflow-hidden bg-[#f3ead9]">
      <div className="absolute top-0 inset-x-0 h-px hairline-gold" style={{ opacity: 0.6 }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-stretch">
          {/* Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col justify-center"
          >
            <p className="font-accent text-2xl text-[#8c2a26] mb-4">Kontakt</p>
            <h2 className="font-serif text-[#14110d] leading-[1.05] mb-10" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.6rem)' }}>
              Besuche uns.
            </h2>

            <div className="mb-8">
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#14110d]/45 font-medium mb-2">Adresse</p>
              <p className="text-xl font-medium text-[#14110d]">Dresdner Str. 106</p>
              <p className="text-lg font-normal text-[#14110d]/60">01705 Freital</p>
            </div>

            <div className="mb-10">
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#14110d]/45 font-medium mb-3">Öffnungszeiten</p>
              <div className="space-y-2 max-w-[300px]">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-center justify-between border-b border-[#14110d]/10 pb-2">
                    <span className="text-sm font-normal text-[#14110d]/70">{h.days}</span>
                    <span className="text-sm font-medium text-[#14110d]">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#14110d] hover:bg-[#221d17] text-[#f3ead9] font-medium text-xs tracking-[0.14em] uppercase rounded-full transition-all duration-400 border border-[#c9a876]/40 hover:border-[#c9a876] hover:-translate-y-0.5"
              >
                Online Bestellen
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#14110d]/20 hover:border-[#8c2a26]/50 text-[#14110d] hover:text-[#8c2a26] font-medium text-xs tracking-[0.14em] uppercase rounded-full transition-all duration-400"
              >
                Instagram
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="relative min-h-[380px] lg:min-h-0"
          >
            <div className="absolute inset-0 rounded-[4px] overflow-hidden shadow-[0_24px_64px_rgba(20,17,13,0.22)] border border-[#14110d]/10">
              <iframe
                title="Toshi Sushi Standort"
                src="https://www.google.com/maps?q=Dresdner+Str.+106,+01705+Freital,+Germany&output=embed"
                className="w-full h-full"
                style={{ border: 0, filter: 'saturate(0.75) sepia(0.12)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0c0a08] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(201,168,118,0.05) 0%, transparent 70%)' }} />
      <div className="absolute top-0 inset-x-0 h-px hairline-gold" style={{ opacity: 0.7 }} />
      {/* Faint watermark */}
      <div className="absolute -bottom-4 inset-x-0 flex justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="font-serif text-[18vw] md:text-[13vw] leading-none text-[#c9a876]/[0.025] whitespace-nowrap">Toshi</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <img src="/images/Toshi_Logo.webp" alt="Toshi Sushi & Asia Küche" className="h-16 w-auto object-contain mb-5" loading="lazy" />
            <p className="text-sm text-[#f3ead9]/50 font-normal leading-relaxed max-w-[280px]">
              Asiatisch. Authentisch. Anders. Frisches Sushi und Asia-Küche in Freital — von Hand gemacht, mit Respekt vor der Zutat.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-cursor-hover
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#c9a876]/20 bg-white/[0.02] hover:bg-[#c9a876]/10 hover:border-[#c9a876]/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-4 h-4 text-[#e5d6ae]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-2 px-4 h-10 rounded-full border border-[#c9a876]/20 bg-white/[0.02] hover:bg-[#c9a876]/10 hover:border-[#c9a876]/50 hover:-translate-y-0.5 text-[11px] font-medium tracking-[0.08em] uppercase text-[#e5d6ae]/70 hover:text-[#f3ead9] transition-all duration-300"
              >
                Lieferando
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a876]/85 font-medium mb-5">Navigation</p>
            <ul className="space-y-3">
              {[
                { label: 'Speisekarte', href: '#speisekarte' },
                { label: 'Über uns', href: '#ueber-uns' },
                { label: 'Kontakt', href: '#kontakt' },
                { label: 'Online Bestellen', href: LIEFERANDO, ext: true },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm font-normal text-[#f3ead9]/55 hover:text-[#f3ead9] hover:pl-1.5 transition-all duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c9a876]/85 font-medium mb-5">Kontakt</p>
            <p className="text-sm font-medium text-[#f3ead9]/70 mb-1">Dresdner Str. 106</p>
            <p className="text-sm font-normal text-[#f3ead9]/40 mb-5">01705 Freital</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between max-w-[220px]"><span className="text-[#f3ead9]/40 font-normal">Mo – Do</span><span className="text-[#f3ead9]/70 font-medium">11:00 – 22:00</span></div>
              <div className="flex justify-between max-w-[220px]"><span className="text-[#f3ead9]/40 font-normal">Fr – Sa</span><span className="text-[#f3ead9]/70 font-medium">11:00 – 23:00</span></div>
              <div className="flex justify-between max-w-[220px]"><span className="text-[#f3ead9]/40 font-normal">Sonntag</span><span className="text-[#f3ead9]/70 font-medium">12:00 – 22:00</span></div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-normal text-[#f3ead9]/25">
            © {year} Toshi Sushi &amp; Asia Küche · Freital
          </p>
          <p className="text-[11px] font-normal text-[#f3ead9]/25 flex items-center gap-2">
            <span className="font-serif text-[#c9a876]/40">鮨</span> Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export default function ToshiSite() {
  const [modalItem, setModalItem] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Buttery smooth scrolling (Lenis) — created stopped, released once the preloader finishes
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoaded(true);
      return;
    }
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    lenis.stop();
    lenisRef.current = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock scroll while the preloader is showing, or the product modal is open
  useEffect(() => {
    const shouldLock = !loaded || Boolean(modalItem);
    if (shouldLock) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loaded, modalItem]);

  return (
    <main className="bg-[#14110d] text-[#f3ead9]">
      <ToshiPreloader onDone={() => setLoaded(true)} />
      <ToshiCursor />

      {/* Scroll progress bar */}
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]">
        <div className="w-full h-full bg-gradient-to-r from-[#8c2a26] via-[#c9a876] to-[#8c2a26]" />
      </motion.div>

      <Navbar />
      <HeroSection />
      <TickerStrip />
      <OrderSection />
      <MenuSection onItemClick={setModalItem} />
      <AboutSection />
      <PhotoWall />
      <LocationSection />
      <Footer />

      <AnimatePresence>
        {modalItem && <ProductModal item={modalItem} onClose={() => setModalItem(null)} />}
      </AnimatePresence>
    </main>
  );
}
