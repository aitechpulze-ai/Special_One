import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'hero',       label: 'Home',        emoji: '🏠' },
  { id: 'timeline',   label: 'Journey',     emoji: '🌸' },
  { id: 'gallery',    label: 'Gallery',     emoji: '📸' },
  { id: 'compliments',label: 'Compliments', emoji: '✨' },
  { id: 'love-meter', label: 'Love',        emoji: '💕' },
  { id: 'playlist',   label: 'Songs',       emoji: '🎵' },
  { id: 'proposal',   label: 'Proposal',    emoji: '❤️' },
];

const Navigation = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('hero');
  const [menuOpen, setMenuOpen]   = useState(false);
  const [tooltip, setTooltip]     = useState(null);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        const hit = navLinks
          .map(l => document.getElementById(l.id))
          .filter(Boolean)
          .findLast(el => el.getBoundingClientRect().top <= 140);
        if (hit) setActive(hit.id);
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ══════════ DESKTOP NAVBAR ══════════ */}
      <motion.nav
        className="fixed top-4 left-0 right-0 z-[900] hidden lg:flex justify-center pointer-events-none"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="pointer-events-auto flex items-center gap-0.5 px-3 py-2 rounded-full"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrolled ? '1px solid rgba(255,105,180,0.3)' : '1px solid rgba(255,105,180,0.15)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(255,105,180,0.25), 0 2px 12px rgba(0,0,0,0.08)'
              : '0 4px 20px rgba(255,105,180,0.12)',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mr-1 group"
          >
            <motion.span
              className="text-base"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              👑
            </motion.span>
            <span
              className="gradient-text font-black text-xs hidden xl:block"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              Princess
            </span>
          </button>

          <div className="w-px h-5 rounded-full bg-pink-200 mx-1" />

          {/* Links */}
          {navLinks.map(link => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => setTooltip(link.id)}
                onMouseLeave={() => setTooltip(null)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200"
                style={{ color: isActive ? 'white' : '#be185d', zIndex: 1 }}
              >
                {/* Sliding pill */}
                {isActive && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)',
                      boxShadow: '0 4px 15px rgba(255,105,180,0.4)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="text-sm leading-none">{link.emoji}</span>
                <span className="hidden xl:block">{link.label}</span>

                {/* Tooltip for non-xl */}
                <AnimatePresence>
                  {tooltip === link.id && !isActive && (
                    <motion.div
                      className="xl:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-white text-[10px] font-semibold whitespace-nowrap pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)' }}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                    >
                      {link.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* ══════════ MOBILE TOP BAR ══════════ */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[900] lg:hidden flex items-center justify-between px-4 py-3"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,105,180,0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'backOut' }}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 font-black text-pink-600"
          style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '0.8rem' }}
        >
          <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}>
            👑
          </motion.span>
          <span className="gradient-text">Princess Portal</span>
        </button>

        {/* Hamburger → X */}
        <button
          className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block h-0.5 bg-pink-500 rounded-full"
              style={{ width: '20px' }}
              animate={menuOpen
                ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 8 : i === 2 ? -8 : 0, opacity: i === 1 ? 0 : 1 }
                : { rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </button>
      </motion.div>

      {/* ══════════ MOBILE BOTTOM DOCK ══════════ */}
      <motion.div
        className="fixed bottom-3 left-3 right-3 z-[900] lg:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: 'backOut' }}
      >
        <div
          className="flex items-center justify-around px-1 py-2 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,105,180,0.2)',
            boxShadow: '0 -4px 24px rgba(255,105,180,0.15), 0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {navLinks.map(link => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl min-w-[40px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="dockPill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,105,180,0.18), rgba(230,184,162,0.18))',
                      border: '1px solid rgba(255,105,180,0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <motion.span
                  className="text-lg leading-none"
                  animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {link.emoji}
                </motion.span>
                <span
                  className="text-[9px] font-bold leading-none"
                  style={{ color: isActive ? '#db2777' : '#fbcfe8' }}
                >
                  {link.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ══════════ MOBILE MENU OVERLAY ══════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[850] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <motion.div
              className="absolute top-16 left-4 right-4 rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.97)',
                border: '1px solid rgba(255,105,180,0.2)',
                boxShadow: '0 20px 60px rgba(255,105,180,0.25)',
              }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ ease: 'backOut', duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Menu header */}
              <div
                className="flex items-center justify-center gap-2 py-4"
                style={{ background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)' }}
              >
                <span className="text-2xl">👑</span>
                <span className="text-white font-black text-sm" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                  Princess Portal
                </span>
              </div>

              {/* Menu links */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {navLinks.map((link, i) => {
                  const isActive = active === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(255,105,180,0.15), rgba(230,184,162,0.15))'
                          : 'rgba(255,105,180,0.04)',
                        border: isActive ? '1px solid rgba(255,105,180,0.35)' : '1px solid transparent',
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className="text-xl">{link.emoji}</span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: isActive ? '#db2777' : '#9d174d' }}
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto text-pink-400 text-xs">●</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Menu footer */}
              <div className="px-4 pb-4 text-center">
                <p className="text-pink-300 text-xs italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Made with ❤️ for someone special
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
