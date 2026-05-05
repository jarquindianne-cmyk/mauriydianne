import React, { useState } from 'react';

export const KissButton = () => {
  const [kisses, setKisses] = useState<{ id: number; left: number }[]>([]);

  const triggerKisses = () => {
    const newKisses = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
    }));
    setKisses((prev) => [...prev, ...newKisses]);
    setTimeout(() => {
      setKisses((prev) => prev.slice(15));
    }, 4000);
  };

  return (
    <>
      <div className="fixed bottom-20 left-6 z-50 flex flex-col items-center gap-2">
        <button
          onClick={triggerKisses}
          className="w-14 h-14 rounded-full bg-primary text-white shadow-xl hover:scale-110 active:scale-95 transition flex items-center justify-center text-2xl group"
          aria-label="Enviar beso"
        >
          <span className="group-hover:animate-bounce">💋</span>
        </button>
        <span className="text-[10px] uppercase tracking-widest text-primary font-bold animate-pulse text-center">
          un besito para ti
        </span>
      </div>

      <div className="fixed inset-0 pointer-events-none z-50">
        {kisses.map((kiss) => (
          <div
            key={kiss.id}
            className="absolute top-[-50px] text-4xl animate-fall"
            style={{
              left: `${kiss.left}%`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          >
            💋
          </div>
        ))}
      </div>
    </>
  );
};
