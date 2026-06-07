import React, { useEffect, useRef, useState, useCallback } from 'react';

const TRAIL_EMOJIS = ['❤️', '💕', '✨', '🌸', '💖', '💗', '💝', '⭐', '🌟'];

const MouseTrail = () => {
  const [trails, setTrails] = useState([]);
  const counter = useRef(0);

  const handleMouseMove = useCallback((e) => {
    counter.current += 1;
    if (counter.current % 3 !== 0) return;

    const id = Date.now() + Math.random();
    const emoji = TRAIL_EMOJIS[Math.floor(Math.random() * TRAIL_EMOJIS.length)];
    const x = e.clientX;
    const y = e.clientY;

    setTrails(prev => {
      const next = prev.length >= 20 ? prev.slice(1) : prev;
      return [...next, { id, x, y, emoji }];
    });

    setTimeout(() => {
      setTrails(prev => prev.filter(t => t.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {trails.map(trail => (
        <div
          key={trail.id}
          className="mouse-trail absolute"
          style={{
            left: trail.x - 12,
            top: trail.y - 12,
            fontSize: '1.2rem',
          }}
        >
          {trail.emoji}
        </div>
      ))}
    </div>
  );
};

export default MouseTrail;
