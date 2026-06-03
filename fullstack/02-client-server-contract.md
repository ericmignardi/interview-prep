# 02 — The Client–Server Contract

How the UI and API agree to talk: request/response shape, state on the client, caching, and keeping
them in sync. This is where front and back meet — prime full-stack territory.

---

## Shaping the contract

> **Q:** What makes a good API response shape for a frontend to consume?
> **A:** Consistent and predictable: a stable envelope (e.g. `{ data, pagination }` or
> `{ message, ...}`), a consistent **error** shape so the client has one code path for failures, and
> correct status codes so the client can branch on `res.ok` / status rather than parsing messages.
> *(tono returns `{ tones, pagination }` and a uniform `APIError` JSON; the UI keys off status.)*
> **🪤 Junior trap:** Returning 200 with `{ error: ... }` in the body, forcing the client to sniff
> the payload to know if it failed.

> **Q:** How do you keep the client and server types in sync?
> **A:** Share types or derive both from one source. Zod is the sweet spot: define a schema once,
> validate on the server **and** infer the TS type the client uses (`z.infer`) — so the runtime
> contract and the compile-time type can't drift. *(tono + fanimal both lean on Zod for this.)*

---

## Client-side state of remote data

> **Q:** What states must the UI model for any remote data?
> **A:** At minimum **loading**, **error**, and **success** — plus **empty** (success with no rows).
> Model them explicitly (a discriminated union or `loading/error/data` flags) so the render can't
> show stale or undefined data. *(Your debounced-search and `useFetch` challenges drill exactly this.)*

> **Q:** What's optimistic UI?
> **A:** Update the UI **immediately** assuming the request will succeed, then reconcile when the
> server responds — rolling back on failure. Makes apps feel instant (e.g. a "like" toggling before
> the server confirms). The cost is handling rollback correctly.
> **🪤 Junior trap:** Doing optimistic updates without a rollback path, so a failed request leaves the
> UI lying about server state.

> **Q:** Where should a given piece of state live — client or server?
> **A:** **Server state** (data owned by the backend: lists, the user, records) belongs to the server;
> the client caches and displays it. **UI state** (is this modal open, form input, a toggle) is purely
> client. Mixing them — treating fetched data as if the client owns it — causes staleness bugs.

---

## Caching & freshness

> **Q:** Where can caching happen across the stack?
> **A:** Many layers: browser HTTP cache, a client data-cache (React Query/SWR), a CDN (static assets/
> pages), and a server-side cache (Redis). *(tono caches AI tone results in Upstash Redis keyed by a
> SHA-256 of the normalized config, 30-day TTL — so identical requests skip the expensive Gemini call.)*
> **Q:** What's cache invalidation and why is it hard?
> **A:** Knowing *when* cached data is stale and refreshing it. Hard because the source of truth changes
> independently of the cache. Strategies: TTLs (expire after N), explicit invalidation on write (Next's
> `revalidatePath` after creating a tone), and stale-while-revalidate. "There are only two hard things…"

---

## Real-time & sync

> **Q:** Polling vs websockets — when do you use each?
> **A:** **Polling** (client asks every N seconds) is simple and fine for infrequent updates.
> **Websockets** keep a persistent connection for true server→client push — use them for chat,
> live collaboration, or live file-share status. *(dropzone uses socket.io for live updates instead of
> polling.)* Websockets cost a persistent connection and more infra; don't reach for them if a refresh
> button or light polling suffices.

> **Q:** How does the client handle the connection lifecycle?
> **A:** Open it on mount, **tear it down on unmount** (cleanup), and handle reconnects. *(dropzone
> connects in a `useEffect` and disconnects in the cleanup so it doesn't leak sockets.)*

---

## Errors across the boundary

> **Q:** A request fails — what should the user see, and what should you log?
> **A:** User: a friendly, safe message ("Something went wrong, try again") + the ability to retry —
> never a raw stack trace or internal detail. Server: the full error with a correlation/request id so
> you can trace it. *(tono's `requestId` + central `handleAPIError` keeps internal details out of the
> client response in production while logging them server-side.)*

---

### Drill prompts
- "Full-stack mock drill: contract" — expect response-shape, loading/error-state, caching, and
  optimistic-UI questions.
- Be ready to explain how Zod keeps client and server types from drifting.
