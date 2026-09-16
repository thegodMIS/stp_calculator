interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  unit?: string;
}

export default function QuantityCard({ label, value, onChange, placeholder = "0", unit }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--muted-foreground)", letterSpacing: "0.1em" }}>
        {label}
      </p>
      <div className="relative">
        <input
          type="number"
          min={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm font-medium"
          style={{
            background: "var(--card-deep)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-control)",
            height: 48,
            padding: unit ? "0 48px 0 16px" : "0 16px",
            outline: "none",
            fontFamily: "var(--font-body)",
            appearance: "textfield",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        />
        {unit && (
          <span
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
