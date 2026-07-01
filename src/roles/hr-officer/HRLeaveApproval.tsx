import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function HRLeaveApproval() {
  const { leaveRequests, updateLeaveStatus } = useAppData();

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    updateLeaveStatus(id, status);
  };

  return (
    <div className="page-shell">
      <PageHeader title="Leave Approval" description="Review and process employee leave requests" />

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave.id}>
                <td className="font-medium">{leave.employeeName}</td>
                <td>{capitalize(leave.type)}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td className="max-w-xs truncate">{leave.reason}</td>
                <td><span className={statusBadge(leave.status)}>{capitalize(leave.status)}</span></td>
                <td>
                  {leave.status === 'pending' && (
                    <div className="table-actions">
                      <button onClick={() => handleAction(leave.id, 'approved')} className="table-action-primary">Approve</button>
                      <button onClick={() => handleAction(leave.id, 'rejected')} className="table-action-danger">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
