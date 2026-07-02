import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';
import type { Department, Position } from '@/types';

const emptyDept = { name: '', head: '', description: '' };
const emptyPos = { title: '', department: '', level: '', salary: 0 };

export default function HRDepartments() {
  const {
    departments,
    positions,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addPosition,
    updatePosition,
    deletePosition,
  } = useAppData();

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showPosModal, setShowPosModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [editingPos, setEditingPos] = useState<Position | null>(null);
  const [deptForm, setDeptForm] = useState(emptyDept);
  const [posForm, setPosForm] = useState(emptyPos);

  const openAddDept = () => {
    setEditingDept(null);
    setDeptForm(emptyDept);
    setShowDeptModal(true);
  };

  const openEditDept = (dept: Department) => {
    setEditingDept(dept);
    setDeptForm({ name: dept.name, head: dept.head, description: dept.description });
    setShowDeptModal(true);
  };

  const openAddPos = () => {
    setEditingPos(null);
    setPosForm(emptyPos);
    setShowPosModal(true);
  };

  const openEditPos = (pos: Position) => {
    setEditingPos(pos);
    setPosForm({ title: pos.title, department: pos.department, level: pos.level, salary: pos.salary });
    setShowPosModal(true);
  };

  const handleDeptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDept) {
      updateDepartment(editingDept.id, deptForm);
    } else {
      addDepartment(deptForm);
    }
    setShowDeptModal(false);
    setDeptForm(emptyDept);
    setEditingDept(null);
  };

  const handlePosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPos) {
      updatePosition(editingPos.id, posForm);
    } else {
      addPosition(posForm);
    }
    setShowPosModal(false);
    setPosForm(emptyPos);
    setEditingPos(null);
  };

  const handleDeleteDept = (dept: Department) => {
    if (confirm(`Delete department "${dept.name}"? Related positions will also be removed.`)) {
      deleteDepartment(dept.id);
    }
  };

  const handleDeletePos = (pos: Position) => {
    if (confirm(`Delete position "${pos.title}"?`)) {
      deletePosition(pos.id);
    }
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Departments & Positions"
        description="Add, edit, and delete departments and job positions"
        actions={
          <div className="wrap-actions">
            <button type="button" onClick={openAddDept} className="btn-secondary">Add Department</button>
            <button type="button" onClick={openAddPos} className="btn-primary">Add Position</button>
          </div>
        }
      />

      <div className="mb-8">
        <h2 className="panel-title mb-4">Departments</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {departments.map((d) => (
            <div key={d.id} className="card">
              <div className="row-stack">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink-900">{d.name}</h3>
                  <p className="text-sm text-ink-500">Head: {d.head} · {d.employeeCount} employees</p>
                  <p className="mt-1 text-xs text-ink-600">{d.description}</p>
                </div>
                <div className="crud-actions">
                  <button type="button" onClick={() => openEditDept(d)} className="table-action-primary">Edit</button>
                  <button type="button" onClick={() => handleDeleteDept(d)} className="table-action-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="panel-title mb-4">Positions</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Level</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.title}</td>
                  <td>{p.department}</td>
                  <td>{p.level}</td>
                  <td>${p.salary.toLocaleString()}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" onClick={() => openEditPos(p)} className="table-action-primary">Edit</button>
                      <button type="button" onClick={() => handleDeletePos(p)} className="table-action-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showDeptModal}
        onClose={() => setShowDeptModal(false)}
        title={editingDept ? 'Edit Department' : 'Add Department'}
      >
        <form onSubmit={handleDeptSubmit} className="space-y-4">
          <div><label className="label">Name</label><input className="input-field" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} required /></div>
          <div><label className="label">Head</label><input className="input-field" value={deptForm.head} onChange={(e) => setDeptForm({ ...deptForm, head: e.target.value })} required /></div>
          <div><label className="label">Description</label><textarea className="input-field" rows={2} value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })} required /></div>
          <div className="action-row">
            <button type="button" onClick={() => setShowDeptModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
            <button type="submit" className="btn-primary w-full sm:w-auto">{editingDept ? 'Save Changes' : 'Add Department'}</button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showPosModal}
        onClose={() => setShowPosModal(false)}
        title={editingPos ? 'Edit Position' : 'Add Position'}
      >
        <form onSubmit={handlePosSubmit} className="space-y-4">
          <div><label className="label">Title</label><input className="input-field" value={posForm.title} onChange={(e) => setPosForm({ ...posForm, title: e.target.value })} required /></div>
          <div>
            <label className="label">Department</label>
            <select className="input-field" value={posForm.department} onChange={(e) => setPosForm({ ...posForm, department: e.target.value })} required>
              <option value="">Select</option>
              {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div><label className="label">Level</label><input className="input-field" value={posForm.level} onChange={(e) => setPosForm({ ...posForm, level: e.target.value })} required /></div>
          <div><label className="label">Salary</label><input type="number" className="input-field" value={posForm.salary} onChange={(e) => setPosForm({ ...posForm, salary: Number(e.target.value) })} required /></div>
          <div className="action-row">
            <button type="button" onClick={() => setShowPosModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
            <button type="submit" className="btn-primary w-full sm:w-auto">{editingPos ? 'Save Changes' : 'Add Position'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
