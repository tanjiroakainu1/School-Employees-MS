import { roleAccounts } from '@/config/roleAccounts';
import { roleConfigs } from '@/config/roleConfig';
import { DEMO_PASSWORD } from '@/config/roleAccounts';
import { publicIcons } from '@/config/publicIcons';

interface QuickAccessSectionProps {
  loadingRole: string | null;
  onQuickAccess: (email: string) => void;
}

export default function QuickAccessSection({ loadingRole, onQuickAccess }: QuickAccessSectionProps) {
  return (
    <section id="demo" className="mt-10 scroll-mt-24 border-t border-primary-100 pt-10 sm:mt-12 sm:pt-12">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink-900 sm:text-xl">Quick Access — All Roles</h2>
          <p className="mt-1 text-sm text-ink-500">One-click login to any role dashboard with pre-loaded data</p>
        </div>
        <span className="badge-info w-fit shrink-0">Demo password: {DEMO_PASSWORD}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {roleAccounts.map((account) => (
          <button
            key={account.user.email}
            type="button"
            onClick={() => onQuickAccess(account.user.email)}
            disabled={loadingRole === account.user.email}
            className="quick-access-card group"
          >
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5 ${account.gradient}`} />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md ${account.gradient}`}>
                  {publicIcons[account.icon as keyof typeof publicIcons]}
                </div>
                <span className="badge-info text-[10px] sm:text-xs">
                  {roleConfigs[account.user.role].label}
                </span>
              </div>

              <div className="mt-3 min-w-0 flex-1">
                <h3 className="font-bold text-ink-900">{account.user.name}</h3>
                <p className="mt-0.5 truncate text-xs text-ink-500">{account.user.email}</p>
                <div className="mt-2 space-y-0.5 text-xs text-ink-600">
                  {account.user.department && (
                    <p><span className="font-medium text-ink-700">Dept:</span> {account.user.department}</p>
                  )}
                  {account.user.position && (
                    <p><span className="font-medium text-ink-700">Position:</span> {account.user.position}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 border-t border-primary-100 pt-3 text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                {loadingRole === account.user.email ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Go to Dashboard</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
