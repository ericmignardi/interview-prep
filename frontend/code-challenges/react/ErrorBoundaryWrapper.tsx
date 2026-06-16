// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R21 — ErrorBoundaryWrapper
//
// Build a reusable ErrorBoundary class component from scratch.
// Key lesson: Error Boundaries MUST be class components — hooks cannot catch
// render-phase errors. In real projects most teams use the react-error-boundary
// library, but interviewers regularly ask how the internals work.
//
// Requirements:
// 1. Class component extending React.Component<Props, State>
// 2. State: { hasError: boolean; error: Error | null }
//    Initial state: { hasError: false, error: null }
//
// 3. static getDerivedStateFromError(error: Error): State
//    — called during render when a descendant throws
//    — return { hasError: true, error } to trigger fallback
//
// 4. componentDidCatch(error: Error, info: React.ErrorInfo): void
//    — called after commit; use it to log: console.error(error, info.componentStack)
//    — does NOT affect what is rendered
//
// 5. render():
//    — if hasError: return this.props.fallback
//    — else: return this.props.children
//
// Props:
//   children: React.ReactNode
//   fallback: React.ReactNode
//
// Run tests: npx vitest run ErrorBoundaryWrapper
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundaryWrapper extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(_error: Error): State {
    // TODO: return state that triggers the fallback
    return { hasError: false, error: null };
  }

  componentDidCatch(_error: Error, _info: React.ErrorInfo): void {
    // TODO: log the error and component stack
  }

  render() {
    // TODO: return fallback if hasError, otherwise return children
    return this.props.children;
  }
}
