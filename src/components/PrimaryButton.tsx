import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({ children, onClick, disabled, fullWidth }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center font-semibold text-sm transition-all duration-150 active:scale-[0.98]"
      style={{
        background: disabled ? "var(--muted)" : "var(--primary)",
        color: disabled ? "var(--muted-foreground)" : "var(--primary-foreground)",
        borderRadius: "var(--radius-button)",
        height: 52,
        width: fullWidth ? "100%" : "auto",
        padding: fullWidth ? "0 24px" : "0 32px",
        letterSpacing: "0.01em",
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        outline: "none",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </button>
  );
}
