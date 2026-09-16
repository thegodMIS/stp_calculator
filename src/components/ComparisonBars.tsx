import { useEffect, useRef } from "react";

interface BarRow {
  label: string;
  value: number;
  color: string;
}

interface Props {
  rows: BarRow[];
  maxValue: number;
}

function AnimBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.width = "0%";
    const t = setTimeout(() => {
      el.style.transition = `width 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`;
      el.style.width = `${Math.max(pct, 1)}%`;
    }, 60);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div
      ref={ref}
      style={{ height: "100%", background: color, borderRadius: 3 }}
    />
  );
}

export default function ComparisonBars({ rows, maxValue }: Props) {
  return (
    <div
      className="p-5"
      style={{ background: "var(--card)", borderRadius: "var(--radius-card)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
        Comparison
      </p>
      <div className="flex flex-col gap-4">
        {rows.map((row, i) => {
          const pct = maxValue > 0 ? (row.value / maxValue) * 100 : 0;
          return (
            <div key={row.label} className="flex items-center gap-3">
              <span className="text-xs w-12 shrink-0" style={{ color: "var(--muted-foreground)" }}>
                {row.label}
              </span>
              <div className="flex-1" style={{ height: 8, background: "var(--card-deep)", borderRadius: 4, overflow: "hidden" }}>
                <AnimBar pct={pct} color={row.color} delay={i * 120} />
              </div>
              <span className="text-xs font-medium w-10 text-right shrink-0" style={{ color: row.color }}>
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
