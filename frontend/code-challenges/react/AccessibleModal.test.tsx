import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AccessibleModal } from './AccessibleModal';

function Wrapper({
  open,
  onClose = vi.fn(),
}: {
  open: boolean;
  onClose?: () => void;
}) {
  return (
    <AccessibleModal open={open} onClose={onClose}>
      <p>Modal content</p>
    </AccessibleModal>
  );
}

describe('AccessibleModal', () => {
  it('renders nothing when closed', () => {
    render(<Wrapper open={false} />);
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog and children when open', () => {
    render(<Wrapper open={true} />);
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<Wrapper open={true} />);
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<Wrapper open={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<Wrapper open={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when the dialog itself is clicked', () => {
    const onClose = vi.fn();
    render(<Wrapper open={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<Wrapper open={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on other key presses', () => {
    const onClose = vi.fn();
    render(<Wrapper open={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });
});
