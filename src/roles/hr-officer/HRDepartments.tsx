import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';

export default function HRDepartments() {
  const { departments, positions, addDepartment, addPosition } = useAppData();
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showPosModal, setShowPosModal] = useState(false);
  const [deptForm, setDeptForm] = useState({ name: '', head: '', description: '' });
  const [posForm, setPosForm] = useState({ title: '', department: '', level: '', salary: 0 });

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    addDepartment(deptForm);
    setDeptForm({ name: '', head: '', description: '' });
    setShowDeptModal(false);
  };

  const handleAddPos = (e: React.FormEvent) => {
    e.preventDefault();
    addPosition(posForm);
    setPosForm({ title: '', department: '', level: '', salary: 0 });
    setShowPosModal(false);
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Departments & Positions"
        description="Manage departments and job positions"
        actions={
          <>
            <button onClick={() => setShowDeptModal(true)} className="btn-secondary">Add Department</button>
            <button onClick={() => setShowPosModal(true)} className="btn-primary">Add Position</button>
          </>
        }
      />

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Departments</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {departments.map((d) => (
            <div key={d.id} className="card">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="text-sm text-ink-500">Head: {d.head} · {d.employeeCount} employees</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Positions</h2>
        <div className="table-container">
          <table className="data-table">
            <thead><tr><th>Title</th><th>Department</th><th>Level</th><th>Salary</th></tr></thead>
            <tbody>
              {positions.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.title}</td>
                  <td>{p.department}</td>
                  <td>{p.level}</td>
                  <td>${p.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showDeptModal} onClose={() => setShowDeptModal(false)} title="Add Department">
        <form onSubmit={handleAddDept} className="space-y-4">
          <div><label className="label">Name</label><input className="input-field" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} required /></div>
          <div><label className="label">Head</label><input className="input-field" value={deptForm.head} onChange={(e) => setDeptForm({ ...deptForm, head: e.target.value })} required /></div>
          <div><label className="label">Description</label><textarea className="input-field" rows={2} value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })} required /></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowDeptModal(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Add</button></div>
        </form>
      </Modal>

      <Modal isOpen={showPosModal} onClose={() => setShowPosModal(false)} title="Add Position">
        <form onSubmit={handleAddPos} className="space-y-4">
          <div><label className="label">Title</label><input className="input-field" value={posForm.title} onChange={(e) => setPosForm({ ...posForm, title: e.target.value })} required /></div>
          <div><label className="label">Department</label><select className="input-field" value={posForm.department} onChange={(e) => setPosForm({ ...posForm, department: e.target.value })} required><option value="">Select</option>{departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}</select></div>
          <div><label className="label">Level</label><input className="input-field" value={posForm.level} onChange={(e) => setPosForm({ ...posForm, level: e.target.value })} required /></div>
          <div><label className="label">Salary</label><input type="number" className="input-field" value={posForm.salary} onChange={(e) => setPosForm({ ...posForm, salary: Number(e.target.value) })} required /></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowPosModal(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Add</button></div>
        </form>
      </Modal>
    </div>
  );
}
