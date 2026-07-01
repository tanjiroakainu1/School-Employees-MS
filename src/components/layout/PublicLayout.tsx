import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PublicFooter from './PublicFooter';

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/#flow' },
    { label: 'Roles', path: '/#roles' },
    { label: 'Features', path: '/#features' },
    { label: 'Developer', path: '/#developer' },
  ];

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isAuthPage = isLoginPage || isRegisterPage;

  return (
    <div className="public-shell">
      <header className="sticky top-0 z-50 border-b border-primary-100/60 bg-white/85 shadow-soft backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link to="/" className="group flex min-w-0 items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <div className="logo-badge h-9 w-9 shrink-0 transition-transform group-hover:scale-105">
              SE
            </div>
            <div className="min-w-0 hidden xs:block">
              <p className="truncate text-sm font-extrabold text-ink-900">School Employees MS</p>
              <p className="truncate text-[10px] font-medium text-ink-500 sm:text-xs">Management System</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-ink-600 transition-all hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!isAuthPage && (
              <>
                <Link to="/login" className="btn-ghost hidden px-3 py-2 text-sm sm:inline-flex">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
                  Get Started
                </Link>
              </>
            )}
            {isLoginPage && (
              <>
                <Link to="/register" className="btn-ghost hidden px-3 py-2 text-sm xs:inline-flex">
                  Create Account
                </Link>
                <Link to="/" className="btn-secondary px-3 py-2 text-sm">
                  ← Home
                </Link>
              </>
            )}
            {isRegisterPage && (
              <>
                <Link to="/login" className="btn-ghost hidden px-3 py-2 text-sm xs:inline-flex">
                  Sign In
                </Link>
                <Link to="/" className="btn-secondary px-3 py-2 text-sm">
                  ← Home
                </Link>
              </>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200/80 bg-white text-ink-600 shadow-soft transition hover:bg-primary-50 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="animate-slide-up border-t border-ink-100 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-700 transition hover:bg-primary-50 hover:text-primary-700"
                >
                  {link.label}
                </a>
              ))}
              {!isAuthPage && (
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink-100 pt-3">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary py-2.5 text-center text-sm">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary py-2.5 text-center text-sm">
                    Get Started
                  </Link>
                </div>
              )}
              {isLoginPage && (
                <div className="mt-3 space-y-2 border-t border-ink-100 pt-3">
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-secondary w-full py-2.5 text-center text-sm">
                    Create Account
                  </Link>
                  <Link to="/" onClick={() => setMenuOpen(false)} className="btn-primary w-full py-2.5 text-center text-sm">
                    ← Back to Home
                  </Link>
                </div>
              )}
              {isRegisterPage && (
                <div className="mt-3 space-y-2 border-t border-ink-100 pt-3">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary w-full py-2.5 text-center text-sm">
                    Sign In
                  </Link>
                  <Link to="/" onClick={() => setMenuOpen(false)} className="btn-primary w-full py-2.5 text-center text-sm">
                    ← Back to Home
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}
