import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleDashboardPath } from '@/config/roleConfig';
import AuthPageHeader from '@/components/auth/AuthPageHeader';
import RoleSelector from '@/components/auth/RoleSelector';
import DeveloperCredit from '@/components/shared/DeveloperCredit';
import type { UserRole } from '@/types';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee' as UserRole,
    department: '',
    position: '',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const result = register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      department: form.department || undefined,
      position: form.position || undefined,
    });
    if (result.success) {
      navigate(getRoleDashboardPath(form.role));
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="animate-fade-in bg-mint-50">
      <AuthPageHeader
        tag="Register"
        title="Create Your Account"
        description="Register with your school email and get routed to your role dashboard instantly."
      />

      <div className="auth-page max-w-3xl">
        <div className="auth-form-card">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink-900 sm:text-xl">Account details</h2>
              <p className="mt-1 text-sm text-ink-500">
                Fill in your information to join the School Employees Management System
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label">Full Name</label>
                <input
                  className="input-field"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@school.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Department</label>
                <input
                  className="input-field"
                  placeholder="e.g. Science"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Position</label>
                <input
                  className="input-field"
                  placeholder="e.g. Teacher"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                />
              </div>
            </div>

            <RoleSelector
              value={form.role}
              onChange={(role) => setForm({ ...form, role })}
              label="Register As"
            />

            {error && <div className="auth-error">{error}</div>}

            <div className="space-y-4 pt-1">
            <button type="submit" className="btn-primary w-full py-3">
              Create Account & Continue
            </button>

            <p className="text-center text-sm text-ink-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                Sign in here
              </Link>
            </p>

            <p className="text-center text-xs text-ink-400">
              Want to explore first?{' '}
              <Link to="/login#demo" className="font-medium text-primary-600 hover:text-primary-700">
                Try demo quick access
              </Link>
            </p>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <DeveloperCredit variant="compact" />
        </div>
      </div>
    </div>
  );
}
