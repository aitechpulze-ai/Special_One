import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onEnter }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #ffd6e8 40%, #ffe0ed 70%, #f8e0f5 100%)' }}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Decorative circles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${(i + 1) * 180}px`,
            height: `${(i + 1) * 180}px`,
            border: `1px solid rgba(255,105,180,${0.15 - i * 0.03})`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1), scale: [1, 1.03, 1] }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Floating hearts */}
      {['❤️', '💕', '💖', '🌸', '✨', '💫', '💗', '🌺'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Crown with sparkles */}
        <div className="relative mb-6">
          {/* Sparkle ring around crown */}
          {['✨', '⭐', '💫', '✨', '⭐', '💫'].map((s, i) => (
            <motion.span
              key={i}
              className="absolute text-lg"
              style={{
                top: `${50 + 55 * Math.sin((i / 6) * Math.PI * 2)}%`,
                left: `${50 + 55 * Math.cos((i / 6) * Math.PI * 2)}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {s}
            </motion.span>
          ))}

          <motion.div
            className="text-8xl md:text-9xl"
            animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 30px rgba(255,105,180,0.9)) drop-shadow(0 0 60px rgba(230,184,162,0.6))' }}
          >
            👑
          </motion.div>
        </div>

        {/* Main heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-black mb-4"
          style={{ fontFamily: 'Cinzel Decorative, serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'backOut' }}
        >
          <span className="gradient-text pink-glow-text">Welcome Princess</span>{' '}
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            👑
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-pink-600 font-medium mb-10 max-w-lg leading-relaxed"
          style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          A magical little place made with love, memories,
          laughter, and a few stolen heartbeats. 💗
        </motion.p>

        {/* Enter button */}
        <motion.button
          onClick={onEnter}
          className="btn-premium text-lg px-10 py-5 font-bold tracking-wide relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'backOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            animate={{ scale: [0, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          💖 Enter The Kingdom
        </motion.button>

        {/* Scroll hint */}
        <motion.p
          className="text-xs text-pink-400 mt-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨ Something magical awaits inside ✨
        </motion.p>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z"
            fill="rgba(255,105,180,0.08)"
          />
          <path
            d="M0,80 C360,140 720,20 1080,80 C1260,110 1380,90 1440,80 L1440,120 L0,120 Z"
            fill="rgba(230,184,162,0.08)"
          />
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;
