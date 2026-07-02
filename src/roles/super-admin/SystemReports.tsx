import PageHeader from '@/components/shared/PageHeader';
import AdminAnalyticsCharts from '@/components/charts/AdminCharts';
import { useAppData } from '@/context/AppDataContext';

export default function SystemReports() {
  const { employees, attendance, leaveRequests, departments, performance } = useAppData();

  const reports = [
    {
      title: 'Employee Summary',
      data: `${employees.length} total · ${employees.filter((e) => e.status === 'active').length} active · ${employees.filter((e) => e.status === 'on-leave').length} on leave`,
      metric: employees.length,
    },
    {
      title: 'Attendance Today',
      data: `${attendance.filter((a) => a.status === 'present').length} present · ${attendance.filter((a) => a.status === 'late').length} late · ${attendance.filter((a) => a.status === 'absent').length} absent`,
      metric: attendance.length,
    },
    {
      title: 'Leave Requests',
      data: `${leaveRequests.filter((l) => l.status === 'pending').length} pending · ${leaveRequests.filter((l) => l.status === 'approved').length} approved`,
      metric: leaveRequests.length,
    },
    {
      title: 'Department Overview',
      data: `${departments.length} departments · avg ${Math.round(employees.length / Math.max(departments.length, 1))} employees each`,
      metric: departments.length,
    },
  ];

  const handleExport = (title: string) => {
    alert(`Exporting "${title}" report... (Demo)`);
  };

  return (
    <div className="page-shell">
      <PageHeader
        badge="Analytics"
        title="System Reports"
        description="Deep-dive charts, workforce analytics, and exportable reports"
      />

      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="chart-section-title">Executive Analytics Suite</h2>
          <p className="chart-section-lead">Interactive charts powered by live SEMS data</p>
        </div>
        <AdminAnalyticsCharts
          employees={employees}
          departments={departments}
          leaveRequests={leaveRequests}
          attendance={attendance}
          performance={performance}
          variant="reports"
        />
      </section>

      <section>
        <div className="mb-4 sm:mb-5">
          <h2 className="chart-section-title">Export Reports</h2>
          <p className="chart-section-lead">Download summary snapshots for leadership review</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map((report) => (
            <div key={report.title} className="card-hover flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-ink-900">{report.title}</h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-extrabold text-white shadow-glow-sm">
                  {report.metric}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{report.data}</p>
              <button
                onClick={() => handleExport(report.title)}
                className="btn-secondary mt-4 w-full text-sm"
              >
                Export Report
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
