import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import { useAppData } from '@/context/AppDataContext';

const ArrowIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function SuperAdminDashboard() {
  const { employees, departments, leaveRequests, auditLogs } = useAppData();

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'pending').length;
  const activeEmployees = employees.filter((e) => e.status === 'active').length;

  return (
    <div className="page-shell">
      <PageHeader
        badge="Super Admin"
        title="Dashboard Overview"
        description="System-wide administration, analytics, and control center"
      />

      <div className="stat-grid">
        <StatCard title="Total Employees" value={employees.length} color="blue"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
        <StatCard title="Active Employees" value={activeEmployees} color="green"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Departments" value={departments.length} color="purple"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
        <StatCard title="Pending Leaves" value={pendingLeaves} color="yellow"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
      </div>

      <div className="content-grid">
        <div className="card">
          <h2 className="panel-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
            {[
              { label: 'Manage Users', path: '/super-admin/users' },
              { label: 'System Settings', path: '/super-admin/settings' },
              { label: 'View Reports', path: '/super-admin/reports' },
              { label: 'Backup Data', path: '/super-admin/backup' },
            ].map((action) => (
              <Link key={action.path} to={action.path} className="quick-action">
                {action.label} <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="panel-title mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-mint-50 to-primary-50/20 p-3 ring-1 ring-primary-100">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{log.action}</p>
                  <p className="text-xs text-ink-500">{log.user} · {log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
