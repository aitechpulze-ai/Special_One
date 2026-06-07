import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { memories, futureMemories } from '../data/memories';

const MemoryCard = ({ memory, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-10 items-start group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 relative"
          style={{
            background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)',
            boxShadow: '0 0 20px rgba(255,105,180,0.5)',
          }}
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          {memory.emoji}
        </motion.div>
        {index < memories.length - 1 && (
          <div className="w-0.5 flex-1 mt-2 timeline-line min-h-16 opacity-40" />
        )}
      </div>

      {/* Memory card */}
      <motion.div
        className="flex-1 mb-10"
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="glass rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(255,105,180,0.2)',
            boxShadow: '0 8px 40px rgba(255,105,180,0.1)',
          }}
        >
          {/* Date badge */}
          <div className="px-6 pt-5 pb-3">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)', color: 'white' }}
            >
              {memory.date}
            </span>
          </div>

          {/* Emoji placeholder only (no image) */}
          <div
            className={`mx-6 rounded-2xl h-36 flex items-center justify-center bg-gradient-to-br ${memory.color}`}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <motion.span
              className="text-5xl"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {memory.emoji}
            </motion.span>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <h3 className="text-xl font-bold text-pink-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {memory.title}
            </h3>
            <p className="text-pink-600 text-sm leading-relaxed line-clamp-2">
              {memory.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MemoryTimeline = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="timeline" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #fff0f5, #ffd6e8)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Our Beautiful Journey
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Every chapter of our story ❤️
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {memories.map((memory, index) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              index={index}
            />
          ))}
        </div>

        {/* Future memories */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-pink-600 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            ✨ Chapters Yet to Be Written ✨
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {futureMemories.map((item, i) => (
              <motion.div
                key={item.id}
                className="glass rounded-2xl p-5 text-center cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  border: '2px dashed rgba(255,105,180,0.4)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,105,180,0.8)' }}
              >
                <span className="text-3xl block mb-2">{item.emoji}</span>
                <p className="font-semibold text-pink-700 text-sm">{item.title}</p>
                <p className="text-pink-400 text-xs mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoryTimeline;
