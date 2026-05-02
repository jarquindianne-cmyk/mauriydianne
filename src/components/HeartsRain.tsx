import { useMemo } from "react";

export const HeartsRain = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 10,
        size: 12 + Math.random() * 22,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-fall absolute"
          style={{
            left: `${h.left}%`,
            top: "-5vh",
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            color: "hsl(0 80% 50%)",
            filter: "drop-shadow(0 2px 4px hsl(345 35% 30% / 0.3))",
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};
