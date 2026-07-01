import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function DeptAttendanceMonitoring() {
  const { attendance, employees } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);
  const deptAttendance = attendance.filter((a) => deptEmployees.some((e) => e.name === a.employeeName));

  return (
    <div className="page-shell">
      <PageHeader title="Attendance Monitoring" description="Monitor department employee attendance" />

      <div className="mb-6 mini-stat-grid">
        {(['present', 'late', 'absent', 'half-day'] as const).map((status) => (
          <div key={status} className="card text-center">
            <p className="text-2xl font-bold">{deptAttendance.filter(a => a.status === status).length}</p>
            <p className="text-sm text-ink-500 capitalize">{status.replace('-', ' ')}</p>
          </div>
        ))}
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Employee</th><th>Date</th><th>Time In</th><th>Time Out</th><th>Status</th></tr></thead>
          <tbody>
            {deptAttendance.map((a) => (
              <tr key={a.id}>
                <td className="font-medium">{a.employeeName}</td>
                <td>{a.date}</td>
                <td>{a.timeIn}</td>
                <td>{a.timeOut}</td>
                <td><span className={statusBadge(a.status)}>{capitalize(a.status)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
