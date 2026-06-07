import React from 'react';
import { motion } from 'framer-motion';

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: `${(i * 7 + 3) % 100}%`,
  top: `${(i * 11 + 5) % 100}%`,
  size: (i % 3) + 1,
  duration: (i % 4) + 2,
  delay: (i * 0.3) % 4,
}));

const HEARTS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 7) % 100}%`,
  delay: (i * 0.5) % 5,
  duration: (i % 6) + 6,
  emoji: ['❤️', '💕', '💖', '🌸', '✨', '💫'][i % 6],
  drift: (i % 2 === 0 ? 40 : -40),
}));

const FinalSection = () => {
  return (
    <section
      id="ending"
      className="relative min-h-screen flex items-center justify-center overflow-hidden night-sky"
    >
      {/* Stars */}
      {STARS.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ width: `${star.size}px`, height: `${star.size}px`, left: star.left, top: star.top }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
        />
      ))}

      {/* Floating hearts */}
      {HEARTS.map(h => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none text-xl"
          style={{ left: h.left, bottom: '-30px' }}
          animate={{ y: [0, -900], opacity: [0, 1, 1, 0], x: [0, h.drift] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeOut' }}
        >
          {h.emoji}
        </motion.div>
      ))}

      {/* Central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,105,180,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Crown */}
        <motion.div
          className="text-6xl mb-8"
          animate={{ y: [-10, 10, -10], rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(255,105,180,0.8))' }}
        >
          👑
        </motion.div>

        {/* Quote */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-relaxed"
          style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Every beautiful story
          <br />
          has a beginning.
        </motion.h2>

        <motion.div
          className="section-divider my-6 max-w-xs mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl font-black"
          style={{ fontFamily: 'Cinzel Decorative, serif' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="gradient-text">I hope ours</span>
          <span className="text-white"> never has</span>
          <br />
          <span className="text-white">an ending.</span>{' '}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </motion.p>

        {/* Decorative hearts row */}
        <motion.div
          className="flex justify-center gap-4 mt-12 text-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {['❤️', '💕', '💖', '💗', '💝', '💖', '💕', '❤️'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p className="text-pink-300 text-sm font-medium mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            Made With ❤️
          </p>
          <p className="text-pink-400 text-base font-bold" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            For Someone Truly Special 👑
          </p>
          <p className="text-pink-500/50 text-xs mt-3">
            Princess Portal © 2026 • Built with infinite love 💖
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalSection;
