# 02 — TypeScript

Junior React/TS roles expect you to *use* TS comfortably and explain the core type tools.
Examples below are pulled from your actual `tono` code where possible.

---

## `type` vs `interface`

> **Q:** When do you use `type` vs `interface`?
> **A:** They overlap heavily for object shapes. Key differences: `interface` can be **declaration-
> merged** (declare it twice and the members combine) and reads naturally for extendable object
> shapes/class contracts. `type` is more flexible — it can alias **unions, primitives, tuples,
> and mapped types**, which `interface` can't.
> **Practical rule:** `interface` for public object/component-prop shapes; `type` when you need
> unions or computed types. Pick one convention and stay consistent.
> **🪤 Junior trap:** Saying one is strictly "better." Interviewers want the tradeoff, not dogma.

---

## `any` vs `unknown` vs `never`

> **Q:** `any` vs `unknown`?
> **A:** `any` opts **out** of type checking — anything goes, errors slip through. `unknown` is
> the type-safe top type: you can hold any value but **must narrow it** (typeof/instanceof/guard)
> before using it. Prefer `unknown` for values of uncertain shape (e.g. API responses, caught
> errors) and validate before use.
> **🪤 Junior trap:** Reaching for `any` to "make the error go away." It silently disables safety
> for everything downstream. `unknown` forces a deliberate narrow.

> **Q:** What's `never`?
> **A:** The type with no values — used for code that never returns (throws/infinite loop) and for
> exhaustiveness checks in switch statements (assign the leftover to a `never` variable so a new
> union member becomes a compile error).

---

## Generics

> **Q:** What are generics and why use them?
> **A:** Type parameters that let a function/type work over many types while preserving the
> relationship between input and output. `function first<T>(arr: T[]): T | undefined` returns the
> element type, not `any`.
> ```ts
> function identity<T>(value: T): T { return value; }
> const n = identity(5);        // T = number
> const s = identity('hello');  // T = string
> ```
> You can **constrain** them: `<T extends { id: string }>` requires `T` to have an `id`.
> **🪤 Junior trap:** Overusing generics where a plain type works, or writing `<T>` then never
> using `T` in a way that links input to output (then it's pointless).

---

## Union types & narrowing

> **Q:** What is a union type, and how do you narrow it?
> **A:** A union `string | number` means "one of these." You **narrow** before using type-specific
> behavior, via `typeof`, `instanceof`, `in`, equality checks, or truthiness. TS tracks the narrowed
> type inside each branch.
> ```ts
> function format(x: string | number) {
>   if (typeof x === 'string') return x.trim(); // x: string here
>   return x.toFixed(2);                         // x: number here
> }
> ```

> **Q:** What's a discriminated (tagged) union?
> **A:** A union of object types that share a literal "tag" field you can switch on:
> ```ts
> type Result =
>   | { status: 'success'; data: Tone }
>   | { status: 'error'; message: string };
> // switch (r.status) lets TS narrow `data` vs `message`
> ```
> This is the idiomatic way to model loading/success/error state — and mirrors your `tono`
> `errorHandler` pattern of typed outcomes.

---

## Utility types

> **Q:** Name some utility types and what they do.
> **A:**
> - `Partial<T>` — all properties optional. *(Your `ToneUpdateSchema = ToneCreateSchema.partial()`
>   in `tono/utils/validation/toneValidation.ts` is the Zod equivalent of this idea.)*
> - `Required<T>` — all properties required.
> - `Pick<T, K>` — keep only keys `K`.
> - `Omit<T, K>` — drop keys `K`.
> - `Record<K, V>` — object with keys `K` and values `V` (e.g. `Record<string, number>`).
> - `Readonly<T>` — all properties readonly.
> - `ReturnType<typeof fn>` / `Parameters<typeof fn>` — extract from function types.
> **🪤 Junior trap:** Hand-writing a near-duplicate interface when `Pick`/`Omit` would derive it
> and stay in sync automatically.

---

## Inferring types from values: `as const`, `typeof`, `keyof`

> **Q:** What does `as const` do?
> **A:** Freezes a literal to its narrowest readonly type. `const sizes = ['sm','md','lg'] as const`
> gives type `readonly ['sm','md','lg']` instead of `string[]`, so you can derive a union:
> `type Size = typeof sizes[number]; // 'sm' | 'md' | 'lg'`.

> **Q:** `keyof`?
> **A:** Produces a union of an object type's keys. `keyof { a: 1; b: 2 }` is `'a' | 'b'`. Combined
> with generics it powers safe property access: `function get<T, K extends keyof T>(o: T, k: K): T[K]`.

---

## Typing React (the part interviews actually probe)

> **Q:** How do you type a component's props?
> **A:**
> ```tsx
> type ButtonProps = {
>   label: string;
>   variant?: 'primary' | 'secondary'; // optional + union
>   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
>   children?: React.ReactNode;
> };
> function Button({ label, variant = 'primary', onClick }: ButtonProps) { ... }
> ```

> **Q:** How do you type `useState` and `useRef`?
> **A:** `useState` usually infers from the initial value: `useState(0)` → `number`. When the
> initial value is `null` or a wider type, annotate: `useState<User | null>(null)`. For refs:
> `useRef<HTMLInputElement>(null)` and access `.current` (may be null until mounted).

> **Q:** How do you type an event handler / form event?
> **A:** Use React's synthetic event types: `React.ChangeEvent<HTMLInputElement>`,
> `React.FormEvent<HTMLFormElement>`, `React.MouseEvent<HTMLButtonElement>`. Let the JSX `onChange`
> infer it if you write the handler inline.
> **🪤 Junior trap:** Typing events as `any`, or importing the wrong DOM element generic.

> **Q:** How does Zod relate to TypeScript? *(You use this in tono + fanimal.)*
> **A:** Zod validates at **runtime**; TS only checks at **compile time** and is erased. Zod lets
> you define a schema once and derive the static type with `z.infer<typeof Schema>`, so the runtime
> validation and the compile-time type can't drift. In `tono` you `safeParse` query params and pass
> `.error.issues` into your `APIError` — that's runtime safety TS alone can't give you (an API can
> always send the wrong shape).

---

### Drill prompts to practice in chat
- "Mock drill: TS" — expect "what's the type of X" and "how would you type this function" questions.
- Be ready to read a snippet and say what type TS infers, and to fix an `any` with a proper type.
