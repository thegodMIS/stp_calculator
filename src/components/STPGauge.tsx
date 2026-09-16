import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  maxValue?: number;
}

const W = 280;
const H = 168;
const CX = W / 2;
const CY = H - 20;
const R_OUTER = 118;
const R_INNER = 82;
const SEGMENT_GAP = 2.5;

// Semi-circle: from 180° to 0° (left to right)
function polarXY(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function segmentPath(cx: number, cy: number, rOuter: number, rInner: number, startDeg: number, endDeg: number) {
  const o1 = polarXY(cx, cy, rOuter, startDeg);
  const o2 = polarXY(cx, cy, rOuter, endDeg);
  const i2 = polarXY(cx, cy, rInner, endDeg);
  const i1 = polarXY(cx, cy, rInner, startDeg);
  const large = endDeg - startDeg > 180 ? 0 : 0; // never > 180 per segment
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 0 ${o2.x} ${o2.y}`,
    `L ${i2.x} ${i2.y}`,
    `A ${rInner} ${rInner} 0 ${large} 1 ${i1.x} ${i1.y}`,
    "Z",
  ].join(" ");
}

const SEGMENTS = [
  { color: "#72C98F", label: "Low",  from: 0,  to: 25  },
  { color: "#55C7DC", label: "Mod",  from: 25, to: 50  },
  { color: "#F0A24E", label: "High", from: 50, to: 75  },
  { color: "#E76055", label: "Very", from: 75, to: 100 },
];

// Each segment maps to a degree range on 180° arc (left=180, right=0)
function pctToDeg(pct: number) {
  return 180 - (pct / 100) * 180;
}

export default function STPGauge({ value, maxValue = 200 }: Props) {
  const normalized = Math.min(Math.max(value / maxValue, 0), 1);
  const pct = normalized * 100;
  const needleDeg = pctToDeg(pct);
  const needleTip = polarXY(CX, CY, R_OUTER - 14, needleDeg);

  const [animPct, setAnimPct] = useState(0);
  const [animDisplay, setAnimDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 1300;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimPct(pct * eased);
      setAnimDisplay(value * eased);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value, pct]);

  const animNeedleDeg = pctToDeg(animPct);
  const animNeedleTip = polarXY(CX, CY, R_OUTER - 14, animNeedleDeg);

  // Active segment color
  const activeSegment = SEGMENTS.find((s) => pct <= s.to) ?? SEGMENTS[SEGMENTS.length - 1];

  return (
    <div className="flex flex-col items-center">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-label={`STP gauge: ${value} KLD`}>
        {/* Background track */}
        {SEGMENTS.map((seg) => {
          const startDeg = pctToDeg(seg.from);
          const endDeg = pctToDeg(seg.to);
          // Adjust for gap
          const gap = SEGMENT_GAP * 0.5;
          const d = segmentPath(CX, CY, R_OUTER, R_INNER, endDeg + gap, startDeg - gap);
          return (
            <path key={seg.label} d={d} fill={seg.color} opacity={0.12} />
          );
        })}

        {/* Filled segments up to animPct */}
        {SEGMENTS.map((seg) => {
          if (animPct <= seg.from) return null;
          const fillTo = Math.min(animPct, seg.to);
          const startDeg = pctToDeg(seg.from);
          const endDeg = pctToDeg(fillTo);
          const gap = SEGMENT_GAP * 0.5;
          const d = segmentPath(CX, CY, R_OUTER, R_INNER, endDeg + gap, startDeg - gap);
          return (
            <path key={seg.label} d={d} fill={seg.color} opacity={0.9} />
          );
        })}

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((p) => {
          const deg = pctToDeg(p);
          const inner = polarXY(CX, CY, R_INNER - 6, deg);
          const outer = polarXY(CX, CY, R_OUTER + 6, deg);
          const lbl = polarXY(CX, CY, R_OUTER + 18, deg);
          const val = Math.round((p / 100) * maxValue);
          return (
            <g key={p}>
              <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--border)" strokeWidth={1} />
              <text x={lbl.x} y={lbl.y + 4} textAnchor="middle" fontSize={8} fill="var(--muted-foreground)" fontFamily="var(--font-body)">
                {val}
              </text>
            </g>
          );
        })}

        {/* Needle */}
        <line
          x1={CX} y1={CY}
          x2={animNeedleTip.x} y2={animNeedleTip.y}
          stroke="var(--foreground)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.85}
        />

        {/* Center hub */}
        <circle cx={CX} cy={CY} r={7} fill="var(--card-alt)" stroke="var(--border)" strokeWidth={1.5} />
        <circle cx={CX} cy={CY} r={3} fill="var(--foreground)" opacity={0.7} />
      </svg>

      {/* Value display */}
      <div className="flex flex-col items-center -mt-2">
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
          Indicative STP Flow
        </p>
        <p
          className="font-semibold leading-none"
          style={{ fontSize: 52, color: activeSegment.color, fontVariantNumeric: "tabular-nums" }}
        >
          {Math.round(animDisplay * 10) / 10}
        </p>
        <p className="text-sm mt-1 font-medium" style={{ color: "var(--secondary-text)" }}>KLD</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Indicative capacity</p>
      </div>
    </div>
  );
}
