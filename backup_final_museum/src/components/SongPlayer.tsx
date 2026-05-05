import { useRef, useState } from "react";
import { useLocalState } from "@/lib/storage";
import { EditableText } from "@/components/EditableText";

export const SongPlayer = ({ editMode }: { editMode: boolean }) => {
  const [src, setSrc] = useLocalState<string>("song_src_v2", "/song.mp3");
  const [title, setTitle] = useLocalState<string>("song_title_v1", "Nuestra canción");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.error("No se pudo reproducir el audio", err);
      }
    }
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
      <p className="font-script text-xl text-muted-foreground mb-6">
        <EditableText storageKey="song_subtitle_v1" defaultValue="para nosotros" editMode={editMode} />
      </p>

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
              "repeating-radial-gradient(circle, #111 0px, #111 1px, #1a1a1a 1.5px, #1a1a1a 2.5px)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.9), 0 4px 15px rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        >
          {/* Subtle Glare/Shine */}
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.4) 225deg, transparent 270deg)"
            }}
          />
          {/* Label */}
          <div
            className="absolute w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "hsl(var(--primary))",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-background" />
            {/* Marca asimétrica para ver el giro */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-background/80" />
            <div className="absolute bottom-2 right-2 text-[8px] text-background/70 font-bold">♥</div>
          </div>
        </div>
        {/* Tonearm */}
        <div
          className="absolute -top-4 -right-4 w-12 h-48 origin-[80%_10%] transition-transform duration-1000 z-20 flex flex-col items-center"
          style={{ transform: playing ? "rotate(40deg)" : "rotate(0deg)" }}
        >
          {/* Base / Pivot */}
          <div className="w-8 h-8 rounded-full bg-neutral-300 shadow-md flex items-center justify-center border border-neutral-400 mb-2">
            <div className="w-2 h-2 rounded-full bg-neutral-500" />
          </div>
          {/* Arm tube */}
          <div className="w-2 h-32 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-500 rounded-full shadow-inner" />
          {/* Cartridge / Head */}
          <div className="w-6 h-10 bg-neutral-800 rounded-sm relative -mt-2 shadow-md border-t border-neutral-600">
            {/* Stylus needle tip */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-neutral-400 rounded-full" />
          </div>
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
