import { Stagger } from "./components/stagger";

export default function Home() {
  return (
    <main
      style={{
        padding: "4rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}>
      <h2>Mount stagger</h2>
      <Stagger variant="slide-up" staggerMs={100}>
        <p>First item</p>
        <p>Second item</p>
        <p>Third item</p>
        <p>Fourth item</p>
      </Stagger>

      <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <p style={{ color: "gray" }}>↓ scroll down</p>
      </div>

      <h2>Scroll stagger</h2>
      <Stagger variant="fade" staggerMs={120} trigger="scroll">
        <p>First item</p>
        <p>Second item</p>
        <p>Third item</p>
        <p>Fourth item</p>
      </Stagger>
    </main>
  );
}
