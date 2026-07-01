import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function EmployeeAttendance() {
  const { attendance } = useAppData();
  const { user } = useAuth();
  const myAttendance = attendance.filter((a) => a.employeeName === user?.name);

  const stats = {
    present: myAttendance.filter(a => a.status === 'present').length,
    late: myAttendance.filter(a => a.status === 'late').length,
    absent: myAttendance.filter(a => a.status === 'absent').length,
  };

  return (
    <div className="page-shell">
      <PageHeader title="Attendance Records" description="View your attendance history" />

      <div className="mb-6 mini-stat-grid-3">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="card text-center">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-ink-500 capitalize">{key}</p>
          </div>
        ))}
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Date</th><th>Time In</th><th>Time Out</th><th>Status</th></tr></thead>
          <tbody>
            {myAttendance.length > 0 ? myAttendance.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td>{a.timeIn}</td>
                <td>{a.timeOut}</td>
                <td><span className={statusBadge(a.status)}>{capitalize(a.status)}</span></td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="text-center text-ink-500">No attendance records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
