import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundaryWrapper from './ErrorBoundaryWrapper';

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test error');
  return <p>Safe content</p>;
}

beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => {}));
afterEach(() => vi.restoreAllMocks());

describe('ErrorBoundaryWrapper', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundaryWrapper fallback={<p>Something went wrong</p>}>
        <Bomb shouldThrow={false} />
      </ErrorBoundaryWrapper>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders fallback when a child throws', () => {
    render(
      <ErrorBoundaryWrapper fallback={<p>Something went wrong</p>}>
        <Bomb shouldThrow={true} />
      </ErrorBoundaryWrapper>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('Safe content')).not.toBeInTheDocument();
  });

  it('calls console.error with the error when a child throws', () => {
    render(
      <ErrorBoundaryWrapper fallback={<p>Error</p>}>
        <Bomb shouldThrow={true} />
      </ErrorBoundaryWrapper>
    );
    expect(console.error).toHaveBeenCalled();
  });
});
