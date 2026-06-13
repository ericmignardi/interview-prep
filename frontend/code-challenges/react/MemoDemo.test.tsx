import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MemoDemo from './MemoDemo';

describe('MemoDemo', () => {
  const items = [1, 2, 3, 4, 5, 6]; // even sum: 2+4+6 = 12

  it('displays the correct sum of even numbers', () => {
    render(<MemoDemo items={items} />);
    expect(screen.getByTestId('sum').textContent).toBe('12');
  });

  it('starts compute-count at 1 (runs once on mount)', () => {
    render(<MemoDemo items={items} />);
    expect(screen.getByTestId('compute-count').textContent).toBe('1');
  });

  it('does NOT increment compute-count when dark mode toggles', () => {
    render(<MemoDemo items={items} />);
    const before = screen.getByTestId('compute-count').textContent;
    fireEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }));
    fireEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }));
    expect(screen.getByTestId('compute-count').textContent).toBe(before);
  });

  it('applies "dark" className when dark mode is on', () => {
    render(<MemoDemo items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }));
    expect(screen.getByTestId('container')).toHaveClass('dark');
  });

  it('removes "dark" className when toggled back off', () => {
    render(<MemoDemo items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }));
    fireEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }));
    expect(screen.getByTestId('container')).not.toHaveClass('dark');
  });
});
