import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('a', 500));
    expect(result.current).toBe('a');
  });

  it('does not update until the delay has passed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a'); // changed, but delay hasn't elapsed

    act(() => vi.advanceTimersByTime(499));
    expect(result.current).toBe('a'); // still not enough time

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('b'); // 500ms reached → updates
  });

  it('only applies the LAST value during rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    act(() => vi.advanceTimersByTime(200));
    rerender({ value: 'c' });
    act(() => vi.advanceTimersByTime(200));
    rerender({ value: 'd' });
    act(() => vi.advanceTimersByTime(500));

    expect(result.current).toBe('d'); // intermediate values never applied
  });
});
