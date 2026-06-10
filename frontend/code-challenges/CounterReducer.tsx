// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 4 — useReducer  (the same counter, but with a reducer)
//
// `useReducer` is for state with multiple related actions. It's the React version
// of the discriminated-union reducer you wrote in TypeScript:
//   const [state, dispatch] = useReducer(reducer, initialState);
//   reducer is a PURE function: (state, action) => newState
//   you trigger changes with dispatch({ type: '...' })
//
// Build a counter using useReducer:
//   - state shape: { count: number }, starting at { count: 0 }
//   - actions: { type: 'increment' } | { type: 'decrement' } | { type: 'reset' }
//   - render "Count: {count}" and buttons "+1", "-1", "Reset" that dispatch actions
//
// Tasks:
//   1. Implement `reducer` — switch on action.type, return a NEW state object
//      (don't mutate `state`). Add a `never` exhaustiveness check in default.
//   2. Wire up the component: useReducer + buttons that dispatch.
//
// Run the tests:  npx vitest run CounterReducer
// ─────────────────────────────────────────────────────────────────────────────
import { useReducer } from "react";

type State = { count: number };

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  // your code here — switch on action.type, return a new State
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      const _exhaustive: never = action;
      return _exhaustive;
  }
}

export function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // render Count + 3 buttons that call dispatch({ type: ... })
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
