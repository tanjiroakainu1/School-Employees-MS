import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

export default function DepartmentReports() {
  const { employees, attendance, performance } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);

  const stats = {
    totalEmployees: deptEmployees.length,
    activeEmployees: deptEmployees.filter(e => e.status === 'active').length,
    attendanceRate: Math.round((attendance.filter(a => deptEmployees.some(e => e.name === a.employeeName) && a.status === 'present').length / Math.max(deptEmployees.length, 1)) * 100),
    avgPerformance: Math.round(performance.filter(p => deptEmployees.some(e => e.name === p.employeeName)).reduce((sum, p) => sum + p.score, 0) / Math.max(performance.filter(p => deptEmployees.some(e => e.name === p.employeeName)).length, 1)),
  };

  return (
    <div className="page-shell">
      <PageHeader title="Department Reports" description={`Analytics and reports for ${dept} department`} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="card text-center">
            <p className="text-2xl font-bold text-primary-600">{value}{key === 'attendanceRate' || key === 'avgPerformance' ? '%' : ''}</p>
            <p className="text-sm text-ink-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {['Employee Summary', 'Attendance Report', 'Leave Report', 'Performance Report'].map((title) => (
          <div key={title} className="card">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-ink-500">{dept} department</p>
            <button onClick={() => alert(`Generating ${title}...`)} className="btn-secondary mt-4 text-xs">Export</button>
          </div>
        ))}
      </div>
    </div>
  );
}
