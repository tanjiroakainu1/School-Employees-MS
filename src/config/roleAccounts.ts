import type { RoleAccount, UserRole } from '@/types';

export const DEMO_PASSWORD = 'password123';

export const roleAccounts: RoleAccount[] = [
  {
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@school.edu',
      role: 'super-admin',
      department: 'Administration',
      position: 'System Administrator',
    },
    password: DEMO_PASSWORD,
    description: 'Full system access, users, settings, reports & backup',
    color: 'from-green-600 to-emerald-700',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-700',
    icon: 'shield',
  },
  {
    user: {
      id: '2',
      name: 'Sarah Johnson',
      email: 'hr@school.edu',
      role: 'hr-officer',
      department: 'Human Resources',
      position: 'HR Officer',
    },
    password: DEMO_PASSWORD,
    description: 'Register employees, hiring, leave approval & HR reports',
    color: 'from-lime-500 to-green-600',
    gradient: 'bg-gradient-to-br from-lime-500 to-green-600',
    icon: 'users',
  },
  {
    user: {
      id: '3',
      name: 'Michael Chen',
      email: 'depthead@school.edu',
      role: 'department-head',
      department: 'Science',
      position: 'Department Head',
    },
    password: DEMO_PASSWORD,
    description: 'Team oversight, tasks, leave recommendations & reports',
    color: 'from-emerald-400 to-teal-500',
    gradient: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    icon: 'building',
  },
  {
    user: {
      id: '4',
      name: 'Emily Davis',
      email: 'employee@school.edu',
      role: 'employee',
      department: 'Science',
      position: 'Teacher',
    },
    password: DEMO_PASSWORD,
    description: 'Profile, schedule, leave requests, documents & announcements',
    color: 'from-primary-400 to-accent-500',
    gradient: 'bg-gradient-to-br from-primary-400 to-accent-500',
    icon: 'user',
  },
];

export const roleOptions: { value: UserRole; label: string; description: string }[] = [
  { value: 'super-admin', label: 'Super Admin', description: 'Full system administration' },
  { value: 'hr-officer', label: 'HR Officer', description: 'Human resources management' },
  { value: 'department-head', label: 'Department Head', description: 'Department oversight' },
  { value: 'employee', label: 'Employee', description: 'Personal employee portal' },
];

export function getAccountByEmail(email: string) {
  return roleAccounts.find((a) => a.user.email === email);
}

export function getAccountByRole(role: UserRole) {
  return roleAccounts.find((a) => a.user.role === role);
}
