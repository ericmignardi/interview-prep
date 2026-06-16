import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import PaginatedList from './PaginatedList';

afterEach(() => vi.unstubAllGlobals());

function mockFetch(pages: { items: string[]; hasMore: boolean }[]) {
  let call = 0;
  vi.stubGlobal('fetch', vi.fn(() => {
    const response = pages[call] ?? { items: [], hasMore: false };
    call++;
    return Promise.resolve({ ok: true, json: () => Promise.resolve(response) });
  }));
}

describe('PaginatedList', () => {
  it('shows loading then renders first page on mount', async () => {
    mockFetch([{ items: ['Item A', 'Item B'], hasMore: true }]);
    render(<PaginatedList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });

  it('shows Load more button when hasMore is true', async () => {
    mockFetch([{ items: ['Item A'], hasMore: true }]);
    render(<PaginatedList />);
    await waitFor(() => expect(screen.getByTestId('load-more')).toBeInTheDocument());
  });

  it('hides Load more button when hasMore is false', async () => {
    mockFetch([{ items: ['Item A'], hasMore: false }]);
    render(<PaginatedList />);
    await waitFor(() => expect(screen.queryByTestId('load-more')).not.toBeInTheDocument());
  });

  it('Load more appends next page items without replacing existing', async () => {
    mockFetch([
      { items: ['Item A', 'Item B'], hasMore: true },
      { items: ['Item C', 'Item D'], hasMore: false },
    ]);
    render(<PaginatedList />);
    await waitFor(() => screen.getByTestId('load-more'));
    fireEvent.click(screen.getByTestId('load-more'));
    await waitFor(() => expect(screen.queryByTestId('load-more')).not.toBeInTheDocument());
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();
  });
});
