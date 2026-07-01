import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';

export default function SystemReports() {
  const { employees, attendance, leaveRequests, departments } = useAppData();

  const reports = [
    { title: 'Employee Summary', data: `${employees.length} total, ${employees.filter(e => e.status === 'active').length} active` },
    { title: 'Attendance Today', data: `${attendance.filter(a => a.status === 'present').length} present, ${attendance.filter(a => a.status === 'late').length} late, ${attendance.filter(a => a.status === 'absent').length} absent` },
    { title: 'Leave Requests', data: `${leaveRequests.filter(l => l.status === 'pending').length} pending, ${leaveRequests.filter(l => l.status === 'approved').length} approved` },
    { title: 'Department Overview', data: `${departments.length} departments, avg ${Math.round(employees.length / departments.length)} employees each` },
  ];

  const handleExport = (title: string) => {
    alert(`Exporting "${title}" report... (Demo)`);
  };

  return (
    <div className="page-shell">
      <PageHeader title="System Reports" description="Generate system-wide reports and analytics" />

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <div key={report.title} className="card">
            <h3 className="text-lg font-semibold text-ink-900">{report.title}</h3>
            <p className="mt-2 text-sm text-ink-600">{report.data}</p>
            <button onClick={() => handleExport(report.title)} className="btn-secondary mt-4 text-xs">
              Export Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
