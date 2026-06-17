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

export default function CartReducer({ products }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div>
        {products.map(p => (
          <button key={p.id} data-testid={`add-${p.id}`} onClick={() => dispatch({ type: 'ADD', payload: p })}>
            Add {p.name}
          </button>
        ))}
      </div>
      <ul>
        {state.items.map(item => (
          <li key={item.id} data-testid={`item-${item.id}`}>
            {item.name} x{item.qty}
            <button data-testid={`remove-${item.id}`} onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p data-testid="total">${state.total.toFixed(2)}</p>
      <button data-testid="clear" onClick={() => dispatch({ type: 'CLEAR' })}>
        Clear cart
      </button>
    </div>
  );
}
