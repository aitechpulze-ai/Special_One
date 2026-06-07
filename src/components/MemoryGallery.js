import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '../data/memories';

const GalleryLightbox = ({ memory, onClose }) => (
  <AnimatePresence>
    {memory && (
      <motion.div
        className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        <motion.div
          className="relative z-10 max-w-md w-full"
          initial={{ scale: 0.5, opacity: 0, rotateY: -20 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="polaroid" style={{ borderRadius: '8px' }}>
            <div
              className={`w-full rounded flex items-center justify-center bg-gradient-to-br ${memory.color} relative overflow-hidden`}
              style={{ aspectRatio: memory.portrait ? '3/4' : memory.image ? '16/9' : '4/3' }}
            >
              {memory.image ? (
                memory.portrait ? (
                  <img src={memory.image} alt={memory.title} className="w-full h-full object-cover object-center" />
                ) : (
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="absolute top-1/2 left-1/2 object-cover"
                    style={{ transform: 'translate(-50%, -50%) rotate(90deg)', width: '100%', height: '177.78%', maxWidth: 'none' }}
                  />
                )
              ) : (
                <span className="text-7xl">{memory.emoji}</span>
              )}
            </div>
            <div className="text-center mt-4 pb-2">
              <p className="text-xs uppercase tracking-widest text-pink-400 font-semibold">{memory.date}</p>
              <p className="text-lg font-bold text-pink-800 mt-1 love-letter-font" style={{ fontSize: '1.3rem' }}>
                {memory.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full btn-premium py-2 text-sm"
          >
            Close 💖
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const PolaroidCard = ({ memory, index, onOpen }) => {
  const rotations = [-3, 2, -1.5, 2.5, -2, 3, -1, 2];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      className="cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 10,
        boxShadow: '0 30px 80px rgba(255,105,180,0.4)',
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => onOpen(memory)}
    >
      <div
        className="polaroid"
        style={{
          borderRadius: '4px',
          transform: 'none',
          transition: 'none',
        }}
      >
        {/* Photo area */}
        <div
          className={`w-full flex items-center justify-center bg-gradient-to-br ${memory.color} relative overflow-hidden`}
          style={{ borderRadius: '2px', aspectRatio: memory.portrait ? '3/4' : memory.image ? '16/9' : '4/3' }}
        >
          {memory.image ? (
            memory.portrait ? (
              <img src={memory.image} alt={memory.title} className="w-full h-full object-cover object-center" />
            ) : (
              <img
                src={memory.image}
                alt={memory.title}
                className="absolute top-1/2 left-1/2 object-cover"
                style={{ transform: 'translate(-50%, -50%) rotate(90deg)', width: '100%', height: '177.78%', maxWidth: 'none' }}
              />
            )
          ) : (
            <>
              <span className="text-6xl">{memory.emoji}</span>
              {/* Grain texture overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
              }} />
            </>
          )}
          {/* Heart hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{ background: 'rgba(255,105,180,0.3)', backdropFilter: 'blur(4px)' }}
          >
            <span className="text-4xl">❤️</span>
          </motion.div>
        </div>

        {/* Caption */}
        <div className="mt-3 text-center">
          <p className="love-letter-font text-pink-800 font-medium" style={{ fontSize: '1rem' }}>
            {memory.title}
          </p>
          <p className="text-xs text-pink-400 mt-1">{memory.date} 🌸</p>
        </div>
      </div>
    </motion.div>
  );
};

const MemoryGallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #ffe0ed, #fff0f5)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📸
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Moments That Make Me Smile
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Every picture tells our story ❤️
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {memories.map((memory, index) => (
            <PolaroidCard
              key={memory.id}
              memory={memory}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>

        {/* Add more hint */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-pink-500 text-sm font-medium"
            style={{ background: 'rgba(255,105,180,0.1)', border: '1px dashed rgba(255,105,180,0.4)' }}
          >
            <span>✨</span>
            <span>More memories will bloom here...</span>
            <span>✨</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <GalleryLightbox memory={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGallery;
