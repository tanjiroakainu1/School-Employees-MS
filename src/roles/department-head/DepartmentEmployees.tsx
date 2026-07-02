import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { statusBadge, capitalize } from '@/utils/helpers';
import type { Employee } from '@/types';

const emptyEmployee = {
  name: '',
  email: '',
  position: '',
  phone: '',
  status: 'active' as Employee['status'],
  hireDate: new Date().toISOString().split('T')[0],
};

export default function DepartmentEmployees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useAppData();
  const { user } = useAuth();
  const dept = user?.department || 'Science';
  const deptEmployees = employees.filter((e) => e.department === dept);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState(emptyEmployee);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyEmployee);
    setShowModal(true);
  };

  const openEdit = (emp: Employee) => {
    setEditing(emp);
    setForm({
      name: emp.name,
      email: emp.email,
      position: emp.position,
      phone: emp.phone,
      status: emp.status,
      hireDate: emp.hireDate,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateEmployee(editing.id, { ...form, department: dept });
    } else {
      addEmployee({ ...form, department: dept });
    }
    setShowModal(false);
    setForm(emptyEmployee);
    setEditing(null);
  };

  const handleDelete = (emp: Employee) => {
    if (confirm(`Remove ${emp.name} from ${dept} department records?`)) {
      deleteEmployee(emp.id);
    }
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Department Employees"
        description={`Add, edit, and manage employees in ${dept}`}
        actions={<button type="button" onClick={openAdd} className="btn-primary">Add Employee</button>}
      />

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deptEmployees.map((e) => (
              <tr key={e.id}>
                <td className="font-medium">{e.name}</td>
                <td>{e.email}</td>
                <td>{e.position}</td>
                <td>{e.phone}</td>
                <td><span className={statusBadge(e.status)}>{capitalize(e.status)}</span></td>
                <td>{e.hireDate}</td>
                <td>
                  <div className="table-actions">
                    <button type="button" onClick={() => openEdit(e)} className="table-action-primary">Edit</button>
                    <button type="button" onClick={() => handleDelete(e)} className="table-action-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deptEmployees.length === 0 && (
          <p className="p-4 text-center text-sm text-ink-500">No employees in this department yet.</p>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Employee' : 'Add Employee'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label">Full Name</label><input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className="label">Email</label><input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="form-grid-2">
            <div><label className="label">Position</label><input className="input-field" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required /></div>
            <div><label className="label">Phone</label><input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          </div>
          <div className="form-grid-2">
            <div>
              <label className="label">Status</label>
              <select className="input-field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Employee['status'] })}>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div><label className="label">Hire Date</label><input type="date" className="input-field" value={form.hireDate} onChange={(e) => setForm({ ...form, hireDate: e.target.value })} required /></div>
          </div>
          <p className="text-xs text-ink-500">Department: <span className="font-semibold text-primary-700">{dept}</span></p>
          <div className="action-row">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
            <button type="submit" className="btn-primary w-full sm:w-auto">{editing ? 'Save Changes' : 'Add Employee'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
