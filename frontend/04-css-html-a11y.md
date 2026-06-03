# 04 — CSS / HTML / Accessibility

Often underprepped by React devs, which is exactly why interviewers ask. You use Tailwind
everywhere — interviewers will still expect you to know the underlying CSS it generates.

---

## The box model

> **Q:** Explain the box model.
> **A:** Every element is a box: **content** → **padding** → **border** → **margin** (inner to
> outer). By default `width` sets only the content box, so padding/border add to the visible size.
> Setting `box-sizing: border-box` makes `width` include padding + border — far more intuitive, and
> the modern default most resets (and Tailwind) apply.
> **🪤 Junior trap:** Not knowing why an element with `width: 100%` + padding overflows its parent —
> it's the default `content-box` sizing.

> **Q:** Margin collapsing?
> **A:** Adjacent vertical margins between block elements collapse to the larger of the two (not the
> sum). Catches people off guard with unexpected spacing.

---

## Flexbox vs Grid

> **Q:** When do you use Flexbox vs Grid?
> **A:** **Flexbox** is one-dimensional — lay items out in a row *or* column (nav bars, button rows,
> centering). **Grid** is two-dimensional — rows *and* columns together (page layouts, card galleries).
> They compose: a grid cell can contain a flex container.
> **Q:** How do you center a div?
> **A:** Flexbox: `display:flex; align-items:center; justify-content:center;` on the parent. Or Grid:
> `display:grid; place-items:center;`. (Tailwind: `flex items-center justify-center`.)
> **🪤 Junior trap:** Confusing `justify-content` (main axis) with `align-items` (cross axis). In a
> `row` flexbox, justify = horizontal, align = vertical; in `column` they swap.

---

## Specificity & the cascade

> **Q:** How does CSS specificity work?
> **A:** When multiple rules target an element, the most **specific** selector wins, roughly scored
> as (inline, IDs, classes/attributes/pseudo-classes, elements). Inline styles > `#id` > `.class` >
> `div`. Ties go to **source order** (last wins). `!important` overrides normal specificity (avoid it).
> **🪤 Junior trap:** Fighting specificity with `!important` instead of using a more specific or
> better-organized selector. With Tailwind this rarely comes up, but interviewers still ask the theory.

> **Q:** `position` values?
> **A:** `static` (default), `relative` (offset from its normal spot; establishes a positioning
> context), `absolute` (positioned to nearest positioned ancestor, removed from flow), `fixed`
> (positioned to the viewport), `sticky` (relative until a scroll threshold, then fixed).

---

## Responsive design

> **Q:** How do you make a layout responsive?
> **A:** Fluid units (`%`, `rem`, `fr`, `min/max/clamp`), media queries (`@media (min-width: …)`), and
> intrinsically responsive layouts (flex-wrap, grid `auto-fit`/`minmax`). **Mobile-first** = write base
> styles for small screens, then layer `min-width` queries upward (Tailwind's `md:`/`lg:` prefixes are
> mobile-first by design).
> **Q:** `rem` vs `em` vs `px`?
> **A:** `px` is absolute. `em` is relative to the **element's** font-size (compounds with nesting).
> `rem` is relative to the **root** font-size — predictable, and respects the user's browser font
> setting, so it's better for accessibility than fixed `px`.

---

## Semantic HTML

> **Q:** Why use semantic HTML instead of `div`s everywhere?
> **A:** Elements like `<header> <nav> <main> <article> <section> <footer> <button> <ul>` convey
> meaning. Benefits: accessibility (screen readers announce roles and enable landmark navigation),
> SEO, and built-in behavior (a `<button>` is focusable and keyboard-activatable for free).
> **🪤 Junior trap:** Using `<div onClick>` as a button. It's not focusable, not keyboard-operable,
> and not announced as a button. Use a real `<button>`.

---

## Accessibility (a11y)

> **Q:** What are some quick accessibility wins?
> **A:**
> - Use semantic elements and proper heading order (`h1`→`h2`→…, don't skip levels).
> - `alt` text on meaningful images (`alt=""` for purely decorative ones).
> - Label every form input (`<label htmlFor>` tied to an `id`).
> - Keyboard operability: everything clickable must be reachable by Tab and activatable by Enter/Space.
> - Visible focus indicators (don't `outline: none` without a replacement).
> - Sufficient color contrast (WCAG AA ≈ 4.5:1 for normal text).
> **Q:** When do you need ARIA?
> **A:** Only when semantic HTML can't express it — custom widgets (a div-based tab list, a modal).
> Use `aria-label`, `role`, `aria-expanded`, `aria-hidden` etc. **First rule of ARIA: don't use ARIA
> if a native element does the job.** Bad ARIA is worse than none.
> **🪤 Junior trap:** Adding `role="button"` to a div instead of just using `<button>`; or hiding the
> focus outline for aesthetics, which strands keyboard users.

> **Q:** What makes a modal accessible? *(You build one in [05](05-coding-challenges.md).)*
> **A:** Move focus into it on open, **trap focus** inside while open, restore focus to the trigger on
> close, close on `Escape`, and mark it `role="dialog" aria-modal="true"` with a label. Background
> content should be inert / not focusable.

---

## A few extras that come up

> **Q:** `display: none` vs `visibility: hidden` vs `opacity: 0`?
> **A:** `display:none` removes it from layout entirely (no space, not focusable, not announced).
> `visibility:hidden` keeps its space but hides it (not focusable). `opacity:0` is fully transparent
> but **still there** — takes space, still clickable/focusable. They are not interchangeable for a11y.

> **Q:** What's the difference between `<button>` and `<a>`?
> **A:** `<a href>` navigates to a URL/resource. `<button>` performs an in-page action. Using the
> right one gives correct semantics, keyboard behavior, and right-click/open-in-new-tab for links.

---

### Drill prompts to practice in chat
- "Mock drill: CSS" — expect "center a div", flexbox axis questions, specificity, and a11y wins.
- Be ready to critique a `<div onClick>` and say what you'd use instead and why.
