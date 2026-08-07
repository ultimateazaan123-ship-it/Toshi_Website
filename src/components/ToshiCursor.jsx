'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ToshiCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHovering(Boolean(e.target.closest('a, button, [data-cursor-hover]')));

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#c9a876] pointer-events-none z-[200]"
        animate={{ x: pos.x - 3, y: pos.y - 3, scale: hovering ? 0 : 1 }}
        transition={{ type: 'tween', duration: 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#c9a876]/55 pointer-events-none z-[200]"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering ? 'rgba(201,168,118,0.08)' : 'rgba(201,168,118,0)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.5 }}
      />
    </>
  );
}
