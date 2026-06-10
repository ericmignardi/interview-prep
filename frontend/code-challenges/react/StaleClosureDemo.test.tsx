import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { StaleClosureDemo } from './StaleClosureDemo';

describe('stale closure trap (proof)', () => {
  it('STALE: three setCount(count + 1) only adds 1 — all read the same stale snapshot', async () => {
    render(<StaleClosureDemo />);
    await userEvent.click(screen.getByRole('button', { name: 'stale +3' }));
    // Even though setCount was called 3 times, count is only 1.
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('FUNCTIONAL: three setCount(prev => prev + 1) correctly adds 3', async () => {
    render(<StaleClosureDemo />);
    await userEvent.click(screen.getByRole('button', { name: 'func +3' }));
    // The functional updater reads the latest value each time → 3.
    expect(screen.getByText('Count: 3')).toBeInTheDocument();
  });
});
