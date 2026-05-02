export const BigHeart = () => (
  <div className="flex justify-center">
    <svg
      viewBox="0 0 100 90"
      className="w-64 md:w-80 drop-shadow-[0_10px_25px_hsl(0_70%_30%/0.45)]"
      aria-label="Corazón rojo"
    >
      <defs>
        <radialGradient id="heartShine" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="hsl(0 95% 75%)" />
          <stop offset="45%" stopColor="hsl(0 85% 55%)" />
          <stop offset="100%" stopColor="hsl(0 80% 38%)" />
        </radialGradient>
      </defs>
      <path
        d="M50 82 C 18 60, 4 40, 14 22 C 22 8, 40 8, 50 24 C 60 8, 78 8, 86 22 C 96 40, 82 60, 50 82 Z"
        fill="url(#heartShine)"
        stroke="hsl(0 75% 30%)"
        strokeWidth="1.2"
      />
      <ellipse cx="38" cy="28" rx="9" ry="5" fill="hsl(0 100% 92% / 0.7)" transform="rotate(-25 38 28)" />
    </svg>
  </div>
);
