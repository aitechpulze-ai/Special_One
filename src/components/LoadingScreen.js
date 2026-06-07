import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { text: "Loading Princess Data...", icon: "👑", color: "#ff69b4" },
  { text: "✓ Smile Detected", icon: "😊", color: "#ff69b4" },
  { text: "✓ Happiness Detected", icon: "🌸", color: "#e6b8a2" },
  { text: "✓ Sweetness Detected", icon: "💕", color: "#ff69b4" },
  { text: "✓ Special Person Detected", icon: "⭐", color: "#e6b8a2" },
  { text: "Access Granted ❤️", icon: "🔓", color: "#ff4da6" },
];

const LoadingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create floating hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}rem`,
      duration: `${Math.random() * 4 + 4}s`,
      delay: `${Math.random() * 4}s`,
      emoji: ['❤️', '💕', '💖', '💗', '💝', '🌸', '✨', '💫'][Math.floor(Math.random() * 8)],
    }));
    setHearts(newHearts);

    // Progress and steps
    let step = 0;
    const stepInterval = setInterval(() => {
      step += 1;
      setCurrentStep(step);
      setProgress((step / STEPS.length) * 100);
      if (step >= STEPS.length) {
        clearInterval(stepInterval);
        setTimeout(onComplete, 1000);
      }
    }, 700);

    return () => clearInterval(stepInterval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center loading-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Floating Hearts Background */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none opacity-60"
          style={{
            left: heart.left,
            bottom: '-50px',
            fontSize: heart.size,
            animation: `floatHeart ${heart.duration} ${heart.delay} ease-in-out infinite`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Sparkle rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-pink-300"
            style={{ width: `${(i + 1) * 200}px`, height: `${(i + 1) * 200}px` }}
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8">
        {/* Crown */}
        <motion.div
          className="text-8xl mb-6"
          animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(255,105,180,0.8))' }}
        >
          👑
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-2"
          style={{ fontFamily: 'Cinzel Decorative, serif', color: '#ff69b4' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Princess Portal
        </motion.h1>

        <motion.p
          className="text-sm text-pink-400 mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Initializing your magical kingdom...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full bg-pink-100 rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ff69b4, #e6b8a2, #ff69b4)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Steps */}
        <div className="w-full space-y-3">
          {STEPS.map((step, index) => (
            <AnimatePresence key={index}>
              {currentStep > index && (
                <motion.div
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3"
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'backOut' }}
                >
                  <motion.span
                    className="text-xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.icon}
                  </motion.span>
                  <span
                    className="font-semibold text-sm md:text-base"
                    style={{ color: step.color, fontFamily: 'Inter, sans-serif' }}
                  >
                    {step.text}
                  </span>
                  {index === STEPS.length - 1 && currentStep > index && (
                    <motion.div
                      className="ml-auto"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      ❤️
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-pink-400"
              animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
