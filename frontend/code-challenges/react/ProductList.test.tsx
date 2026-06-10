import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ProductList } from './ProductList';

describe('ProductList', () => {
  it('renders all products initially', () => {
    render(<ProductList />);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('filters as you type (case-insensitive)', async () => {
    render(<ProductList />);
    await userEvent.type(screen.getByLabelText('Filter'), 'cast');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2); // Stratocaster + Telecaster
    expect(screen.getByText('Stratocaster')).toBeInTheDocument();
    expect(screen.getByText('Telecaster')).toBeInTheDocument();
  });

  it('matches a single product', async () => {
    render(<ProductList />);
    await userEvent.type(screen.getByLabelText('Filter'), 'les paul');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('Les Paul')).toBeInTheDocument();
  });

  it('shows "No products found" when nothing matches', async () => {
    render(<ProductList />);
    await userEvent.type(screen.getByLabelText('Filter'), 'xyz');
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('restores the full list when the filter is cleared', async () => {
    render(<ProductList />);
    const input = screen.getByLabelText('Filter');
    await userEvent.type(input, 'sg');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    await userEvent.clear(input);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
