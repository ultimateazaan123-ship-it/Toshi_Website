'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/* ══════════════════════════════════════════════════
   TOSHI SUSHI & ASIA KÜCHE — one-page site
   Brand: black lacquer #050505 · crimson #a81818 · cream #f4eede
   ══════════════════════════════════════════════════ */

const LIEFERANDO = 'https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche-freital';
const INSTAGRAM = 'https://www.instagram.com/toshi.dresden/';

const CRIMSON = '#a81818';
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
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
function Ornament({ light = false }) {
  const line = light ? 'rgba(244,238,222,0.5)' : 'rgba(168,24,24,0.55)';
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${line})` }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: light ? '#f4eede' : CRIMSON }} />
      <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${line})` }} />
    </div>
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
      transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      className="fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 z-50"
    >
      <div
        className={`mx-auto max-w-7xl relative flex items-center justify-between px-4 md:px-8 py-2.5 md:py-3 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? 'border-white/[0.12] bg-black/85 md:bg-black/75 shadow-[0_12px_44px_rgba(0,0,0,0.6)]'
            : 'border-white/[0.08] bg-black/70 md:bg-black/45 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        } md:backdrop-blur-xl md:backdrop-saturate-150`}
      >
        {/* Logo */}
        <a href="#" className="group relative flex items-center">
          <img
            src="/images/Toshi_Logo.webp"
            alt="Toshi Sushi & Asia Küche"
            className="h-10 md:h-12 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(168,24,24,0.4)]"
          />
        </a>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group/link relative px-4 py-1.5 text-[13px] tracking-[0.08em] uppercase text-white/90 hover:text-white transition-all duration-300 font-bold rounded-lg"
            >
              {item.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-[#c42020] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-400 ease-out" />
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <a
            href={LIEFERANDO}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-4 md:px-6 py-2 md:py-2.5 rounded-xl bg-[#a81818]/90 hover:bg-[#c42020] text-white text-xs md:text-sm tracking-[0.08em] uppercase font-extrabold transition-all duration-300 hover:shadow-[0_0_24px_rgba(168,24,24,0.4)]"
          >
            Bestellen
            <svg className="transition-transform duration-300 group-hover:translate-x-0.5" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 gap-[5px]"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="w-[14px] h-[1.5px] bg-white/80 rounded-full" />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }} className="w-[14px] h-[1.5px] bg-white/80 rounded-full" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="w-[14px] h-[1.5px] bg-white/80 rounded-full" />
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
            className="md:hidden mt-2 rounded-2xl border border-white/[0.08] bg-black/90 backdrop-blur-xl overflow-hidden"
          >
            {LINKS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-sm tracking-[0.08em] uppercase text-white/70 hover:text-white hover:bg-white/[0.04] transition-all duration-300 font-bold border-b border-white/[0.05] last:border-b-0"
              >
                {item.label}
                <svg className="w-3 h-3 text-[#c42020]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ---------- Hero ---------- */
const HERO_IMAGES = ['/images/TOSHI_img2.webp', '/images/TOSHI_img4.webp', '/images/TOSHI_img6.webp'];

function HeroSection() {
  const [openNow, setOpenNow] = useState(false);
  const [slide, setSlide] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => { setOpenNow(isOpenNow()); }, []);
  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % HERO_IMAGES.length), 7500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[620px] overflow-hidden bg-[#0a0a0a]">
      {/* Crossfading Ken Burns slideshow with scroll parallax */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 animate-kenburns bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGES[slide]})` }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="md:hidden absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.5) 100%)' }} />
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.85) 40%, transparent 100%)' }}
      />

      {/* Vertical Japanese accents — desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.3 }}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/25" />
        <p className="font-jp text-white/35 text-sm tracking-[0.5em]" style={{ writingMode: 'vertical-rl' }}>
          寿司・鮨・匠
        </p>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-white/25" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.3 }}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/25" />
        <p className="font-jp text-white/35 text-sm tracking-[0.5em]" style={{ writingMode: 'vertical-rl' }}>
          鮮度・職人・心
        </p>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-white/25" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-[10px] md:text-[11px] tracking-[0.45em] uppercase text-white font-bold mb-5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
        >
          <span className="font-jp text-[#e04040] normal-case tracking-[0.2em]">鮨</span>&nbsp;&nbsp;Sushi &amp; Asia Küche
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
          className="font-black uppercase leading-[0.9] tracking-[-0.02em] whitespace-nowrap"
        >
          <span className="block text-[8vw] md:text-[5.5vw] text-white md:drop-shadow-[0_0_80px_rgba(255,255,255,0.55)]">
            WENN SUSHI,
          </span>
          <span
            className="block text-[8vw] md:text-[5.5vw] text-white"
            style={{ textShadow: '0 0 18px rgba(255,140,140,0.85), 0 0 45px rgba(224,64,64,0.55)' }}
          >
            DANN TOSHI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-white/90 font-medium mt-6 mb-8 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
        >
          Frisches Sushi &amp; Asia Küche ohne halbe Sachen
        </motion.p>

        <motion.a
          href={LIEFERANDO}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="btn-shine flex items-center gap-2.5 md:gap-3 px-9 py-4 md:px-12 md:py-5 bg-[#a81818] hover:bg-[#c42020] text-white font-black text-xs md:text-sm tracking-[0.18em] uppercase rounded-full transition-colors duration-300 shadow-[0_8px_40px_rgba(168,24,24,0.5)] hover:shadow-[0_12px_60px_rgba(168,24,24,0.75)]"
        >
          Online Bestellen
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Location pill — bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
        className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-center pb-5 md:pb-6"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
          <span className="relative flex w-2 h-2 flex-shrink-0">
            {openNow && <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />}
            <span className={`relative inline-flex w-2 h-2 rounded-full ${openNow ? 'bg-green-500' : 'bg-[#a81818]'}`} />
          </span>
          <div className="text-left">
            <p className="text-[12px] font-black uppercase tracking-[0.08em] leading-none text-white">Freital</p>
            <p className="text-[11px] font-medium leading-none mt-1 text-white/60">Dresdner Str. 106</p>
          </div>
          <div className="w-px h-6 bg-white/15 mx-1" />
          <p className="text-[11px] font-medium text-white/60">{openNow ? 'Jetzt geöffnet' : 'Täglich ab 11:00 Uhr'}</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function MarqueeStrip() {
  const WORDS = ['Sushi', '鮨', 'Maki', '巻', 'Nigiri', '握り', 'Poké Bowls', '丼', 'Teriyaki', '照り焼き', 'Gyoza', '餃子'];
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative z-20 -my-5 md:-my-6">
      <div className="relative overflow-hidden bg-[#a81818] py-3.5 md:py-4 -rotate-1 scale-[1.02] shadow-[0_14px_50px_rgba(168,24,24,0.35)] border-y border-white/15">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center">
              {row.map((w, i) => (
                <span key={`${half}-${i}`} className={`flex items-center text-white uppercase tracking-[0.2em] text-xs md:text-sm ${/[぀-鿿]/.test(w) ? 'font-jp font-semibold' : 'font-black'}`}>
                  <span className="px-5 md:px-7">{w}</span>
                  <span className="text-white/40 text-[7px] rotate-45">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Order Section ---------- */
function OrderSection() {
  return (
    <section id="bestellen" className="relative bg-[#f4eede] overflow-hidden">
      {/* Subtle texture watermark */}
      <div className="absolute -right-16 top-8 pointer-events-none select-none hidden md:block" aria-hidden="true">
        <span className="font-jp text-[16rem] leading-none text-[#1a140e]/[0.04]">出前</span>
      </div>

      {/* MOBILE */}
      <div className="relative md:hidden" style={{ minHeight: '88vh' }}>
        <div className="absolute bottom-0 left-0 right-0 h-[55%]">
          <img src="/images/sushi-platter.jpg" alt="Toshi Sushi Platte" className="w-full h-full object-cover object-center" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #f4eede 0%, #f4eede 12%, rgba(244,238,222,0.3) 45%, rgba(244,238,222,0) 100%)' }}
          />
        </div>

        <div className="relative z-10 pt-14 px-6 pb-0 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-5 justify-center">
              <div className="w-8 h-[2px] bg-[#a81818]" />
              <span className="text-[12px] tracking-[0.3em] uppercase text-[#a81818] font-black whitespace-nowrap">Lieferung &amp; Abholung</span>
              <div className="w-8 h-[2px] bg-[#a81818]" />
            </div>
            <h2 className="text-[3.2rem] font-black tracking-tight text-[#a81818] leading-[0.88] mb-6">
              Jetzt<br />Bestellen.
            </h2>
            <p className="text-[15px] text-[#1a140e] font-bold leading-relaxed max-w-[270px] mx-auto mb-8">
              Bestell dein Lieblings-Sushi zur Lieferung oder Abholung — frisch gerollt, schnell und unkompliziert.
            </p>
            <a
              href={LIEFERANDO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#a81818] hover:bg-[#c42020] text-white font-black text-xs tracking-[0.14em] uppercase rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(168,24,24,0.45)]"
            >
              Online Bestellen
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE }}
              className="flex-1 text-left"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] bg-[#a81818]" />
                <span className="text-[14px] tracking-[0.15em] uppercase text-[#a81818] font-black">Lieferung &amp; Abholung</span>
              </div>
              <h2 className="text-7xl lg:text-8xl font-black tracking-normal text-[#a81818] leading-[0.88] mb-6">
                Jetzt<br />Bestellen.
              </h2>
              <p className="text-xl text-[#1a140e] font-medium leading-relaxed mb-8 max-w-sm">
                Bestell dein Lieblings-Sushi zur Lieferung oder Abholung — frisch gerollt, schnell und unkompliziert.
              </p>
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#a81818] hover:bg-[#c42020] text-white font-black text-xs tracking-[0.14em] uppercase rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(168,24,24,0.35)] hover:shadow-[0_12px_44px_rgba(168,24,24,0.5)] hover:-translate-y-0.5"
              >
                Online Bestellen
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32, rotate: 1.5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
              className="flex-1 relative flex justify-end"
            >
              <div className="relative w-full max-w-[520px] group">
                {/* Crimson offset frame */}
                <div className="absolute -inset-3 rounded-[28px] border-2 border-[#a81818]/25 translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" aria-hidden="true" />
                <div className="card-sheen relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_64px_rgba(26,20,14,0.28)]">
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

/* ---------- Menu (3D Carousel) ---------- */
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
    const t = setInterval(() => setActive((p) => (p + 1) % total), 3800);
    return () => clearInterval(t);
  }, [paused, total]);

  const getOffset = (i) => {
    let off = i - active;
    if (off > total / 2) off -= total;
    if (off < -total / 2) off += total;
    return off;
  };

  const CARD_W = 300;
  const CARD_H = 420;
  const SLOT = 330;

  return (
    <section
      id="speisekarte"
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: 'linear-gradient(180deg, #060202 0%, #0d0404 45%, #060202 100%)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glows + watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(168,24,24,0.09) 0%, transparent 65%)' }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(168,24,24,0.18), transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(168,24,24,0.18), transparent)' }} />
        <span className="font-jp absolute -left-6 top-24 text-[18rem] leading-none text-white/[0.025] select-none hidden lg:block" style={{ writingMode: 'vertical-rl' }}>鮨匠</span>
      </div>

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative text-center mb-14 md:mb-20 px-6"
      >
        <div className="mb-5"><Ornament /></div>
        <span className="block text-[13px] tracking-[0.35em] uppercase text-white/80 font-black mb-4">Highlights</span>
        <h2 className="text-4xl sm:text-5xl md:text-[5.5rem] font-black tracking-normal text-white leading-none uppercase">
          Entdecke
          <br />
          <span className="bg-gradient-to-r from-white via-[#e04040] to-[#a81818] bg-clip-text text-transparent">
            unsere Karte
          </span>
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
                rotateY: off * -32,
                scale: 1 - absOff * 0.13,
                opacity: absOff > 2 ? 0 : 1 - absOff * 0.22,
                zIndex: Math.round(10 - absOff * 3),
              }}
              transition={{ type: 'tween', duration: 0.55, ease: EASE }}
              onClick={() => (isCenter ? onItemClick(dish) : setActive(i))}
            >
              <div
                className="card-sheen relative w-full h-full overflow-hidden rounded-[22px] group"
                style={{
                  boxShadow: isCenter
                    ? '0 40px 90px rgba(0,0,0,0.75), 0 0 0 1.5px rgba(168,24,24,0.45), 0 0 70px rgba(168,24,24,0.14)'
                    : '0 20px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                <img src={dish.src} alt={dish.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)' }} />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/[0.08] text-[8px] tracking-[0.35em] uppercase text-white/60 font-bold">
                    <span className="w-[4px] h-[4px] rounded-full bg-[#c42020]" />
                    {dish.category}
                  </span>
                </div>

                {/* Number */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] tracking-[0.3em] text-white/20 font-medium">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-2 mb-3">
                    <p className="text-[17px] font-black text-white leading-tight tracking-tight">{dish.name}</p>
                    <p className="text-[13px] font-black text-[#e04040] whitespace-nowrap">{dish.price}</p>
                  </div>
                  <AnimatePresence>
                    {isCenter && (
                      <motion.div
                        key="cta"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-1.5"
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); onItemClick(dish); }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#a81818] hover:bg-[#c42020] text-white text-[10px] font-black tracking-[0.18em] uppercase transition-colors duration-200"
                        >
                          Ansehen
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isCenter && (
                  <div className="absolute inset-0 rounded-[22px] pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1.5px rgba(168,24,24,0.55)' }} />
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
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="relative flex flex-col items-center gap-5 mt-12 md:mt-16"
      >
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActive((p) => (p - 1 + total) % total)}
            aria-label="Vorheriges Gericht"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#a81818]/40 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-all duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {DISHES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Gericht ${i + 1}`} className="flex items-center justify-center transition-all duration-300">
                <motion.div
                  className="rounded-full"
                  animate={{ width: i === active ? 22 : 6, height: 6, background: i === active ? CRIMSON : 'rgba(255,255,255,0.15)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => setActive((p) => (p + 1) % total)}
            aria-label="Nächstes Gericht"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#a81818]/40 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-all duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <span className="text-[9px] tracking-[0.5em] uppercase text-white/15 font-medium select-none">
          {String(active + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{String(total).padStart(2, '0')}
        </span>

        <a
          href={LIEFERANDO}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-2 inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-[#a81818]/50 hover:bg-[#a81818]/10 text-[11px] font-black tracking-[0.16em] uppercase transition-all duration-300"
        >
          Ganze Speisekarte ansehen
          <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-3xl"
      onClick={onClose}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(168,24,24,0.14) 0%, transparent 65%)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 280, damping: 26 }}
        className="relative w-full max-w-sm md:max-w-3xl rounded-3xl overflow-hidden border border-white/25"
        style={{ background: '#0d0303', boxShadow: '0 40px 120px rgba(0,0,0,0.85), 0 0 40px rgba(168,24,24,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,24,24,0.2) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,24,24,0.13) 0%, transparent 70%)' }} />

        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute top-3 right-3 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 border border-white/20 backdrop-blur-sm hover:bg-black/80 hover:border-white/40 hover:rotate-90 transition-all duration-300"
        >
          <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full h-48 flex-shrink-0 md:w-[48%] md:h-auto md:min-h-[400px]">
            <img src={item.src} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="md:hidden absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0d0303)' }} />
            <div className="hidden md:block absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, #0d0303)' }} />
          </div>

          {/* Info */}
          <div className="relative z-10 flex flex-col p-5 md:p-8 md:pl-5 md:justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-[1px] bg-[#a81818]/60" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-[#e04040]/80 font-medium">Toshi Sushi</span>
                <span className="font-jp text-[11px] text-white/25">鮨</span>
              </div>

              <div className="flex items-start justify-between gap-3 mb-2.5">
                <h2 className="text-2xl md:text-3xl font-black tracking-normal text-white leading-[0.9]">{item.name}</h2>
                <span className="text-lg md:text-xl font-black text-[#e04040] whitespace-nowrap mt-0.5">{item.price}</span>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-3 h-3 text-[#e04040]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-[15px] font-medium text-white/90 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#a81818] hover:bg-[#c42020] text-white font-black text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,24,24,0.45)]"
              >
                Online Bestellen
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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
    <section id="ueber-uns" className="relative bg-[#f4eede] overflow-hidden py-20 md:py-28">
      {/* Watermark */}
      <div className="absolute right-6 bottom-4 pointer-events-none select-none hidden lg:block" aria-hidden="true">
        <span className="font-jp text-[22rem] leading-none text-[#1a140e]/[0.035]">匠</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            className="relative order-2 lg:order-1"
          >
            <div className="card-sheen relative rounded-3xl overflow-hidden aspect-[4/5] max-w-[480px] shadow-[0_24px_64px_rgba(26,20,14,0.3)] group">
              <img src="/images/interior-bar.jpg" alt="Toshi Restaurant Interieur" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]" loading="lazy" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="absolute -bottom-8 -right-2 md:-right-8 w-[55%] rounded-2xl overflow-hidden aspect-square shadow-[0_20px_50px_rgba(26,20,14,0.4)] border-4 border-[#f4eede]"
            >
              <img src="/images/ramen-person.jpg" alt="Toshi Küche" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </motion.div>
            {/* Floating stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="absolute -top-5 -left-3 md:-left-6 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#a81818] flex items-center justify-center shadow-[0_12px_32px_rgba(168,24,24,0.4)] rotate-[-8deg]"
            >
              <span className="font-jp text-[#f4eede] text-2xl md:text-3xl">鮨</span>
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
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#a81818]" />
              <span className="text-[14px] tracking-[0.15em] uppercase text-[#a81818] font-black">Über uns</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#1a140e] leading-[0.9] mb-7 uppercase">
              Wenn Sushi,<br />dann <span className="text-[#a81818]">Toshi.</span>
            </h2>
            <p className="text-lg text-[#1a140e]/80 font-medium leading-relaxed mb-5 max-w-lg">
              Bei Toshi beginnt alles mit Respekt — vor der Zutat, vor dem Handwerk und vor unseren Gästen.
              Jede Rolle wird von Hand geformt, jeder Fisch täglich frisch geschnitten, jedes Gericht mit Sorgfalt angerichtet.
            </p>
            <p className="text-lg text-[#1a140e]/80 font-medium leading-relaxed mb-10 max-w-lg">
              Mitten in Freital vereinen wir japanische Präzision mit der Wärme asiatischer Küche —
              vom feinen Nigiri bis zur dampfenden Wok-Pfanne.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1a140e]/10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                >
                  <p className="text-2xl md:text-3xl font-black text-[#a81818] mb-1">{s.value}</p>
                  <p className="text-[11px] md:text-xs tracking-[0.08em] uppercase text-[#1a140e]/60 font-bold">{s.label}</p>
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
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, delay: i * 0.12, ease: EASE } },
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)' }} />
      <div className="absolute bottom-4 left-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white font-black">
          <span className="w-1 h-1 rotate-45 bg-[#c42020]" />
          {label}
        </span>
      </div>
    </>
  );

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: 'linear-gradient(160deg, #0a0202 0%, #070202 60%, #050202 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(168,24,24,0.12) 0%, transparent 70%)' }} />

      {/* Label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-12 md:mb-16 px-6 relative z-10"
      >
        <div className="mb-5"><Ornament /></div>
        <span className="block text-[13px] tracking-[0.35em] uppercase text-white/80 font-black mb-4">Jetzt ausprobieren</span>
        <h2 className="text-4xl sm:text-5xl md:text-[4.5rem] font-black text-white uppercase leading-[0.9] tracking-tight">
          Erlebe<br />
          <span className="text-[#e04040]">Toshi Sushi.</span>
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
              className={`${cls} relative rounded-3xl overflow-hidden cursor-pointer group`}
              style={{ boxShadow: '0 20px 56px rgba(0,0,0,0.55)' }}
            >
              <img src={p.src} alt={`Toshi Sushi — ${p.label}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <Caption label={p.label} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* MOBILE stacked */}
      <div className="md:hidden px-4 space-y-3 relative z-10">
        <motion.div variants={cardVariants(0)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full rounded-3xl overflow-hidden group" style={{ aspectRatio: '4/3', boxShadow: '0 16px 48px rgba(0,0,0,0.55)' }}>
          <img src={PHOTOS[0].src} alt="Toshi Sushi" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {[PHOTOS[1], PHOTOS[2]].map((p, i) => (
            <motion.div key={p.src} variants={cardVariants(i + 1)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
              <img src={p.src} alt="Toshi Sushi" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
        <motion.div variants={cardVariants(3)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full rounded-3xl overflow-hidden" style={{ aspectRatio: '16/9', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
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
    <section id="kontakt" className="relative py-20 md:py-28 overflow-hidden bg-[#f4eede]">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(168,24,24,0.25), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#a81818]" />
              <span className="text-[14px] tracking-[0.15em] uppercase text-[#a81818] font-black">Kontakt</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#1a140e] leading-[0.9] mb-8 uppercase">
              Besuche<br /><span className="text-[#a81818]">uns.</span>
            </h2>

            <div className="mb-7">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#1a140e]/50 font-black mb-2">Adresse</p>
              <p className="text-xl font-black text-[#1a140e]">Dresdner Str. 106</p>
              <p className="text-lg font-medium text-[#1a140e]/70">01705 Freital</p>
            </div>

            <div className="mb-9">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#1a140e]/50 font-black mb-3">Öffnungszeiten</p>
              <div className="space-y-2 max-w-[300px]">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex items-center justify-between border-b border-[#1a140e]/10 pb-2">
                    <span className="text-sm font-bold text-[#1a140e]/80">{h.days}</span>
                    <span className="text-sm font-black text-[#1a140e]">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#a81818] hover:bg-[#c42020] text-white font-black text-xs tracking-[0.14em] uppercase rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(168,24,24,0.35)] hover:-translate-y-0.5"
              >
                Online Bestellen
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-[#1a140e]/15 hover:border-[#a81818]/50 text-[#1a140e] hover:text-[#a81818] font-black text-xs tracking-[0.14em] uppercase rounded-full transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="relative min-h-[380px] lg:min-h-0"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(26,20,14,0.25)] border border-[#1a140e]/10">
              <iframe
                title="Toshi Sushi Standort"
                src="https://www.google.com/maps?q=Dresdner+Str.+106,+01705+Freital,+Germany&output=embed"
                className="w-full h-full"
                style={{ border: 0, filter: 'saturate(0.9)' }}
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
    <footer className="bg-[#040101] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(168,24,24,0.08) 0%, transparent 70%)' }} />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(168,24,24,0.3), transparent)' }} />
      {/* Giant watermark */}
      <div className="absolute -bottom-6 inset-x-0 flex justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="text-[24vw] md:text-[17vw] font-black uppercase leading-none tracking-tight text-white/[0.02] whitespace-nowrap">TOSHI</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div>
            <img src="/images/Toshi_Logo.webp" alt="Toshi Sushi & Asia Küche" className="h-16 w-auto object-contain mb-5" loading="lazy" />
            <p className="text-sm text-white/50 font-medium leading-relaxed max-w-[280px]">
              Frisches Sushi und asiatische Küche in Freital — handgemacht, mit Respekt vor der Zutat.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#a81818]/20 hover:border-[#a81818]/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={LIEFERANDO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#a81818]/20 hover:border-[#a81818]/50 hover:-translate-y-0.5 text-[11px] font-black tracking-[0.1em] uppercase text-white/70 hover:text-white transition-all duration-300"
              >
                Lieferando
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#e04040] font-black mb-5">Navigation</p>
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
                    className="text-sm font-bold text-white/55 hover:text-white hover:pl-1.5 transition-all duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#e04040] font-black mb-5">Kontakt</p>
            <p className="text-sm font-bold text-white/70 mb-1">Dresdner Str. 106</p>
            <p className="text-sm font-medium text-white/45 mb-5">01705 Freital</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between max-w-[220px]"><span className="text-white/45 font-medium">Mo – Do</span><span className="text-white/70 font-bold">11:00 – 22:00</span></div>
              <div className="flex justify-between max-w-[220px]"><span className="text-white/45 font-medium">Fr – Sa</span><span className="text-white/70 font-bold">11:00 – 23:00</span></div>
              <div className="flex justify-between max-w-[220px]"><span className="text-white/45 font-medium">Sonntag</span><span className="text-white/70 font-bold">12:00 – 22:00</span></div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-medium text-white/30">
            © {year} Toshi Sushi &amp; Asia Küche · Freital
          </p>
          <p className="text-[11px] font-medium text-white/30 flex items-center gap-2">
            <span className="font-jp text-white/20">鮨</span> Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export default function ToshiSite() {
  const [modalItem, setModalItem] = useState(null);
  const lenisRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Buttery smooth scrolling (Lenis)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
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

  // Freeze background scroll while the product modal is open
  useEffect(() => {
    if (modalItem) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalItem]);

  return (
    <main className="bg-[#050505] text-white">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-[#a81818] via-[#c42020] to-[#a81818]"
      />

      <Navbar />
      <HeroSection />
      <MarqueeStrip />
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
