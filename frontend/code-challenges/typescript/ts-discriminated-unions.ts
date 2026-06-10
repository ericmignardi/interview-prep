// ─────────────────────────────────────────────────────────────────────────────
// TS Challenge 4 — Discriminated Unions + exhaustiveness  (strict, NO `any`)
//
// Verify:  npx tsc --noEmit   (from interview-prep/. No output = pass.)
// ─────────────────────────────────────────────────────────────────────────────

// 1. Define a `Shape` discriminated union with THREE members, each tagged by a
//    `kind` literal:
//      - circle:    { kind: 'circle';    radius: number }
//      - square:    { kind: 'square';    side: number }
//      - rectangle: { kind: 'rectangle'; width: number; height: number }
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

// 2. Implement `area(shape): number`. Switch on `shape.kind`; in each case,
//    access ONLY that shape's fields (TS will narrow). Formulas:
//      circle = Math.PI * radius**2,  square = side**2,  rectangle = width*height
//
// 3. In the `default` case, add an EXHAUSTIVENESS check:
//      const _exhaustive: never = shape;
//      return _exhaustive;
//    (If every case is handled, `shape` is `never` here and it compiles.
//     If a case is missing, this line errors — TS forces you to handle all of them.)
function area(shape: Shape): number {
  // your switch here
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// ── usage — should type-check once Shape + area are correct ───────────────────
area({ kind: "circle", radius: 2 });
area({ kind: "square", side: 3 });
area({ kind: "rectangle", width: 4, height: 5 });

// ── OPTIONAL demonstrations (uncomment to SEE TS protect you) ─────────────────
// 1) Accessing a field that doesn't exist on that shape → COMPILE ERROR:
//    function bad(s: Shape) { if (s.kind === 'circle') return s.side; } // ❌ no `side` on circle
//
// 2) Exhaustiveness in action: add `| { kind: 'triangle'; base: number; height: number }`
//    to Shape but DON'T add a case → the `never` line in `area` errors. That's the point.

export {}; // module isolation
