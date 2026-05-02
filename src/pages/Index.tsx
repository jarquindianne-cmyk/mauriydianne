import { useEffect, useState } from "react";
import { HeartsRain } from "@/components/HeartsRain";
import { Countdown } from "@/components/Countdown";
import { Gallery } from "@/components/Gallery";
import { LoveLanguages } from "@/components/LoveLanguages";
import { LoveLetter } from "@/components/LoveLetter";
import { Quiz } from "@/components/Quiz";
import { SongPlayer } from "@/components/SongPlayer";
import { EditBar } from "@/components/EditBar";
import { EditableText } from "@/components/EditableText";
import museumBg from "@/assets/museum-bg.jpg";

const START_DATE = "2025-12-03T00:00:00";

const Section = ({
  id,
  defaultTitle,
  defaultKicker,
  editMode,
  children,
}: {
  id: string;
  defaultTitle?: string;
  defaultKicker?: string;
  editMode: boolean;
  children: React.ReactNode;
}) => (
  <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto relative">
    {defaultKicker && (
      <p className="text-center text-xs tracking-[0.5em] uppercase text-muted-foreground mb-3">
        <EditableText storageKey={`sec_${id}_kicker`} defaultValue={defaultKicker} editMode={editMode} />
      </p>
    )}
    {defaultTitle && (
      <h2 className="text-center font-parisienne text-5xl md:text-6xl text-primary mb-12 ornament">
        <EditableText storageKey={`sec_${id}_title`} defaultValue={defaultTitle} editMode={editMode} />
      </h2>
    )}
    {children}
  </section>
);

const Index = () => {
  const [editMode, setEditMode] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1" || localStorage.getItem("owner") === "1") {
      localStorage.setItem("owner", "1");
      setIsOwner(true);
      setEditMode(true);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <HeartsRain />

      {/* Hero */}
      <header className="relative min-h-[90vh] flex items-center justify-center px-6 z-10">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--background) / 0.85), hsl(var(--background) / 0.92)), url(${museumBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="text-center max-w-3xl w-full">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-6">
            <EditableText storageKey="hero_kicker" defaultValue="— Mauricio & yo —" editMode={editMode} />
          </p>
          <h1 className="font-script text-7xl md:text-9xl text-primary leading-none">
            <EditableText storageKey="hero_title1" defaultValue="Cinco meses" editMode={editMode} />
          </h1>
          <p className="font-parisienne text-4xl md:text-5xl text-primary/80 mt-2">
            <EditableText storageKey="hero_title2" defaultValue="juntos" editMode={editMode} />
          </p>
          <div className="font-serif-elegant italic text-lg md:text-xl text-muted-foreground mt-8 max-w-xl mx-auto">
            <EditableText
              storageKey="hero_sub"
              defaultValue="Una pequeña galería de nuestros recuerdos, tejida con amor desde el 3 de diciembre de 2025."
              editMode={editMode}
              multiline
            />
          </div>
        </div>
      </header>

      <Section id="time" editMode={editMode} defaultKicker="Cada segundo a tu lado" defaultTitle="Nuestro tiempo">
        <Countdown start={START_DATE} editMode={editMode} />
      </Section>

      <Section id="gallery" editMode={editMode} defaultKicker="Galería del museo" defaultTitle="Mis momentos favoritos juntos">
        <Gallery editMode={editMode} />
      </Section>

      <Section id="languages" editMode={editMode} defaultKicker="En todos los idiomas" defaultTitle="Te amo">
        <LoveLanguages />
      </Section>

      <Section id="letter" editMode={editMode} defaultKicker="Una carta para ti" defaultTitle="Para abrir despacio">
        <LoveLetter editMode={editMode} />
      </Section>

      <Section id="quiz" editMode={editMode} defaultKicker="Una pequeña prueba" defaultTitle="¿Cuánto me conoces?">
        <Quiz editMode={editMode} />
      </Section>

      <Section id="song" editMode={editMode} defaultKicker="Pulsa play" defaultTitle="Nuestra melodía">
        <SongPlayer editMode={editMode} />
      </Section>

      <footer className="py-24 text-center relative z-10 px-6">
        <div className="ornament inline-block">
          <span className="font-parisienne text-4xl md:text-5xl text-primary">
            <EditableText storageKey="footer_main" defaultValue="Con mucho amor para Mauricio" editMode={editMode} />
          </span>
        </div>
        <div className="mt-4 font-serif-elegant italic text-muted-foreground">
          <EditableText storageKey="footer_sub" defaultValue="— Por siempre tuya —" editMode={editMode} />
        </div>
      </footer>

      {isOwner && <EditBar editMode={editMode} setEditMode={setEditMode} />}
    </main>
  );
};

export default Index;
