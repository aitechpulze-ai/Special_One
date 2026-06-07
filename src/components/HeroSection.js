import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SPARKLE_DOTS = Array.from({ length: 20 }, () => ({
  w: Math.random() * 4 + 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  dur: Math.random() * 3 + 2,
  delay: Math.random() * 3,
}));

const HeroSection = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const hearts = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 8,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.5,
    }));

    const drawHeart = (ctx, x, y, size, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ff69b4';
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + (3 * size) / 4, x, y + size);
      ctx.bezierCurveTo(x, y + (3 * size) / 4, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(h => {
        drawHeart(ctx, h.x, h.y, h.size, h.opacity);
        h.y -= h.speed;
        h.x += h.drift;
        if (h.y + h.size < 0) {
          h.y = canvas.height + h.size;
          h.x = Math.random() * canvas.width;
        }
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Pause canvas when not visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!animRef.current) animate();
      } else {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a0533 0%, #3d0b5a 30%, #6b1177 60%, #c2185b 100%)',
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(255,105,180,0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse at 80% 50%, rgba(255,105,180,0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 80%, rgba(230,184,162,0.2) 0%, transparent 60%)',
            'radial-gradient(ellipse at 20% 50%, rgba(255,105,180,0.3) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Heart canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Sparkle dots */}
      {SPARKLE_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${dot.w}px`,
            height: `${dot.w}px`,
            background: 'rgba(255,255,255,0.8)',
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: dot.dur, repeat: Infinity, delay: dot.delay }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Crown */}
        <motion.div
          className="text-6xl mb-6"
          animate={{ rotate: [-5, 5, -5], y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          👑
        </motion.div>

        {/* Main text */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-black mb-6"
          style={{ fontFamily: 'Cinzel Decorative, serif', color: 'white', lineHeight: 1.2 }}
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          Every kingdom{' '}
          <span className="gradient-text">has a queen.</span>
        </motion.h2>

        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-32" />
          <p className="text-2xl md:text-3xl font-bold text-pink-300"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Mine already exists. 👑❤️
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-32" />
        </motion.div>

        {/* Quote cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            { text: "Some people enter our lives.", icon: "🚪" },
            { text: "Some people become our world.", icon: "🌍" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,105,180,0.3)' }}
              custom={i + 2}
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <span className="text-3xl block mb-3">{item.icon}</span>
              <p className="text-white text-lg font-medium" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-pink-300 text-sm mb-2">Scroll to explore</p>
          <div className="w-6 h-10 rounded-full border-2 border-pink-400 flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 bg-pink-400 rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
