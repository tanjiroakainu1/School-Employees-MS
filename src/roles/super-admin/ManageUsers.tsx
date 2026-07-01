import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Modal from '@/components/shared/Modal';
import { mockUsers } from '@/data/mockData';
import type { UserRole } from '@/types';

export default function ManageUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'employee' as UserRole });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers((prev) => [...prev, { id: Date.now().toString(), ...form }]);
    setForm({ name: '', email: '', role: 'employee' });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="Manage Users"
        description="Register and manage system users"
        actions={<button onClick={() => setShowModal(true)} className="btn-primary">Add User</button>}
      />

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td><span className="badge-info">{user.role.replace('-', ' ')}</span></td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className="table-action-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New User">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="input-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}>
              <option value="super-admin">Super Admin</option>
              <option value="hr-officer">HR Officer</option>
              <option value="department-head">Department Head</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add User</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
