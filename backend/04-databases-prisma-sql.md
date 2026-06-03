# 04 — Databases, SQL & Prisma

Both dropzone and tono use Prisma + Postgres. Juniors aren't expected to be DBAs, but you should
know relational basics, what Prisma does for you, and the classic gotchas (N+1, transactions, indexes).

---

## Relational basics

> **Q:** What's a primary key vs a foreign key?
> **A:** A **primary key** uniquely identifies a row in its table. A **foreign key** is a column that
> references another table's primary key, modeling a relationship (e.g. `Tone.userId → User.id`).

> **Q:** One-to-many vs many-to-many — how are they stored?
> **A:** One-to-many: the "many" side holds a foreign key (a `User` has many `Tone`s; each `Tone`
> has a `userId`). Many-to-many: a **join table** holds pairs of foreign keys. Prisma can manage the
> join table implicitly with `@relation`.

> **Q:** SQL `JOIN` in one sentence?
> **A:** Combines rows from two tables on a matching condition. **INNER JOIN** keeps only matches;
> **LEFT JOIN** keeps all left rows, filling nulls where the right has no match.

---

## Indexes & performance

> **Q:** What does an index do, and what's the tradeoff?
> **A:** An index is a sorted structure (usually a B-tree) that makes lookups/filters/sorts on a
> column fast — turning a full-table scan into a quick seek. Tradeoff: it costs extra storage and
> slows **writes** (every insert/update maintains the index). Index columns you frequently filter or
> join on (e.g. `Tone.userId`, `User.email`), not everything.
> **🪤 Junior trap:** "Add indexes everywhere to make it fast." Over-indexing degrades write
> performance and wastes space.

> **Q:** What's the N+1 query problem?
> **A:** Fetching a list (1 query), then firing a separate query **per item** to load a relation
> (N queries) → N+1 total. It quietly murders performance as data grows. **Fix:** load relations in
> one go — Prisma's `include`/`select` (which generates a JOIN or batched query), or batch the loads.
> *(tono's `GET /api/tones` deliberately avoids this and also runs its list + count concurrently with
> `Promise.all` rather than sequentially.)*
> **🪤 Junior trap:** Looping over results and `await`ing a query inside the loop. That's N+1 *and*
> sequential — doubly slow.

---

## Transactions

> **Q:** What's a database transaction and when do you need one?
> **A:** A group of operations that either **all** succeed or **all** roll back — atomic and isolated
> (the A and I of ACID). Use one when multiple writes must stay consistent, or when you must
> read-then-write without a race.
> **Q:** Give a concrete example from your own code.
> **A:** tono reserves a generation credit inside `prisma.$transaction`: re-read the user's
> `generationsUsed`, check it's under the limit, and increment — **atomically**. Without the
> transaction, two concurrent requests could both pass the check and overspend. *(That's the
> check-and-decrement race; the transaction makes it safe.)*
> **🪤 Junior trap:** "Check the count, then update it" in two separate queries — a classic race
> condition under concurrency. Wrap it in a transaction (or use an atomic update).

---

## Prisma specifics

> **Q:** What does Prisma give you over raw SQL?
> **A:** A **typed** query API generated from your `schema.prisma`, so queries and results are
> type-checked against your models; migrations (`prisma migrate`) to version schema changes; and it
> handles connection pooling and SQL generation. You trade some raw control for safety and speed.

> **Q:** Migrations vs `db push`?
> **A:** `prisma migrate dev` creates a versioned, reviewable migration file — use this for real
> schema evolution you'll ship. `db push` syncs the schema directly without a migration history —
> handy for fast local prototyping, not for production change tracking. *(tono's CLAUDE.md documents
> both.)*

> **Q:** How do you avoid SQL injection with Prisma?
> **A:** Prisma's query methods **parameterize** inputs, so you're safe by default. The risk
> reappears only if you drop to `$queryRawUnsafe` with string concatenation. With raw SQL anywhere,
> always use parameterized queries — never build SQL by concatenating user input.
> **🪤 Junior trap:** Thinking an ORM makes injection impossible. Raw/unsafe escape hatches reopen it.

---

### Drill prompts
- "Backend mock drill: database" — expect N+1, index tradeoffs, "why a transaction here," and
  "design the tables for X."
- Be ready to explain the tono credit-reservation transaction as a race-condition fix.
