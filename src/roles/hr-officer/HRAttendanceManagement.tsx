import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function HRAttendanceManagement() {
  const { attendance, employees, recordAttendance } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    employeeId: '', employeeName: '', date: new Date().toISOString().split('T')[0],
    timeIn: '07:30', timeOut: '16:00', status: 'present' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === form.employeeId);
    recordAttendance({ ...form, employeeName: emp?.name || form.employeeName });
    setShowForm(false);
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Attendance Management"
        description="Record and manage employee attendance"
        actions={<button onClick={() => setShowForm(!showForm)} className="btn-primary">{showForm ? 'Cancel' : 'Record Attendance'}</button>}
      />

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="label">Employee</label>
            <select className="input-field" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} required>
              <option value="">Select employee</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div><label className="label">Date</label><input type="date" className="input-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></div>
          <div><label className="label">Status</label>
            <select className="input-field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as typeof form.status })}>
              <option value="present">Present</option><option value="late">Late</option><option value="absent">Absent</option><option value="half-day">Half Day</option>
            </select>
          </div>
          <div><label className="label">Time In</label><input type="time" className="input-field" value={form.timeIn} onChange={(e) => setForm({ ...form, timeIn: e.target.value })} /></div>
          <div><label className="label">Time Out</label><input type="time" className="input-field" value={form.timeOut} onChange={(e) => setForm({ ...form, timeOut: e.target.value })} /></div>
          <div className="flex items-end"><button type="submit" className="btn-primary w-full">Save Record</button></div>
        </form>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Employee</th><th>Date</th><th>Time In</th><th>Time Out</th><th>Status</th></tr></thead>
          <tbody>
            {attendance.map((a) => (
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
