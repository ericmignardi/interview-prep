# 03 — Express & Middleware

Express is the framework behind your dropzone API. Interviewers probe the request lifecycle and
middleware ordering because that's where most real bugs live.

---

## The middleware model

> **Q:** What is middleware in Express?
> **A:** A function `(req, res, next)` that runs in order during a request. It can read/modify
> `req`/`res`, end the response, or call `next()` to pass control onward. Everything — body parsing,
> CORS, auth, logging, routing, error handling — is middleware. *(dropzone's `index.ts` chains
> `cors()` → `express.json()` → `cookieParser()` → routers → `errorHandler`.)*

> **Q:** Why does middleware **order** matter? Give a concrete example.
> **A:** Each runs in the order registered, so prerequisites must come first. `cookieParser()` must
> run **before** `authMiddleware` (which reads `req.cookies.token`). `express.json()` must run before
> any handler that reads `req.body`. The error handler must be registered **last**.
> **🪤 Junior trap:** Registering the error handler or a 404 catch-all *before* the routes, so it
> never reaches them. Or reading `req.body` when no body parser ran (it's `undefined`).

> **Q:** How does Express know a function is an *error* handler?
> **A:** By its **arity** — error middleware takes **four** args `(err, req, res, next)`. Express
> calls it when something throws or `next(err)` is called. *(dropzone's `errorHandler.ts`.)*

> **Q:** How do you write a piece of auth gating?
> **A:** A middleware that verifies the credential and either `next()`s or short-circuits with 401.
> *(dropzone `authMiddleware.ts`: read `req.cookies.token`, `jwt.verify`, attach `req.user`, else
> 401.)* Apply it per-route or per-router: `router.use(authMiddleware)`.

---

## Routing & structure

> **Q:** How is your API structured, and why layer it?
> **A:** dropzone splits **routes → controllers → services**:
> - *Routes* (`routes/authRouter.ts`) define paths + which middleware/controller runs.
> - *Controllers* (`controllers/authController.ts`) handle HTTP — read req, call a service, shape
>   the response/status.
> - *Services* (`services/authService.ts`) hold business logic + data access, independent of HTTP.
> This separation keeps HTTP concerns out of business logic, makes services unit-testable, and lets
> you reuse logic across endpoints.
> **🪤 Junior trap:** Cramming validation, business rules, and DB calls all into the route callback.
> Works for a toy app, becomes unmaintainable fast — and interviewers notice the layering.

> **Q:** Where does request validation go?
> **A:** As early as possible — ideally a validation middleware or the top of the controller, before
> any business logic touches the data. Use a schema validator (Zod) and return 400 with the issues.
> *(tono `safeParse`s query params and passes `error.issues` to the client; dropzone uses Zod too.)*

---

## req / res lifecycle

> **Q:** Can you call `res.send()` twice?
> **A:** No — once the response is sent, the request is done. Doing it again throws "headers already
> sent." This commonly happens when you forget to `return` after sending in an early-exit branch, so
> code keeps running and tries to respond again.
> **🪤 Junior trap:** `if (!token) res.status(401).json(...)` **without** `return`, then continuing —
> later code sends a second response. Always `return` after responding (dropzone does:
> `if (!token) return res.status(401)...`).

> **Q:** How do you read input from a request?
> **A:** `req.params` (path segments like `:id`), `req.query` (query string), `req.body` (parsed
> body — needs a body parser), `req.cookies` (needs `cookieParser`), `req.headers`.

---

## Cross-cutting concerns

> **Q:** How would you add logging / a request id?
> **A:** A middleware near the top that stamps each request (id, method, path, timing) — *(tono
> generates a `requestId` per handler and logs structured JSON; you could centralize that as Express
> middleware)*. Structured logs make production debugging tractable.

> **Q:** Real-time updates in Express?
> **A:** HTTP is request/response; for push you add **WebSockets** (socket.io). *(dropzone creates an
> `http.Server` from the Express app and attaches socket.io to it in `index.ts`, sharing the port,
> with matching CORS `credentials: true`.)* Use it for live file-share updates rather than client
> polling.

---

### Drill prompts
- "Backend mock drill: express" — expect middleware-ordering, error-handler arity, and "where does X go"
  layering questions.
- Be ready to spot the missing-`return`-after-`res.send` bug.
