import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function EmployeeLeaveRequests() {
  const { leaveRequests, submitLeaveRequest } = useAppData();
  const { user } = useAuth();
  const myLeaves = leaveRequests.filter((l) => l.employeeName === user?.name);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'vacation' as const, startDate: '', endDate: '', reason: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLeaveRequest({
      employeeId: user?.id || 'E001',
      employeeName: user?.name || 'Employee',
      ...form,
    });
    setForm({ type: 'vacation', startDate: '', endDate: '', reason: '' });
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Leave Requests"
        description="Submit and track your leave requests"
        actions={<button onClick={() => setShowForm(!showForm)} className="btn-primary">{showForm ? 'Cancel' : 'New Leave Request'}</button>}
      />

      {success && <div className="alert-success mb-4">Leave request submitted successfully!</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 max-w-2xl space-y-4">
          <div><label className="label">Leave Type</label>
            <select className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as typeof form.type })}>
              <option value="vacation">Vacation</option><option value="sick">Sick Leave</option><option value="personal">Personal</option><option value="emergency">Emergency</option>
            </select>
          </div>
          <div className="form-grid-2">
            <div><label className="label">Start Date</label><input type="date" className="input-field" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required /></div>
            <div><label className="label">End Date</label><input type="date" className="input-field" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required /></div>
          </div>
          <div><label className="label">Reason</label><textarea className="input-field" rows={3} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} required /></div>
          <button type="submit" className="btn-primary">Submit Request</button>
        </form>
      )}

      <div className="space-y-3">
        {myLeaves.map((leave) => (
          <div key={leave.id} className="card row-stack">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold capitalize">{leave.type} Leave</h3>
              <p className="text-sm text-ink-500">{leave.startDate} to {leave.endDate}</p>
              <p className="mt-1 text-sm text-ink-600">{leave.reason}</p>
            </div>
            <span className={statusBadge(leave.status)}>{capitalize(leave.status)}</span>
          </div>
        ))}
        {myLeaves.length === 0 && <p className="text-sm text-ink-500">No leave requests yet.</p>}
      </div>
    </div>
  );
}
