import { roleAccounts, DEMO_PASSWORD } from '@/config/roleAccounts';
import { publicIcons } from '@/config/publicIcons';
import type { UserRole } from '@/types';

interface DemoCredentialsPanelProps {
  onFillCredentials: (email: string, role: UserRole) => void;
}

export default function DemoCredentialsPanel({ onFillCredentials }: DemoCredentialsPanelProps) {
  return (
    <div className="auth-side-card flex flex-col">
      <div>
        <h3 className="text-lg font-bold text-ink-900">Demo Account Credentials</h3>
        <p className="mt-1 text-sm text-ink-500">Click any account to auto-fill the login form.</p>
      </div>

      <div className="mt-4 space-y-2">
        {roleAccounts.map((account) => (
          <button
            key={account.user.email}
            type="button"
            onClick={() => onFillCredentials(account.user.email, account.user.role)}
            className="flex w-full items-center gap-3 rounded-xl border border-primary-100 bg-white p-3 text-left transition-all hover:border-primary-300 hover:bg-primary-50/60 active:scale-[0.99]"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${account.gradient}`}>
              {publicIcons[account.icon as keyof typeof publicIcons]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{account.user.name}</p>
              <p className="truncate text-xs text-ink-500">{account.user.email}</p>
            </div>
            <span className="demo-fill-btn">Fill</span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-mint-50 p-4 ring-1 ring-primary-100">
        <p className="text-xs font-semibold text-ink-700">All demo accounts use:</p>
        <p className="mt-1 font-mono text-sm font-bold text-primary-700">{DEMO_PASSWORD}</p>
      </div>
    </div>
  );
}
