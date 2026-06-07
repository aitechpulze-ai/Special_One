import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { songs } from '../data/memories';

const SongPlaylist = () => {
  const [activeSong, setActiveSong] = useState(null);

  const handlePlay = (song) => {
    setActiveSong(song);
    window.open(song.url, '_blank');
  };

  return (
    <section id="playlist" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #fff0f5, #ffd6e8)' }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎵
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Our Playlist
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            Songs that remind me of you 🎶
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Player */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,214,232,0.6))',
            border: '1px solid rgba(255,105,180,0.2)',
            boxShadow: '0 20px 80px rgba(255,105,180,0.2)',
          }}
        >
          {/* Now playing */}
          <div className="p-6 pb-5" style={{ background: 'linear-gradient(135deg, #ff69b4, #e6b8a2)' }}>
            {activeSong ? (
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  {activeSong.emoji}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-lg truncate">{activeSong.title}</p>
                  <p className="text-white/80 text-sm truncate">{activeSong.artist}</p>
                  <p className="text-white/60 text-xs mt-1">▶ Playing on YouTube...</p>
                </div>
                <div className="flex items-end gap-1 h-6">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1 bg-white rounded-full"
                      animate={{ height: ['40%', '100%', '40%'] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <motion.span
                  className="text-5xl block mb-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎵
                </motion.span>
                <p className="text-white font-semibold">Select a song to play</p>
                <p className="text-white/70 text-sm mt-1">Opens on YouTube ❤️</p>
              </div>
            )}
          </div>

          {/* Song list */}
          <div className="p-4">
            {songs.map((song, i) => (
              <motion.div
                key={song.id}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                  activeSong?.id === song.id ? 'bg-pink-50' : 'hover:bg-pink-50/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handlePlay(song)}
                whileHover={{ x: 5 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${song.color}20`, border: `1px solid ${song.color}30` }}
                >
                  {song.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-semibold truncate ${activeSong?.id === song.id ? 'text-pink-600' : 'text-pink-800'}`}>
                    {song.title}
                  </p>
                  <p className="text-pink-400 text-sm truncate">{song.artist}</p>
                </div>

                <div className="flex items-center gap-2">
                  {activeSong?.id === song.id ? (
                    <div className="flex items-end gap-0.5 h-4">
                      {[0, 1, 2].map(j => (
                        <motion.div
                          key={j}
                          className="w-0.5 rounded-full"
                          style={{ background: song.color }}
                          animate={{ height: ['30%', '100%', '30%'] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.15 }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-pink-300 text-xs">▶</span>
                  )}
                  <motion.span
                    className="text-xl"
                    animate={activeSong?.id === song.id ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    {activeSong?.id === song.id ? '❤️' : '🎵'}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SongPlaylist;
