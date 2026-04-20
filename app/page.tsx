"use client";

import { useState } from "react";
import { AnimateIn } from "./components/AnimateIn";
import { Card } from "./components/card";

type Variant = "fade" | "slide-up" | "scale" | "blur";

const variantCards: { title: string; description: string; variant: Variant }[] =
  [
    {
      title: "Fade in",
      description:
        "Opacity goes from 0 to 1. The simplest animation — works everywhere.",
      variant: "fade",
    },
    {
      title: "Slide up",
      description:
        "Combines opacity with a vertical translateY. Feels natural and clean.",
      variant: "slide-up",
    },
    {
      title: "Scale",
      description:
        "Grows from 92% to 100%. Great for cards and modals popping into view.",
      variant: "scale",
    },
    {
      title: "Blur",
      description: "Fades in while sharpening. Subtle but distinctive.",
      variant: "blur",
    },
  ];

const featureItems: { title: string; description: string; snippet: string }[] =
  [
    {
      title: "Stagger",
      description:
        "Wrap multiple children and each one animates in with an incrementally larger delay.",
      snippet: "staggerMs={80}",
    },
    {
      title: "Scroll trigger",
      description:
        "The element animates when it enters the viewport via IntersectionObserver.",
      snippet: 'trigger="scroll"',
    },
    {
      title: "Reduced motion",
      description:
        "Automatically reads prefers-reduced-motion from the OS and skips all transitions.",
      snippet: "prefers-reduced-motion",
    },
    {
      title: "Custom delay",
      description:
        "Control when the animation starts relative to mount or scroll entry.",
      snippet: "delay={200}",
    },
    {
      title: "Custom duration",
      description: "Control how long the transition takes.",
      snippet: "duration={600}",
    },
  ];

export default function Home() {
  const [selected, setSelected] = useState<Variant | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  function handleCardClick(variant: Variant) {
    setSelected(variant);
    setPreviewKey((k) => k + 1);
  }

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 2rem" }}>
      <AnimateIn variant="fade">
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "1rem",
          }}>
          Component demo
        </p>
      </AnimateIn>

      <AnimateIn variant="slide-up" delay={100}>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 500,
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
          AnimateIn
        </h1>
      </AnimateIn>

      <AnimateIn variant="slide-up" delay={200}>
        <p
          style={{
            fontSize: "18px",
            color: "#888",
            lineHeight: 1.6,
            marginBottom: "4rem",
            maxWidth: "520px",
          }}>
          A reusable Next.js animation component that respects reduced motion
          preferences.
        </p>
      </AnimateIn>

      <div
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          minHeight: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {selected ? (
          <AnimateIn key={previewKey} variant={selected} duration={600}>
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid #3a3a3a",
                borderRadius: "8px",
                padding: "1.25rem 2rem",
                fontSize: "15px",
                color: "#eee",
                textAlign: "center",
              }}>
              <span
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#888",
                  display: "block",
                  marginBottom: "0.4rem",
                }}>
                {selected}
              </span>
              Previewing animation
            </div>
          </AnimateIn>
        ) : (
          <p style={{ color: "#555", fontSize: "14px" }}>
            Click a variant card to preview
          </p>
        )}
      </div>

      {/* Section 1 — Variants */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "5rem",
        }}>
        {variantCards.map((card) => (
          <Card
            key={card.variant}
            title={card.title}
            description={card.description}
            tag={card.variant}
            highlighted={selected === card.variant}
            onClick={() => handleCardClick(card.variant)}
          />
        ))}
      </div>

      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#888",
          marginBottom: "1.25rem",
        }}>
        Features
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {featureItems.map((item) => (
          <div
            key={item.title}
            style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              display: "grid",
              gridTemplateColumns: "160px 1fr auto",
              alignItems: "center",
              gap: "1.5rem",
            }}>
            <span style={{ fontSize: "15px", fontWeight: 500, color: "#eee" }}>
              {item.title}
            </span>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                lineHeight: 1.5,
                margin: 0,
              }}>
              {item.description}
            </p>
            <code
              style={{
                fontSize: "12px",
                background: "#0d0d0d",
                border: "1px solid #333",
                borderRadius: "6px",
                padding: "0.3rem 0.6rem",
                color: "#a78bfa",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
              }}>
              {item.snippet}
            </code>
          </div>
        ))}
      </div>
    </main>
  );
}
