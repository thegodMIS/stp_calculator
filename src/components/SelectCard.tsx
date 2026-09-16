interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}

export default function SelectCard({ label, options, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
        {label}
      </p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none text-sm font-medium pr-9"
          style={{
            background: "var(--card-deep)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-control)",
            height: 48,
            padding: "0 16px",
            outline: "none",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: "#1a1a1c" }}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--muted-foreground)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
