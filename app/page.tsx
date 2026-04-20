import { AnimateIn } from "./components/AnimateIn";
import { Stagger } from "./components/stagger";
import { Card } from "./components/card";

const cards = [
  {
    title: "Fade in",
    description:
      "Opacity goes from 0 to 1. The simplest animation — works everywhere.",
    tag: "variant",
  },
  {
    title: "Slide up",
    description:
      "Combines opacity with a vertical translateY. Feels natural and clean.",
    tag: "variant",
  },
  {
    title: "Scale",
    description:
      "Grows from 92% to 100%. Great for cards and modals popping into view.",
    tag: "variant",
  },
  {
    title: "Blur",
    description: "Fades in while sharpening. Subtle but distinctive.",
    tag: "variant",
  },
  {
    title: "Stagger",
    description: "Wraps multiple children and delays each one incrementally.",
    tag: "composition",
  },
  {
    title: "Scroll trigger",
    description:
      "Uses IntersectionObserver to animate only when the element is visible.",
    tag: "trigger",
  },
  {
    title: "Reduced motion",
    description:
      "Reads prefers-reduced-motion and skips all transitions instantly.",
    tag: "accessibility",
  },
  {
    title: "Custom delay",
    description:
      "Pass a delay prop in ms to control exactly when each item animates.",
    tag: "api",
  },
  {
    title: "Custom duration",
    description:
      "Control how long the transition takes with the duration prop.",
    tag: "api",
  },
];

export default function Home() {
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

      <Stagger variant="slide-up" staggerMs={80} initialDelay={300}>
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </Stagger>
    </main>
  );
}
