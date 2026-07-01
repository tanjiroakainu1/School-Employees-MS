import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import { useAppData } from '@/context/AppDataContext';

const ArrowIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function HROfficerDashboard() {
  const { employees, leaveRequests, attendance, departments } = useAppData();

  return (
    <div className="page-shell">
      <PageHeader badge="HR Officer" title="HR Dashboard" description="Human resources management overview and workflows" />

      <div className="stat-grid">
        <StatCard title="Total Employees" value={employees.length} color="blue"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} />
        <StatCard title="Pending Leaves" value={leaveRequests.filter(l => l.status === 'pending').length} color="yellow"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
        <StatCard title="Present Today" value={attendance.filter(a => a.status === 'present').length} color="green"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Departments" value={departments.length} color="purple"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>} />
      </div>

      <div className="content-grid">
        <div className="card">
          <h2 className="panel-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
            {[
              { label: 'Register Employee', path: '/hr-officer/register' },
              { label: 'Approve Leave', path: '/hr-officer/leave' },
              { label: 'Record Attendance', path: '/hr-officer/attendance' },
              { label: 'HR Reports', path: '/hr-officer/reports' },
            ].map((a) => (
              <Link key={a.path} to={a.path} className="quick-action">{a.label} <ArrowIcon /></Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="panel-title mb-4">Pending Leave Requests</h2>
          <div className="space-y-2">
            {leaveRequests.filter(l => l.status === 'pending').map((leave) => (
              <div key={leave.id} className="row-stack rounded-xl bg-gradient-to-r from-mint-50 to-amber-50/30 p-3 ring-1 ring-primary-100">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900">{leave.employeeName}</p>
                  <p className="text-xs text-ink-500">{leave.type} · {leave.startDate} to {leave.endDate}</p>
                </div>
                <span className="badge-warning">Pending</span>
              </div>
            ))}
            {leaveRequests.filter(l => l.status === 'pending').length === 0 && (
              <p className="text-sm text-ink-500">No pending leave requests</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
