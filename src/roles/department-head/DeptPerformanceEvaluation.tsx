import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import type { PerformanceEvaluation } from '@/types';

export default function DeptPerformanceEvaluation() {
  const {
    performance,
    employees,
    addPerformanceEvaluation,
    updatePerformanceEvaluation,
    deletePerformanceEvaluation,
  } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);
  const deptPerformance = performance.filter((p) => deptEmployees.some((e) => e.name === p.employeeName));

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PerformanceEvaluation | null>(null);
  const [form, setForm] = useState({ employeeId: '', period: 'Q3 2026', score: 80, comments: '' });

  const openAdd = () => {
    setEditing(null);
    setForm({ employeeId: '', period: 'Q3 2026', score: 80, comments: '' });
    setShowModal(true);
  };

  const openEdit = (eval_: PerformanceEvaluation) => {
    const emp = employees.find((e) => e.name === eval_.employeeName);
    setEditing(eval_);
    setForm({
      employeeId: emp?.id || eval_.employeeId,
      period: eval_.period,
      score: eval_.score,
      comments: eval_.comments,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === form.employeeId);
    if (!emp) return;

    if (editing) {
      updatePerformanceEvaluation(editing.id, {
        employeeId: emp.id,
        employeeName: emp.name,
        period: form.period,
        score: form.score,
        comments: form.comments,
        date: editing.date,
        evaluator: user?.name || 'Department Head',
      });
    } else {
      addPerformanceEvaluation({
        employeeId: emp.id,
        employeeName: emp.name,
        evaluator: user?.name || 'Department Head',
        period: form.period,
        score: form.score,
        comments: form.comments,
        date: new Date().toISOString().split('T')[0],
      });
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleDelete = (eval_: PerformanceEvaluation) => {
    if (confirm(`Delete evaluation for ${eval_.employeeName}?`)) {
      deletePerformanceEvaluation(eval_.id);
    }
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Performance Evaluation"
        description="Add, edit, and delete department employee evaluations"
        actions={<button type="button" onClick={openAdd} className="btn-primary">New Evaluation</button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {deptPerformance.map((eval_) => (
          <div key={eval_.id} className="card">
            <div className="row-stack">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-ink-900">{eval_.employeeName}</h3>
                <p className="text-sm text-ink-500">{eval_.period}</p>
              </div>
              <span className="text-2xl font-bold text-primary-600">{eval_.score}</span>
            </div>
            <p className="mt-3 text-sm text-ink-600">{eval_.comments}</p>
            <div className="crud-actions mt-4 border-t border-primary-100 pt-3">
              <button type="button" onClick={() => openEdit(eval_)} className="table-action-primary">Edit</button>
              <button type="button" onClick={() => handleDelete(eval_)} className="table-action-danger">Delete</button>
            </div>
          </div>
        ))}
        {deptPerformance.length === 0 && (
          <p className="text-sm text-ink-500 md:col-span-2">No evaluations yet. Add the first evaluation.</p>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Evaluation' : 'New Evaluation'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Employee</label>
            <select className="input-field" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} required>
              <option value="">Select</option>
              {deptEmployees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div><label className="label">Period</label><input className="input-field" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} required /></div>
          <div><label className="label">Score</label><input type="number" min={0} max={100} className="input-field" value={form.score} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })} required /></div>
          <div><label className="label">Comments</label><textarea className="input-field" rows={3} value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} required /></div>
          <div className="action-row">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
            <button type="submit" className="btn-primary w-full sm:w-auto">{editing ? 'Save Changes' : 'Submit Evaluation'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
