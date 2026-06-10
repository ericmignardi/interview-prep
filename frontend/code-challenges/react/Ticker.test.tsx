import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Ticker } from './Ticker';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('Ticker', () => {
  it('starts at 0', () => {
    render(<Ticker />);
    expect(screen.getByText('Seconds: 0')).toBeInTheDocument();
  });

  it('increments after one second', () => {
    render(<Ticker />);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('Seconds: 1')).toBeInTheDocument();
  });

  it('keeps counting past 1 — does NOT get stuck (the stale-closure trap)', () => {
    render(<Ticker />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText('Seconds: 5')).toBeInTheDocument();
  });
});
