# AnimateIn

Built to learn how enter animations work in React without reaching for a library, covering reduced motion, scroll triggers, and stagger patterns from scratch. The prop API mirrors how Framer Motion thinks about variants, so the concepts transfer directly.

## Usage

### Single element

```tsx
import { AnimateIn } from "@/app/components/AnimateIn";

<AnimateIn variant="slide-up" delay={100} duration={500}>
  <h1>Hello</h1>
</AnimateIn>;
```

### Staggered list

```tsx
import { Stagger } from "@/app/components/stagger";

<Stagger variant="slide-up" staggerMs={80} initialDelay={0}>
  <p>First item</p>
  <p>Second item</p>
  <p>Third item</p>
</Stagger>;
```

`Stagger` wraps each child in an `AnimateIn` and computes `delay = initialDelay + (index * staggerMs)` automatically.

### Scroll trigger

```tsx
<AnimateIn variant="fade" trigger="scroll">
  <section>Animates when it enters the viewport</section>
</AnimateIn>
```

---

## Props

### `AnimateIn`

| Prop       | Type                                        | Default   | Description                                                         |
| ---------- | ------------------------------------------- | --------- | ------------------------------------------------------------------- |
| `variant`  | `'fade' \| 'slide-up' \| 'scale' \| 'blur'` | `'fade'`  | Named animation state pair to transition between                    |
| `delay`    | `number`                                    | `0`       | Milliseconds before the transition starts                           |
| `duration` | `number`                                    | `500`     | Transition duration in milliseconds                                 |
| `trigger`  | `'mount' \| 'scroll'`                       | `'mount'` | Whether to animate on mount or when the element enters the viewport |

### `Stagger`

| Prop           | Type                                        | Default      | Description                                      |
| -------------- | ------------------------------------------- | ------------ | ------------------------------------------------ |
| `variant`      | `'fade' \| 'slide-up' \| 'scale' \| 'blur'` | `'slide-up'` | Passed through to each `AnimateIn` child         |
| `staggerMs`    | `number`                                    | `80`         | Delay increment in ms between each child         |
| `initialDelay` | `number`                                    | `0`          | Base delay added before the first child animates |
| `trigger`      | `'mount' \| 'scroll'`                       | `'mount'`    | Passed through to each `AnimateIn` child         |

---

## Reduced motion

Handled at two layers.

**CSS layer.** You can strip transitions entirely at the stylesheet level:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

**JS layer.** [`app/hooks/useReducedMotion.ts`](app/hooks/useReducedMotion.ts) reads the OS preference via `window.matchMedia('(prefers-reduced-motion: reduce)')` and subscribes to live changes with `addEventListener('change', handler)`. This is functionally equivalent to Framer Motion's built-in `useReducedMotion` hook — same API surface, no external dependency.

```ts
const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
mq.addEventListener("change", handler);
```

When `useReducedMotion()` returns `true`, `AnimateIn` applies an empty style object (`{}`) instead of the hidden/visible state pair. Children render immediately at full opacity with no transform applied — no CSS transition fires at all.

---

## Variants

Each variant maps to a hidden state and a visible state. `AnimateIn` starts in the hidden state and transitions to visible after mount (or after the `IntersectionObserver` fires for `trigger="scroll"`). This is the same mental model as Framer Motion's `variants` system — named states, component transitions between them — implemented with inline styles and a single `useEffect`.

| Variant    | Hidden state                   | Visible state               |
| ---------- | ------------------------------ | --------------------------- |
| `fade`     | `opacity: 0`                   | `opacity: 1`                |
| `slide-up` | `opacity: 0, translateY(24px)` | `opacity: 1, translateY(0)` |
| `scale`    | `opacity: 0, scale(0.92)`      | `opacity: 1, scale(1)`      |
| `blur`     | `opacity: 0, blur(8px)`        | `opacity: 1, blur(0)`       |

The consumer only ever touches the `variant` prop. `opacity`, `transform`, and `filter` values are internal — they don't appear in the public API.

If the implementation were migrated to Framer Motion tomorrow (using `AnimatePresence` and `motion.*` elements with `variants` and `animate` props), the prop API would not change.

---

## Design token integration

`duration` currently accepts a raw number in milliseconds. This can be extended to read from CSS custom properties instead, so timing is controlled from a token system rather than hardcoded per-call:

```css
:root {
  --duration-fast: 200ms;
  --duration-base: 500ms;
  --duration-slow: 800ms;
}
```

The component would resolve `var(--duration-base)` at runtime rather than accepting `500` inline. Duration tokens live in one place, designers can tune them without touching component code, and animation timing stays in sync with the rest of the design system (button transitions, skeleton loaders, etc.).

---

## Project structure

```
app/
  components/
    AnimateIn.tsx       # Core animation component
    stagger.tsx         # Stagger wrapper — computes per-child delays
    card.tsx            # Demo card UI (not part of the animation system)
  hooks/
    useReducedMotion.ts # matchMedia hook with live change listener
  page.tsx              # Demo page
  globals.css
```
