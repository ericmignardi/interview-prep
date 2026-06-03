# Full-Stack Track — The Seams Between Front & Back

Where most full-stack junior interviews actually live: not deep frontend *or* deep backend, but
**how the two fit together** — rendering strategy, the client–server contract, end-to-end auth,
and being able to design a feature across the whole stack. Anchored to **tono** (Next.js full-stack)
and **dropzone** (separate React SPA + Express API), which represent the two common architectures.

> Start a session in chat: *"Full-stack mock drill"*, *"Full-stack design challenge"*, or
> *"Full-stack deep-dive: tono"*. Claude grades you and updates [progress.md](progress.md).

---

## Session menu

| Say this | What happens |
|---|---|
| **"Full-stack mock drill"** | 8–12 Q&A one at a time on the front/back seams, graded ✅/⚠️/❌. |
| **"Full-stack design challenge"** | Claude gives a feature ("add comments", "add file expiry") and you design it across UI, API, and DB out loud. |
| **"Full-stack deep-dive: tono"** (or dropzone) | Claude traces a request end-to-end and probes each layer. |
| **"Quiz me: full-stack"** | Rapid-fire flashcards. |

---

## Study banks

1. [01 — Rendering & Data Fetching](01-rendering-and-data-fetching.md) — CSR/SSR/SSG/ISR, RSC, hydration, where to fetch
2. [02 — The Client–Server Contract](02-client-server-contract.md) — API shape, loading/error states, caching, optimistic UI, websockets vs polling
3. [03 — Auth End-to-End](03-auth-end-to-end.md) — the full login→protected-request flow across both architectures
4. [04 — Performance & Deployment](04-performance-and-deployment.md) — bundles, caching layers, env config, CI/CD, observability
5. [05 — Design a Feature (system-design-lite)](05-design-a-feature.md) — a repeatable framework + worked examples
6. [progress.md](progress.md) — your full-stack scorecard

> Full-stack prep **reuses** the deeper material in the other tracks — this track is the connective
> tissue. For React internals see [frontend/](../frontend/README.md); for API/DB/auth internals see
> [backend/](../backend/README.md).

---

## What junior full-stack interviews test
1. **"What happens when I type a URL and hit enter"** / "what happens from click to data on screen" —
   trace the whole path: request → server/route handler → DB → response → render.
2. **Rendering strategy** — CSR vs SSR vs SSG and *why you'd pick each* (Next.js makes this central).
3. **Client–server contract** — how the UI handles loading/error/empty, caching, and stale data.
4. **End-to-end auth** — where the session lives, how each request proves identity, how the UI reacts.
5. **Design-a-feature** — given a small feature, sketch the UI, the endpoints, and the data model
   coherently. This is the signature full-stack question.
