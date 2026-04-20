"use client";

import { useState, useEffect, CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Variant = "fade" | "slide-up" | "scale" | "blur";

interface AnimateInProps {
  children: ReactNode;
  variant?: Variant;
  duration?: number;
  delay?: number;
}

const hiddenStyles: Record<Variant, CSSProperties> = {
  fade: { opacity: 0 },
  "slide-up": { opacity: 0, transform: "translateY(24px)" },
  scale: { opacity: 0, transform: "scale(0.92)" },
  blur: { opacity: 0, filter: "blur(8px)" },
};

const visibleStyles: Record<Variant, CSSProperties> = {
  fade: { opacity: 1 },
  "slide-up": { opacity: 1, transform: "translateY(0)" },
  scale: { opacity: 1, transform: "scale(1)" },
  blur: { opacity: 1, filter: "blur(0)" },
};

export function AnimateIn({
  children,
  variant = "fade",
  duration = 500,
  delay = 0,
}: AnimateInProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  const style: CSSProperties = reducedMotion
    ? {}
    : {
        ...(visible ? visibleStyles[variant] : hiddenStyles[variant]),
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease, filter ${duration}ms ease`,
      };

  return <div style={style}>{children}</div>;
}
