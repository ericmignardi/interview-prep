# Progress Scorecard

Claude updates this after each session. Grades: ✅ solid · ⚠️ shaky, re-drill · ❌ gap, study first.

**Last updated:** 2026-06-03 (mixed mock #1)

---

## Topic coverage

| Topic | Bank | Last drilled | Grade | Notes |
|---|---|---|---|---|
| JavaScript fundamentals | [01](01-javascript-fundamentals.md) | 2026-06-03 | ⚠️ | `map` ✅, CSS axis ✅; but said `forEach` "returns a single value" (returns `undefined`) |
| TypeScript | [02](02-typescript.md) | 2026-06-03 | ✅ | `interface` vs `type` solid; `any` vs `unknown` mechanism **now nailed** (was ⚠️) — big improvement |
| React & hooks | [03](03-react-and-hooks.md) | 2026-06-03 | ✅ | Infinite-loop effect bug solved cleanly w/ full causal chain; learned `React.memo`/shallow-compare/`useCallback` |
| CSS / HTML / a11y | [04](04-css-html-a11y.md) | 2026-06-03 | ✅ | Centering (flex) correct in both Tailwind + raw CSS; learn the axis-flip-on-column follow-up |
| Coding challenges | [05](05-coding-challenges.md) | — | — | not started |
| Project deep-dive: tono | [06](06-project-talking-points.md) | 2026-06-03 | ⚠️ | End-to-end walkthrough missing bookends (client) + rate limit, credit txn, persistence/return/render |
| Project deep-dive: dropzone | [06](06-project-talking-points.md) | — | — | not started |

---

## Recurring weak spots
_(Claude fills this in as patterns emerge.)_

- **Terminology precision** (recurring). Concept is right, the *word* is wrong: "encrypt" passwords
  (→ **hash**), `forEach` "returns a value" (→ `undefined`), 403 = rate limit (→ **403 forbidden /
  429 rate limit**). Drill the exact term, not just the idea.
- **End-to-end completeness.** Tends to describe the middle (the part he wrote) and skip the bookends —
  client-side start (loading state, fetch) and finish (render success/error, revalidate), plus
  cross-cutting backend steps (rate limit, transaction, persistence). Practice narrating the *whole* round trip.
- ~~Precision of mechanism~~ — **markedly improved.** `any`/`unknown` and the infinite-loop effect were
  answered at full mechanism level this session. Keep it up.
- ~~Re-render model~~ — improving; learned `React.memo` + shallow compare + `useCallback` this session.

---

## Recommended next session
1. **Backend mock drill: auth** ([../backend/05](../backend/05-auth-and-security.md)) — lock in
   hash-vs-encrypt, 401/403/429, JWT-vs-session while the password question is fresh.
2. **Tier 2 coding challenge** — the debounced search ([05](05-coding-challenges.md)#2.3), most common
   junior take-home; also drill effect cleanup / ignoring stale responses (came up twice now).
3. **Full-stack deep-dive: tono** — re-do the end-to-end walkthrough hitting all layers incl. the
   credit-reservation transaction.

---

## Session log
_(append-only; newest at top)_

- **2026-06-03 — Mixed mock #1 (9 Qs).** React.memo/shallow ❌→taught; `interface` vs `type` ✅;
  `map`/`forEach` ⚠️ (`forEach` returns `undefined`); centering ✅; infinite-loop effect ✅✅ (clean);
  401/403 ⚠️ (swapped 403↔429); password storage ⚠️ ("encrypt"→hash); `any`/`unknown` ✅✅ (stuck from
  re-test!); tono end-to-end ⚠️ (missing bookends + key steps). **Trend: clearly sharper than trial;
  mechanism precision up; new pattern = terminology word-choice + end-to-end completeness.**
- **2026-06-03 — Trial mixed mock (4 Qs).** Closure def ✅; `var` loop output ❌ (`3 3 3`);
  re-render causes ⚠️ (2/3 + a misconception); `any` vs `unknown` ⚠️ (use-case yes, mechanism no).
  Pattern: good instincts, needs mechanism-level precision. Project depth (Zod/`unknown`) ahead of recall.
- _2026-06-03 — program scaffolded._
