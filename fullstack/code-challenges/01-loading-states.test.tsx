import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import UserProfile from './01-loading-states';

afterEach(() => vi.unstubAllGlobals());

function mockFetch(data: object | null, ok = true, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok,
        status,
        json: () => Promise.resolve(data),
      })
    )
  );
}

const user = { id: '1', name: 'Alice', email: 'alice@example.com', bio: 'Engineer' };

describe('UserProfile', () => {
  it('shows loading initially', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); // never resolves
    render(<UserProfile userId="1" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders user data on success', async () => {
    mockFetch(user);
    render(<UserProfile userId="1" />);
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());
    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('shows error state on non-ok response', async () => {
    mockFetch({}, false, 500);
    render(<UserProfile userId="1" />);
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('re-fetches and shows loading when userId changes', async () => {
    mockFetch(user);
    const { rerender } = render(<UserProfile userId="1" />);
    await waitFor(() => screen.getByTestId('profile'));

    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); // stall
    rerender(<UserProfile userId="2" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
