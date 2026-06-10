import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Counter } from './Counter';

describe('Counter', () => {
  it('starts at 0', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments with +1', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('decrements with -1', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: '-1' }));
    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });

  it('increments multiple times correctly', async () => {
    render(<Counter />);
    const inc = screen.getByRole('button', { name: '+1' });
    await userEvent.click(inc);
    await userEvent.click(inc);
    await userEvent.click(inc);
    expect(screen.getByText('Count: 3')).toBeInTheDocument();
  });

  it('resets to 0', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
