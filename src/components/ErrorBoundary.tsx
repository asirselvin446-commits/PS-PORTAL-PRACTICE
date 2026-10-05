import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  label?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

/**
 * Catches render-time crashes anywhere in the tree and shows a recoverable
 * fallback instead of a blank white screen. A "Reload" button resets state;
 * progress lives in localStorage/Firestore so nothing is lost on reload.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(err: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: err instanceof Error ? err.message : 'Something went wrong.',
    };
  }

  componentDidCatch(err: unknown, info: ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.label ? `:${this.props.label}` : ''}]`, err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-white border border-neutral-200 rounded-xl p-6 text-center shadow-sm">
            <h1 className="text-base font-semibold text-neutral-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-xs text-neutral-500 mb-1">
              The app hit an unexpected error{this.props.label ? ` (${this.props.label})` : ''}.
              Your progress is saved — reloading is safe.
            </p>
            <p className="text-[11px] font-mono text-neutral-400 mb-4 break-all">
              {this.state.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-neutral-900 text-neutral-100 text-xs font-medium rounded-lg hover:bg-neutral-800 cursor-pointer"
            >
              Reload the app
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
