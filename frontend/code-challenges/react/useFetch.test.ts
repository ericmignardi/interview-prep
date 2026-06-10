import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useFetch } from './useFetch';

afterEach(() => vi.unstubAllGlobals());

describe('useFetch', () => {
  it('starts in the loading state', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); // never resolves
    const { result } = renderHook(() => useFetch('/api/x'));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('returns data on a successful response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'Eric' }) }))
    );
    const { result } = renderHook(() => useFetch<{ name: string }>('/api/user'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ name: 'Eric' });
    expect(result.current.error).toBe(null);
  });

  it('sets an error on a non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false, status: 500 })));
    const { result } = renderHook(() => useFetch('/api/fail'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBe(null);
  });
});
