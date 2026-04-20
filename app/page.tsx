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
      <AnimateIn variant="fade">
        <p>Fade</p>
      </AnimateIn>
      <AnimateIn variant="slide-up" delay={100}>
        <p>Slide up</p>
      </AnimateIn>
      <AnimateIn variant="scale" delay={200}>
        <p>Scale</p>
      </AnimateIn>
      <AnimateIn variant="blur" delay={300}>
        <p>Blur</p>
      </AnimateIn>
    </main>
  );
}
