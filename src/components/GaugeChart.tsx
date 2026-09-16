import { useEffect, useRef } from "react";

interface Props {
  value: number;
  maxValue?: number;
}

const SIZE = 280;
const CX = SIZE / 2;
const CY = SIZE / 2 + 16;
const R = 108;
const STROKE = 14;
const ARC_START = -210; // degrees from 3 o'clock
const ARC_SWEEP = 240;  // degrees total sweep

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function getColor(normalized: number) {
  if (normalized < 0.33) return "var(--kld-low)";
  if (normalized < 0.66) return "var(--kld-mid)";
  return "var(--kld-high)";
}

export default function GaugeChart({ value, maxValue = 3 }: Props) {
  const arcRef = useRef<SVGPathElement>(null);
  const normalized = Math.min(value / maxValue, 1);
  const fillDeg = ARC_START + ARC_SWEEP * normalized;
  const trackStart = ARC_START;
  const trackEnd = ARC_START + ARC_SWEEP;

  const arcLen = (Math.PI * R * ARC_SWEEP) / 180;

  useEffect(() => {
    const el = arcRef.current;
    if (!el) return;
    const len = el.getTotalLength ? el.getTotalLength() : arcLen;
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    // force reflow
    void el.getBoundingClientRect();
    el.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.strokeDashoffset = `${len * (1 - normalized)}`;
  }, [value, normalized, arcLen]);

  const needleAngle = ARC_START + ARC_SWEEP * normalized;
  const needleTip = polarToXY(CX, CY, R - STROKE / 2 - 4, needleAngle);
  const color = getColor(normalized);

  // Tick marks
  const ticks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={SIZE}
        height={SIZE * 0.72}
        viewBox={`0 0 ${SIZE} ${SIZE * 0.72}`}
        className="overflow-visible"
        aria-label={`KL Divergence gauge: ${value.toFixed(4)}`}
      >
        {/* Track */}
        <path
          d={describeArc(CX, CY, R, trackStart, trackEnd)}
          fill="none"
          stroke="var(--gauge-track)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />

        {/* Fill arc */}
        <path
          ref={arcRef}
          d={describeArc(CX, CY, R, trackStart, fillDeg <= trackStart ? trackStart + 0.1 : fillDeg)}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />

        {/* Tick marks */}
        {ticks.map((t) => {
          const tickAngle = ARC_START + ARC_SWEEP * t;
          const inner = polarToXY(CX, CY, R - STROKE / 2 - 6, tickAngle);
          const outer = polarToXY(CX, CY, R + STROKE / 2 + 4, tickAngle);
          const label = polarToXY(CX, CY, R + STROKE / 2 + 16, tickAngle);
          return (
            <g key={t}>
              <line
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke="var(--muted-foreground)"
                strokeWidth={1}
                opacity={0.5}
              />
              <text
                x={label.x}
                y={label.y + 4}
                textAnchor="middle"
                fontSize={9}
                fill="var(--muted-foreground)"
                fontFamily="var(--font-mono-data)"
              >
                {(t * maxValue).toFixed(t === 0 ? 0 : 1)}
              </text>
            </g>
          );
        })}

        {/* Needle dot center */}
        <circle cx={CX} cy={CY} r={8} fill="var(--card)" stroke="var(--border)" strokeWidth={2} />

        {/* Needle line */}
        <line
          x1={CX}
          y1={CY}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="var(--gauge-needle)"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.9}
          style={{ transition: "x2 1.4s cubic-bezier(0.22, 1, 0.36, 1), y2 1.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />

        {/* Center dot */}
        <circle cx={CX} cy={CY} r={3.5} fill="var(--gauge-needle)" />
      </svg>

      {/* Label row */}
      <div className="flex gap-6 text-xs" style={{ fontFamily: "var(--font-mono-data)", color: "var(--muted-foreground)" }}>
        <span style={{ color: "var(--kld-low)" }}>◆ LOW</span>
        <span style={{ color: "var(--kld-mid)" }}>◆ MID</span>
        <span style={{ color: "var(--kld-high)" }}>◆ HIGH</span>
      </div>
    </div>
  );
}
