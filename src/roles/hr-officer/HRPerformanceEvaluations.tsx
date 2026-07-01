import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';

export default function HRPerformanceEvaluations() {
  const { performance, employees, addPerformanceEvaluation } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ employeeId: '', employeeName: '', evaluator: 'Sarah Johnson', period: 'Q3 2026', score: 80, comments: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === form.employeeId);
    addPerformanceEvaluation({
      ...form,
      employeeName: emp?.name || form.employeeName,
      date: new Date().toISOString().split('T')[0],
    });
    setShowModal(false);
    setForm({ employeeId: '', employeeName: '', evaluator: 'Sarah Johnson', period: 'Q3 2026', score: 80, comments: '' });
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Performance Evaluations"
        description="Conduct and manage employee performance evaluations"
        actions={<button onClick={() => setShowModal(true)} className="btn-primary">New Evaluation</button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {performance.map((eval_) => (
          <div key={eval_.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-ink-900">{eval_.employeeName}</h3>
                <p className="text-sm text-ink-500">{eval_.period} · Evaluator: {eval_.evaluator}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${eval_.score >= 90 ? 'bg-primary-100 text-primary-700' : eval_.score >= 75 ? 'bg-accent-100 text-accent-700' : 'bg-amber-100 text-amber-700'}`}>
                {eval_.score}
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-600">{eval_.comments}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Performance Evaluation">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Employee</label>
            <select className="input-field" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} required>
              <option value="">Select employee</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div><label className="label">Period</label><input className="input-field" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} required /></div>
          <div><label className="label">Score (0-100)</label><input type="number" min={0} max={100} className="input-field" value={form.score} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })} required /></div>
          <div><label className="label">Comments</label><textarea className="input-field" rows={3} value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} required /></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Submit</button></div>
        </form>
      </Modal>
    </div>
  );
}
