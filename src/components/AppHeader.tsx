interface Props {
  onBack?: () => void;
  showInfo?: boolean;
}

export default function AppHeader({ onBack, showInfo }: Props) {
  return (
    <div className="flex items-start justify-between px-5 pt-6 pb-2">
      {/* Left */}
      <button
        onClick={onBack}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-opacity"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        aria-label="Back"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="var(--secondary-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Center */}
      <div className="text-center flex-1 px-4">
        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          STP Calculator
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Water &amp; sewage planning utility
        </p>
      </div>

      {/* Right */}
      {showInfo ? (
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          aria-label="Information"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="var(--muted-foreground)" strokeWidth="1.2" />
            <path d="M7 6.5V10M7 4.5V5" stroke="var(--muted-foreground)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      ) : (
        <div className="w-8 h-8" />
      )}
    </div>
  );
}
