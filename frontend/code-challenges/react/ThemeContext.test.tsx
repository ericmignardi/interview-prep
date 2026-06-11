import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';

// a small consumer used by the tests
function Consumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  it('provides the default theme to consumers', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByText('Theme: light')).toBeInTheDocument();
  });

  it('toggles the theme for consumers', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Theme: light')).toBeInTheDocument();
  });

  it('throws if useTheme is used outside a ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {}); // hush React's error log
    expect(() => render(<Consumer />)).toThrow('useTheme must be used within a ThemeProvider');
    spy.mockRestore();
  });
});
