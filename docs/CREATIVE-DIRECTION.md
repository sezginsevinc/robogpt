# ROBOKAMPÜS — Pre-Production Package

**Project codename:** KIVILCIM (Turkish: "spark")
**Status:** Awaiting client approval — no production code until sign-off.
**Version:** 1.0 — 2026-07-20

---

## 1. Creative Direction

### The idea

**A machine with a warm heart, waiting in the dark for a curious mind to wake it.**

Every inventor's story begins the same way: a spark. ROBOKAMPÜS's digital experience dramatizes that
moment. The visitor does not browse a school website — they discover an intelligent machine (CORE-01,
codename *Kıvılcım*) asleep in a dark void, and their own attention — cursor, scroll, presence — is the
energy that wakes it. By the end of the experience, the machine they woke has built a campus around them.

The metaphor is the brand promise: **a child's curiosity is the power source. ROBOKAMPÜS is the machine
it powers.**

### The inversion that makes it ours

Every "futuristic education" site is cold: cyan circuits, blue holograms, sterile chrome. We invert it.

- The **environment** is cold: void black, graphite structures, precise ion-blue instrumentation.
- The **energy** is warm: ember-amber light — the color of a filament, a forge, a spark.

Warm light in a cold universe = human curiosity inside precise engineering. Never childish (no primary
colors, no mascots, no rounded cartoon robots). Never corporate (no stock photos, no feature grids).

### Tone

Cinematic, quiet, confident. The site whispers; it never shouts. Copy is short, declarative, second
person. Turkish soul, international polish — the experience ships TR/EN from day one.

### Reference altitude (what we're competing with)

Active Theory's spatial storytelling · Linear's typographic discipline · Apple's product-scroll
choreography · Spline/Vercel's material light. We borrow their *standards*, not their looks.

---

## 2. Brand Experience Strategy

### Positioning

ROBOKAMPÜS is not a course provider. It is **where future inventors begin**. The website's job is not to
inform — it is to make a parent feel, in 90 seconds, that this institution operates at a different level
than anything else they've evaluated.

### The medium is the proof

Parents can't audit a curriculum, but they can feel craft. A site this considered *is* the argument:
"if they build their website like this, imagine how they build my child's mind." Every interaction is a
miniature lesson — cause and effect, experiment and response — so the site itself teaches the way the
campus teaches: hands-on.

### Emotional arc (the conversion funnel, felt not stated)

1. **Wonder** (Hero + Ch.1) — "What is this place?"
2. **Understanding** (Ch.2–4) — "This is how my child would learn."
3. **Belief** (Ch.5–7) — "This works. Other parents trust it."
4. **Action** (Ch.8 + return to core) — "I want to see it in person."

### Primary conversion

Not "enroll" — too big an ask from one visit. The CTA ladder: **Explore the Campus** (in-experience) →
**Book a Campus Visit** (primary conversion) → Enroll (handled on-campus, where ROBOKAMPÜS is
strongest). The site sells the visit; the visit sells the enrollment.

---

## 3. UX Narrative

One continuous scroll, told in the second person, present tense. The visitor is the protagonist; CORE-01
is the companion character that grows as they scroll.

- **Prologue — Contact.** Darkness. A dormant machine core breathes faintly. It notices your cursor and
  turns toward it. Headline: *"We don't teach the future. We build the minds that will."*
