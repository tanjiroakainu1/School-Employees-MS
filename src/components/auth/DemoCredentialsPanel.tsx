import { roleAccounts, DEMO_PASSWORD } from '@/config/roleAccounts';
import { publicIcons } from '@/config/publicIcons';
import type { UserRole } from '@/types';

interface DemoCredentialsPanelProps {
  onFillCredentials: (email: string, role: UserRole) => void;
}

export default function DemoCredentialsPanel({ onFillCredentials }: DemoCredentialsPanelProps) {
  return (
    <div className="card lg:sticky lg:top-20 lg:space-y-4 space-y-4">
      <h3 className="font-bold text-ink-900">Demo Account Credentials</h3>
      <p className="text-sm text-ink-500">Click any account to auto-fill the login form.</p>

      <div className="space-y-2">
        {roleAccounts.map((account) => (
          <button
            key={account.user.email}
            type="button"
            onClick={() => onFillCredentials(account.user.email, account.user.role)}
            className="flex w-full items-center gap-3 rounded-xl border border-ink-100 p-3 text-left transition-all hover:border-primary-200 hover:bg-primary-50/50 active:scale-[0.99]"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${account.gradient}`}>
              {publicIcons[account.icon as keyof typeof publicIcons]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{account.user.name}</p>
              <p className="truncate text-xs text-ink-500">{account.user.email}</p>
            </div>
            <span className="shrink-0 text-[10px] font-medium text-primary-600">Fill</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-mint-50 p-4 text-xs text-ink-600">
        <p className="font-semibold text-ink-700">All demo accounts use:</p>
        <p className="mt-1 font-mono text-primary-700">{DEMO_PASSWORD}</p>
      </div>
    </div>
  );
}
