import { useRef, useState } from "react";
import { useLocalState } from "@/lib/storage";


type Photo = { id: string; src: string; caption: string };

const defaults: Photo[] = [
  { id: "1", src: "/gallery/1.jpg", caption: "De mis citas favoritas, me sorprendiste mucho cuando vi que ibamos del mismo color, todo en ese dia fue perfecto, me senti muy amada." },
  { id: "2", src: "/gallery/2.jpg", caption: "La primera vez que intente manejar un carro standard, ese dia me di cuenta de la paciencia que me tenes por cada vez que se me apagaba el carro y no me regañabas jajajaja" },
  { id: "3", src: "/gallery/3.jpg", caption: "Me hace sentir muy especial cuando vas manejando y agarras mi mano." },
  { id: "4", src: "/gallery/4.jpg", caption: "Nuestras Gym dates son mis favoritas, me la pasaba riendo, dandote besitos pero cuando ya me obligabas a hacer ejercicio ya no me gustaba (a eso ibamos)." },
];

export const Gallery = ({ editMode }: { editMode: boolean }) => {
  const [photos, setPhotos] = useLocalState<Photo[]>("gallery_photos_v2", defaults);
  const [openId, setOpenId] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handlePhotoClick = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

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
              onClick={() => handlePhotoClick(photo.id)}
              className="block w-full overflow-hidden bg-muted relative rounded-lg shadow-md"
            >
              {photo.src ? (
                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-script text-3xl bg-gradient-to-br from-secondary/60 to-muted min-h-[300px]">
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
