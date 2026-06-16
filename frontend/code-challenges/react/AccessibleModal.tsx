// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R15 — AccessibleModal  (a11y + useRef + useEffect)
//
// Build a modal that meets real accessibility requirements. This comes up in
// both take-homes and technical screens when interviewers probe your a11y knowledge.
//
// Props: { open: boolean; onClose: () => void; children: React.ReactNode }
//
// Requirements:
// 1. Return null when open is false (the modal is fully removed from the DOM)
// 2. Render a backdrop: <div data-testid="backdrop"> covering the screen
//    — clicking the BACKDROP calls onClose
// 3. Inside the backdrop, the dialog:
//    <div role="dialog" aria-modal="true" data-testid="dialog" tabIndex={-1}>
//    — clicking the DIALOG does NOT call onClose (stop propagation)
//    — render {children} inside
// 4. A close button inside the dialog: <button aria-label="Close modal">×</button>
// 5. Pressing Escape calls onClose
// 6. On open: move focus to the dialog element (dialogRef.current?.focus())
// 7. On close: return focus to the element that had focus before the modal opened
//    (capture document.activeElement in a ref BEFORE calling .focus() on the dialog)
//
// Hints:
//   - useEffect with [open, onClose] as deps — runs when modal opens/closes
//   - Add the Escape keydown listener inside the effect; remove it in cleanup
//   - Two refs: one for the dialog DOM node, one for the previously focused element
//
// Run tests: npx vitest run AccessibleModal
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AccessibleModal({ open, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    prevFocusRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      prevFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div data-testid="backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        data-testid="dialog"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button aria-label="Close modal" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
