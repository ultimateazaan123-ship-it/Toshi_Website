import { motion } from 'framer-motion';

export default function SplitText({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: '0.25em' }}>
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
