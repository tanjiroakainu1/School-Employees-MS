import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';

export default function SuperAdminDepartments() {
  const { departments, addDepartment } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', head: '', description: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addDepartment(form);
    setForm({ name: '', head: '', description: '' });
    setShowModal(false);
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Departments & Positions"
        description="Manage school departments"
        actions={<button onClick={() => setShowModal(true)} className="btn-primary">Add Department</button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {departments.map((dept) => (
          <div key={dept.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-ink-900">{dept.name}</h3>
                <p className="mt-1 text-sm text-ink-500">Head: {dept.head}</p>
              </div>
              <span className="badge-info">{dept.employeeCount} employees</span>
            </div>
            <p className="mt-3 text-sm text-ink-600">{dept.description}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Department">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="label">Department Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="label">Department Head</label>
            <input className="input-field" value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} required />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Department</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
