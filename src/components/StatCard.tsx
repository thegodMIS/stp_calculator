interface Props {
  label: string;
  value: string;
  sublabel?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, sublabel, accent }: Props) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded"
      style={{
        background: "var(--card)",
        border: `1px solid ${accent ? "var(--primary)" : "var(--border)"}`,
        boxShadow: accent ? "0 0 16px rgba(0,212,184,0.08)" : "none",
      }}
    >
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono-data)", letterSpacing: "0.12em" }}
      >
        {label}
      </span>
      <span
        className="text-xl font-medium"
        style={{ fontFamily: "var(--font-mono-data)", color: accent ? "var(--primary)" : "var(--foreground)" }}
      >
        {value}
      </span>
      {sublabel && (
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {sublabel}
        </span>
      )}
    </div>
  );
}
