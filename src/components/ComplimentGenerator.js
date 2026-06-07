import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { compliments } from '../data/memories';

const ComplimentGenerator = () => {
  const [current, setCurrent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [count, setCount] = useState(0);

  const generateCompliment = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Trigger sparkle burst
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * 360,
      emoji: ['✨', '💕', '🌸', '💖', '⭐', '🌟', '💗', '🦋'][i % 8],
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1000);

    // Pick random compliment (avoid repeating)
    let idx;
    do { idx = Math.floor(Math.random() * compliments.length); }
    while (compliments[idx] === current && compliments.length > 1);

    setCurrent(compliments[idx]);
    setCount(c => c + 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section id="compliments" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #fff0f5, #ffd6e8)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Compliment Machine
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Powered by pure adoration 💖
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Main card */}
        <div
          className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,214,232,0.7))',
            border: '1px solid rgba(255,105,180,0.2)',
            boxShadow: '0 20px 80px rgba(255,105,180,0.15)',
          }}
        >
          {/* Background sparkle emojis */}
          {['✨', '💕', '🌸', '💖', '⭐', '🌟'].map((e, i) => (
            <motion.span
              key={i}
              className="absolute text-xl pointer-events-none opacity-20"
              style={{
                top: `${10 + (i * 15) % 80}%`,
                left: `${5 + (i * 17) % 90}%`,
              }}
              animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            >
              {e}
            </motion.span>
          ))}

          {/* Sparkle burst */}
          {sparkles.map(s => (
            <motion.span
              key={s.id}
              className="absolute text-xl pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: Math.cos((s.angle * Math.PI) / 180) * 120,
                y: Math.sin((s.angle * Math.PI) / 180) * 100,
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {s.emoji}
            </motion.span>
          ))}

          {/* Compliment display */}
          <div className="min-h-32 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current}
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: 'backOut' }}
                >
                  <motion.p
                    className="text-xl md:text-2xl font-semibold text-pink-700 leading-relaxed max-w-md"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    "{current}"
                  </motion.p>
                  {count > 0 && (
                    <span className="text-sm text-pink-400 font-medium">
                      Compliment #{count} of {compliments.length} ✨
                    </span>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="text-6xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💝
                  </motion.span>
                  <p className="text-pink-400 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                    Press the button for a special message...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Generate button */}
          <motion.button
            onClick={generateCompliment}
            className="btn-premium text-base px-10 py-4 font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          >
            ✨ Generate Compliment ✨
          </motion.button>

          {/* Heart row */}
          <div className="flex justify-center gap-3 mt-6">
            {['❤️', '💕', '💖', '💗', '💝'].map((e, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplimentGenerator;
