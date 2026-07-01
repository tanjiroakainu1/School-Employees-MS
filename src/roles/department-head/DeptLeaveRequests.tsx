import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function DeptLeaveRequests() {
  const { leaveRequests, updateLeaveStatus, employees } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);
  const deptLeaves = leaveRequests.filter((l) => deptEmployees.some((e) => e.name === l.employeeName));

  return (
    <div className="page-shell">
      <PageHeader title="Leave Requests" description="Approve or recommend leave requests for your department" />

      <div className="space-y-4">
        {deptLeaves.map((leave) => (
          <div key={leave.id} className="card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">{leave.employeeName}</h3>
                <p className="text-sm text-ink-500">{capitalize(leave.type)} leave · {leave.startDate} to {leave.endDate}</p>
                <p className="mt-1 text-sm text-ink-600">{leave.reason}</p>
              </div>
              <div className="wrap-actions sm:shrink-0">
                <span className={statusBadge(leave.status)}>{capitalize(leave.status)}</span>
                {leave.status === 'pending' && (
                  <>
                    <button onClick={() => updateLeaveStatus(leave.id, 'approved')} className="btn-primary text-xs sm:text-sm">Recommend Approve</button>
                    <button onClick={() => updateLeaveStatus(leave.id, 'rejected')} className="btn-danger text-xs sm:text-sm">Reject</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {deptLeaves.length === 0 && <p className="text-sm text-ink-500">No leave requests from your department.</p>}
      </div>
    </div>
  );
}
