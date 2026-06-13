import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MemoizedList from './MemoizedList';

describe('MemoizedList', () => {
  it('renders all initial items', () => {
    render(<MemoizedList />);
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
    expect(screen.getByText('gamma')).toBeInTheDocument();
  });

  it('removes an item when Remove is clicked', () => {
    render(<MemoizedList />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.queryByText('alpha')).not.toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
    expect(screen.getByText('gamma')).toBeInTheDocument();
  });

  it('does NOT re-render existing items when Tick fires (the memo+useCallback proof)', () => {
    render(<MemoizedList />);
    const rendersBefore = screen.getByTestId('renders-alpha').textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Tick' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tick' }));
    expect(screen.getByTestId('renders-alpha').textContent).toBe(rendersBefore);
  });

  it('remaining items are still shown after a removal', () => {
    render(<MemoizedList />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('beta')).toBeInTheDocument();
    expect(screen.getByText('gamma')).toBeInTheDocument();
  });

  it('all items can be removed', () => {
    render(<MemoizedList />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
