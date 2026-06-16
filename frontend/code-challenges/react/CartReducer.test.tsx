import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CartReducer from './CartReducer';

const products = [
  { id: 'p1', name: 'Apple', price: 1.50 },
  { id: 'p2', name: 'Banana', price: 0.75 },
];

describe('CartReducer', () => {
  it('starts with empty cart and $0.00 total', () => {
    render(<CartReducer products={products} />);
    expect(screen.getByTestId('total').textContent).toBe('$0.00');
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('adds a new item to the cart', () => {
    render(<CartReducer products={products} />);
    fireEvent.click(screen.getByTestId('add-p1'));
    expect(screen.getByTestId('item-p1')).toBeInTheDocument();
    expect(screen.getByTestId('item-p1').textContent).toContain('x1');
    expect(screen.getByTestId('total').textContent).toBe('$1.50');
  });

  it('increments qty when same item is added twice', () => {
    render(<CartReducer products={products} />);
    fireEvent.click(screen.getByTestId('add-p1'));
    fireEvent.click(screen.getByTestId('add-p1'));
    expect(screen.getByTestId('item-p1').textContent).toContain('x2');
    expect(screen.getByTestId('total').textContent).toBe('$3.00');
  });

  it('removes an item', () => {
    render(<CartReducer products={products} />);
    fireEvent.click(screen.getByTestId('add-p1'));
    fireEvent.click(screen.getByTestId('remove-p1'));
    expect(screen.queryByTestId('item-p1')).not.toBeInTheDocument();
    expect(screen.getByTestId('total').textContent).toBe('$0.00');
  });

  it('clears the entire cart', () => {
    render(<CartReducer products={products} />);
    fireEvent.click(screen.getByTestId('add-p1'));
    fireEvent.click(screen.getByTestId('add-p2'));
    fireEvent.click(screen.getByTestId('clear'));
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.getByTestId('total').textContent).toBe('$0.00');
  });

  it('calculates total for multiple items', () => {
    render(<CartReducer products={products} />);
    fireEvent.click(screen.getByTestId('add-p1'));
    fireEvent.click(screen.getByTestId('add-p2'));
    expect(screen.getByTestId('total').textContent).toBe('$2.25');
  });
});
