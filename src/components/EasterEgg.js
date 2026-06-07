import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Easter egg activated by typing B-A-V-I
const STARS = Array.from({ length: 50 }, () => ({
  w: Math.random() * 3 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  dur: Math.random() * 3 + 2,
  delay: Math.random() * 3,
}));

const FLOAT_EMOJIS = ['👑', '✨', '💖', '🌸', '💕', '⭐', '🌟', '💫'];
const SCREEN_H = typeof window !== 'undefined' ? window.innerHeight : 800;

const EasterEgg = ({ isActive, onClose }) => {
  const secretMessages = [
    "You are the most extraordinary person I know 👑",
    "This secret page exists only for you ✨",
    "Princess Mode: FULLY ACTIVATED 💖",
    "You just unlocked the rarest achievement: Being Yourself 🌸",
    "The secret is: you're absolutely wonderful 💕",
    "Confidential: You make everything better ❤️",
  ];

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99998] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, #1a0533 0%, #000 100%)' }}
        />

        {/* Stars */}
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.w}px`,
              height: `${star.w}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: star.dur, repeat: Infinity, delay: star.delay }}
          />
        ))}

        {/* Floating emojis */}
        {FLOAT_EMOJIS.map((e, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute text-3xl pointer-events-none"
            style={{ left: `${10 + i * 12}%`, top: '-50px' }}
            animate={{
              y: ['-50px', `${SCREEN_H + 50}px`],
              x: [0, (i % 2 === 0 ? 50 : -50)],
              rotate: [0, 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.8, ease: 'linear' }}
          >
            {e}
          </motion.div>
        ))}

        {/* Main content */}
        <motion.div
          className="relative z-10 max-w-lg w-full text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
        >
          {/* Crown */}
          <motion.div
            className="text-8xl mb-6"
            animate={{ rotate: [-5, 5, -5], y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 30px rgba(255,105,180,0.9))' }}
          >
            👑
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-black mb-3"
            style={{ fontFamily: 'Cinzel Decorative, serif', color: '#ff69b4' }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Secret Princess Mode
          </motion.h2>
          <p className="text-pink-300 text-lg mb-8 font-medium">
            ACTIVATED ✨
          </p>

          {/* Secret messages */}
          <div
            className="rounded-3xl p-6 mb-6"
            style={{
              background: 'rgba(255,105,180,0.1)',
              border: '1px solid rgba(255,105,180,0.3)',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-4">
              🔒 Secret Messages Unlocked
            </p>
            <div className="space-y-3">
              {secretMessages.map((msg, i) => (
                <motion.p
                  key={i}
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                >
                  ✨ {msg}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Hidden gallery tease */}
          <div
            className="rounded-2xl p-4 mb-6"
            style={{ background: 'rgba(230,184,162,0.1)', border: '1px solid rgba(230,184,162,0.3)' }}
          >
            <p className="text-pink-300 text-sm">🎉 You found the secret! You typed: B-A-V-I</p>
            <p className="text-pink-400 text-xs mt-1 italic">Only the most curious princess finds this...</p>
          </div>

          <motion.button
            onClick={onClose}
            className="btn-premium px-10 py-4 font-bold text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Kingdom 👑
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const useEasterEgg = () => {
  const [isActive, setIsActive] = useState(false);
  const TARGET = 'BAVI';
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key.length === 1) {
        bufferRef.current = (bufferRef.current + key).slice(-4);
        if (bufferRef.current === TARGET) {
          setIsActive(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const close = () => setIsActive(false);
  return { isActive, close };
};

export default EasterEgg;
