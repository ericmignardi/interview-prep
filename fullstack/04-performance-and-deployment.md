# 04 — Performance & Deployment

Junior full-stack roles want to see you think beyond "it works on my machine" — basic performance
instincts and an understanding of how the app actually ships and runs.

---

## Frontend performance

> **Q:** Name a few ways to make a React app load/feel faster.
> **A:**
> - **Code splitting / lazy loading** (`React.lazy` + `Suspense`, route-based splitting) so users
>   download only what a page needs.
> - **Bundle size discipline** — avoid heavy deps, tree-shake (ESM helps).
> - **Image optimization** — right sizes/formats, lazy-load offscreen images (Next's `<Image>`).
> - **Avoid unnecessary re-renders** — stable references, memo where it pays (see
>   [frontend/03](../frontend/03-react-and-hooks.md)).
> - **Render strategy** — SSG/SSR for fast first paint where it matters.
> **🪤 Junior trap:** Jumping straight to `useMemo` everywhere. The biggest wins are usually bundle
> size, fewer/over-large network requests, and not shipping JS you don't need.

> **Q:** What's the difference between perceived and actual performance?
> **A:** Actual = real time to load/respond. Perceived = how fast it *feels* — skeletons, optimistic
> UI, progress indicators, and streaming content make an app feel responsive even when work is ongoing.

---

## Backend / data performance

> **Q:** Where are common backend performance problems?
> **A:** N+1 queries (see [backend/04](../backend/04-databases-prisma-sql.md)), missing indexes,
> doing in a request what should be a background job, and calling slow external services in the hot
> path. *(tono caches expensive Gemini results in Redis and reserves credits in one transaction rather
> than multiple round-trips.)*

> **Q:** When would you add a cache, and what's the risk?
> **A:** Add one when the same expensive computation/query repeats and the data tolerates some
> staleness. Risk: serving stale data — so you need a TTL or invalidation strategy. *(tono: 30-day TTL
> on cached tone configs; `revalidatePath` to refresh lists after a write.)*

---

## Configuration & environments

> **Q:** How do you manage config across dev/staging/prod?
> **A:** Environment variables, never hardcoded. Different values per environment; secrets injected by
> the platform, not committed. Validate required vars at **boot** so a misconfigured deploy fails fast.
> *(tono's `lib/config.ts` throws on a missing required var at module load; dropzone uses `dotenv`.)*
> **🪤 Junior trap:** Committing secrets, or reading `process.env.X` ad hoc with no validation so a
> missing var surfaces as a confusing runtime error mid-request.

---

## Deployment & CI/CD

> **Q:** What does a basic CI/CD pipeline do?
> **A:** On push/PR, automatically: install, lint, type-check, run tests, build — and on merge, deploy.
> It catches regressions before they ship and makes deploys repeatable. *(tono has lint, `check-types`,
> Jest unit/integration/component, and Playwright e2e scripts — the building blocks of a CI pipeline.)*

> **Q:** How do these apps deploy?
> **A:** Next.js apps (tono, cpq) deploy naturally to a platform like Vercel (serverless functions for
> route handlers, CDN for static). A separate Express API (dropzone) runs as a long-lived Node server
> (a container/host) with its DB and Cloudinary as managed services. Knowing the *shape* — serverless
> functions vs a persistent server — is the point.
> **🪤 Junior trap:** Assuming a serverless function holds state between requests. It doesn't — that's
> why rate-limit counters and caches live in Redis (tono), not in process memory.

---

## Observability (light)

> **Q:** Something breaks in production — how do you find it?
> **A:** Structured logs with a correlation/request id to trace one request across layers *(tono stamps
> a `requestId` per handler)*, error tracking (e.g. Sentry), and metrics/alerts. The request id lets you
> connect a user's failed action to the exact server log line.

---

### Drill prompts
- "Full-stack mock drill: perf" — expect "make this faster," "where does config/secrets go," and
  "how does it deploy / what's serverless vs a server" questions.
- Be ready to explain why in-memory caches/counters break on serverless and what you use instead.
