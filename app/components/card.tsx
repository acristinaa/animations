interface CardProps {
  title: string;
  description: string;
  tag: string;
  highlighted?: boolean;
  onClick?: () => void;
  ref?: (node: HTMLDivElement | null) => void;
}

export function Card({
  title,
  description,
  tag,
  highlighted,
  onClick,
  ref,
}: CardProps) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        background: highlighted ? "#1f1f2e" : "#1a1a1a",
        border: highlighted ? "1px solid #5555cc" : "1px solid #2a2a2a",
        borderRadius: "12px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        cursor: onClick ? "pointer" : "default",
      }}>
      <span
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#888",
        }}>
        {tag}
      </span>
      <h3 style={{ fontSize: "18px", fontWeight: 500 }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}
