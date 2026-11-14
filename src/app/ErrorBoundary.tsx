import React from 'react';

interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

/**
 * Staff-level Fault Isolation Error Boundary.
 * Prevents internal stack trace leakage to end users while providing a graceful recovery action.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error): void {
    // Log sanitized message only in development
    if (import.meta.env.DEV) {
      console.error('[CremaLab ErrorBoundary]:', error.message);
    }
  }

  private handleReload = (): void => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  public override render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary-fallback">
          <p className="error-boundary-kicker">
            CREMA LAB • GELATO ARTESANAL
          </p>
          <h1 className="error-boundary-title">
            Uma pequena pausa inesperada.
          </h1>
          <p className="error-boundary-desc">
            Ocorreu um erro ao carregar esta seção. Por favor, retorne ao início para
            continuar navegando pelos nossos sabores e unidades.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="btn-coral"
          >
            VOLTAR AO INÍCIO
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

