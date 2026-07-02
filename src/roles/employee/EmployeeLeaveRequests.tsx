import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';
import type { LeaveRequest } from '@/types';

const emptyForm = {
  type: 'vacation' as LeaveRequest['type'],
  startDate: '',
  endDate: '',
  reason: '',
};

export default function EmployeeLeaveRequests() {
  const { leaveRequests, submitLeaveRequest, updateLeaveRequest, deleteLeaveRequest } = useAppData();
  const { user } = useAuth();
  const myLeaves = leaveRequests.filter((l) => l.employeeName === user?.name);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<LeaveRequest | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState('');

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (leave: LeaveRequest) => {
    setEditing(leave);
    setForm({
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateLeaveRequest(editing.id, form);
      setSuccess('Leave request updated successfully!');
    } else {
      submitLeaveRequest({
        employeeId: user?.id || 'E001',
        employeeName: user?.name || 'Employee',
        ...form,
      });
      setSuccess('Leave request submitted successfully!');
    }
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (leave: LeaveRequest) => {
    if (confirm(`Delete your ${leave.type} leave request (${leave.startDate} to ${leave.endDate})?`)) {
      deleteLeaveRequest(leave.id);
      setSuccess('Leave request deleted.');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Leave Requests"
        description="Add, edit, and delete your leave requests"
        actions={<button type="button" onClick={openAdd} className="btn-primary">New Leave Request</button>}
      />

      {success && <div className="alert-success mb-4">{success}</div>}

      <div className="space-y-3">
        {myLeaves.map((leave) => (
          <div key={leave.id} className="card">
            <div className="row-stack">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold capitalize text-ink-900">{leave.type} Leave</h3>
                <p className="text-sm text-ink-500">{leave.startDate} to {leave.endDate}</p>
                <p className="mt-1 text-sm text-ink-600">{leave.reason}</p>
                <p className="mt-1 text-xs text-ink-400">Submitted {leave.submittedAt}</p>
              </div>
              <span className={statusBadge(leave.status)}>{capitalize(leave.status)}</span>
            </div>
            {leave.status === 'pending' && (
              <div className="crud-actions mt-4 border-t border-primary-100 pt-3">
                <button type="button" onClick={() => openEdit(leave)} className="table-action-primary">Edit</button>
                <button type="button" onClick={() => handleDelete(leave)} className="table-action-danger">Delete</button>
              </div>
            )}
          </div>
        ))}
        {myLeaves.length === 0 && (
          <p className="text-sm text-ink-500">No leave requests yet. Click New Leave Request to submit one.</p>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Leave Request' : 'New Leave Request'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Leave Type</label>
            <select className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as LeaveRequest['type'] })}>
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div className="form-grid-2">
            <div><label className="label">Start Date</label><input type="date" className="input-field" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required /></div>
            <div><label className="label">End Date</label><input type="date" className="input-field" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required /></div>
          </div>
          <div><label className="label">Reason</label><textarea className="input-field" rows={3} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} required /></div>
          <div className="action-row">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
            <button type="submit" className="btn-primary w-full sm:w-auto">{editing ? 'Save Changes' : 'Submit Request'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
