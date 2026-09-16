import { useEffect, useState } from "react";
import type { STPResult } from "@/lib/stp";

interface Props {
  result: STPResult;
}

export default function CalculationFlow({ result }: Props) {
  const [visible, setVisible] = useState(0);

  const steps = [
    { label: `${result.quantity} ${result.quantityUnit}`,     sub: "Input quantity" },
    { label: `${result.designPopulation} Persons`,             sub: "Design population" },
    { label: `${result.waterDemandKL} KLD Water`,              sub: "Water demand" },
    { label: `${result.sewageKL} KLD Sewage`,                  sub: "Estimated sewage" },
    { label: `${result.stpCapacityKL} KLD STP`,                sub: "Indicative STP" },
  ];

  useEffect(() => {
    setVisible(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= steps.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, [result.stpCapacityKL]);

  return (
    <div
      className="p-5"
      style={{ background: "var(--card)", borderRadius: "var(--radius-card)", border: "1px solid var(--border)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
        Calculation Flow
      </p>
      <div className="flex flex-col items-start gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-start">
            {/* Node row */}
            <div
              className="flex items-center gap-3 transition-all duration-300"
              style={{ opacity: i < visible ? 1 : 0, transform: i < visible ? "translateY(0)" : "translateY(6px)" }}
            >
              {/* Circle node */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  background: i === steps.length - 1 ? "var(--primary)" : "var(--card-deep)",
                  border: `1.5px solid ${i === steps.length - 1 ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                <span style={{ fontSize: 9, color: i === steps.length - 1 ? "#fff" : "var(--muted-foreground)", fontWeight: 600 }}>
                  {i + 1}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight" style={{ color: i === steps.length - 1 ? "var(--primary)" : "var(--foreground)" }}>
                  {step.label}
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{step.sub}</p>
              </div>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className="ml-[13px] transition-all duration-300"
                style={{
                  width: 1.5,
                  height: 20,
                  background: "var(--border)",
                  opacity: i < visible - 1 ? 1 : 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
