import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { AuthGuard } from './03-auth-guard';

afterEach(() => vi.unstubAllGlobals());

const user = { id: '1', name: 'Alice', email: 'alice@example.com' };

function mockFetch(data: object | null, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok,
        status: ok ? 200 : 401,
        json: () => Promise.resolve(data),
      })
    )
  );
}

describe('AuthGuard', () => {
  it('shows loading while auth is being checked', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); // stall
    render(<AuthGuard onRedirect={vi.fn()}>Protected</AuthGuard>);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders children when user is authenticated', async () => {
    mockFetch(user, true);
    render(<AuthGuard onRedirect={vi.fn()}>Protected content</AuthGuard>);
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('calls onRedirect and renders nothing when unauthenticated', async () => {
    mockFetch(null, false);
    const onRedirect = vi.fn();
    render(<AuthGuard onRedirect={onRedirect}>Protected content</AuthGuard>);
    await waitFor(() => expect(onRedirect).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });
});
