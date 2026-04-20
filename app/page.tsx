import { AnimateIn } from "./components/AnimateIn";

export default function Home() {
  return (
    <main
      style={{
        padding: "4rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}>
      <h2>Mount trigger</h2>
      <AnimateIn variant="fade">
        <p>Fade on mount</p>
      </AnimateIn>
      <AnimateIn variant="slide-up" delay={100}>
        <p>Slide up on mount</p>
      </AnimateIn>

      <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <p style={{ color: "gray" }}>↓ scroll down to see the next ones</p>
      </div>

      <h2>Scroll trigger (animates when visible)</h2>
      <AnimateIn variant="fade" trigger="scroll">
        <p>Fade on scroll</p>
      </AnimateIn>
      <AnimateIn variant="slide-up" trigger="scroll" delay={100}>
        <p>Slide up on scroll</p>
      </AnimateIn>
      <AnimateIn variant="scale" trigger="scroll" delay={200}>
        <p>Scale on scroll</p>
      </AnimateIn>
      <AnimateIn variant="blur" trigger="scroll" delay={300}>
        <p>Blur on scroll</p>
      </AnimateIn>
    </main>
  );
}
