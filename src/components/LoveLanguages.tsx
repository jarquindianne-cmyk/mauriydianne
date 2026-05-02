import { Heart } from "lucide-react";

const phrases = [
  { lang: "Español", text: "Te amo" },
  { lang: "Français", text: "Je t'aime" },
  { lang: "Italiano", text: "Ti amo" },
  { lang: "English", text: "I love you" },
  { lang: "Português", text: "Eu te amo" },
  { lang: "Deutsch", text: "Ich liebe dich" },
  { lang: "日本語", text: "愛してる" },
  { lang: "한국어", text: "사랑해" },
  { lang: "Русский", text: "Я тебя люблю" },
  { lang: "中文", text: "我爱你" },
  { lang: "العربية", text: "أحبك" },
  { lang: "हिन्दी", text: "मैं तुमसे प्यार करता हूँ" },
  { lang: "Ελληνικά", text: "Σ'αγαπώ" },
  { lang: "Latin", text: "Te amo" },
  { lang: "Nederlands", text: "Ik hou van je" },
  { lang: "Svenska", text: "Jag älskar dig" },
  { lang: "Polski", text: "Kocham cię" },
  { lang: "Türkçe", text: "Seni seviyorum" },
];

export const LoveLanguages = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
    {phrases.map((p) => (
      <div key={p.lang} className="paper border border-border/60 p-5 text-center hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-center mb-2">
          <Heart className="w-5 h-5" fill="#e11d48" stroke="#e11d48" />
        </div>
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">{p.lang}</div>
        <div className="font-parisienne text-3xl text-primary">{p.text}</div>
      </div>
    ))}
  </div>
);
