interface ProjectInfo {
  architect: string;
  mobile: string;
  location: string;
}

interface Props {
  values: ProjectInfo;
  onChange: (k: keyof ProjectInfo, v: string) => void;
}

const fields: { key: keyof ProjectInfo; label: string; placeholder: string; type?: string }[] = [
  { key: "architect", label: "Architect / Firm", placeholder: "e.g. Studio Architects" },
  { key: "mobile",    label: "Mobile",           placeholder: "+91 98765 43210", type: "tel" },
  { key: "location",  label: "Project Location", placeholder: "e.g. Mumbai, Maharashtra" },
];

export default function ProjectCard({ values, onChange }: Props) {
  return (
    <div
      className="flex flex-col gap-4 p-5"
      style={{
        background: "var(--card)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
        Project
      </p>
      {fields.map((f) => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {f.label}
          </label>
          <input
            type={f.type ?? "text"}
            value={values[f.key]}
            onChange={(e) => onChange(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="text-sm"
            style={{
              background: "var(--card-deep)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-control)",
              height: 44,
              padding: "0 14px",
              outline: "none",
              fontFamily: "var(--font-body)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(120,92,255,0.5)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
          />
        </div>
      ))}
    </div>
  );
}
