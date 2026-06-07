import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const gifts = [
  { emoji: '🌹', title: 'Roses', description: 'A bouquet of the most beautiful roses, just like you 🌹' },
  { emoji: '🧸', title: 'Teddy Bear', description: 'A soft teddy bear that hugs you when I can\'t 🧸' },
  { emoji: '🍫', title: 'Chocolates', description: 'Swiss chocolates, because you deserve the sweetest things 🍫' },
  { emoji: '💌', title: 'Love Note', description: 'A handwritten note filled with all the words I forget to say 💌' },
  { emoji: '✨', title: 'Stardust', description: 'A jar of actual stardust — because you\'re made of it ✨' },
  { emoji: '🎀', title: 'Ribbon of Joy', description: 'All my happiness, wrapped up and given to you 🎀' },
  { emoji: '🌙', title: 'A Moonbeam', description: 'The softest moonbeam, because you glow in the dark 🌙' },
  { emoji: '💎', title: 'Diamond Heart', description: 'A heart made of diamonds — rarer than you, impossible 💎' },
  { emoji: '🦋', title: 'Butterflies', description: 'All the butterflies you give me, returned to you 🦋' },
  { emoji: '⭐', title: 'A Shooting Star', description: 'A star with your name on it — because you already own the sky ⭐' },
  { emoji: '🎶', title: 'Your Favorite Song', description: 'On repeat, forever, because some things never get old 🎶' },
  { emoji: '🌺', title: 'Wildflowers', description: 'A meadow of wildflowers that bloom thinking of you 🌺' },
];

const VirtualGiftBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gift, setGift] = useState(null);
  const [prevGifts, setPrevGifts] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const openBox = () => {
    if (!isOpen) {
      setIsOpen(true);
      revealGift();
    } else {
      revealGift();
    }
  };

  const revealGift = () => {
    // Sparkle burst
    const newSparkles = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 16) * 360,
      emoji: ['✨', '💕', '🌸', '⭐', '🌟', '💫', '🎊', '🎉'][i % 8],
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1000);

    // Pick gift not recently shown
    const available = gifts.filter(g => !prevGifts.includes(g.emoji));
    const pool = available.length > 0 ? available : gifts;
    const newGift = pool[Math.floor(Math.random() * pool.length)];
    setGift(newGift);
    setPrevGifts(prev => [...prev.slice(-4), newGift.emoji]);
  };

  const close = () => {
    setIsOpen(false);
    setGift(null);
  };

  return (
    <section id="gifts" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #ffd6e8, #fff0f5)' }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎁
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Virtual Gift Box
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            What's inside? Click to discover! 🎀
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Gift Box */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Sparkle burst */}
            {sparkles.map(s => (
              <motion.span
                key={s.id}
                className="absolute text-xl pointer-events-none z-20"
                style={{ top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
                animate={{
                  x: Math.cos((s.angle * Math.PI) / 180) * 130,
                  y: Math.sin((s.angle * Math.PI) / 180) * 100,
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                {s.emoji}
              </motion.span>
            ))}

            {/* Box visual */}
            <motion.div
              className="relative w-48 h-48 cursor-pointer"
              onClick={openBox}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Box lid */}
              <motion.div
                className="absolute inset-x-0 top-0 h-16 rounded-t-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)',
                  boxShadow: '0 4px 20px rgba(255,105,180,0.4)',
                  zIndex: 2,
                }}
                animate={isOpen ? { y: -30, rotateX: -60, opacity: 0 } : { y: 0, rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
              >
                {/* Ribbon horizontal */}
                <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-white/30 rounded" />
                {/* Bow */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">🎀</div>
              </motion.div>

              {/* Box body */}
              <div
                className="absolute inset-x-0 top-8 bottom-0 rounded-b-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #ff8cc8, #ffb3d9)',
                  boxShadow: '0 8px 30px rgba(255,105,180,0.3)',
                }}
              >
                {/* Ribbon vertical */}
                <div className="absolute inset-x-0 top-0 bottom-0 w-5 mx-auto bg-white/20 rounded" />

                {/* Content when open */}
                <AnimatePresence>
                  {isOpen && gift && (
                    <motion.div
                      className="text-center px-3 relative z-10"
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: 'backOut' }}
                    >
                      <span className="text-5xl block">{gift.emoji}</span>
                    </motion.div>
                  )}
                  {!isOpen && (
                    <motion.div className="text-white/70 text-sm font-medium text-center px-3">
                      Click to<br/>open! 🎁
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Gift reveal */}
          <AnimatePresence>
            {isOpen && gift && (
              <motion.div
                className="mt-8 max-w-sm w-full text-center rounded-3xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,214,232,0.7))',
                  border: '1px solid rgba(255,105,180,0.3)',
                  boxShadow: '0 20px 60px rgba(255,105,180,0.2)',
                }}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
              >
                <motion.span
                  className="text-5xl block mb-3"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {gift.emoji}
                </motion.span>
                <h4 className="text-xl font-bold text-pink-700 mb-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                  {gift.title}
                </h4>
                <p className="text-pink-600 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                  {gift.description}
                </p>

                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={revealGift}
                    className="btn-premium px-6 py-2.5 text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎁 Another Gift
                  </motion.button>
                  <motion.button
                    onClick={close}
                    className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-pink-300 text-pink-500 hover:bg-pink-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close 💕
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen && (
            <p className="text-pink-400 text-sm mt-4 text-center italic">
              Tap the box to reveal your surprise gift! 🎀
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default VirtualGiftBox;
