import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleDashboardPath } from '@/config/roleConfig';
import { DEMO_PASSWORD } from '@/config/roleAccounts';
import AuthPageHeader from '@/components/auth/AuthPageHeader';
import QuickAccessSection from '@/components/auth/QuickAccessSection';
import DemoCredentialsPanel from '@/components/auth/DemoCredentialsPanel';
import DeveloperCredit from '@/components/shared/DeveloperCredit';
import { roleAccounts } from '@/config/roleAccounts';

export default function LoginPage() {
  const { login, quickAccess } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (searchParams.get('mode') === 'register') {
      navigate('/register', { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (window.location.hash === '#demo') {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleQuickAccess = (email: string) => {
    setLoadingRole(email);
    setError('');
    const result = quickAccess(email);
    if (result.success) {
      const account = roleAccounts.find((a) => a.user.email === email);
      if (account) navigate(getRoleDashboardPath(account.user.role));
    } else {
      setError(result.error || 'Quick access failed');
      setLoadingRole(null);
    }
  };

  const fillDemoCredentials = (email: string) => {
    setForm({ email, password: DEMO_PASSWORD });
    setError('');
    document.getElementById('login-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter email and password.');
      return;
    }
    const result = login(form.email, form.password);
    if (result.success && result.user) {
      navigate(getRoleDashboardPath(result.user.role));
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="animate-fade-in bg-mint-50">
      <AuthPageHeader
        tag="Sign In"
        title="Welcome Back"
        description="Sign in with your credentials — your role is detected automatically from your account."
      />

      <div className="auth-page">
        <div className="auth-split">
          <section id="login-form" className="scroll-mt-24 lg:col-span-3">
            <div className="auth-form-card">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-ink-900 sm:text-xl">Sign in to your account</h2>
                  <p className="mt-1 text-sm text-ink-500">
                    Enter your credentials or pick a demo account on the right
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="you@school.edu"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="label">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="input-field pr-14"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1/2 flex h-11 min-w-11 -translate-y-1/2 items-center justify-center px-3 text-xs font-semibold text-ink-500 hover:text-primary-700"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <div className="space-y-4 pt-1">
                  <button type="submit" className="btn-primary w-full py-3">
                    Sign In to Dashboard
                  </button>

                  <p className="text-center text-sm text-ink-500">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                      Create one here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </section>

          <aside className="lg:col-span-2">
            <DemoCredentialsPanel onFillCredentials={fillDemoCredentials} />
          </aside>
        </div>

        <QuickAccessSection loadingRole={loadingRole} onQuickAccess={handleQuickAccess} />

        <div className="mt-8">
          <DeveloperCredit variant="compact" />
        </div>
      </div>
    </div>
  );
}
