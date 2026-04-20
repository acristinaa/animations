"use client";

import { Children, ReactNode } from "react";
import { AnimateIn } from "./AnimateIn";

type Variant = "fade" | "slide-up" | "scale" | "blur";
type Trigger = "mount" | "scroll";

interface StaggerProps {
  children: ReactNode;
  variant?: Variant;
  staggerMs?: number;
  initialDelay?: number;
  trigger?: Trigger;
}

export function Stagger({
  children,
  variant = "slide-up",
  staggerMs = 80,
  initialDelay = 0,
  trigger = "mount",
}: StaggerProps) {
  const kids = Children.toArray(children);

  return (
    <>
      {kids.map((child, i) => (
        <AnimateIn
          key={i}
          variant={variant}
          delay={initialDelay + i * staggerMs}
          trigger={trigger}>
          {child}
        </AnimateIn>
      ))}
    </>
  );
}
