import { Link } from 'react-router-dom';
import DeveloperCredit from '@/components/shared/DeveloperCredit';

export default function PublicFooter() {
  return (
    <footer className="border-t border-primary-100/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="logo-badge h-9 w-9">
                SE
              </div>
              <span className="font-extrabold text-ink-900">School Employees MS</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              A complete platform for managing school personnel, attendance, leave, and performance — powered by SAGE AI.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink-900">Platform</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-ink-500">
              <li><a href="/#flow" className="transition hover:text-primary-600">How It Works</a></li>
              <li><a href="/#roles" className="transition hover:text-primary-600">User Roles</a></li>
              <li><a href="/#features" className="transition hover:text-primary-600">Features</a></li>
              <li><a href="/#developer" className="transition hover:text-primary-600">Developer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink-900">Access</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-ink-500">
              <li><Link to="/login" className="transition hover:text-primary-600">Sign In</Link></li>
              <li><Link to="/register" className="transition hover:text-primary-600">Create Account</Link></li>
              <li><Link to="/login#demo" className="transition hover:text-primary-600">Demo Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink-900">Roles</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-ink-500">
              <li>Super Admin</li>
              <li>HR Officer</li>
              <li>Department Head</li>
              <li>Employee</li>
            </ul>
          </div>
        </div>

        <DeveloperCredit variant="footer" />

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-ink-100 pt-6 text-xs text-ink-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} School Employees Management System</p>
          <p className="font-medium">
            React · TypeScript · Tailwind CSS · by{' '}
            <span className="font-bold text-primary-600">Raminder Jangao</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
