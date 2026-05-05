import React from 'react';

export const BlackCats = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none opacity-80 hover:opacity-100 transition-opacity duration-500">
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Left Cat Body */}
        <path
          d="M35 85C35 75 30 65 30 55C30 45 35 35 45 35C55 35 60 45 60 55C60 65 55 75 55 85H35Z"
          fill="#1A1A1A"
        />
        {/* Left Cat Head */}
        <circle cx="45" cy="30" r="12" fill="#1A1A1A" />
        {/* Left Cat Ears */}
        <path d="M38 22L33 10L42 20H38Z" fill="#1A1A1A" />
        <path d="M52 22L57 10L48 20H52Z" fill="#1A1A1A" />

        {/* Right Cat Body */}
        <path
          d="M65 85C65 75 60 65 60 55C60 45 65 35 75 35C85 35 90 45 90 55C90 65 85 75 85 85H65Z"
          fill="#0D0D0D"
        />
        {/* Right Cat Head */}
        <circle cx="75" cy="30" r="12" fill="#0D0D0D" />
        {/* Right Cat Ears */}
        <path d="M68 22L63 10L72 20H68Z" fill="#0D0D0D" />
        <path d="M82 22L87 10L78 20H82Z" fill="#0D0D0D" />

        {/* Tails forming a Heart */}
        <path
          d="M45 85C45 95 60 105 75 85C90 65 105 85 105 85"
          stroke="#1A1A1A"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M75 85C75 95 60 105 45 85C30 65 15 85 15 85"
          stroke="#0D0D0D"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Heart detail in the middle of tails */}
        <path
          d="M60 88C60 88 58 85 55 85C52 85 50 87 50 90C50 95 60 100 60 100C60 100 70 95 70 90C70 87 68 85 65 85C62 85 60 88 60 88Z"
          fill="#ef4444"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};
