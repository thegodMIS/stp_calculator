import type { STPResult } from "@/lib/stp";

interface Props {
  result: STPResult;
}

export default function ProjectSnapshot({ result }: Props) {
  const rows = [
    { label: "Building",      value: result.buildingType },
    result.subCategory ? { label: "Category", value: result.subCategory } : null,
    { label: "Quantity",      value: `${result.quantity} ${result.quantityUnit}` },
    { label: "Design Pop.",   value: `${result.designPopulation} persons` },
    { label: "Rate",          value: `${result.lpcd} LPCD` },
  ].filter(Boolean) as { label: string; value: string }[];

  const hasProject = result.architect || result.location;

  return (
    <div
      className="p-5"
      style={{
        background: "var(--card)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
        Project Snapshot
      </p>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-baseline gap-4">
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{row.label}</span>
            <span className="text-sm font-medium text-right" style={{ color: "var(--foreground)" }}>{row.value}</span>
          </div>
        ))}
        {hasProject && (
          <>
            <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
            {result.architect && (
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Architect</span>
                <span className="text-sm font-medium text-right" style={{ color: "var(--secondary-text)" }}>{result.architect}</span>
              </div>
            )}
            {result.location && (
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Location</span>
                <span className="text-sm font-medium text-right" style={{ color: "var(--secondary-text)" }}>{result.location}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
