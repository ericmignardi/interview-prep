import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LiftState from './LiftState';

describe('LiftState', () => {
  it('renders all items when query is empty', () => {
    render(<LiftState />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
  });

  it('filters results when the user types', () => {
    render(<LiftState />);
    fireEvent.change(screen.getByRole('textbox', { name: /search/i }), {
      target: { value: 'Script' },
    });
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    expect(screen.queryByText('Express')).not.toBeInTheDocument();
  });

  it('is case-insensitive', () => {
    render(<LiftState />);
    fireEvent.change(screen.getByRole('textbox', { name: /search/i }), {
      target: { value: 'react' },
    });
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('shows empty state when nothing matches', () => {
    render(<LiftState />);
    fireEvent.change(screen.getByRole('textbox', { name: /search/i }), {
      target: { value: 'zzz' },
    });
    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('shows all items again when query is cleared', () => {
    render(<LiftState />);
    fireEvent.change(screen.getByRole('textbox', { name: /search/i }), {
      target: { value: 'react' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /search/i }), {
      target: { value: '' },
    });
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
