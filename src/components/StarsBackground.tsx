import React from 'react';

export const StarsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="stars-container">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${Math.random() * 0.7 + 0.3})`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
