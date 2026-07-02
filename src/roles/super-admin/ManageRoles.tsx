import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';

const defaultRoles = [
  { id: '1', name: 'Super Admin', permissions: ['Full system access', 'Manage users and roles', 'Departments & employees', 'Analytics & reports'] },
  { id: '2', name: 'HR Officer', permissions: ['Manage employees', 'Process hiring', 'Approve leave', 'HR reports'] },
  { id: '3', name: 'Department Head', permissions: ['View department employees', 'Approve leave', 'Assign tasks', 'Department reports'] },
  { id: '4', name: 'Employee', permissions: ['View profile', 'Submit leave', 'View attendance', 'View performance'] },
];

export default function ManageRoles() {
  const [roles] = useState(defaultRoles);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="page-shell">
      <PageHeader title="Manage Roles" description="Configure role-based access control" />

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`card cursor-pointer transition hover:shadow-md ${selectedRole === role.id ? 'ring-2 ring-primary-500' : ''}`}
            onClick={() => setSelectedRole(role.id)}
          >
            <h3 className="text-lg font-semibold text-ink-900">{role.name}</h3>
            <ul className="mt-3 space-y-1">
              {role.permissions.map((perm) => (
                <li key={perm} className="flex items-center gap-2 text-sm text-ink-600">
                  <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {perm}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
