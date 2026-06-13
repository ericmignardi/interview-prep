import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import LikeButton from './02-optimistic-update';

afterEach(() => vi.unstubAllGlobals());

function mockFetch(ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ ok, status: ok ? 200 : 500 }))
  );
}

describe('LikeButton', () => {
  it('renders initial like count', () => {
    render(<LikeButton noteId="1" initialLikes={5} />);
    expect(screen.getByRole('button').textContent).toContain('5');
  });

  it('optimistically increments count on click', async () => {
    mockFetch(true);
    render(<LikeButton noteId="1" initialLikes={5} />);
    fireEvent.click(screen.getByRole('button'));
    // Optimistic update is immediate — don't wait
    expect(screen.getByRole('button').textContent).toContain('6');
  });

  it('keeps incremented count after successful response', async () => {
    mockFetch(true);
    render(<LikeButton noteId="1" initialLikes={5} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryByRole('button')).not.toBeDisabled());
    expect(screen.getByRole('button').textContent).toContain('6');
  });

  it('rolls back and shows error on failure', async () => {
    mockFetch(false);
    render(<LikeButton noteId="1" initialLikes={5} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryByRole('button')).not.toBeDisabled());
    expect(screen.getByRole('button').textContent).toContain('5'); // rolled back
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('disables button while request is in flight', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); // never resolves
    render(<LikeButton noteId="1" initialLikes={5} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
