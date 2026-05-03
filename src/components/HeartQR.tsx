import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface Props {
  url: string;
  size?: number;
}

export const HeartQR = ({ url, size = 320 }: Props) => {
  const [matrix, setMatrix] = useState<number[][] | null>(null);

  useEffect(() => {
    const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
    const n = qr.modules.size;
    const data = qr.modules.data;
    const m: number[][] = [];
    for (let y = 0; y < n; y++) {
      const row: number[] = [];
      for (let x = 0; x < n; x++) row.push(data[y * n + x]);
      m.push(row);
    }
    setMatrix(m);
  }, [url]);

  if (!matrix) return null;
  const n = matrix.length;
  const cell = size / n;

  // Heart path (viewBox 0..n in QR units, scaled visually around the QR)
  // Big heart that wraps the square QR
  const heartPath = `
    M ${n / 2} ${n * 1.15}
    C ${-n * 0.25} ${n * 0.7}, ${-n * 0.05} ${-n * 0.15}, ${n / 2} ${n * 0.22}
    C ${n * 1.05} ${-n * 0.15}, ${n * 1.25} ${n * 0.7}, ${n / 2} ${n * 1.15}
    Z
  `;

  // Detect finder patterns (corners) — render as solid squares for scannability
  const isFinder = (x: number, y: number) => {
    const inBox = (bx: number, by: number) =>
      x >= bx && x < bx + 7 && y >= by && y < by + 7;
    return inBox(0, 0) || inBox(n - 7, 0) || inBox(0, n - 7);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox={`${-n * 0.2} ${-n * 0.2} ${n * 1.4} ${n * 1.45}`}
        width={size}
        height={size}
        className="drop-shadow-[0_8px_20px_hsl(0_70%_30%/0.4)]"
      >
        {/* Heart background */}
        <path d={heartPath} fill="hsl(350 65% 97%)" stroke="hsl(var(--primary))" strokeWidth={n * 0.012} />

        {/* QR modules as little hearts */}
        <g>
          {matrix.flatMap((row, y) =>
            row.map((v, x) => {
              if (!v) return null;
              if (isFinder(x, y)) {
                return (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width={1.05}
                    height={1.05}
                    fill="hsl(345 55% 30%)"
                  />
                );
              }
              // tiny heart per module
              const cx = x + 0.5;
              const cy = y + 0.5;
              const s = 0.55;
              return (
                <path
                  key={`${x}-${y}`}
                  d={`M ${cx} ${cy + s * 0.7}
                      C ${cx - s} ${cy + s * 0.1}, ${cx - s} ${cy - s * 0.55}, ${cx} ${cy - s * 0.05}
                      C ${cx + s} ${cy - s * 0.55}, ${cx + s} ${cy + s * 0.1}, ${cx} ${cy + s * 0.7} Z`}
                  fill="hsl(345 55% 35%)"
                />
              );
            })
          )}
        </g>
      </svg>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif-elegant text-sm text-primary underline underline-offset-4 break-all max-w-xs text-center"
      >
        {url}
      </a>
      <p className="font-parisienne text-lg text-muted-foreground text-center max-w-xs">
        Escanéame con la cámara 💖
      </p>
    </div>
  );
};
