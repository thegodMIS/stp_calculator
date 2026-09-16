import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedNumber({ value, decimals = 4, duration = 1200, className = "" }: Props) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    const from = 0;
    const to = value;
    start.current = null;

    const step = (ts: number) => {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value, duration]);

  return (
    <span className={className} style={{ fontFamily: "var(--font-mono-data)" }}>
      {display.toFixed(decimals)}
    </span>
  );
}
