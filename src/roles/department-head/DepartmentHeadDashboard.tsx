import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

const ArrowIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function DepartmentHeadDashboard() {
  const { employees, attendance, leaveRequests, tasks } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';

  const deptEmployees = employees.filter((e) => e.department === dept);
  const deptLeaves = leaveRequests.filter((l) => deptEmployees.some((e) => e.name === l.employeeName));
  const deptTasks = tasks.filter((t) => deptEmployees.some((e) => e.name === t.assignedTo));

  return (
    <div className="page-shell">
      <PageHeader badge="Department Head" title={`${dept} Dashboard`} description="Department oversight, team management, and analytics" />

      <div className="stat-grid">
        <StatCard title="Department Employees" value={deptEmployees.length} color="blue"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
        <StatCard title="Pending Leaves" value={deptLeaves.filter(l => l.status === 'pending').length} color="yellow"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
        <StatCard title="Active Tasks" value={deptTasks.filter(t => t.status !== 'completed').length} color="green"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
        <StatCard title="Present Today" value={attendance.filter(a => deptEmployees.some(e => e.name === a.employeeName) && a.status === 'present').length} color="purple"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
      </div>

      <div className="content-grid">
        <div className="card">
          <h2 className="panel-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
            {[
              { label: 'View Employees', path: '/department-head/employees' },
              { label: 'Assign Tasks', path: '/department-head/tasks' },
              { label: 'Review Leave', path: '/department-head/leave' },
              { label: 'Department Reports', path: '/department-head/reports' },
            ].map((a) => (
              <Link key={a.path} to={a.path} className="quick-action">{a.label} <ArrowIcon /></Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="panel-title mb-4">Department Team</h2>
          <div className="space-y-2">
            {deptEmployees.map((emp) => (
              <div key={emp.id} className="row-stack rounded-xl bg-gradient-to-r from-mint-50 to-primary-50/20 p-3 ring-1 ring-primary-100">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900">{emp.name}</p>
                  <p className="text-xs text-ink-500">{emp.position}</p>
                </div>
                <span className={emp.status === 'active' ? 'badge-success' : 'badge-warning'}>{emp.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
