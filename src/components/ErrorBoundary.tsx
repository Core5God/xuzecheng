import * as React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// 修复：移除对已删除的 Neumorphic.tsx 的引用，用原生元素替代
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = '应用程序遇到了一个意外错误。';
      try {
        const parsed = JSON.parse(this.state.error?.message || '');
        if (parsed.error && parsed.error.includes('Missing or insufficient permissions')) {
          errorMessage = '权限不足：您可能需要重新登录或检查权限设置。';
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-nm-bg flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center p-12 rounded-2xl shadow-lg bg-white/80">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-display font-extrabold mb-4">哎呀，出错了</h2>
            <p className="text-nm-muted mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <button 
              className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              onClick={() => window.location.reload()}
            >
              刷新页面 <RefreshCw size={18} />
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
