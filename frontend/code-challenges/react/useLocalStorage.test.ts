import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

beforeEach(() => localStorage.clear());

describe('useLocalStorage', () => {
  it('uses the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));
    expect(result.current[0]).toBe(0);
  });

  it('reads an existing value from localStorage on mount', () => {
    localStorage.setItem('count', JSON.stringify(42));
    const { result } = renderHook(() => useLocalStorage('count', 0));
    expect(result.current[0]).toBe(42);
  });

  it('updates state and writes to localStorage when the setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
    expect(localStorage.getItem('count')).toBe(JSON.stringify(5));
  });

  it('persists across separate mounts (a fresh hook reads the saved value)', () => {
    const first = renderHook(() => useLocalStorage('name', 'guest'));
    act(() => first.result.current[1]('Eric'));

    const second = renderHook(() => useLocalStorage('name', 'guest'));
    expect(second.result.current[0]).toBe('Eric');
  });

  it('works with object values (JSON round-trip)', () => {
    const { result } = renderHook(() => useLocalStorage('user', { name: 'guest' }));
    act(() => result.current[1]({ name: 'Eric' }));
    expect(result.current[0]).toEqual({ name: 'Eric' });
    expect(JSON.parse(localStorage.getItem('user')!)).toEqual({ name: 'Eric' });
  });
});
