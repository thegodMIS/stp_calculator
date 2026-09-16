import ResultHeader from "./ResultHeader";
import STPGauge from "./STPGauge";
import MetricCard from "./MetricCard";
import ProjectSnapshot from "./ProjectSnapshot";
import CalculationFlow from "./CalculationFlow";
import ComparisonBars from "./ComparisonBars";
import SecondaryButton from "./SecondaryButton";
import type { STPResult } from "@/lib/stp";

interface Props {
  result: STPResult;
  onBack: () => void;
}

export default function ResultScreen({ result, onBack }: Props) {
  const maxVal = Math.max(result.waterDemandKL, result.sewageKL, result.stpCapacityKL, 1);
  const barRows = [
    { label: "Water",  value: result.waterDemandKL,   color: "var(--water)" },
    { label: "Sewage", value: result.sewageKL,         color: "var(--sewage)" },
    { label: "STP",    value: result.stpCapacityKL,    color: "var(--stp-color)" },
  ];

  return (
    <div className="screen-in min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      <ResultHeader onBack={onBack} />

      <div className="flex-1 px-5 pb-8 flex flex-col gap-4 overflow-y-auto">

        {/* Gauge hero card */}
        <div
          className="flex flex-col items-center py-6 px-4 fade-up"
          style={{
            background: "var(--card)",
            borderRadius: "var(--radius-hero)",
            border: "1px solid var(--border)",
            animationDelay: "0ms",
          }}
        >
          <STPGauge value={result.stpCapacityKL} maxValue={Math.max(result.waterDemandKL * 1.5, 100)} />
        </div>

        {/* KPI cards */}
        <div
          className="flex gap-3 fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <MetricCard
            label="Water Demand"
            value={result.waterDemandKL}
            unit="KL / day"
            accentColor="var(--water)"
            delay={200}
          />
          <MetricCard
            label="Est. Sewage"
            value={result.sewageKL}
            unit="KL / day"
            accentColor="var(--sewage)"
            delay={320}
          />
        </div>

        {/* Project snapshot */}
        <div className="fade-up" style={{ animationDelay: "200ms" }}>
          <ProjectSnapshot result={result} />
        </div>

        {/* Calculation flow */}
        <div className="fade-up" style={{ animationDelay: "280ms" }}>
          <CalculationFlow result={result} />
        </div>

        {/* Comparison bars */}
        <div className="fade-up" style={{ animationDelay: "360ms" }}>
          <ComparisonBars rows={barRows} maxValue={maxVal} />
        </div>

        {/* Recalculate */}
        <div className="pt-2 fade-up" style={{ animationDelay: "400ms" }}>
          <SecondaryButton onClick={onBack} fullWidth>
            Recalculate
          </SecondaryButton>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs pb-2" style={{ color: "var(--muted-foreground)" }}>
          Indicative values only. Verify with certified engineering standards.
        </p>
      </div>
    </div>
  );
}
