import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FBISection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const evidence = [
    { icon: '😊', text: 'Beautiful Smile', severity: 'EXTREME' },
    { icon: '✨', text: 'Cute Personality', severity: 'CRITICAL' },
    { icon: '🎵', text: 'Sweet Voice', severity: 'DANGEROUS' },
    { icon: '🥺', text: 'Too Adorable', severity: 'MAXIMUM' },
    { icon: '👑', text: 'Natural Princess Energy', severity: 'UNPRECEDENTED' },
    { icon: '💕', text: 'Heart-Stealing Tendency', severity: 'CONFIRMED' },
  ];

  return (
    <section id="fbi" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #fff0f5, #ffd6e8)' }}>
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
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔍
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            FBI Report
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Absolutely 100% Official 😏
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Report card */}
        <motion.div
          ref={ref}
          className="rounded-3xl overflow-hidden"
          style={{
            border: '2px solid rgba(255,105,180,0.3)',
            boxShadow: '0 20px 80px rgba(255,105,180,0.2)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header bar */}
          <div
            className="p-6 text-center"
            style={{ background: 'linear-gradient(135deg, #1a0533, #3d0b5a)' }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl">🔒</span>
              <span className="text-white font-bold text-xs md:text-sm uppercase tracking-widest">
                Federal Bureau of Love Investigation
              </span>
              <span className="text-2xl">🔒</span>
            </div>
            <h3
              className="text-xl md:text-2xl font-black text-pink-300"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              Official Investigation Report
            </h3>
            <p className="text-pink-400 text-xs mt-2 font-mono">CASE #LOVE-2026-FOREVER • CLASSIFIED: ROMANTIC</p>
          </div>

          {/* Report body */}
          <div
            className="p-6 md:p-8 relative"
            style={{ background: 'rgba(255,255,255,0.95)', fontFamily: 'mono' }}
          >
            {/* Case info grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Case Number', value: 'LOVE-2026-FOREVER' },
                { label: 'Status', value: '🔴 ACTIVE' },
                { label: 'Suspect', value: 'Bavyaa 👑' },
                { label: 'Classification', value: 'Top Secret ❤️' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl p-3"
                  style={{ background: 'rgba(255,105,180,0.06)', border: '1px solid rgba(255,105,180,0.15)' }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-pink-800 font-semibold text-sm">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Crime */}
            <div
              className="rounded-xl p-4 mb-6 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,105,180,0.1), rgba(230,184,162,0.1))' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-2">Primary Crime</p>
              <p className="text-2xl font-black text-pink-700" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                Stealing My Heart ❤️
              </p>
              <p className="text-pink-500 text-xs mt-2 italic">Committed repeatedly without remorse</p>
            </div>

            {/* Evidence */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-4 flex items-center gap-2">
                <span>📋</span> Evidence Collected
              </p>
              <div className="space-y-2">
                {evidence.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,105,180,0.05)' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="flex-1 text-pink-700 font-medium text-sm">✓ {item.text}</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)' }}
                    >
                      {item.severity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Verdict */}
            <motion.div
              className="rounded-2xl p-6 text-center"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5, ease: 'backOut' }}
            >
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Official Verdict</p>
              <p className="text-white text-xl md:text-2xl font-black" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                Lifetime Imprisonment
              </p>
              <p className="text-white/90 font-semibold mt-1">In My Heart ❤️</p>
              <p className="text-white/70 text-xs mt-3 italic">
                "Sentence begins immediately. No parole. No appeal. Court adjourned." — Honorable Judge Heartbreak
              </p>
            </motion.div>

            {/* Stamp */}
            <motion.div
              className="absolute top-4 right-4 opacity-10 rotate-12"
              animate={{ rotate: [10, 14, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div
                className="w-20 h-20 rounded-full border-4 border-pink-500 flex items-center justify-center text-center"
              >
                <span className="text-pink-500 font-black text-xs leading-tight">CASE<br />CLOSED</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FBISection;
