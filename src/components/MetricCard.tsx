import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  value: number;
  unit: string;
  accentColor: string;
  delay?: number;
}

export default function MetricCard({ label, value, unit, accentColor, delay = 0 }: Props) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const duration = 900;
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value * eased);
        if (t < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value, delay]);

  return (
    <div
      className="flex flex-col gap-2 p-4"
      style={{
        background: "var(--card)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border)",
        flex: 1,
      }}
    >
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
        {label}
      </p>
      <div className="flex items-end gap-1.5">
        <span
          className="font-semibold leading-none"
          style={{ fontSize: 28, color: accentColor }}
        >
          {Math.round(display * 10) / 10}
        </span>
        <span className="text-xs pb-0.5" style={{ color: "var(--muted-foreground)" }}>
          {unit}
        </span>
      </div>
      {/* Thin accent rule */}
      <div style={{ height: 2, background: accentColor, borderRadius: 1, opacity: 0.35, marginTop: 4 }} />
    </div>
  );
}
