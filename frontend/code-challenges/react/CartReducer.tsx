// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R17 — CartReducer
//
// Build a shopping cart using useReducer.
// Key lesson: when multiple pieces of state always update together (items + total),
// useReducer is cleaner than juggling several useState calls.
//
// State shape:
//   { items: CartItem[]; total: number }
//   interface CartItem { id: string; name: string; price: number; qty: number }
//
// Actions (discriminated union):
//   { type: 'ADD';    payload: { id: string; name: string; price: number } }
//     — if item already in cart: increment qty by 1
//     — if new: add with qty: 1
//   { type: 'REMOVE'; payload: string }  — remove item by id entirely
//   { type: 'CLEAR' }                    — empty the cart
//
// After every action, recalculate total = sum of (price * qty).
//
// Props: products: { id: string; name: string; price: number }[]
//
// Requirements:
// 1. Implement the reducer (handle all three actions + recalculate total)
// 2. Each product renders: <button data-testid={`add-${id}`}>Add {name}</button>
// 3. Each cart item renders:
//      <li data-testid={`item-${id}`}>{name} x{qty}</li>
//      <button data-testid={`remove-${id}`}>Remove</button>
// 4. <p data-testid="total">${total.toFixed(2)}</p>
// 5. <button data-testid="clear">Clear cart</button>
//
// Run tests: npx vitest run CartReducer
// ─────────────────────────────────────────────────────────────────────────────
import { useReducer } from 'react';

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

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Props {
  products: Product[];
}

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function reducer(state: CartState, action: CartAction): CartState {
  // TODO: handle ADD — increment qty if exists, otherwise push new item
  // TODO: handle REMOVE — filter out by id
  // TODO: handle CLEAR — return empty state
  // TODO: after each case, recalculate total with calcTotal()
  return state;
}

const initialState: CartState = { items: [], total: 0 };

export default function CartReducer({ products }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div>
        {/* TODO: render an Add button for each product */}
      </div>
      <ul>
        {/* TODO: render each cart item with its Remove button */}
      </ul>
      <p data-testid="total">${state.total.toFixed(2)}</p>
      <button data-testid="clear" onClick={() => dispatch({ type: 'CLEAR' })}>
        Clear cart
      </button>
    </div>
  );
}
