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
            className={value === r.value ? 'role-option-active' : 'role-option-idle'}
          >
            <p className="font-semibold text-ink-900">{r.label}</p>
            <p className="mt-0.5 text-xs leading-snug text-ink-500">{r.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
