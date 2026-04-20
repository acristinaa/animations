"use client";

import { useState, useEffect, CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface AnimateInProps {
  children: ReactNode;
}

export function AnimateIn({ children }: AnimateInProps) {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(id);
  }, []);

  const style: CSSProperties = reducedMotion
    ? {} // just to show it for now
    : {
        opacity: visible ? 1 : 0,
        transition: "opacity 500ms ease",
      };

  return <div style={style}>{children}</div>;
}
