import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DMusic Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errMsg = this.state.error?.message || String(this.state.error);
      return (
        <div style={{
          minHeight: '100vh',
          minHeight: '100dvh',
          background: '#151912',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '20px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 300, marginBottom: '8px' }}>DMusic</h2>
          <p style={{ fontSize: '12px', opacity: 0.5, marginBottom: '12px', wordBreak: 'break-all', maxWidth: '300px' }}>
            {errMsg}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
