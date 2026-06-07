import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';

const PrincessQuiz = () => {
  const [selected, setSelected] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [windowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const options = [
    { id: 'wrong1', text: 'Random Girl 🤔', correct: false },
    { id: 'wrong2', text: 'Another Girl 🙄', correct: false },
    { id: 'correct', text: 'Princess 👑', correct: true },
  ];

  const handleSelect = (option) => {
    setSelected(option.id);
    if (option.correct) {
      setShowSuccess(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 6000);
    } else {
      setShowError(true);
    }
  };

  const reset = () => {
    setSelected(null);
    setShowError(false);
    setShowSuccess(false);
  };

  return (
    <section id="quiz" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #ffe0ed, #fff0f5)' }}>
      {confetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#ff69b4', '#e6b8a2', '#ffd6e8', '#ff4da6', '#ffffff', '#ffb3d1']}
          numberOfPieces={300}
          recycle={false}
        />
      )}

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
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            👑
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Princess Quiz
          </h2>
          <p className="text-pink-500 text-lg" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            This one has only one correct answer 😏
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Quiz card */}
        <div
          className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,214,232,0.7))',
            border: '1px solid rgba(255,105,180,0.3)',
            boxShadow: '0 20px 80px rgba(255,105,180,0.15)',
          }}
        >
          {/* Question */}
          <div className="text-center mb-8">
            <motion.p
              className="text-sm font-bold uppercase tracking-widest text-pink-400 mb-3"
            >
              Question 1 of 1
            </motion.p>
            <h3
              className="text-xl md:text-2xl font-bold text-pink-800"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Who is the cutest girl in the universe? 🌟
            </h3>
          </div>

          {/* Options */}
          {!showSuccess && !showError && (
            <div className="space-y-4">
              {options.map((option, i) => (
                <motion.button
                  key={option.id}
                  className="w-full py-4 px-6 rounded-2xl text-left font-semibold text-base transition-all relative overflow-hidden"
                  style={{
                    background: selected === option.id
                      ? option.correct
                        ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                        : 'linear-gradient(135deg, #f87171, #ef4444)'
                      : 'rgba(255,255,255,0.8)',
                    border: '2px solid rgba(255,105,180,0.2)',
                    color: selected === option.id ? 'white' : '#c2185b',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, x: 5, borderColor: 'rgba(255,105,180,0.6)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option)}
                  disabled={!!selected}
                >
                  <span className="mr-3 font-bold opacity-60">{['A', 'B', 'C'][i]}.</span>
                  {option.text}
                </motion.button>
              ))}
            </div>
          )}

          {/* Error popup */}
          <AnimatePresence>
            {showError && (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  😤
                </motion.div>
                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{ background: 'linear-gradient(135deg, #fee2e2, #fecaca)', border: '2px solid #f87171' }}
                >
                  <p className="text-2xl font-black text-red-600 mb-2">System Error 😤</p>
                  <p className="text-red-500 font-semibold mb-1">Wrong Answer Detected 😂</p>
                  <p className="text-red-400 text-sm">Our AI has flagged this response as HIGHLY INCORRECT</p>
                </div>
                <p className="text-pink-600 font-bold text-lg mb-6">
                  Try Again Princess 👑
                </p>
                <motion.button
                  onClick={reset}
                  className="btn-premium py-3 px-8 font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄 Try Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success popup */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: 3 }}
                >
                  🎉
                </motion.div>
                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', border: '2px solid #4ade80' }}
                >
                  <p className="text-2xl font-black text-green-700 mb-2">CORRECT! 🎊</p>
                  <p className="text-green-600 font-semibold mb-1">Obviously, the only right answer 👑</p>
                  <p className="text-green-500 text-sm">You scored 100/100 on intelligence today! 🌟</p>
                </div>
                <p className="text-pink-600 font-bold text-xl mb-6">
                  Certified Smartest Princess in the Universe 💖
                </p>
                <motion.button
                  onClick={reset}
                  className="btn-premium py-3 px-8 font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄 Play Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PrincessQuiz;
