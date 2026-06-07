import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SINCE_DATE = new Date('2026-06-01T00:00:00');

const HEARTS = ['❤️', '💕', '💖', '💗', '💝', '🌸', '✨', '💫'];
const FLOATING_HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  emoji: HEARTS[i % HEARTS.length],
  left: `${8 + i * 8}%`,
  duration: 6 + (i % 4) * 1.5,
  delay: i * 0.6,
  size: i % 3 === 0 ? '1.4rem' : '1rem',
}));

const STARS = Array.from({ length: 25 }, (_, i) => ({
  w: (i % 3) + 1,
  left: (i * 17) % 100,
  top: (i * 13) % 100,
  dur: 2 + (i % 3),
  delay: (i * 0.4) % 3,
}));

const useCountup = () => {
  const calc = () => {
    const diff = new Date() - SINCE_DATE;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line
  return time;
};

const CounterBox = ({ value, label, index }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  >
    <motion.div
      className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,105,180,0.4)',
        boxShadow: '0 8px 32px rgba(255,105,180,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
        backdropFilter: 'blur(12px)',
        width: '72px',
        height: '72px',
      }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{ border: '1px solid rgba(255,105,180,0.6)', opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
      />

      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="text-2xl sm:text-3xl font-black"
          style={{
            fontFamily: 'Cinzel Decorative, serif',
            background: 'linear-gradient(135deg, #ff69b4, #ffb3d1, #e6b8a2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 8px rgba(255,105,180,0.6))',
          }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </motion.div>

    <motion.p
      className="text-pink-300 font-semibold text-xs mt-2 uppercase tracking-widest"
      style={{ fontFamily: 'Inter, sans-serif' }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
    >
      {label}
    </motion.p>
  </motion.div>
);

const CountdownSection = () => {
  const time = useCountup();

  return (
    <section
      id="countdown"
      className="relative py-16 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0018 0%, #1a0533 40%, #3d0b5a 70%, #1a0533 100%)' }}
    >
      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ width: s.w, height: s.w, left: `${s.left}%`, top: `${s.top}%` }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        />
      ))}

      {/* Floating hearts */}
      {FLOATING_HEARTS.map(h => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none"
          style={{ left: h.left, bottom: '-40px', fontSize: h.size }}
          animate={{ y: [0, -900], opacity: [0, 1, 1, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          {h.emoji}
        </motion.div>
      ))}

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(255,105,180,0.12) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(230,184,162,0.08) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-4xl mb-3"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.div>
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-2"
            style={{ fontFamily: 'Cinzel Decorative, serif', textShadow: '0 0 40px rgba(255,105,180,0.5)' }}
          >
            Since We{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Last Met
            </span>
          </h2>
          <p className="text-pink-300 text-sm" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Since 1st June 2026 — every second is felt 💕
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Counter card */}
        <motion.div
          className="rounded-3xl p-6 md:p-8 mx-auto max-w-2xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,105,180,0.25)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px rgba(255,105,180,0.15), 0 20px 80px rgba(0,0,0,0.4)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'backOut' }}
        >
          {/* Counter boxes */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <CounterBox value={time.days} label="Days" index={0} />

            <motion.span
              className="text-2xl text-pink-400 font-bold pb-6"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >:
            </motion.span>

            <CounterBox value={time.hours} label="Hours" index={1} />

            <motion.span
              className="text-2xl text-pink-400 font-bold pb-6"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            >:
            </motion.span>

            <CounterBox value={time.minutes} label="Minutes" index={2} />

            <motion.span
              className="text-2xl text-pink-400 font-bold pb-6"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            >:
            </motion.span>

            <CounterBox value={time.seconds} label="Seconds" index={3} />
          </div>

          {/* Divider */}
          <div className="section-divider my-5" />

          {/* Heartbeat ECG */}
          <div className="flex justify-center mb-4">
            <svg width="200" height="36" viewBox="0 0 280 50">
              <motion.polyline
                points="0,25 25,25 38,8 48,42 58,4 68,46 78,25 110,25 123,8 133,42 143,4 153,46 163,25 195,25 208,8 218,42 228,4 238,46 248,25 280,25"
                fill="none"
                stroke="#ff69b4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              />
            </svg>
          </div>

          {/* Romantic quote */}
          <motion.p
            className="text-center text-pink-200 text-sm font-medium"
            style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "Every second apart makes the next meeting more special ❤️"
          </motion.p>

          {/* Bottom hearts */}
          <div className="flex justify-center gap-2 mt-4">
            {['❤️', '💕', '💖', '💗', '💝'].map((e, i) => (
              <motion.span
                key={i}
                className="text-base"
                animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;
