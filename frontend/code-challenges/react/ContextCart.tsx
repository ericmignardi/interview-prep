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

interface CartContextValue {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | null>(null);

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function reducer(state: CartState, action: CartAction): CartState {
  let items: CartItem[];
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.payload.id);
      items = existing
        ? state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.payload, qty: 1 }];
      return { items, total: calcTotal(items) };
    }
    case 'REMOVE':
      items = state.items.filter(i => i.id !== action.payload);
      return { items, total: calcTotal(items) };
    case 'CLEAR':
      return { items: [], total: 0 };
  }
}

const initialState: CartState = { items: [], total: 0 };

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}

interface ItemProps {
  item: { id: string; name: string; price: number };
}

export function AddToCartButton({ item }: ItemProps) {
  const { dispatch } = useCart();
  return (
    <button data-testid={`add-${item.id}`} onClick={() => dispatch({ type: 'ADD', payload: item })}>
      Add {item.name}
    </button>
  );
}

export function CartSummary() {
  const { state } = useCart();
  return (
    <div>
      <p data-testid="count">{state.items.length} items</p>
      <p data-testid="total">${state.total.toFixed(2)}</p>
    </div>
  );
}
