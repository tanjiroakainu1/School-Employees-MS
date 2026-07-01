import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

export default function DeptPerformanceEvaluation() {
  const { performance, employees, addPerformanceEvaluation } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);
  const deptPerformance = performance.filter((p) => deptEmployees.some((e) => e.name === p.employeeName));

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ employeeId: '', period: 'Q3 2026', score: 80, comments: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === form.employeeId);
    if (!emp) return;
    addPerformanceEvaluation({
      employeeId: emp.id,
      employeeName: emp.name,
      evaluator: user?.name || 'Department Head',
      period: form.period,
      score: form.score,
      comments: form.comments,
      date: new Date().toISOString().split('T')[0],
    });
    setShowModal(false);
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Performance Evaluation"
        description="Evaluate department employee performance"
        actions={<button onClick={() => setShowModal(true)} className="btn-primary">New Evaluation</button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {deptPerformance.map((eval_) => (
          <div key={eval_.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{eval_.employeeName}</h3>
                <p className="text-sm text-ink-500">{eval_.period}</p>
              </div>
              <span className="text-2xl font-bold text-primary-600">{eval_.score}</span>
            </div>
            <p className="mt-3 text-sm text-ink-600">{eval_.comments}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Evaluate Employee">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label">Employee</label>
            <select className="input-field" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} required>
              <option value="">Select</option>
              {deptEmployees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div><label className="label">Period</label><input className="input-field" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} required /></div>
          <div><label className="label">Score</label><input type="number" min={0} max={100} className="input-field" value={form.score} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })} required /></div>
          <div><label className="label">Comments</label><textarea className="input-field" rows={3} value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} required /></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Submit</button></div>
        </form>
      </Modal>
    </div>
  );
}
