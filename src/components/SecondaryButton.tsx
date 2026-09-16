import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

export default function SecondaryButton({ children, onClick, fullWidth }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center font-medium text-sm transition-all duration-150 active:scale-[0.98]"
      style={{
        background: "transparent",
        color: "var(--primary)",
        border: "1.5px solid var(--primary)",
        borderRadius: "var(--radius-button)",
        height: 52,
        width: fullWidth ? "100%" : "auto",
        padding: fullWidth ? "0 24px" : "0 32px",
        cursor: "pointer",
        outline: "none",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}
