import PageHeader from '@/components/shared/PageHeader';
import PortalCharts from '@/components/charts/PortalCharts';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

export default function DepartmentReports() {
  const { employees, attendance, performance, leaveRequests, departments } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);

  const stats = {
    totalEmployees: deptEmployees.length,
    activeEmployees: deptEmployees.filter((e) => e.status === 'active').length,
    attendanceRate: Math.round(
      (attendance.filter((a) => deptEmployees.some((e) => e.name === a.employeeName) && a.status === 'present').length /
        Math.max(deptEmployees.length, 1)) *
        100,
    ),
    avgPerformance: Math.round(
      performance
        .filter((p) => deptEmployees.some((e) => e.name === p.employeeName))
        .reduce((sum, p) => sum + p.score, 0) /
        Math.max(performance.filter((p) => deptEmployees.some((e) => e.name === p.employeeName)).length, 1),
    ),
  };

  const exportCards = ['Employee Summary', 'Attendance Report', 'Leave Report', 'Performance Report'];

  return (
    <div className="page-shell">
      <PageHeader
        badge="Dept Analytics"
        title="Department Reports"
        description={`Interactive charts and exports for ${dept} department`}
      />

      <div className="mini-stat-grid mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="card text-center">
            <p className="text-2xl font-bold text-primary-600">
              {value}
              {key === 'attendanceRate' || key === 'avgPerformance' ? '%' : ''}
            </p>
            <p className="text-sm capitalize text-ink-500">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="chart-section-title">Department Analytics Suite</h2>
          <p className="chart-section-lead">Live charts scoped to {dept} department</p>
        </div>
        <PortalCharts
          variant="dept-reports"
          employees={employees}
          departments={departments}
          leaveRequests={leaveRequests}
          attendance={attendance}
          performance={performance}
          departmentName={dept}
        />
      </section>

      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="chart-section-title">Export Reports</h2>
          <p className="chart-section-lead">Download department summary snapshots</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {exportCards.map((title) => (
            <div key={title} className="card-hover flex flex-col">
              <h3 className="font-bold text-ink-900">{title}</h3>
              <p className="mt-1 flex-1 text-sm text-ink-500">{dept} department</p>
              <button onClick={() => alert(`Generating ${title}...`)} className="btn-secondary mt-4 w-full text-sm">
                Export
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
