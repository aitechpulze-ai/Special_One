import React from 'react';
import { motion } from 'framer-motion';
import { wishes } from '../data/memories';

const WishWall = () => {
  return (
    <section id="wishes" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #fff0f5, #ffd6e8)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.15, 1], y: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌠
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Wish Wall
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            All the beautiful things I wish for us ✨
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Wish cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              className="wish-card p-6 text-center cursor-default"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'backOut' }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <motion.span
                className="text-4xl block mb-4"
                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {wish.emoji}
              </motion.span>

              <h4
                className="text-lg font-bold text-pink-700 mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {wish.title}
              </h4>

              <p className="text-pink-500 text-sm leading-relaxed">
                {wish.description}
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(5)].map((_, j) => (
                  <motion.span
                    key={j}
                    className="text-xs"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.2 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="text-2xl md:text-3xl font-bold text-pink-600"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            "Every wish is a promise in disguise" 💫
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WishWall;
