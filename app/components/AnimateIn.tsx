"use client";

import { useState, useEffect, useRef, CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Variant = "fade" | "slide-up" | "scale" | "blur";
type Trigger = "mount" | "scroll";

interface AnimateInProps {
  children: ReactNode;
  variant?: Variant;
  duration?: number;
  delay?: number;
  trigger?: Trigger;
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
  trigger = "mount",
}: AnimateInProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === "mount") {
      const id = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(id);
    }

    if (trigger === "scroll") {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const id = setTimeout(() => setVisible(true), delay);
            observer.disconnect();
            return () => clearTimeout(id);
          }
        },
        { threshold: 0.15 },
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [trigger, delay]);

  const style: CSSProperties = reducedMotion
    ? {}
    : {
        ...(visible ? visibleStyles[variant] : hiddenStyles[variant]),
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease, filter ${duration}ms ease`,
      };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
