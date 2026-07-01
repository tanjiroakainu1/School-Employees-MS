import type { RoleConfig, UserRole } from '@/types';

export const roleConfigs: Record<UserRole, RoleConfig> = {
  'super-admin': {
    role: 'super-admin',
    label: 'Super Admin',
    basePath: '/super-admin',
    dashboardPath: '/super-admin/dashboard',
    navItems: [
      { label: 'Dashboard', path: '/super-admin/dashboard' },
      { label: 'Manage Users', path: '/super-admin/users' },
      { label: 'Manage Roles', path: '/super-admin/roles' },
      { label: 'System Settings', path: '/super-admin/settings' },
      { label: 'Departments', path: '/super-admin/departments' },
      { label: 'All Employees', path: '/super-admin/employees' },
      { label: 'Reports', path: '/super-admin/reports' },
      { label: 'Backup & Restore', path: '/super-admin/backup' },
    ],
  },
  'hr-officer': {
    role: 'hr-officer',
    label: 'HR Officer',
    basePath: '/hr-officer',
    dashboardPath: '/hr-officer/dashboard',
    navItems: [
      { label: 'Dashboard', path: '/hr-officer/dashboard' },
      { label: 'Register Employee', path: '/hr-officer/register' },
      { label: 'Departments', path: '/hr-officer/departments' },
      { label: 'Hiring & Onboarding', path: '/hr-officer/hiring' },
      { label: 'Leave Approval', path: '/hr-officer/leave' },
      { label: 'Attendance', path: '/hr-officer/attendance' },
      { label: 'Performance', path: '/hr-officer/performance' },
      { label: 'HR Reports', path: '/hr-officer/reports' },
    ],
  },
  'department-head': {
    role: 'department-head',
    label: 'Department Head',
    basePath: '/department-head',
    dashboardPath: '/department-head/dashboard',
    navItems: [
      { label: 'Dashboard', path: '/department-head/dashboard' },
      { label: 'Employees', path: '/department-head/employees' },
      { label: 'Attendance', path: '/department-head/attendance' },
      { label: 'Leave Requests', path: '/department-head/leave' },
      { label: 'Assign Tasks', path: '/department-head/tasks' },
      { label: 'Performance', path: '/department-head/performance' },
      { label: 'Reports', path: '/department-head/reports' },
      { label: 'Recommendations', path: '/department-head/recommendations' },
    ],
  },
  employee: {
    role: 'employee',
    label: 'Employee',
    basePath: '/employee',
    dashboardPath: '/employee/dashboard',
    navItems: [
      { label: 'Dashboard', path: '/employee/dashboard' },
      { label: 'My Profile', path: '/employee/profile' },
      { label: 'Work Schedule', path: '/employee/schedule' },
      { label: 'Attendance', path: '/employee/attendance' },
      { label: 'Leave Requests', path: '/employee/leave' },
      { label: 'Performance', path: '/employee/performance' },
      { label: 'Documents', path: '/employee/documents' },
      { label: 'Announcements', path: '/employee/announcements' },
    ],
  },
};

export function getRoleDashboardPath(role: UserRole): string {
  return roleConfigs[role].dashboardPath;
}
