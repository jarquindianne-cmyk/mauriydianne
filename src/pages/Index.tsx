import { useEffect, useState } from "react";
import { HeartsRain } from "@/components/HeartsRain";
import { Countdown } from "@/components/Countdown";
import { Gallery } from "@/components/Gallery";
import { LoveLanguages } from "@/components/LoveLanguages";
import { LoveLetter } from "@/components/LoveLetter";
import { Quiz } from "@/components/Quiz";
import { SongPlayer } from "@/components/SongPlayer";
import { EditBar } from "@/components/EditBar";
import museumBg from "@/assets/museum-bg.jpg";

const START_DATE = "2025-12-03T00:00:00";

const Section = ({ title, kicker, children }: { title?: string; kicker?: string; children: React.ReactNode }) => (
  <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto relative">
    {kicker && (
      <p className="text-center text-xs tracking-[0.5em] uppercase text-muted-foreground mb-3">{kicker}</p>
    )}
    {title && (
      <h2 className="text-center font-parisienne text-5xl md:text-6xl text-primary mb-12 ornament">
        <span>{title}</span>
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
        <div className="text-center max-w-3xl">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-6">— Mauricio & yo —</p>
          <h1 className="font-script text-7xl md:text-9xl text-primary leading-none">
            Cinco meses
          </h1>
          <p className="font-parisienne text-4xl md:text-5xl text-primary/80 mt-2">juntos</p>
          <p className="font-serif-elegant italic text-lg md:text-xl text-muted-foreground mt-8 max-w-xl mx-auto">
            Una pequeña galería de nuestros recuerdos, tejida con amor desde el 3 de diciembre de 2025.
          </p>
        </div>
      </header>

      {/* Countdown */}
      <Section kicker="Cada segundo a tu lado" title="Nuestro tiempo">
        <Countdown start={START_DATE} />
      </Section>

      {/* Gallery */}
      <Section kicker="Galería del museo" title="Mis momentos favoritos juntos">
        <Gallery editMode={editMode} />
      </Section>

      {/* Love languages */}
      <Section kicker="En todos los idiomas" title="Te amo">
        <LoveLanguages />
      </Section>

      {/* Letter */}
      <Section kicker="Una carta para ti" title="Para abrir despacio">
        <LoveLetter editMode={editMode} />
      </Section>

      {/* Quiz */}
      <Section kicker="Una pequeña prueba" title="¿Cuánto me conoces?">
        <Quiz editMode={editMode} />
      </Section>

      {/* Song */}
      <Section kicker="Pulsa play" title="Nuestra melodía">
        <SongPlayer editMode={editMode} />
      </Section>

      {/* Footer */}
      <footer className="py-24 text-center relative z-10">
        <div className="ornament inline-block">
          <span className="font-parisienne text-4xl md:text-5xl text-primary">
            Con mucho amor para Mauricio
          </span>
        </div>
        <p className="mt-4 font-serif-elegant italic text-muted-foreground">— Por siempre tuya —</p>
      </footer>

      {isOwner && <EditBar editMode={editMode} setEditMode={setEditMode} />}
    </main>
  );
};

export default Index;
