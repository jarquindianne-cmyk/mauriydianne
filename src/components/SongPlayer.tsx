import { useRef, useState } from "react";
import { useLocalState } from "@/lib/storage";

export const SongPlayer = ({ editMode }: { editMode: boolean }) => {
  const [src, setSrc] = useLocalState<string>("song_src_v1", "");
  const [title, setTitle] = useLocalState<string>("song_title_v1", "Nuestra canción");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <div className="paper vintage-frame p-8 max-w-md mx-auto text-center">
      {editMode ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent font-display text-2xl text-center border-b border-border focus:outline-none mb-4"
        />
      ) : (
        <h3 className="font-display text-2xl text-primary mb-1">{title}</h3>
      )}
      <p className="font-script text-xl text-muted-foreground mb-6">para nosotros</p>

      {/* Turntable */}
      <div className="relative mx-auto mb-6 w-64 h-64">
        {/* Wooden base */}
        <div className="absolute inset-0 rounded-2xl shadow-2xl"
          style={{ background: "linear-gradient(135deg, #6b4423, #3d2814)" }}
        />
        {/* Vinyl */}
        <div
          className={`absolute inset-4 rounded-full ${playing ? "animate-spin-slow" : ""}`}
          style={{
            background:
              "repeating-radial-gradient(circle, #111 0px, #111 2px, #1a1a1a 3px, #1a1a1a 5px)",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Label */}
          <div className="absolute inset-0 m-auto w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "hsl(var(--primary))", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="w-2 h-2 rounded-full bg-background" />
          </div>
        </div>
        {/* Tonearm */}
        <div
          className="absolute top-2 right-2 origin-top-right transition-transform duration-700"
          style={{ transform: playing ? "rotate(-25deg)" : "rotate(-55deg)" }}
        >
          <div className="w-2 h-2 rounded-full bg-neutral-300 shadow" />
          <div className="w-1.5 h-32 bg-gradient-to-b from-neutral-200 to-neutral-400 ml-[1px] rounded-full" />
          <div className="w-4 h-3 bg-neutral-700 -ml-[5px] rounded-sm" />
        </div>
      </div>

      <button
        onClick={toggle}
        disabled={!src}
        className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-lg shadow-xl hover:scale-105 transition disabled:opacity-30"
      >
        {playing ? "❚❚ Pausar" : "▶ Reproducir"}
      </button>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} loop />

      {editMode && (
        <div className="mt-6">
          <input
            ref={fileRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <button onClick={() => fileRef.current?.click()} className="text-xs uppercase tracking-widest text-primary underline-offset-4 hover:underline">
            {src ? "Cambiar canción" : "Subir MP3"}
          </button>
        </div>
      )}
      {!src && !editMode && <p className="mt-4 text-sm italic text-muted-foreground">Próximamente…</p>}
    </div>
  );
};
