// ─────────────────────────────────────────────────────────────────────────────
// TS Challenge 5 — Typing React  (strict, NO `any`)
//
// Add the types so this component file type-checks. This is the bridge into the
// React phase: typing props, useState, and event handlers.
//
// Verify:  npx tsc --noEmit   (from interview-prep/. No output = pass.)
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";

// 1. Type the props for `Greeting`:
//      - `name`: string (required)
//      - `excited`: boolean (OPTIONAL)
//    Then annotate the destructured params with this type.
type GreetingProps = {
  name: string;
  excited?: boolean;
};

function Greeting({ name, excited }: GreetingProps) {
  return (
    <h1>
      Hello, {name}
      {excited ? "!" : ""}
    </h1>
  );
}

// 2. A counter. Type the useState so `count` is a number.
//    (Inference handles this — but write it so it's explicitly a number-state.)
function Counter() {
  const [count, setCount] = useState<number>(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// 3. A controlled input. Type the onChange event parameter so `e.target.value`
//    is known to be a string. (Hint: React.ChangeEvent<HTMLInputElement>)
function NameField() {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return <input value={text} onChange={handleChange} />;
}

// 4. `user` can be a loaded User object OR null before it loads.
//    Type the useState so TS knows it's `User | null`.
type User = { id: number; name: string };

function Profile() {
  const [user, setUser] = useState<User | null>(null); // should be typed User | null
  // pretend something later calls setUser({ id: 1, name: 'Eric' })
  return <div>{user ? user.name : "Loading..."}</div>;
}

export { Greeting, Counter, NameField, Profile };
