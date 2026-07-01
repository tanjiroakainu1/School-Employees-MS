import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';

export default function HRReports() {
  const { employees, attendance, leaveRequests, performance } = useAppData();

  const reports = [
    { title: 'Employee Directory', count: employees.length, description: 'Complete list of all employees' },
    { title: 'Attendance Summary', count: attendance.length, description: 'Daily attendance records' },
    { title: 'Leave Report', count: leaveRequests.length, description: 'All leave requests and statuses' },
    { title: 'Performance Report', count: performance.length, description: 'Employee evaluation records' },
  ];

  return (
    <div className="page-shell">
      <PageHeader title="HR Reports" description="Generate HR and employee reports" />

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <div key={r.title} className="card">
            <h3 className="text-lg font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-ink-500">{r.description}</p>
            <p className="mt-3 text-2xl font-bold text-primary-600">{r.count} records</p>
            <button onClick={() => alert(`Generating ${r.title}...`)} className="btn-secondary mt-4 text-xs">Generate Report</button>
          </div>
        ))}
      </div>
    </div>
  );
}
