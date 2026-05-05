import { useState } from "react";
import { useLocalState } from "@/lib/storage";

type Q = { q: string; options: string[]; correct: number };

const defaults: Q[] = [
  { q: "¿Cuál fue nuestra primera cita?", options: ["Un café", "El cine", "Un parque"], correct: 0 },
  { q: "¿Cuál es mi color favorito?", options: ["Rosa", "Amarillo", "Lavanda"], correct: 1 },
  { q: "¿Qué canción nos representa?", options: ["La nuestra <3", "Cualquiera contigo", "Todas"], correct: 0 },
];

export const Quiz = ({ editMode }: { editMode: boolean }) => {
  const [questions, setQuestions] = useLocalState<Q[]>("quiz_v1", defaults);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const allCorrect = answers.length === questions.length && answers.every((a, i) => a === questions[i].correct);

  if (done && allCorrect) {
    return (
      <div className="text-center animate-fade-in">
        <div className="inline-block relative">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-accent via-accent to-primary flex items-center justify-center shadow-2xl border-8 border-cream"
               style={{ borderColor: "hsl(var(--cream))" }}>
            <div className="text-center">
              <div className="text-5xl">♥♥♥</div>
              <div className="font-parisienne text-2xl text-primary-foreground mt-2 leading-none">El mejor</div>
              <div className="font-parisienne text-3xl text-primary-foreground leading-none">novio</div>
            </div>
          </div>
          <div className="absolute -top-2 -left-2 text-3xl">♥</div>
          <div className="absolute -top-2 -right-2 text-3xl">♥</div>
          <div className="absolute -bottom-2 -left-2 text-3xl">♥</div>
          <div className="absolute -bottom-2 -right-2 text-3xl">♥</div>
        </div>
        <p className="mt-6 font-script text-3xl text-primary">Felicidades, mi amor</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {questions.map((q, qi) => (
        <div key={qi} className="paper p-6 border border-border/60">
          {editMode ? (
            <div className="space-y-2">
              <input
                value={q.q}
                onChange={(e) => setQuestions(questions.map((x, i) => i === qi ? { ...x, q: e.target.value } : x))}
                className="w-full bg-transparent font-display text-xl border-b border-border focus:outline-none pb-1"
              />
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={q.correct === oi}
                    onChange={() => setQuestions(questions.map((x, i) => i === qi ? { ...x, correct: oi } : x))}
                  />
                  <input
                    value={opt}
                    onChange={(e) => setQuestions(questions.map((x, i) => i === qi ? { ...x, options: x.options.map((o, j) => j === oi ? e.target.value : o) } : x))}
                    className="flex-1 bg-transparent border-b border-border/40 focus:outline-none"
                  />
                </div>
              ))}
              <p className="text-xs text-muted-foreground italic">Marca la respuesta correcta</p>
            </div>
          ) : (
            <>
              <p className="font-display text-xl mb-4">{qi + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => { const next = [...answers]; next[qi] = oi; setAnswers(next); }}
                    className={`w-full text-left px-4 py-3 border transition-all font-serif-elegant text-lg ${
                      answers[qi] === oi
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/60 hover:border-primary/60"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
      {!editMode && (
        <div className="text-center">
          <button
            onClick={() => setDone(true)}
            disabled={answers.filter(a => a !== undefined).length < questions.length}
            className="px-10 py-3 bg-primary text-primary-foreground font-display tracking-widest uppercase text-sm disabled:opacity-40 hover:bg-primary/90 transition"
          >
            Enviar respuestas
          </button>
          {done && !allCorrect && (
            <p className="mt-4 font-serif-elegant italic text-destructive">Casi… ¡vuelve a intentarlo, mi amor!</p>
          )}
        </div>
      )}
    </div>
  );
};
