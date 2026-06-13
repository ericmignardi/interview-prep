import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FilterableList from './FilterableList';

const items = [
  { id: '1', name: 'Banana' },
  { id: '2', name: 'Apple' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Apricot' },
];

describe('FilterableList', () => {
  it('renders all items initially in A→Z order', () => {
    render(<FilterableList items={items} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
    expect(listItems[0].textContent).toBe('Apple');
    expect(listItems[1].textContent).toBe('Apricot');
    expect(listItems[2].textContent).toBe('Banana');
    expect(listItems[3].textContent).toBe('Cherry');
  });

  it('filters items by text (case-insensitive)', () => {
    render(<FilterableList items={items} />);
    fireEvent.change(screen.getByRole('textbox', { name: /filter/i }), {
      target: { value: 'ap' },
    });
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toBe('Apple');
    expect(listItems[1].textContent).toBe('Apricot');
  });

  it('shows empty state when nothing matches', () => {
    render(<FilterableList items={items} />);
    fireEvent.change(screen.getByRole('textbox', { name: /filter/i }), {
      target: { value: 'zzz' },
    });
    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('toggles sort to Z→A when button clicked', () => {
    render(<FilterableList items={items} />);
    fireEvent.click(screen.getByRole('button'));
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Cherry');
    expect(listItems[3].textContent).toBe('Apple');
  });

  it('toggles back to A→Z on second click', () => {
    render(<FilterableList items={items} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Apple');
    expect(listItems[3].textContent).toBe('Cherry');
  });

  it('filter and sort work together', () => {
    render(<FilterableList items={items} />);
    fireEvent.change(screen.getByRole('textbox', { name: /filter/i }), {
      target: { value: 'ap' },
    });
    fireEvent.click(screen.getByRole('button')); // switch to Z→A
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Apricot');
    expect(listItems[1].textContent).toBe('Apple');
  });
});
