"use client";

import { useState, useEffect, CSSProperties, ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
}

export function AnimateIn({ children }: AnimateInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(id);
  }, []);

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: "opacity 1000ms ease",
  };

  return <div style={style}>{children}</div>;
}
