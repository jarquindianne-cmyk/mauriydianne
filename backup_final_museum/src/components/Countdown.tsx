import { useEffect, useState } from "react";
import { EditableText } from "./EditableText";

export const Countdown = ({ start, editMode = false }: { start: string; editMode?: boolean }) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const startDate = new Date(start);
  let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const anchor = new Date(startDate);
  anchor.setMonth(anchor.getMonth() + months);
  if (now < anchor) { months--; anchor.setMonth(anchor.getMonth() - 1); }
  const msLeft = now.getTime() - anchor.getTime();
  const days = Math.floor(msLeft / 86400000);
  const hours = Math.floor((msLeft % 86400000) / 3600000);
  const minutes = Math.floor((msLeft % 3600000) / 60000);

  const items = [
    { key: "months", defaultLabel: "Meses", value: months },
    { key: "days", defaultLabel: "Días", value: days },
    { key: "hours", defaultLabel: "Horas", value: hours },
    { key: "minutes", defaultLabel: "Minutos", value: minutes },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {items.map((it) => (
        <div key={it.key} className="paper vintage-frame p-6 text-center">
          <div className="font-display text-5xl md:text-6xl text-primary tabular-nums">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="font-serif-elegant text-base tracking-[0.3em] uppercase text-muted-foreground mt-2">
            <EditableText storageKey={`countdown_${it.key}`} defaultValue={it.defaultLabel} editMode={editMode} />
          </div>
        </div>
      ))}
    </div>
  );
};

