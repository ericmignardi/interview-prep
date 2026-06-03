# 01 — Node & Async Runtime

How Node runs your code. Interviewers check you understand the single-threaded, non-blocking
model — because it explains why backend JS is written the way it is.

---

## The runtime model

> **Q:** Is Node single-threaded? How does it handle many concurrent requests?
> **A:** Your JS runs on a **single main thread** with an event loop. Node stays responsive by being
> **non-blocking**: I/O (disk, network, DB) is handed off to the OS / a background thread pool
> (libuv) and a callback runs later when it completes. So one thread juggles thousands of
> connections because it's almost never *waiting* — it's only busy during the short CPU bursts
> between I/O.
> **🪤 Junior trap:** Saying Node "uses many threads for requests." The request handling is
> single-threaded; only certain I/O and crypto/zlib work uses libuv's thread pool.

> **Q:** What's the danger of a CPU-heavy task in a request handler?
> **A:** It **blocks the event loop** — while you're crunching, no other request can be served.
> Fixes: offload to a worker thread, a queue/background job, or a separate service. Backend JS is
> great for I/O-bound work, weaker for CPU-bound work.

> **Q:** Node event loop vs browser event loop — same idea?
> **A:** Same core concept (call stack, task & microtask queues). Node adds phases (timers, I/O
> callbacks, `setImmediate`, close callbacks) and `process.nextTick` which runs *before* the
> microtask queue. For a junior role, knowing "single-threaded, non-blocking, callbacks resume
> after I/O completes" is enough.

---

## Async patterns

> **Q:** Callbacks → Promises → async/await — why did each come along?
> **A:** Callbacks led to "callback hell" (deep nesting, hard error handling). Promises flattened
> that with chaining and unified errors via `.catch`. `async/await` made promise code read
> synchronously with `try/catch`. Modern Node code is async/await throughout — like your dropzone
> services (`await prisma.user.findUnique(...)`, `await bcryptjs.hash(...)`).

> **Q:** How do you handle errors in async Express handlers?
> **A:** A throw inside an `async` handler rejects a promise; Express 4 wouldn't catch it
> automatically (you'd wrap in try/catch or an async wrapper). **Express 5** (which dropzone uses)
> *does* forward rejected promises to your error-handling middleware. Either way, route everything
> through a central error handler. *(dropzone: `utils/errorHandler.ts`, mounted last in `index.ts`.)*
> **🪤 Junior trap:** Forgetting that an unhandled async throw in Express 4 silently hangs the
> request. Know whether your version auto-forwards.

> **Q:** Run several async calls in parallel?
> **A:** `await Promise.all([a(), b()])` when they're independent — don't `await` them one after
> another sequentially. Use `Promise.allSettled` if you need every result even when some fail.

---

## Modules & environment

> **Q:** CommonJS vs ES Modules in Node?
> **A:** CommonJS (`require`/`module.exports`) is the legacy default, synchronous. ESM
> (`import`/`export`) is the standard, statically analyzable. You opt into ESM with
> `"type": "module"` in `package.json` (dropzone backend does this) — note ESM requires file
> extensions in relative imports (`./libs/prisma.js`), which is why you see `.js` in your TS
> imports even though the source is `.ts`.

> **Q:** How should secrets/config be handled?
> **A:** Environment variables, never hardcoded or committed. Load with `dotenv` in dev
> (`import "dotenv/config"` in dropzone `index.ts`), inject real values in prod. Validate required
> vars at boot so the app fails fast — exactly what `tono`'s `lib/config.ts` does by throwing on a
> missing var at module load.
> **🪤 Junior trap:** Committing a `.env` file or reading `process.env.X` scattered everywhere with
> no validation, so a missing var blows up mid-request instead of at startup.

---

## Streams & buffers (light touch)

> **Q:** What's a stream, and why use one for file uploads?
> **A:** A stream processes data in **chunks** instead of loading it all into memory. For large file
> uploads/downloads, streaming keeps memory flat regardless of file size. Your dropzone upload path
> (multer → Cloudinary) deals with file buffers; being able to say "I'd stream large files rather
> than buffer them entirely" shows awareness.

---

### Drill prompts
- "Backend mock drill: node" — expect "is Node multithreaded", "what blocks the event loop", and
  async error-handling questions.
- Be ready to explain why a `for`-loop of `await`s is slower than `Promise.all`.
