# 01 — Rendering & Data Fetching

The defining full-stack question set, especially with Next.js (which both tono and cpq use).
Know the rendering strategies and *when* to pick each.

---

## Rendering strategies

> **Q:** CSR vs SSR vs SSG vs ISR — define each.
> **A:**
> - **CSR (Client-Side Rendering):** server sends a near-empty HTML shell + JS bundle; the browser
>   renders everything. Fast deploys, but slow first paint and weaker SEO. *(dropzone — a Vite SPA.)*
> - **SSR (Server-Side Rendering):** server renders HTML per request. Good for SEO and dynamic,
>   user-specific pages; costs server work per request.
> - **SSG (Static Site Generation):** HTML built once at **build time**, served from a CDN. Fastest,
>   cheapest; only for content that's the same for everyone and changes rarely. *(your marketing pages.)*
> - **ISR (Incremental Static Regeneration):** SSG that re-builds individual pages on a schedule/
>   on-demand — static speed with periodic freshness.
> **🪤 Junior trap:** Treating these as "better/worse." They're tradeoffs on freshness, SEO, server
> cost, and first-paint. The skill is matching the strategy to the page.

> **Q:** How do you choose for a given page?
> **A:** Ask: does it need to be fresh per request (→ SSR), is it the same for everyone and rarely
> changes (→ SSG/ISR), or is it private/interactive where SEO doesn't matter (→ CSR is fine)?
> *(tono: SSG/static for the marketing site, SSR + client components for the authed dashboard.)*

> **Q:** What is hydration?
> **A:** After the server sends rendered HTML, React "hydrates" it on the client — attaching event
> handlers and making it interactive without re-rendering from scratch. The gap between visible HTML
> and interactivity is why a server-rendered page can look ready but not respond to clicks yet.

---

## React Server Components & the App Router

> **Q:** What are React Server Components (RSC)?
> **A:** Components that render **only on the server** — they can fetch data directly (DB, internal
> services), ship **zero JS** to the browser, and can't use state/effects/handlers. In Next.js App
> Router everything is a server component **by default**; you add `'use client'` to make a component
> interactive. *(tono leans on this: data/auth on the server, the interactive tone form is a client
> component.)*
> **🪤 Junior trap:** Putting `'use client'` everywhere (loses the benefit), or trying to fetch with
> `useEffect` in a component that could just fetch on the server.

> **Q:** Where should data fetching happen in App Router?
> **A:** Prefer **on the server** — fetch in a server component / route handler, close to the data,
> with no loading spinner round-trip and no exposed credentials. Reserve client-side fetching
> (`useEffect`/a data lib) for data that depends on client interaction or must refresh live.

---

## Client-side data fetching patterns

> **Q:** In a client SPA (like dropzone), how do you fetch data well?
> **A:** Fetch in an effect (or a data library), and **always** model three states: **loading**,
> **error**, and **success/empty**. Cancel/ignore stale responses when inputs change (AbortController
> or an `active` flag). *(Your `useFetch` pattern + the debounced-search challenge in
> [frontend/05](../frontend/05-coding-challenges.md) is exactly this.)*
> **🪤 Junior trap:** Rendering as if data is always present — no loading or error handling — then
> crashing on `undefined` or showing a blank screen on failure.

> **Q:** Why might you use a data library (React Query / SWR) over raw `useEffect`?
> **A:** They handle caching, deduping, background refetch, stale-while-revalidate, retries, and
> loading/error state for you — removing a lot of boilerplate and subtle bugs. For a junior, knowing
> *why* they exist (cache + request lifecycle management) matters more than the specific API.

---

## Putting it together: the round trip

> **Q:** Walk me through what happens from a user clicking "Generate" to seeing the result. *(tono)*
> **A:** A great end-to-end answer:
> 1. Client component handles the click, builds form data, `fetch`/POST to `/api/tones`.
> 2. Route handler authenticates (Clerk), rate-limits (Upstash), validates input.
> 3. Reserves a credit in a DB transaction, calls Gemini, persists the tone (Prisma).
> 4. Returns JSON (201) — or a structured error with the right status.
> 5. Client updates state: success → render the tone; error → show the message; throughout → a
>    loading state. Next.js `revalidatePath` refreshes the server-rendered list.
> Being able to narrate this across **both** sides is the full-stack signal interviewers want.

---

### Drill prompts
- "Full-stack mock drill: rendering" — expect CSR/SSR/SSG tradeoffs and "where would you fetch this."
- Be ready to trace one request end-to-end through both tono and dropzone architectures.
