// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R19 — ContextCart
//
// Combine useContext + useReducer to share cart state across sibling components
// without prop drilling.
//
// Key lesson: Context + useReducer = lightweight state management.
// The Provider owns the state; any descendant can read or dispatch
// without props being threaded through intermediate components.
//
// Build these pieces:
//
//   1. CartContext — createContext (type: { state: CartState; dispatch: Dispatch<CartAction> })
//
//   2. CartProvider — component that:
//        - owns the useReducer state
//        - provides { state, dispatch } via CartContext.Provider
//        - renders children
//
//   3. useCart() — custom hook:
//        - calls useContext(CartContext)
//        - throws if used outside CartProvider ("useCart must be inside CartProvider")
//        - returns { state, dispatch }
//
//   4. AddToCartButton — props: { item: { id: string; name: string; price: number } }
//        - renders <button data-testid={`add-${item.id}`}>Add {item.name}</button>
//        - dispatches { type: 'ADD', payload: item } via useCart
//
//   5. CartSummary — reads state via useCart, renders:
//        <p data-testid="count">{state.items.length} items</p>
//        <p data-testid="total">${state.total.toFixed(2)}</p>
//
// Reuse CartAction type:
//   | { type: 'ADD';    payload: { id: string; name: string; price: number } }
//   | { type: 'REMOVE'; payload: string }
//   | { type: 'CLEAR' }
//
// Run tests: npx vitest run ContextCart
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD'; payload: { id: string; name: string; price: number } }
  | { type: 'REMOVE'; payload: string }
  | { type: 'CLEAR' };

// TODO: create CartContext (hint: use null as default, guard in useCart)

function reducer(state: CartState, action: CartAction): CartState {
  // TODO: same reducer as R17 — ADD increments qty or pushes, REMOVE filters, CLEAR empties
  // TODO: recalculate total on each action
  return state;
}

const initialState: CartState = { items: [], total: 0 };

export function CartProvider({ children }: { children: ReactNode }) {
  // TODO: useReducer + provide via context
  return <>{children}</>;
}

export function useCart() {
  // TODO: useContext(CartContext) + throw if null
  throw new Error('useCart must be inside CartProvider');
}

interface ItemProps {
  item: { id: string; name: string; price: number };
}

export function AddToCartButton({ item }: ItemProps) {
  // TODO: dispatch ADD via useCart
  return (
    <button data-testid={`add-${item.id}`}>Add {item.name}</button>
  );
}

export function CartSummary() {
  // TODO: read state via useCart
  return (
    <div>
      <p data-testid="count">0 items</p>
      <p data-testid="total">$0.00</p>
    </div>
  );
}
