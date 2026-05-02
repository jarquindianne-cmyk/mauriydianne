import { useRef, useState } from "react";
import { useLocalState } from "@/lib/storage";


type Photo = { id: string; src: string; caption: string };

const defaults: Photo[] = [
  { id: "1", src: "", caption: "Escribe aquí un recuerdo precioso de este momento..." },
  { id: "2", src: "", caption: "Escribe aquí un recuerdo precioso de este momento..." },
  { id: "3", src: "", caption: "Escribe aquí un recuerdo precioso de este momento..." },
  { id: "4", src: "", caption: "Escribe aquí un recuerdo precioso de este momento..." },
];

export const Gallery = ({ editMode }: { editMode: boolean }) => {
  const [photos, setPhotos] = useLocalState<Photo[]>("gallery_photos_v1", defaults);
  const [openId, setOpenId] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFile = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, src: reader.result as string } : p)));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">

        {photos.map((photo, i) => (
          <figure key={photo.id} className={`group ${i % 2 ? "md:mt-12" : ""}`}>
            <button
              onClick={() => setOpenId(openId === photo.id ? null : photo.id)}
              className="vintage-frame block w-full aspect-[4/5] overflow-hidden bg-muted relative"
            >
              {photo.src ? (
                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-script text-3xl bg-gradient-to-br from-secondary/60 to-muted">
                  Tu recuerdo aquí
                </div>
              )}
            </button>
            <figcaption className="mt-4 paper p-5 border border-border/60">
              {editMode ? (
                <>
                  <textarea
                    value={photo.caption}
                    onChange={(e) => setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, caption: e.target.value } : p)))}
                    className="w-full bg-transparent font-serif-elegant text-lg italic resize-none focus:outline-none"
                    rows={3}
                  />
                  <input
                    ref={(el) => (inputRefs.current[photo.id] = el)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(photo.id, e.target.files[0])}
                  />
                  <button
                    onClick={() => inputRefs.current[photo.id]?.click()}
                    className="mt-2 text-xs uppercase tracking-widest text-primary underline-offset-4 hover:underline"
                  >
                    Cambiar foto
                  </button>
                </>
              ) : (
                <p
                  className={`font-serif-elegant text-lg italic text-center transition-all ${
                    openId === photo.id ? "max-h-96 opacity-100" : "max-h-6 opacity-70 line-clamp-1"
                  }`}
                >
                  {openId === photo.id ? photo.caption : "Toca la fotografía para revelar el recuerdo"}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
