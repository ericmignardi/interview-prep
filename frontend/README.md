# Frontend Interview Prep — React / TypeScript (Junior)

Your personal, self-paced prep program. The markdown files here are your **study banks**;
the real practice happens **in chat with Claude** using the session menu below.

> How to use this: open whichever bank you want to study, then start a session in chat by
> telling Claude which mode you want. Claude updates [progress.md](progress.md) after each
> session so the program adapts to your weak spots.

---

## Session menu (say one of these to Claude)

| Say this | What happens |
|---|---|
| **"Mock drill: React"** (or TS / JS / CSS / mixed) | Claude asks 8–12 questions one at a time, you answer in your own words, get graded ✅/⚠️/❌ with corrections + follow-ups. |
| **"Coding challenge"** (optionally name a difficulty) | Claude gives you a small problem. You write code (in chat or a scratch file). Claude reviews correctness, edge cases, typing, idiom — then a stretch variant. |
| **"Project deep-dive: tono"** (or dropzone / fanimal / cpq) | Claude role-plays an interviewer probing your real code, pushing on "why did you build it this way?" until you can defend it crisply. |
| **"Quiz me quickly"** | Rapid-fire flashcard mode, ~20 short Qs, terse grading. |
| **"Update my progress"** | Claude refreshes the scorecard and recommends what to drill next. |

**Answer out loud / in your own words first.** Reading the answer is not the same as being
able to say it under pressure. The whole point of the chat sessions is to practice retrieval.

---

## Study banks

1. [01 — JavaScript Fundamentals](01-javascript-fundamentals.md) — closures, `this`, event loop, async, equality, array methods
2. [02 — TypeScript](02-typescript.md) — generics, narrowing, utility types, typing React
3. [03 — React & Hooks](03-react-and-hooks.md) — rendering, `useEffect`, memoization, custom hooks, context
4. [04 — CSS / HTML / Accessibility](04-css-html-a11y.md) — flexbox/grid, specificity, semantic HTML, a11y
5. [05 — Coding Challenges](05-coding-challenges.md) — laddered problems, solutions collapsed at the bottom
6. [06 — Project Talking Points](06-project-talking-points.md) — your portfolio, story by story
7. [progress.md](progress.md) — your scorecard

Each Q&A bank uses the same format:

> **Q:** the question
> **A:** the answer you should be able to give
> **🪤 Junior trap:** the mistake interviewers are listening for

---

## Suggested rotation (no deadline)

Repeat this cycle, re-drilling anything graded ⚠️ or ❌ along the way:

```
JS fundamentals  →  TypeScript  →  React & hooks  →  Coding challenge
      →  Project deep-dive  →  CSS / a11y  →  Mixed mock interview  →  (repeat)
```

A realistic junior loop is ~30–45 min per session. Consistency beats marathon cramming.

---

## What junior React/TS interviews actually test

Most junior loops are some mix of:
1. **A short take-home or live coding task** — build a small component, fetch + render data,
   a form, a list with filtering. Clean, working, readable code matters more than cleverness.
2. **Conceptual Q&A** — "what is a closure", "when does a component re-render", "what's the
   difference between `type` and `interface`". Banks 01–04 cover these.
3. **"Walk me through a project"** — they want to see you reason about decisions and tradeoffs.
   Bank 06 is your prep for this; your `tono` architecture is genuinely above junior level.
4. **A couple of behavioral questions** — "tell me about a bug you fixed", "a time you were
   stuck". Have 2–3 stories ready (most can come straight from your projects).

You don't need data-structures-and-algorithms depth for most junior frontend roles. Focus
on fundamentals, React, and being able to talk clearly about your own code.
