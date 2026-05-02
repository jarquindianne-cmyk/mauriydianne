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

      <button
        onClick={toggle}
        disabled={!src}
        className="w-20 h-20 rounded-full bg-primary text-primary-foreground text-3xl shadow-xl hover:scale-105 transition disabled:opacity-30"
      >
        {playing ? "❚❚" : "▶"}
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
