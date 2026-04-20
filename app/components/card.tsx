interface CardProps {
  title: string;
  description: string;
  tag: string;
}

export function Card({ title, description, tag }: CardProps) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: "12px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
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
