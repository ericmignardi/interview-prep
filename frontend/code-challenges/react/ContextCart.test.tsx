import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, AddToCartButton, CartSummary } from './ContextCart';

const apple = { id: 'p1', name: 'Apple', price: 1.50 };
const banana = { id: 'p2', name: 'Banana', price: 0.75 };

function TestApp() {
  return (
    <CartProvider>
      <AddToCartButton item={apple} />
      <AddToCartButton item={banana} />
      <CartSummary />
    </CartProvider>
  );
}

describe('ContextCart', () => {
  it('shows 0 items and $0.00 on initial render', () => {
    render(<TestApp />);
    expect(screen.getByTestId('count').textContent).toBe('0 items');
    expect(screen.getByTestId('total').textContent).toBe('$0.00');
  });

  it('AddToCartButton updates CartSummary count and total', () => {
    render(<TestApp />);
    fireEvent.click(screen.getByTestId('add-p1'));
    expect(screen.getByTestId('count').textContent).toBe('1 items');
    expect(screen.getByTestId('total').textContent).toBe('$1.50');
  });

  it('adding two different items reflects correct count and total', () => {
    render(<TestApp />);
    fireEvent.click(screen.getByTestId('add-p1'));
    fireEvent.click(screen.getByTestId('add-p2'));
    expect(screen.getByTestId('count').textContent).toBe('2 items');
    expect(screen.getByTestId('total').textContent).toBe('$2.25');
  });

  it('adding the same item twice increments qty (count stays 1)', () => {
    render(<TestApp />);
    fireEvent.click(screen.getByTestId('add-p1'));
    fireEvent.click(screen.getByTestId('add-p1'));
    expect(screen.getByTestId('count').textContent).toBe('1 items');
    expect(screen.getByTestId('total').textContent).toBe('$3.00');
  });
});
