import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

export default function EmployeeRecommendations() {
  const { employees } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);

  const [recommendations, setRecommendations] = useState<{ id: string; employee: string; type: string; note: string; date: string }[]>([]);
  const [form, setForm] = useState({ employee: '', type: 'promotion', note: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecommendations((prev) => [
      ...prev,
      { id: Date.now().toString(), ...form, date: new Date().toISOString().split('T')[0] },
    ]);
    setForm({ employee: '', type: 'promotion', note: '' });
  };

  return (
    <div className="page-shell">
      <PageHeader title="Employee Recommendations" description="Submit recommendations for department employees" />

      <form onSubmit={handleSubmit} className="card mb-6 max-w-2xl space-y-4">
        <div><label className="label">Employee</label>
          <select className="input-field" value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} required>
            <option value="">Select employee</option>
            {deptEmployees.map((e) => <option key={e.id} value={e.name}>{e.name}</option>)}
          </select>
        </div>
        <div><label className="label">Recommendation Type</label>
          <select className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="promotion">Promotion</option>
            <option value="training">Training</option>
            <option value="recognition">Recognition</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
        <div><label className="label">Notes</label><textarea className="input-field" rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} required /></div>
        <button type="submit" className="btn-primary">Submit Recommendation</button>
      </form>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{rec.employee}</h3>
                <p className="text-sm text-ink-500 capitalize">{rec.type} · {rec.date}</p>
              </div>
              <span className="badge-info">Submitted</span>
            </div>
            <p className="mt-2 text-sm text-ink-600">{rec.note}</p>
          </div>
        ))}
        {recommendations.length === 0 && <p className="text-sm text-ink-500">No recommendations submitted yet.</p>}
      </div>
    </div>
  );
}
