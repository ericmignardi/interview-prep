# 05 — Design a Feature (System-Design-Lite)

The signature full-stack interview prompt: *"How would you build feature X?"* They're not after a
distributed-systems diagram — they want to see you reason coherently across **UI → API → data**, ask
clarifying questions, and name tradeoffs. Below is a repeatable framework + worked examples.

---

## The framework (use this every time)

1. **Clarify scope.** Ask 2–3 questions before designing. Who uses it? How much data? Real-time or
   not? Auth required? Edge cases that matter? *(Asking is a positive signal, not a weakness.)*
2. **Data model.** What tables/entities, what fields, what relationships, what indexes.
3. **API.** What endpoints (method + path), request/response shapes, status codes, validation, auth.
4. **UI.** What screens/components, what state, loading/error/empty handling.
5. **Cross-cutting.** Auth/permissions, validation, errors, performance (N+1, pagination, caching),
   real-time if needed.
6. **Tradeoffs & "what I'd do next."** Name what you simplified and what you'd add at scale.

Narrate as you go. A structured, talking walk-through beats a perfect silent answer.

---

## Worked example A — "Add comments to a tone" (tono)

> **Clarify:** Who can comment — owner only or others? Threaded or flat? Edit/delete? Assume:
> authenticated users, flat, with edit/delete by author.
>
> **Data model:**
> ```
> Comment { id, toneId → Tone, userId → User, body, createdAt, updatedAt }
> ```
> Index `toneId` (we list comments by tone) and probably `createdAt` for ordering.
>
> **API (REST):**
> ```
> GET    /api/tones/:id/comments       list (paginated)   → 200
> POST   /api/tones/:id/comments        create             → 201
> PATCH  /api/comments/:id              edit (author only) → 200 / 403
> DELETE /api/comments/:id              delete (author)    → 204 / 403
> ```
> Validate body with Zod (length limits, like the existing tone schemas). Auth required; on edit/delete,
> check the comment's `userId` matches the session user → else **403**.
>
> **UI:** a comment list under the tone (loading/error/empty states), a controlled add-comment form
> (optimistic append, rollback on failure), inline edit/delete for the author. Refresh via
> `revalidatePath` or refetch.
>
> **Tradeoffs:** flat not threaded (simpler); offset pagination; no rate limit yet — I'd add one on
> POST to prevent spam (reuse the Upstash limiter pattern).

---

## Worked example B — "Expiring share links" (dropzone's real domain)

> **Clarify:** Expire by time, by download count, or both? One-time or reusable? Assume: expire by a
> timestamp, reusable until then.
>
> **Data model:**
> ```
> Share { id, fileId → File, token (unique, random), expiresAt, createdBy → User, createdAt }
> ```
> Index `token` (lookups are by token). `token` is a long random id (nanoid/uuid), not a guessable
> sequential id.
>
> **API:**
> ```
> POST   /api/files/:id/shares     create link {expiresInHours} → 201 {url}
> GET    /api/share/:token         resolve + serve/redirect      → 200 / 410 Gone (expired) / 404
> DELETE /api/share/:token         revoke                        → 204
> ```
> On resolve: look up by token, check `expiresAt > now` → else **410 Gone**; missing → 404. Don't leak
> whether a token "existed but expired" vs "never existed" if that's a concern.
>
> **UI:** a "Share" button → modal with an expiry picker → shows the generated URL with copy-to-clipboard.
> Live updates of who's accessing via socket.io (dropzone already has this).
>
> **Tradeoffs:** expiry checked lazily on access (no cron) — simple; a cleanup job could purge old rows
> later. Random token instead of auth so recipients don't need accounts; the token *is* the capability,
> so it must be unguessable and revocable.

---

## What good answers share
- **They ask first.** Jumping straight to code without clarifying scope is the most common miss.
- **They pick the right status codes** (201 create, 403 not-author, 410 expired, 404 missing).
- **They handle the unhappy paths** — expired, forbidden, empty, failed — not just the golden path.
- **They name the simplification.** "I'd add rate limiting / a cleanup job / pagination at scale" shows
  you know what you skipped and why.

---

### Drill prompts
- "Full-stack design challenge" — I'll give you a feature and you walk the framework out loud; I'll
  push on data model, status codes, auth checks, and the unhappy paths.
- Practice prompts: add likes/favorites, a notifications feed, file folders, search, an admin dashboard.
