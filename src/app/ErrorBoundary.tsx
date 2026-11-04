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
        <div
          role="alert"
          className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
          style={{ backgroundColor: '#F6EFE6', color: '#1E1615' }}
        >
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#A14D3A' }}>
            CREMA LAB • GELATO ARTESANAL
          </p>
          <h1 className="font-serif text-4xl mb-4">
            Uma pequena pausa inesperada.
          </h1>
          <p className="max-w-md text-sm mb-6" style={{ color: '#5A4A44' }}>
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

