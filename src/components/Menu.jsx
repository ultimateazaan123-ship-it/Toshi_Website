import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { menuData } from '../data/menuData';

export default function Menu() {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLang();
  
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="slide" id="menu">
      <div className="slide__bg">
        <img src="/images/interior-ceiling.jpg" alt="Interior Ceiling" />
      </div>
      <div className="slide__overlay" style={{ background: 'rgba(10,10,10,0.85)' }} />
      
      <motion.div 
        className="slide__content"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="slide__number">04</p>
        <h2 className="slide__title">
          <span className="slide__title--outline">SPEISEKARTE</span>
          {t.menu.title}
        </h2>

        <div className="menu-wrapper">
          <div className="menu__tabs">
            {menuData.map((cat, i) => (
              <button key={cat.category} className={`menu__tab${activeTab === i ? ' menu__tab--active' : ''}`} onClick={() => setActiveTab(i)}>
                {cat.category}
              </button>
            ))}
          </div>
          
          <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-light)' }}>
              {menuData[activeTab].category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {menuData[activeTab].items.map((item, i) => (
                <motion.div 
                  className="menu-item" 
                  key={item.name} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredImage(item.img)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <div>
                    <div className="menu-item__name">{item.name}</div>
                    {item.desc && <div className="menu-item__desc">{item.desc}</div>}
                  </div>
                  <div className="menu-item__price">{item.price}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {hoveredImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: mousePos.x, y: mousePos.y }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
              style={{
                position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 100,
                width: '300px', height: '200px', borderRadius: '4px', overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)', marginLeft: '20px', marginTop: '20px',
                transform: 'translate(0, -50%)'
              }}
            >
              <img src={hoveredImage} alt="Menu item preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
