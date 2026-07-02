import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

interface Recommendation {
  id: string;
  employee: string;
  type: string;
  note: string;
  date: string;
}

const emptyRec = { employee: '', type: 'promotion', note: '' };

export default function EmployeeRecommendations() {
  const { employees } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Recommendation | null>(null);
  const [form, setForm] = useState(emptyRec);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyRec);
    setShowModal(true);
  };

  const openEdit = (rec: Recommendation) => {
    setEditing(rec);
    setForm({ employee: rec.employee, type: rec.type, note: rec.note });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setRecommendations((prev) =>
        prev.map((r) =>
          r.id === editing.id ? { ...r, ...form } : r,
        ),
      );
    } else {
      setRecommendations((prev) => [
        ...prev,
        { id: Date.now().toString(), ...form, date: new Date().toISOString().split('T')[0] },
      ]);
    }
    setShowModal(false);
    setEditing(null);
    setForm(emptyRec);
  };

  const handleDelete = (rec: Recommendation) => {
    if (confirm(`Delete recommendation for ${rec.employee}?`)) {
      setRecommendations((prev) => prev.filter((r) => r.id !== rec.id));
    }
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Employee Recommendations"
        description="Add, edit, and delete recommendations for department employees"
        actions={<button type="button" onClick={openAdd} className="btn-primary">Add Recommendation</button>}
      />

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="card">
            <div className="row-stack">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-ink-900">{rec.employee}</h3>
                <p className="text-sm capitalize text-ink-500">{rec.type} · {rec.date}</p>
              </div>
              <span className="badge-info">Submitted</span>
            </div>
            <p className="mt-2 text-sm text-ink-600">{rec.note}</p>
            <div className="crud-actions mt-4 border-t border-primary-100 pt-3">
              <button type="button" onClick={() => openEdit(rec)} className="table-action-primary">Edit</button>
              <button type="button" onClick={() => handleDelete(rec)} className="table-action-danger">Delete</button>
            </div>
          </div>
        ))}
        {recommendations.length === 0 && (
          <p className="text-sm text-ink-500">No recommendations yet. Click Add Recommendation to create one.</p>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Recommendation' : 'Add Recommendation'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Employee</label>
            <select className="input-field" value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} required>
              <option value="">Select employee</option>
              {deptEmployees.map((e) => <option key={e.id} value={e.name}>{e.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Recommendation Type</label>
            <select className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="promotion">Promotion</option>
              <option value="training">Training</option>
              <option value="recognition">Recognition</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div>
            <label className="label">Notes</label>
            <textarea className="input-field" rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} required />
          </div>
          <div className="action-row">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
            <button type="submit" className="btn-primary w-full sm:w-auto">{editing ? 'Save Changes' : 'Submit'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
