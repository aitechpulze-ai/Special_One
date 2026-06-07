import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveMeter = () => {
  const [phase, setPhase] = useState('idle'); // idle | scanning | result

  const startScan = () => {
    setPhase('scanning');
    setTimeout(() => setPhase('result'), 4000);
  };

  const reset = () => setPhase('idle');

  const scanSteps = [
    { text: 'Initializing Heart Scanner...', icon: '🔬', delay: 0 },
    { text: 'Scanning Hearts...', icon: '❤️', delay: 0.8 },
    { text: 'Analyzing Feelings...', icon: '💭', delay: 1.6 },
    { text: 'Checking Compatibility...', icon: '🔍', delay: 2.4 },
    { text: 'Calculating Love Index...', icon: '📊', delay: 3.2 },
  ];

  return (
    <section id="love-meter" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #ffd6e8, #ffe0ed)' }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-4 inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💕
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            AI Love Analyzer
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Powered by Quantum Heart Technology™
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Machine */}
        <div
          className="rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,214,232,0.6))',
            border: '1px solid rgba(255,105,180,0.3)',
            boxShadow: '0 20px 80px rgba(255,105,180,0.2)',
          }}
        >
          {/* Idle state */}
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                {/* AI Robot icon */}
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl"
                    style={{ background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)' }}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🤖
                  </motion.div>
                  {/* Blinking light */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>

                <div>
                  <p className="text-pink-700 font-semibold text-lg mb-1">PRINCESS LOVE ANALYZER v2.0</p>
                  <p className="text-pink-400 text-sm">Advanced Compatibility Detection System</p>
                </div>

                <motion.button
                  onClick={startScan}
                  className="btn-premium px-10 py-4 text-base font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💕 Analyze Love Compatibility
                </motion.button>
              </motion.div>
            )}

            {/* Scanning state */}
            {phase === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-5"
              >
                {/* Scanning animation */}
                <div className="relative w-32 h-32">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '3px solid #ff69b4' }}
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '3px solid #e6b8a2' }}
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-5xl"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ❤️
                    </motion.span>
                  </div>
                </div>

                {/* Scan steps */}
                <div className="w-full space-y-2 text-left">
                  {scanSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-sm text-pink-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: step.delay, duration: 0.4 }}
                    >
                      <span className="text-lg">{step.icon}</span>
                      <span className="font-medium">{step.text}</span>
                      <motion.span
                        className="ml-auto text-green-500 font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: step.delay + 0.5 }}
                      >
                        ✓
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-pink-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #ff69b4, #e6b8a2)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            )}

            {/* Result state */}
            {phase === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
                className="flex flex-col items-center gap-6"
              >
                {/* Confetti mini animation */}
                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-2xl pointer-events-none"
                    style={{ top: '20%', left: '50%' }}
                    animate={{
                      x: Math.cos((i / 12) * Math.PI * 2) * 150,
                      y: Math.sin((i / 12) * Math.PI * 2) * 150,
                      opacity: [1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  >
                    {['❤️', '💕', '💖', '🌸', '✨', '🎉', '💗', '🌟', '💫', '🎊', '💝', '👑'][i]}
                  </motion.span>
                ))}

                {/* Result badge */}
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div
                    className="w-36 h-36 rounded-full flex flex-col items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)',
                      boxShadow: '0 0 40px rgba(255,105,180,0.7)',
                    }}
                  >
                    <motion.span
                      className="text-4xl"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ❤️
                    </motion.span>
                  </div>
                  {/* Outer pulse */}
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-pink-400"
                      animate={{ scale: [1, 1.5 + i * 0.2], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                </motion.div>

                <div>
                  <p className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-2">Compatibility Result</p>
                  <motion.p
                    className="text-6xl md:text-7xl font-black gradient-text"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: 'backOut' }}
                  >
                    99.99%
                  </motion.p>
                  <motion.p
                    className="text-xl font-bold text-pink-700 mt-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Perfect Match Found ❤️
                  </motion.p>
                  <motion.p
                    className="text-pink-500 text-sm mt-2 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    "Results are 99.99% accurate and 100% adorable" — AI Princess Lab
                  </motion.p>
                </div>

                <motion.button
                  onClick={reset}
                  className="text-sm text-pink-400 underline cursor-pointer mt-2"
                  whileHover={{ color: '#ff69b4' }}
                >
                  Run Analysis Again 🔬
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LoveMeter;
