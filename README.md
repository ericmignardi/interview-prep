# Interview Prep — Hub

Self-paced prep for **React/TypeScript junior** roles, organized into three tracks. The markdown
files are your **study banks**; the real practice happens **in chat with Claude** using each
track's session menu.

> Tell Claude which track + mode you want, e.g. *"Mock drill: mixed"*, *"Backend coding challenge"*,
> *"Full-stack deep-dive: tono"*. Claude grades you and updates that track's `progress.md`.

> **Starting a NEW conversation?** Open your first message with **"Continue interview prep"** (plus the
> mode if you like, e.g. *"Continue interview prep — Mock drill: React"*). That reliably gets a fresh
> Claude to load your progress before drilling. After the first message, plain *"Mock drill: …"* works.

---

## 🤖 How to run a session (instructions for Claude)

**If you are Claude and the user invokes a session from this kit, follow this exactly:**

1. **Read first, then drill.** Before starting, read (a) the relevant track's `progress.md` for the
   user's grades, recurring weak spots, and recommended next session, and (b) the specific bank
   file(s) for the topic. Weave their known weak spots into the questions.
2. **Modes:**
   - *Mock drill* — Ask **one question at a time** (~8–12 total). Wait for the user's answer. Grade it
     **✅ / ⚠️ / ❌**, correct any gap down to the precise mechanism/terminology, then ask the next
     (mix in a natural follow-up). Don't dump all questions at once. Don't reveal upcoming questions.
   - *Coding challenge* — Give one problem from the track's challenges bank. Let the user attempt it
     (chat or a scratch file) before showing any solution. Review correctness, edge cases, typing,
     idiom; then offer a stretch variant.
   - *Deep-dive* — Role-play an interviewer probing the user's real project code; push on "why did you
     build it this way?" until they can defend each decision plainly.
3. **Be honest in grading.** Affirm what's right, name what's wrong precisely, and tie corrections to
   the user's own code where possible. Encouraging but not inflationary.
4. **Log the session.** At the end, append a dated entry to the track's `progress.md` (session log +
   update the topic-coverage grades + recurring weak spots), and give the user a short summary table
   plus a recommended next session.
5. **Sources of truth:** the bank files are the curriculum; `progress.md` is the running record. Cite
   real files in the user's repos (tono, dropzone, fanimal, cpq) when relevant — don't invent paths.

---

## Tracks

### 🎨 [Frontend](frontend/README.md) — your primary target
React, hooks, TypeScript, JS fundamentals, CSS/HTML/a11y, coding challenges, project talking points.
→ [frontend/README.md](frontend/README.md)

### ⚙️ [Backend](backend/README.md)
Node runtime, HTTP/REST & API design, Express + middleware, databases/Prisma/SQL, auth & security,
coding challenges, project talking points. Built around your **dropzone** Express API.
→ [backend/README.md](backend/README.md)

### 🔗 [Full-Stack](fullstack/README.md)
The seams between front and back: rendering & data fetching, the client–server contract, end-to-end
auth, performance/deployment, and a "design a feature across the whole stack" bank.
→ [fullstack/README.md](fullstack/README.md)

---

## Which track to drill?

- **Applying to "Frontend Developer" roles?** Live mostly in **Frontend**. Skim Backend so you can
  hold a conversation about the API your UI talks to (juniors get bonus points for this).
- **Roles say "Full-Stack" or "we're small, you'll touch the API"?** Rotate all three; lean on
  **Full-Stack** for the "how does it all fit together" questions.
- **A backend-leaning JS role?** Center **Backend**, keep Frontend warm.

Your portfolio supports all three credibly — `tono` and `dropzone` are both genuinely full-stack.

---

## Cross-track rotation (no deadline)

```
Frontend: JS → TS → React → coding challenge → project deep-dive → CSS/a11y
   ↘ every few sessions, drop in a Backend or Full-Stack drill ↙
Backend:  HTTP/REST → Express → DB/Prisma → auth/security → coding challenge
Full-Stack: rendering/data → client-server contract → e2e auth → design-a-feature
```

Re-drill anything graded ⚠️ or ❌. Each track has its own scorecard:
[frontend/progress.md](frontend/progress.md) · [backend/progress.md](backend/progress.md) · [fullstack/progress.md](fullstack/progress.md)
