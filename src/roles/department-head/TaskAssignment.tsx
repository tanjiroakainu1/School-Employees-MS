import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';

export default function TaskAssignment() {
  const { tasks, employees, assignTask, updateTaskStatus } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);
  const deptTasks = tasks.filter((t) => deptEmployees.some((e) => e.name === t.assignedTo));

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '', dueDate: '', priority: 'medium' as const });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    assignTask({ ...form, assignedBy: user?.name || 'Department Head' });
    setForm({ title: '', description: '', assignedTo: '', dueDate: '', priority: 'medium' });
    setShowModal(false);
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Assign Tasks"
        description="Assign and manage tasks for department employees"
        actions={<button onClick={() => setShowModal(true)} className="btn-primary">Assign New Task</button>}
      />

      <div className="space-y-4">
        {deptTasks.map((task) => (
          <div key={task.id} className="card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-ink-500">Assigned to: {task.assignedTo} · Due: {task.dueDate}</p>
                <p className="mt-1 text-sm text-ink-600">{task.description}</p>
              </div>
              <div className="wrap-actions sm:shrink-0">
                <span className={statusBadge(task.priority)}>{capitalize(task.priority)}</span>
                <span className={statusBadge(task.status)}>{capitalize(task.status)}</span>
                {task.status !== 'completed' && (
                  <select
                    className="input-field min-w-[8.5rem] text-sm"
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as typeof task.status)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Assign New Task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label">Task Title</label><input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
          <div><label className="label">Description</label><textarea className="input-field" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
          <div><label className="label">Assign To</label>
            <select className="input-field" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} required>
              <option value="">Select employee</option>
              {deptEmployees.map((e) => <option key={e.id} value={e.name}>{e.name}</option>)}
            </select>
          </div>
          <div className="form-grid-2">
            <div><label className="label">Due Date</label><input type="date" className="input-field" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required /></div>
            <div><label className="label">Priority</label>
              <select className="input-field" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as typeof form.priority })}>
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="action-row"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button><button type="submit" className="btn-primary w-full sm:w-auto">Assign Task</button></div>
        </form>
      </Modal>
    </div>
  );
}
