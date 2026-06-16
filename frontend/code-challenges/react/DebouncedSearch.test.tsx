import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import DebouncedSearch from './DebouncedSearch';

beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function mockFetch(data: string[], ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok,
        status: ok ? 200 : 500,
        json: () => Promise.resolve(data),
      })
    )
  );
}

describe('DebouncedSearch', () => {
  it('shows nothing on initial render', () => {
    render(<DebouncedSearch />);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('does not fetch before the 400 ms debounce', async () => {
    mockFetch(['result1']);
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'react' } });
    act(() => vi.advanceTimersByTime(300));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('fetches after 400 ms and renders results', async () => {
    mockFetch(['result1', 'result2']);
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'react' } });
    act(() => vi.advanceTimersByTime(400));
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());
    expect(screen.getByText('result1')).toBeInTheDocument();
    expect(screen.getByText('result2')).toBeInTheDocument();
  });

  it('shows loading while the fetch is in flight', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); // never resolves
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'react' } });
    act(() => vi.advanceTimersByTime(400));
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows empty state when query is set but 0 results returned', async () => {
    mockFetch([]);
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zzz' } });
    act(() => vi.advanceTimersByTime(400));
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());
    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('shows error state on a non-ok response', async () => {
    mockFetch([], false);
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'react' } });
    act(() => vi.advanceTimersByTime(400));
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('clears results and skips fetch when query is cleared', async () => {
    mockFetch(['result1']);
    render(<DebouncedSearch />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'react' } });
    act(() => vi.advanceTimersByTime(400));
    await waitFor(() => screen.getByText('result1'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
    act(() => vi.advanceTimersByTime(400));
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
