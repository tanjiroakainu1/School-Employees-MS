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

export default function EmployeeDashboard() {
  const { leaveRequests, attendance, performance, tasks, announcements } = useAppData();
  const { user } = useAuth();
  const name = user?.name || 'Employee';

  const myLeaves = leaveRequests.filter((l) => l.employeeName === name);
  const myAttendance = attendance.filter((a) => a.employeeName === name);
  const myPerformance = performance.filter((p) => p.employeeName === name);
  const myTasks = tasks.filter((t) => t.assignedTo === name);

  return (
    <div className="page-shell">
      <PageHeader
        badge="Employee Portal"
        title={`Welcome, ${name.split(' ')[0]}`}
        description={`${user?.department || 'School'} · ${user?.position || 'Employee'}`}
      />

      <div className="stat-grid">
        <StatCard title="Leave Requests" value={myLeaves.length} color="blue"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
        <StatCard title="Attendance Records" value={myAttendance.length} color="green"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Performance Score" value={myPerformance.length > 0 ? myPerformance[0].score : 'N/A'} color="purple"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>} />
        <StatCard title="Active Tasks" value={myTasks.filter(t => t.status !== 'completed').length} color="yellow"
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
      </div>

      <div className="content-grid">
        <div className="card">
          <h2 className="panel-title mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
            {[
              { label: 'My Profile', path: '/employee/profile' },
              { label: 'Submit Leave', path: '/employee/leave' },
              { label: 'View Attendance', path: '/employee/attendance' },
              { label: 'Announcements', path: '/employee/announcements' },
            ].map((a) => (
              <Link key={a.path} to={a.path} className="quick-action">{a.label} <ArrowIcon /></Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="panel-title mb-4">Latest Announcements</h2>
          <div className="space-y-2">
            {announcements.slice(0, 3).map((ann) => (
              <div key={ann.id} className="rounded-xl bg-gradient-to-r from-mint-50 to-primary-50/30 p-3 ring-1 ring-primary-100">
                <p className="text-sm font-semibold text-ink-900">{ann.title}</p>
                <p className="text-xs text-ink-500">{ann.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
