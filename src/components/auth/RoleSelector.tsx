import { roleOptions } from '@/config/roleAccounts';
import type { UserRole } from '@/types';

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  label?: string;
}

export default function RoleSelector({ value, onChange, label = 'Select Role' }: RoleSelectorProps) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
        {roleOptions.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => onChange(r.value)}
            className={`rounded-xl border p-3 text-left text-sm transition-all ${
              value === r.value
                ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20'
                : 'border-ink-200 hover:border-primary-200 hover:bg-mint-50'
            }`}
          >
            <p className="font-semibold text-ink-900">{r.label}</p>
            <p className="mt-0.5 text-xs text-ink-500">{r.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
