import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <section className="slide" id="contact" style={{ background: 'var(--bg-primary)' }}>
      <motion.div 
        className="slide__content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="slide__number">06</p>
        <h2 className="slide__title">
          <span className="slide__title--outline">KONTAKT</span>
          {t.footer.contactTitle}
        </h2>

        <div className="footer-grid">
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
              TO<span style={{ color: 'var(--accent)' }}>SHI</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '300px' }}>
              {t.footer.desc}
            </p>
          </div>
          
          <div>
            <h4 className="footer-heading">{t.footer.contactTitle}</h4>
            <ul className="footer-list">
              <li><a href="tel:+4935164186888">0351 641 868 88</a></li>
              <li><a href="mailto:info@toshi-dresden.de">info@toshi-dresden.de</a></li>
              <li><a href="https://maps.google.com/?q=Freital+Dresden" target="_blank" rel="noopener noreferrer">{t.footer.location}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-heading">{t.footer.hours}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.footer.monThu}</span>
                <span>11:00 – 22:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.footer.friSat}</span>
                <span>11:00 – 23:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.footer.sun}</span>
                <span>12:00 – 22:00</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>© {new Date().getFullYear()} Toshi Sushi & Asia Küche. {t.footer.rights}</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://www.instagram.com/toshi.dresden/" target="_blank" rel="noopener noreferrer" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>Instagram</a>
            <a href="https://www.lieferando.de/speisekarte/toshi-sushi-asia-kuche-freital" target="_blank" rel="noopener noreferrer" style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>Lieferando</a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
