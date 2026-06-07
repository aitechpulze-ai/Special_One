import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveLetter = () => {
  const [phase, setPhase] = useState('closed'); // closed | opening | open

  const letterText = `My Dearest Princess 👑,

If you're reading this, then you've stumbled upon the most honest thing I've ever written.

I've been trying to find the right words for a while now. But some feelings are too big for sentences and too deep for paragraphs.

So let me try anyway.

You are the kind of person who makes ordinary days feel like something worth remembering. The kind of person who makes you believe that good things are still possible — even on the hardest days.

Your smile? It's genuinely unfair. It should come with a warning label.

Your laugh? It's the kind of sound that gets stuck in your head and you don't even mind.

Your kindness? It's rare. Like, actually rare.

I don't know what the future holds. But I know that whatever it holds, it would be infinitely better with you in it.

Thank you for existing.
Thank you for being you.
Thank you for giving me something to smile about.

Always & Forever Yours,
Someone Who Thinks You're Extraordinary ❤️`;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const openLetter = () => {
    setPhase('opening');
    setTimeout(() => {
      setPhase('open');
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedText(letterText.slice(0, i));
        if (i >= letterText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 18);
    }, 1200);
  };

  const closeLetter = () => {
    setPhase('closed');
    setDisplayedText('');
    setIsTyping(false);
  };

  return (
    <section id="letter" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #ffd6e8, #fff0f5)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💌
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Secret Love Letter
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Written with the whole heart ❤️
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Envelope / Letter */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {phase === 'closed' && (
              <motion.div
                key="envelope"
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                onClick={openLetter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Envelope */}
                <div className="relative w-72 sm:w-80">
                  {/* Envelope body */}
                  <div
                    className="relative rounded-b-2xl overflow-hidden"
                    style={{
                      width: '100%',
                      paddingTop: '60%',
                      background: 'linear-gradient(145deg, #fff0f5, #ffd6e8)',
                      border: '2px solid rgba(255,105,180,0.3)',
                      boxShadow: '0 20px 60px rgba(255,105,180,0.3)',
                    }}
                  >
                    {/* Envelope flap lines */}
                    <div className="absolute inset-0">
                      <div
                        className="absolute inset-x-0 top-0 h-full"
                        style={{
                          background: 'linear-gradient(135deg, #ffe0ed 50%, transparent 50%)',
                          opacity: 0.5,
                        }}
                      />
                      <div
                        className="absolute inset-x-0 top-0 h-full"
                        style={{
                          background: 'linear-gradient(225deg, #ffe0ed 50%, transparent 50%)',
                          opacity: 0.5,
                        }}
                      />
                    </div>

                    {/* Center heart */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255,105,180,0.8))' }}>
                          💌
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Sparkles around envelope */}
                  {['✨', '💫', '🌸', '⭐', '💕'].map((s, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-lg pointer-events-none"
                      style={{
                        top: `${-10 + (i % 3) * 40}%`,
                        left: `${-10 + i * 25}%`,
                      }}
                      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8], y: [-3, 3, -3] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  className="text-center text-pink-500 mt-6 font-medium text-sm"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✉️ Click to open your letter ✉️
                </motion.p>
              </motion.div>
            )}

            {phase === 'opening' && (
              <motion.div
                key="opening"
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="text-7xl"
                  animate={{ rotateX: [0, -180], scale: [1, 0.8] }}
                  transition={{ duration: 0.8 }}
                >
                  📬
                </motion.span>
                <p className="text-pink-500 font-medium">Opening with love...</p>
              </motion.div>
            )}

            {phase === 'open' && (
              <motion.div
                key="letter"
                className="w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'backOut' }}
              >
                {/* Letter paper */}
                <div
                  className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #fffaf0, #fff8f0)',
                    border: '1px solid rgba(255,105,180,0.2)',
                    boxShadow: '0 30px 80px rgba(255,105,180,0.15), 0 0 0 1px rgba(255,105,180,0.1)',
                  }}
                >
                  {/* Corner decorations */}
                  {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                    <span key={i} className={`absolute ${pos} text-pink-200 text-lg`}>🌸</span>
                  ))}

                  {/* Letter lines */}
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-10 right-10"
                      style={{
                        top: `${60 + i * 28}px`,
                        height: '1px',
                        background: 'rgba(255,105,180,0.08)',
                      }}
                    />
                  ))}

                  <h3
                    className="text-2xl md:text-3xl font-bold text-pink-700 mb-6 text-center relative z-10"
                    style={{ fontFamily: 'Dancing Script, cursive' }}
                  >
                    To My Favorite Person ❤️
                  </h3>

                  <div className="relative z-10">
                    <p
                      className="text-pink-800 leading-relaxed whitespace-pre-line relative z-10"
                      style={{
                        fontFamily: 'Dancing Script, cursive',
                        fontSize: '1.1rem',
                        lineHeight: '1.9',
                      }}
                    >
                      {displayedText}
                      {isTyping && <span className="typewriter-cursor" />}
                    </p>
                  </div>

                  {!isTyping && displayedText && (
                    <motion.div
                      className="mt-8 flex justify-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {['❤️', '💕', '🌸', '✨', '💖'].map((e, i) => (
                        <motion.span
                          key={i}
                          className="text-xl"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        >
                          {e}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={closeLetter}
                    className="text-pink-400 text-sm underline cursor-pointer hover:text-pink-600"
                  >
                    Close Letter 💌
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
