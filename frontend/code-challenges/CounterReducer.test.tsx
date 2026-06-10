import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { CounterReducer } from './CounterReducer';

describe('CounterReducer', () => {
  it('starts at 0', () => {
    render(<CounterReducer />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments via dispatch', async () => {
    render(<CounterReducer />);
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('decrements via dispatch', async () => {
    render(<CounterReducer />);
    await userEvent.click(screen.getByRole('button', { name: '-1' }));
    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });

  it('handles a sequence of actions', async () => {
    render(<CounterReducer />);
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    await userEvent.click(screen.getByRole('button', { name: '-1' }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('resets to 0', async () => {
    render(<CounterReducer />);
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    await userEvent.click(screen.getByRole('button', { name: '+1' }));
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
