interface Props {
  onBack: () => void;
}

export default function ResultHeader({ onBack }: Props) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-2">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm"
        style={{ color: "var(--secondary-text)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>
      <div className="text-right">
        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Your result</p>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Indicative calculation</p>
      </div>
    </div>
  );
}
