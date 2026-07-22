# ROBOKAMPÜS — Codename KIVILCIM

The digital experience of ROBOKAMPÜS, an innovation campus for children.
Not a landing page: a machine with a warm heart, asleep in the dark, that the
visitor's own curiosity wakes — and that builds a campus around them by the end
of one scroll.

The governing document is [docs/CREATIVE-DIRECTION.md](docs/CREATIVE-DIRECTION.md):
concept, palette ("Ember in the Void"), chapter-by-chapter motion storyboard,
design system, animation architecture and performance budgets. Read it before
changing anything visual.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /tr
npm run build      # static build, 29 pages (tr/en)
npm run lint
```

## Architecture in one paragraph

One persistent R3F `<Canvas>` sits behind the DOM (`src/three/Experience.tsx`);
five scenes (CORE-01, particle field, artifacts, forge, campus) fade in and out
by chapter. A single Zustand experience store (`src/stores/experience.ts`) is
the only source of truth: Lenis smooths scrolling, GSAP ScrollTriggers write
`chapter` + `progress` into the store, and both the DOM layer and the WebGL
scenes read from it — which is why transitions feel like one world. Quality
tiers (`full` / `lite` / `still`) are probed once at boot
(`src/stores/quality.ts`); `still` is a fully art-directed reduced-motion
experience, not a fallback. Every chapter is real server-rendered HTML under
the canvas: crawlable, screen-reader-complete, and the hero owns LCP because
three.js loads only after first paint.

## Map

```
src/
├── app/[locale]/        tr/en routes: experience, programs, projects, visit, manifesto, kvkk
├── components/
│   ├── chapters/        DOM layer of the 8 scroll chapters + overlays
│   ├── rooms/           Chapter 4's five bespoke discipline rooms
│   ├── hud/             nav HUD, menu overlay, ember cursor
│   └── ui/              CTA, page shell, visit form
├── three/               scenes, shader materials, shard/glow/text-sampling libs
├── motion/              gsap setup, motion tokens, useChapter/useScrub hooks
├── stores/              experience store, quality tiers
└── content/             typed bilingual (tr/en) content modules — copy lives here, not in components
```

## Before launch

- Replace sample statistics (`src/content/stats.ts`), projects and
  testimonials with real, verifiable campus data.
- Wire `VisitForm` to a real endpoint (currently confirms locally).
- Have counsel review `app/[locale]/kvkk` and set the production domain in
  `src/content/site.ts`.
