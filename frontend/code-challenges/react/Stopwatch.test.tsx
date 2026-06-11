import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Stopwatch } from './Stopwatch';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('Stopwatch', () => {
  it('starts at 0', () => {
    render(<Stopwatch />);
    expect(screen.getByText('Time: 0')).toBeInTheDocument();
  });

  it('counts up while running', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText('Time: 3')).toBeInTheDocument();
  });

  it('stops counting when Stop is clicked (keeps the time)', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    act(() => vi.advanceTimersByTime(2000));
    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    act(() => vi.advanceTimersByTime(5000)); // time passes, but it's stopped
    expect(screen.getByText('Time: 2')).toBeInTheDocument();
  });

  it('resets to 0', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    act(() => vi.advanceTimersByTime(4000));
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText('Time: 0')).toBeInTheDocument();
  });
});