- **Ch.1 — Curiosity.** The dark asks questions before it gives answers. ("Why does it fly?" "What's
  inside?") Ember particles wake around each question as you pass.
- **Ch.2 — Discovery.** The particles you woke organize: circuits trace, formulas assemble, gears mesh.
  Chaos becomes structure — because that's what learning is.
- **Ch.3 — Creation.** The structures become artifacts: real children's projects floating in space like
  museum pieces. Hover exposes their mechanics; click enters the artifact.
- **Ch.4 — The Disciplines.** The campus unfolds one field at a time — robotics, science, mathematics,
  logic, technology — each rendered in its own physical language.
- **Ch.5 — The Journey.** Learning shown as transformation, not timeline: one object is forged through
  curiosity → experiment → failure → iteration → confidence → creation → achievement.
- **Ch.6 — Proof.** Achievements condense out of particle constellations. Numbers are *earned* on
  screen, not counted.
- **Ch.7 — Trust.** Parents' voices exist as points of light in a depth field; approaching one brings
  its words into focus.
- **Ch.8 — The Campus.** The machine's final act: it assembles a miniature campus. Buildings light as
  you explore. This is where the visit is booked.
- **Epilogue — Return.** The camera pulls back: everything you saw was inside CORE-01 all along. The
  core faces you, now fully awake. *"It started with a spark. Yours is next."* → Book a Visit.

---

## 4. User Journey

### Personas

- **P1 — The Deciding Parent** (32–48, pays, protective, skeptical of flash without substance).
  Needs: safety, credibility, outcomes, a next step that isn't a commitment.
- **P2 — The Child** (7–14, influences, decides emotionally in seconds).
  Needs: "that looks amazing," things that respond to them.
- **P3 — The Validator** (educator, press, partner, award juror).
  Needs: pedagogy signals, brand depth, craft.

### Journey map (P1, first visit, mobile-likely)

| Stage | Moment | Feeling | Risk | Design answer |
|---|---|---|---|---|
| 0–5s | Core notices cursor/touch | Surprise | "Is this a game?" | Premium restraint: type, silence, one light |
| 5–30s | Hero headline + first scroll transform | Intrigue | Bounce on load time | < 2.5s LCP; core streams in progressively |
| 30–90s | Ch.2–4 discovery | "My child would love this" | Fatigue | Chapter rhythm: intensity → rest → intensity |
| 90–150s | Ch.5–7 proof & trust | Belief | "But is it legit?" | Real projects, real numbers, real parent voices |
| 150s+ | Ch.8 campus | Ready | Friction | One-tap "Book a Visit", no form walls |

**Skeptic's shortcut:** a persistent, quiet menu lets P1 jump straight to Programs / Visit at any moment.
The cinema never takes navigation hostage.

**P2 sequence:** child scrolls on parent's phone, reacts audibly at Ch.3/Ch.4 — the site is designed for
the over-the-shoulder moment where the child becomes the sales team.

### Return visit

Returning visitors get a "warm start": CORE-01 is already awake and greets them; chapters are jumpable
from the HUD. The story never punishes someone who has heard it.

---

## 5. Information Architecture

```
robokampus.com
├── /                  The Experience (8 chapters, one scroll)
├── /programs          Index of the six fields
│   └── /programs/[slug]   robotics · science · mathematics · stem · logic-games · technology
├── /projects          Artifact archive (Ch.3 expanded)
│   └── /projects/[slug]   Immersive project view (also opened from Ch.3)
├── /visit             Book a campus visit (primary conversion)
├── /manifesto         The pedagogy, for validators (P3)
└── /legal, /kvkk      Compliance (KVKK/GDPR — children's data)
```

- **Navigation = HUD**, not a navbar: wordmark (top-left), chapter indicator (a live schematic of
  CORE-01 that fills as you progress), "Book a Visit" (top-right, appears after Ch.1). Menu opens as a
  full-screen overlay in the same dark world.
- The home experience is the flagship; secondary pages inherit the design system at lower motion
  intensity (fast, content-forward, still dark and precise).
- i18n: `/(tr|en)/` segment; TR default.

---

## 6. Wireframe Strategy

Layout logic per chapter — the wireframes in words:

- **Global grid:** 12-col desktop / 4-col mobile, 80–120px section gutters, max text measure 34rem.
  Type does the layout; whitespace is a material.
- **Hero:** full-viewport WebGL canvas; headline lower-left third (never centered-over-object clichés);
  CTA + scroll cue bottom edge. HUD corners carry mono metadata (coordinates, core status) — instrument
  aesthetic.
- **Ch.1:** near-empty frames. One question per viewport, small type, vast darkness. Restraint is the
  wireframe.
- **Ch.2:** split logic — WebGL structure formation left/behind, short copy blocks right, pinned scroll.
- **Ch.3:** horizontal drift through 3D artifact space (scroll-jacked laterally within the pinned scene);
  artifact metadata as floating mono labels, not cards.
- **Ch.4:** five full-bleed "rooms," one per discipline; each room owns its layout — the deliberate rule
  is that *no two rooms share a template.*
- **Ch.5:** single centered object across seven pinned states; stage-words appear as large display type
  passing through.
- **Ch.6:** constellation field, numbers center-weighted, sources footnoted in mono.
- **Ch.7:** depth field of light points; focused testimonial takes the center measure; name/role in mono.
- **Ch.8:** miniature campus fills viewport; info panel docks right (desktop) / bottom sheet (mobile);
  "Book a Visit" is the panel's only button.
- **Epilogue:** core returns center; sitemap links exist as a single quiet mono line — the anti-footer.
- **Mobile:** identical narrative, vertical-only choreography, tap replaces hover (artifacts open on
  tap; hover-reveals become press-and-hold).

---

## 7. Motion Storyboard

Scene-by-scene choreography. Every motion has a stated meaning; anything without one gets cut.

| # | Scene | Trigger | Motion | Meaning |
|---|---|---|---|---|
| 00 | Boot | Page load | 1.6s: void → faint core glow → one ember ignites → type fades up. No spinners; loading *is* the scene. | The spark exists before you do anything |
| 01 | Contact | Cursor/gyro | Core rotates ≤8° toward pointer (damped spring); glow intensifies near cursor; particles drift toward it | The machine notices you |
| 02 | Hero→Ch.1 | First scroll | Core doesn't exit — it *disassembles*: shell panels drift apart, camera passes through the gap into the dark interior | You go inside the machine; nothing disappears, it transforms |
| 03 | Questions | Scroll progress | Each question types on in mono then settles into display face; nearby particles wake (ember flicker → steady) | Questions ignite; curiosity accumulates |
| 04 | Formation | Pinned scroll | Woken particles lerp along curl-noise → lattice targets: circuit traces draw (stroke-dashoffset in WebGL), gear meshes assemble and engage | Chaos → structure = learning |
| 05 | Artifacts | Pinned lateral scroll | Camera drifts past floating projects; hover: shell fades to wireframe/exploded view; click: camera flies in, DOM detail view resolves | Understanding means seeing inside |
| 06 | Rooms | Section enter | Robotics: 6-axis arm tracks cursor, ~1.5s pose cycle · Science: fluid-sim reaction blooms on pointer · Math: parametric surface morphs on scroll · Logic: mechanical puzzle solves one move per scroll increment · Tech: device wakes and boots as you arrive | Each discipline has its own physics |
| 07 | Forging | Pinned, 7 states | One raw form is progressively machined: rough → tested → *breaks* (parts scatter — held for a beat, honored not hidden) → reassembles stronger → polished → complete | Failure is a stage, not an end |
| 08 | Proof | 60% in view | Constellation points converge into digit glyphs over 1.2s, settle with a subtle overshoot; footnote fades in after | Numbers are earned, not claimed |
| 09 | Voices | Scroll through depth | Camera moves through point field; nearest voice's text resolves from blur/particles as its light approaches | Trust comes into focus |
| 10 | Campus | Section enter + pointer | Buildings rise staggered from wireframe → solid; pointer is a light source — rooms illuminate as it passes; selected building lifts, interior glows | Exploration reveals |
| 11 | Return | Final scroll | Camera pulls back through Ch.8 scene, which condenses to a point of light — an ember — that flies into the reassembling core; core faces camera, fully lit | The whole campus lives inside the spark; cycle closes |

**Micro-interactions:** magnetic CTAs (≤6px pull), links underline via animated stroke, buttons have
press-depth, HUD chapter schematic fills continuously with scroll. Cursor is a small ember dot that
brightens over interactive elements (desktop only).

---

## 8. Design System

### Color — "Ember in the Void"

| Token | Hex | Role |
|---|---|---|
| `void` | `#07080B` | Ground. Never pure black — has a blue-cold bias |
| `graphite` | `#12141A` | Surfaces, panels |
| `steel` | `#2A2E38` | Strokes, hairlines, inactive states |
| `bone` | `#EAE6DD` | Primary type. Warm white — never `#FFF` |
| `mist` | `#8B909C` | Secondary type (cool bias, matches void) |
| `ember` | `#FF7A1A` | THE color. Energy, focus, interaction, CTA. Spent sparingly — ≤5% of any frame |
| `ember-hot` | `#FFB566` | Glow cores, gradient tips |
| `ion` | `#6FD3E3` | Machine precision: data, schematics, science states. Support only, never competes with ember |

Rule: warm = human/energy/action; cool = machine/structure/information. Semantic states (success,
error) derive from ion/ember families, never generic green/red.

### Typography

- **Display — Clash Display** (Fontshare, self-hosted): headlines, chapter titles. Semibold, tracking
  −2%. Confident geometry with warmth; not Inter, not Space Grotesk.
- **Text — Satoshi** (Fontshare, self-hosted): body, UI. Regular/Medium.
- **Instrument — JetBrains Mono**: HUD labels, data, footnotes, coordinates. Uppercase, tracking +8%,
  small sizes only.
- Scale (desktop): 12 / 14 / 16 / 20 / 28 / 44 / 72 / 120 (`clamp()`-fluid). Display leading 0.95;
  body leading 1.6. Full Turkish diacritic coverage verified for all three faces.

### Space, surface, light

- Spacing scale: 4-base — 4/8/12/16/24/40/64/104/168 (Fibonacci-ish top end for section air).
- Radius: 2px (controls), 8px (panels), never pill except the primary CTA.
- Glass: `graphite` at 60% + 24px blur + 1px `steel` inner stroke + faint ember edge-light on the
  side facing the nearest light source. Used only for HUD and docked panels.
- Glow: two-layer (tight saturated + wide soft) — never a single fat CSS blur.
- Iconography: 1.5px stroke, technical-drawing style, drawn in-house; no icon fonts, no emoji.

---

## 9. Animation System

### Architecture

One brain, many hands. A single **experience store** (Zustand) holds `chapter`, `chapterProgress`,
`globalProgress`, `pointer`, `coreEnergy` (0→1, accumulates through the visit), and `quality` tier.
Lenis drives scroll → GSAP ScrollTrigger writes progress into the store → both DOM (Framer Motion /
GSAP) and the R3F scene *read* from it. WebGL and DOM never animate independently of each other —
that's what makes transitions feel like one world.

### Motion tokens

- Durations: `instant 120ms · quick 240ms · scene 800ms · cinematic 1600ms`
- Easings: `ease-out-expo` (entries), `ease-in-out-quint` (camera), custom `spark` spring
  (stiffness 180, damping 22) for pointer-reactive elements
- Choreography rules: stagger 40–80ms; one hero motion per viewport — everything else supports;
  nothing animates without a stated meaning (enforced in review via the storyboard table).

### Shader/WebGL system

- Reusable material library: `EmberGlow` (fresnel + two-layer bloom), `SchematicLine` (animated
  stroke draw), `ParticleField` (GPU instancing, curl-noise ↔ target-lattice morph — one system
  serves Ch.1, Ch.2, Ch.6 and the epilogue), `GlassPanel`.
- Post: selective bloom, subtle film grain (breaks the "too-clean CG" look), vignette. No
  chromatic-aberration soup.

### Degradation tiers (chosen at boot: device memory, GPU probe, `prefers-reduced-motion`, save-data)

1. **Full** — everything above.
2. **Lite** (mid mobile): DPR clamp 1.5, particle counts ÷4, post off, camera cuts instead of flights.
3. **Still** (reduced-motion / low-end): pre-rendered poster frames per chapter, opacity-only
   transitions, full content parity. Reduced motion is a first-class art direction, not a fallback.

---

## 10. Technical Architecture

### Stack

Next.js 15 (App Router, Server Components) · TypeScript strict · Tailwind CSS v4 (tokens as CSS
variables) · React Three Fiber + drei + three · GSAP + ScrollTrigger · Lenis · Framer Motion (DOM
micro-interactions) · Zustand · next-intl (TR/EN).

### Structure

```
src/
├── app/[locale]/            routes (experience, programs, projects, visit, manifesto)
├── components/
│   ├── hud/                 nav, chapter indicator, cursor, menu overlay
│   ├── chapters/            one folder per chapter (DOM layer)
│   └── ui/                  buttons, type primitives, glass panel
├── three/
│   ├── core/                CORE-01 model, materials, states
│   ├── scenes/              per-chapter scene modules mounted in one <Canvas>
│   ├── materials/           EmberGlow, SchematicLine, GlassPanel
│   └── particles/           shared GPU particle system
├── motion/                  tokens, easings, ScrollTrigger orchestrator, transitions
├── stores/                  experience store, quality store
├── lib/                     gpu-probe, i18n, seo, schema
└── content/                 chapters, programs, projects, testimonials (typed, bilingual)
```

### Rendering & performance

- Server Components for all content; the WebGL experience is one client island — a single persistent
  `<Canvas>` behind the DOM, scenes swapped by chapter (never multiple canvases).
- `frameloop="demand"` when idle; DPR clamped ≤2; Draco/Meshopt-compressed GLB, KTX2 textures;
  three.js chunk lazy-loaded after LCP (hero headline is server-rendered HTML — LCP never waits
  for WebGL).
- Budgets: initial JS ≤ 180KB gz (three deferred) · LCP < 2.5s mid-tier mobile · scroll at 60fps
  desktop / 30fps floor mobile · Lighthouse ≥ 95 all categories (Still tier is the audited path).

### SEO / accessibility / compliance

- Every chapter is real HTML underneath the WebGL (crawlable, screen-reader-complete); canvas is
  `aria-hidden` with a narrative text equivalent.
- Full keyboard traversal of the story; focus states in ember; WCAG 2.2 AA contrast (bone on void
  = 15.8:1).
- Schema.org `EducationalOrganization` + `Course` per program; OG images generated per route
  (`next/og`) in the brand system; sitemap, hreflang TR/EN.
- KVKK/GDPR: no third-party trackers by default, no children's imagery without release, visit-booking
  form collects the minimum and states why.

### Build order (post-approval)

1. Foundation: tokens, type, HUD, Lenis+GSAP orchestrator, experience store, quality tiers
2. CORE-01 + hero (the flagship scene) and the hero→Ch.1 disassembly
3. Shared particle system → Ch.1, 2, 6, epilogue
4. Ch.3 artifacts + Ch.4 rooms (largest bespoke effort)
5. Ch.5, 7, 8, epilogue + secondary routes
6. Performance/a11y/SEO hardening pass against budgets

---

*Approve this direction (or mark up any section) and production begins with step 1.*
