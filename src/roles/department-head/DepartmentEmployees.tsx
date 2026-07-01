import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function DepartmentEmployees() {
  const { employees } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);

  return (
    <div className="page-shell">
      <PageHeader title="Department Employees" description={`View all employees in ${dept} department`} />

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Email</th><th>Position</th><th>Phone</th><th>Status</th><th>Hire Date</th></tr></thead>
          <tbody>
            {deptEmployees.map((e) => (
              <tr key={e.id}>
                <td className="font-medium">{e.name}</td>
                <td>{e.email}</td>
                <td>{e.position}</td>
                <td>{e.phone}</td>
                <td><span className={statusBadge(e.status)}>{capitalize(e.status)}</span></td>
                <td>{e.hireDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
