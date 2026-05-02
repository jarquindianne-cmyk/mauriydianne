import { useState } from "react";
import { useLocalState } from "@/lib/storage";

const defaultLetter = `Mi querido Mauricio,

No sabes cuánto agradezco cada instante a tu lado. Cinco meses pueden parecer poco, pero contigo cada día se ha sentido como un pequeño universo.

Gracias por tu sonrisa, por tu paciencia, por todos los detalles que me hacen amarte más.

Tuya, siempre.`;

export const LoveLetter = ({ editMode }: { editMode: boolean }) => {
  const [open, setOpen] = useState(false);
  const [letter, setLetter] = useLocalState<string>("love_letter_v1", defaultLetter);

  return (
    <div className="flex flex-col items-center">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="group relative w-full max-w-md aspect-[3/2] cursor-pointer transition-transform hover:-translate-y-1"
          aria-label="Abrir carta"
        >
          <div className="absolute inset-0 paper vintage-frame" />
          <div
            className="absolute inset-x-0 top-0 h-1/2"
            style={{
              background: "hsl(var(--cream))",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              borderBottom: "1px solid hsl(var(--sepia) / 0.3)",
            }}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl shadow-lg">
            ♥
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Toca para abrir
          </div>
        </button>
      ) : (
        <div className="w-full max-w-2xl paper vintage-frame p-10 md:p-14 animate-fade-in">
          {editMode ? (
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              rows={14}
              className="w-full bg-transparent font-serif-elegant text-xl leading-relaxed focus:outline-none resize-none"
            />
          ) : (
            <pre className="whitespace-pre-wrap font-serif-elegant text-xl leading-relaxed text-foreground">
              {letter}
            </pre>
          )}
          <div className="text-right mt-6">
            <button onClick={() => setOpen(false)} className="text-xs uppercase tracking-widest text-primary hover:underline">
              cerrar carta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
