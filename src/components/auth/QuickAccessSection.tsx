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
    <section id="demo" className="mb-8 scroll-mt-24 animate-slide-up">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink-900 sm:text-xl">Quick Access — All Roles</h2>
          <p className="text-sm text-ink-500">One-click login to any role dashboard with pre-loaded data</p>
        </div>
        <span className="badge-info mt-1 w-fit sm:mt-0">Demo password: {DEMO_PASSWORD}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {roleAccounts.map((account) => (
          <button
            key={account.user.email}
            type="button"
            onClick={() => onQuickAccess(account.user.email)}
            disabled={loadingRole === account.user.email}
            className="group relative min-h-[7.5rem] overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-4 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-glow active:scale-[0.98] sm:min-h-0 sm:p-5"
          >
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5 ${account.gradient}`} />
            <div className="relative">
              <div className="flex items-start justify-between gap-2">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md ${account.gradient}`}>
                  {publicIcons[account.icon as keyof typeof publicIcons]}
                </div>
                <span className="badge-info text-[10px] sm:text-xs">
                  {roleConfigs[account.user.role].label}
                </span>
              </div>
              <h3 className="mt-3 font-bold text-ink-900">{account.user.name}</h3>
              <p className="mt-0.5 truncate text-xs text-ink-500">{account.user.email}</p>
              <div className="mt-2 space-y-0.5 text-xs text-ink-600">
                {account.user.department && (
                  <p><span className="font-medium text-ink-700">Dept:</span> {account.user.department}</p>
                )}
                {account.user.position && (
                  <p><span className="font-medium text-ink-700">Position:</span> {account.user.position}</p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:text-primary-700">
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
