export const EditBar = ({ editMode, setEditMode }: { editMode: boolean; setEditMode: (v: boolean) => void }) => {
  const shareLink = () => {
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado! Compártelo con Mauricio (no podrá editarlo).");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      {editMode && (
        <button onClick={shareLink} className="px-4 py-2 bg-card border border-border shadow-lg font-serif-elegant text-sm hover:bg-accent/30">
          Copiar enlace para Mauricio
        </button>
      )}
      <button
        onClick={() => setEditMode(!editMode)}
        className="px-4 py-2 bg-primary text-primary-foreground shadow-lg font-serif-elegant text-sm tracking-wider"
      >
        {editMode ? "Vista final" : "Modo edición"}
      </button>
    </div>
  );
};
