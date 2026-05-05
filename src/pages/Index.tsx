import { useEffect, useState } from "react";
import { HeartsRain } from "@/components/HeartsRain";
import { Countdown } from "@/components/Countdown";
import { Gallery } from "@/components/Gallery";
import { BigHeart } from "@/components/BigHeart";
import { LoveLetter } from "@/components/LoveLetter";
import { Quiz } from "@/components/Quiz";
import { SongPlayer } from "@/components/SongPlayer";
import { EditableText } from "@/components/EditableText";
import { EditBar } from "@/components/EditBar";
import { StyleControls } from "@/components/StyleControls";
import { BlackCats } from "@/components/BlackCats";
import { StarsBackground } from "@/components/StarsBackground";
import { KissButton } from "@/components/KissButton";

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
      <h2 className="text-center font-curls text-5xl md:text-6xl text-primary mb-12 ornament">
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
        <StarsBackground />
        <div className="text-center max-w-3xl w-full">

          <p className="font-parisienne text-2xl text-muted-foreground mb-6">
            <EditableText storageKey="hero_kicker" defaultValue="— Mauricio & yo —" editMode={editMode} />
          </p>
          <h1 className="font-curls text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary leading-tight break-words">
            <EditableText storageKey="hero_title1" defaultValue="Cinco meses" editMode={editMode} />
          </h1>
          <p className="font-curls text-5xl md:text-6xl text-primary/80 mt-4">
            <EditableText storageKey="hero_title2" defaultValue="juntos" editMode={editMode} />
          </p>
          <div className="font-parisienne italic text-2xl md:text-3xl text-muted-foreground mt-8 max-w-xl mx-auto">
            <EditableText
              storageKey="hero_sub"
              defaultValue="Una pequeña galería de nuestros recuerdos, tejida con amor desde el 3 de diciembre de 2025."
              editMode={editMode}
              multiline
            />
          </div>
        </div>
      </header>

      <Section id="song" editMode={editMode} defaultKicker="Pulsa play" defaultTitle="Nuestra melodía">
        <SongPlayer editMode={editMode} />
      </Section>

      <Section id="time" editMode={editMode} defaultKicker="Cada segundo a tu lado" defaultTitle="Nuestro tiempo">
        <Countdown start={START_DATE} editMode={editMode} />
      </Section>

      <Section id="gallery" editMode={editMode} defaultKicker="Galería del museo" defaultTitle="Mis momentos favoritos juntos">
        <Gallery editMode={editMode} />
      </Section>


      <Section id="letter" editMode={editMode} defaultKicker="Una carta para ti" defaultTitle="Para abrir despacio">
        <LoveLetter editMode={editMode} />
      </Section>

      <Section id="quiz" editMode={editMode} defaultKicker="Una pequeña prueba" defaultTitle="¿Cuánto me conoces?">
        <Quiz editMode={editMode} />
      </Section>


      <footer className="py-24 text-center relative z-10 px-6">
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 flex items-center justify-center animate-heartbeat">
            {/* Round Aura Layers */}
            <div className="absolute inset-0 bg-[#ff2d75] blur-[30px] rounded-full opacity-60" />
            <div className="absolute inset-4 bg-[#ff6b9d] blur-[20px] rounded-full opacity-80" />
            <div className="absolute inset-8 bg-[#ffb7d1] blur-[10px] rounded-full" />
            <div className="absolute inset-12 bg-white blur-[5px] rounded-full opacity-40" />
            
            {/* Subtle heart silhouette */}
            <div className="relative w-12 h-12 bg-[#ff2d75] blur-[8px]" style={{ clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")' }} />
          </div>
        </div>
        <div className="ornament inline-block">
          <span className="font-parisienne text-4xl md:text-5xl text-primary">
            <EditableText storageKey="footer_main" defaultValue="Con mucho amor para Mauricio" editMode={editMode} />
          </span>
          <div className="mt-2 font-vibes text-5xl text-primary/90 animate-pulse">
            Te amo
          </div>
        </div>
        <div className="mt-4 font-serif-elegant italic text-muted-foreground">
          <EditableText storageKey="footer_sub" defaultValue="— Por siempre tuya —" editMode={editMode} />
        </div>
      </footer>

      <BlackCats />
      <KissButton />
      {isOwner && <EditBar editMode={editMode} setEditMode={setEditMode} />}
      {isOwner && editMode && <StyleControls editMode={editMode} />}
    </main>
  );
};

export default Index;
