import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';

const noMessages = [
  "Nice Try Princess 👑",
  "Error 404: No Option Found ❤️",
  "Access Denied 😜",
  "System Refuses Rejection 😂",
  "This Option Is Temporarily Unavailable ❤️",
  "Mission Failed 😏",
  "Lol No 🥰",
  "Did You Really Think That Would Work? 😂",
  "Button Not Found 💕",
  "Please Select YES Instead 👑",
  "NO.exe Has Crashed 💥",
  "Invalid Input, Try: YES ❤️",
];

const PETAL_EMOJIS = ['🌸', '🌺', '🌹', '🏵️', '💐'];
const PETALS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: Math.random() * 5 + 5,
  emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
  xDrift: Math.random() * 200 - 100,
}));
const STARS_P = Array.from({ length: 30 }, () => ({
  w: Math.random() * 3 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  dur: Math.random() * 3 + 2,
  delay: Math.random() * 3,
}));
const SCREEN_H = typeof window !== 'undefined' ? window.innerHeight : 800;
const SCREEN_W = typeof window !== 'undefined' ? window.innerWidth : 1200;

const ProposalSection = () => {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMessage, setNoMessage] = useState('');
  const [showNoMsg, setShowNoMsg] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [noSize, setNoSize] = useState(1);
  const containerRef = useRef(null);

  const escapeNo = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 120;
    const maxY = rect.height - 60;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoPos({ x: newX, y: newY });

    const msg = noMessages[Math.floor(Math.random() * noMessages.length)];
    setNoMessage(msg);
    setShowNoMsg(true);
    setNoClickCount(c => c + 1);
    setNoSize(s => Math.max(0.5, s - 0.05));
    setTimeout(() => setShowNoMsg(false), 1500);
  };

  const handleYes = () => {
    setYesClicked(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 8000);
  };

  const petals = PETALS;

  return (
    <section
      id="proposal"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0533 0%, #5c0b50 40%, #c2185b 100%)' }}
    >
      {confetti && (
        <ReactConfetti
          width={SCREEN_W}
          height={SCREEN_H}
          colors={['#ff69b4', '#e6b8a2', '#ffd6e8', '#ff4da6', '#ffffff', '#ffb3d1', '#c2185b', '#ff0080']}
          numberOfPieces={400}
          recycle={false}
        />
      )}

      {/* Rose petals */}
      {petals.map(p => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none text-xl"
          style={{ left: p.left, top: '-30px' }}
          animate={{
            y: ['0px', `${SCREEN_H + 50}px`],
            x: [0, p.xDrift],
            rotate: [0, 720],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Ambient glow orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${150 + i * 80}px`,
            height: `${150 + i * 80}px`,
            background: `radial-gradient(circle, rgba(255,105,180,0.2) 0%, transparent 70%)`,
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      {/* Stars */}
      {STARS_P.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white pointer-events-none"
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

      <div className="relative z-10 text-center px-6 max-w-2xl" ref={containerRef}>
        <AnimatePresence mode="wait">
          {!yesClicked ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {/* Crown */}
              <motion.div
                className="text-6xl mb-6"
                animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                👑
              </motion.div>

              {/* Question */}
              <motion.p
                className="text-lg md:text-xl text-pink-300 font-medium mb-4"
                style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                I Have One Important Question...
              </motion.p>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-12"
                style={{ fontFamily: 'Cinzel Decorative, serif', lineHeight: 1.3 }}
              >
                Will You Stay With Me{' '}
                <span className="gradient-text">Forever?</span>{' '}
                <motion.span
                  className="inline-block"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </motion.h2>

              {/* NO message popup */}
              <AnimatePresence>
                {showNoMsg && (
                  <motion.div
                    className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl text-white font-bold text-base text-center"
                    style={{
                      background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)',
                      boxShadow: '0 8px 30px rgba(255,105,180,0.5)',
                      maxWidth: '280px',
                    }}
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  >
                    {noMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="relative flex items-center justify-center gap-6 min-h-24">
                {/* YES button - always accessible */}
                <motion.button
                  onClick={handleYes}
                  className="btn-premium text-xl px-12 py-5 font-black"
                  style={{ fontSize: '1.2rem', zIndex: 10 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  YES 💖
                </motion.button>

                {/* NO button - escapes */}
                <motion.button
                  onMouseEnter={escapeNo}
                  onClick={escapeNo}
                  onTouchStart={escapeNo}
                  className="text-white/60 font-bold px-8 py-4 rounded-full text-base border border-white/20 hover:border-white/40 cursor-pointer"
                  style={{
                    position: 'relative',
                    transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noSize})`,
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: 5,
                  }}
                >
                  NO 😏
                </motion.button>
              </div>

              {noClickCount > 0 && (
                <motion.p
                  className="text-pink-300 text-xs mt-4 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  The NO button has escaped {noClickCount} time{noClickCount !== 1 ? 's' : ''} 😂
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="yes-result"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'backOut' }}
              className="flex flex-col items-center"
            >
              {/* Celebration */}
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: 5 }}
              >
                🎉
              </motion.div>

              <motion.h2
                className="text-4xl md:text-6xl font-black text-white mb-4"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                YAYYYYYY ❤️
              </motion.h2>

              <div
                className="glass rounded-3xl p-8 mt-4"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,105,180,0.4)' }}
              >
                <p className="text-pink-200 text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                  Officially Promoted To:
                </p>
                <p className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                  My Forever Favorite Person
                </p>
                <div className="flex justify-center gap-3 mt-4 text-3xl">
                  {['👑', '💖', '✨', '🌸', '💕'].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.3, 1], y: [0, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProposalSection;
