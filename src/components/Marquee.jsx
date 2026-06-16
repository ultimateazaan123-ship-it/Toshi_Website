import { motion } from 'framer-motion';

export default function Marquee() {
  const words = [
    "SUSHI", "·", "SASHIMI", "·", "NIGIRI", "·", "MAKI", "·", "RAMEN", "·", "POKÉ", "·",
    "SUSHI", "·", "SASHIMI", "·", "NIGIRI", "·", "MAKI", "·", "RAMEN", "·", "POKÉ", "·"
  ];

  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20
        }}
      >
        <div className="marquee-content">
          {words.map((word, index) => (
            <span key={index} className="marquee-word">{word}</span>
          ))}
        </div>
        <div className="marquee-content">
          {words.map((word, index) => (
            <span key={`dup-${index}`} className="marquee-word">{word}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
