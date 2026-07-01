import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleDashboardPath } from '@/config/roleConfig';
import { roleAccounts, DEMO_PASSWORD } from '@/config/roleAccounts';
import AuthPageHeader from '@/components/auth/AuthPageHeader';
import QuickAccessSection from '@/components/auth/QuickAccessSection';
import DemoCredentialsPanel from '@/components/auth/DemoCredentialsPanel';
import RoleSelector from '@/components/auth/RoleSelector';
import DeveloperCredit from '@/components/shared/DeveloperCredit';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const { login, quickAccess } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '', role: 'employee' as UserRole });

  // Redirect legacy /login?mode=register URLs
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

  const fillDemoCredentials = (email: string, role: UserRole) => {
    setForm({ email, password: DEMO_PASSWORD, role });
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter email and password.');
      return;
    }
    const result = login(form.email, form.password, form.role);
    if (result.success) {
      navigate(getRoleDashboardPath(form.role));
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="animate-fade-in bg-mint-50">
      <AuthPageHeader
        tag="Sign In"
        title="Welcome Back"
        description="Sign in to your role dashboard or use quick demo access below."
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="order-1 grid grid-cols-1 gap-6 lg:order-2 lg:grid-cols-5 lg:gap-8">
            <section className="lg:col-span-3">
            <div className="card shadow-soft">
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-ink-900 sm:text-xl">Sign in to your account</h2>
                  <p className="mt-1 text-sm text-ink-500">
                    Enter your credentials or use quick demo access
                  </p>
                </div>

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
                      className="input-field pr-12"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 flex h-11 min-w-11 -translate-y-1/2 items-center justify-center px-3 text-xs font-medium text-ink-400 hover:text-ink-600"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <RoleSelector value={form.role} onChange={(role) => setForm({ ...form, role })} />

                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                )}

                <button type="submit" className="btn-primary w-full py-3">
                  Sign In to Dashboard
                </button>

                <p className="text-center text-sm text-ink-500">
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                    Create one here
                  </Link>
                </p>
              </form>
            </div>
          </section>

          <aside className="lg:col-span-2">
            <DemoCredentialsPanel onFillCredentials={fillDemoCredentials} />
          </aside>
          </div>

          <div className="order-2 lg:order-1">
            <QuickAccessSection loadingRole={loadingRole} onQuickAccess={handleQuickAccess} />
          </div>
        </div>

        <div className="mt-8">
          <DeveloperCredit variant="compact" />
        </div>
      </div>
    </div>
  );
}
