import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function AllEmployees() {
  const { employees, deleteEmployee } = useAppData();

  return (
    <div className="page-shell">
      <PageHeader title="All Employee Records" description="View and manage all employee records system-wide" />

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td className="font-medium">{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td><span className={statusBadge(emp.status)}>{capitalize(emp.status)}</span></td>
                <td>{emp.hireDate}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp.id)} className="table-action-danger">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
