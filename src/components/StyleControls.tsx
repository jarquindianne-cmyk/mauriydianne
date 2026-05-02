import { useEffect } from "react";
import { useLocalState } from "@/lib/storage";

const FONTS = [
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Parisienne", value: "'Parisienne', cursive" },
  { label: "Great Vibes", value: "'Great Vibes', cursive" },
  { label: "Pinyon Script", value: "'Pinyon Script', cursive" },
  { label: "Cormorant Garamond", value: "'Cormorant Garamond', serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
];

export const StyleControls = ({ editMode }: { editMode: boolean }) => {
  const [font, setFont] = useLocalState<string>("style_font", FONTS[0].value);
  const [color, setColor] = useLocalState<string>("style_color", "#7a2a3a");
  const [bg, setBg] = useLocalState<string>("style_bg", "#d9c2a3");

  useEffect(() => {
    document.body.style.fontFamily = font;
    document.documentElement.style.setProperty("--user-text-color", color);
    document.documentElement.style.setProperty("--user-bg-color", bg);
  }, [font, color, bg]);

  

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-card border border-border shadow-lg p-4 rounded-md flex flex-col gap-3 w-64">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">Personalizar</div>
      <label className="text-sm">
        Fuente
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="mt-1 w-full bg-background border border-border rounded px-2 py-1 text-sm"
          style={{ fontFamily: font }}
        >
          {FONTS.map((f) => (
            <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
              {f.label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm flex items-center justify-between">
        Color de texto
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-12 cursor-pointer" />
      </label>
      <label className="text-sm flex items-center justify-between">
        Color de fondo
        <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-12 cursor-pointer" />
      </label>
    </div>
  );
};

export const StyleApplier = () => {
  const [font] = useLocalState<string>("style_font", "'Dancing Script', cursive");
  const [color] = useLocalState<string>("style_color", "#7a2a3a");
  const [bg] = useLocalState<string>("style_bg", "#d9c2a3");
  useEffect(() => {
    document.body.style.fontFamily = font;
    document.documentElement.style.setProperty("--user-text-color", color);
    document.documentElement.style.setProperty("--user-bg-color", bg);
  }, [font, color, bg]);
  return null;
};
