import PageHeader from '@/components/shared/PageHeader';
import PortalCharts from '@/components/charts/PortalCharts';
import { useAppData } from '@/context/AppDataContext';

export default function HRReports() {
  const { employees, attendance, leaveRequests, performance, departments } = useAppData();

  const reports = [
    { title: 'Employee Directory', count: employees.length, description: 'Complete list of all employees' },
    { title: 'Attendance Summary', count: attendance.length, description: 'Daily attendance records' },
    { title: 'Leave Report', count: leaveRequests.length, description: 'All leave requests and statuses' },
    { title: 'Performance Report', count: performance.length, description: 'Employee evaluation records' },
  ];

  return (
    <div className="page-shell">
      <PageHeader
        badge="HR Analytics"
        title="HR Reports"
        description="Interactive charts, workforce analytics, and exportable HR reports"
      />

      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="chart-section-title">HR Executive Analytics</h2>
          <p className="chart-section-lead">Live charts powered by SEMS workforce data</p>
        </div>
        <PortalCharts
          variant="hr-reports"
          employees={employees}
          departments={departments}
          leaveRequests={leaveRequests}
          attendance={attendance}
          performance={performance}
        />
      </section>

      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="chart-section-title">Export Reports</h2>
          <p className="chart-section-lead">Download HR summary snapshots</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map((r) => (
            <div key={r.title} className="card-hover flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-ink-900">{r.title}</h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-extrabold text-white shadow-glow-sm">
                  {r.count}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm text-ink-600">{r.description}</p>
              <button onClick={() => alert(`Generating ${r.title}...`)} className="btn-secondary mt-4 w-full text-sm">
                Generate Report
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
