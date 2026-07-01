import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';

export default function RegisterEmployee() {
  const { addEmployee, departments, positions } = useAppData();
  const [form, setForm] = useState({
    name: '', email: '', department: '', position: '', phone: '', hireDate: new Date().toISOString().split('T')[0],
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({ ...form, status: 'active' });
    setForm({ name: '', email: '', department: '', position: '', phone: '', hireDate: new Date().toISOString().split('T')[0] });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page-shell">
      <PageHeader title="Register Employee" description="Add new employee to the system" />

      <form onSubmit={handleSubmit} className="card max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Full Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div>
            <label className="label">Hire Date</label>
            <input type="date" className="input-field" value={form.hireDate} onChange={(e) => setForm({ ...form, hireDate: e.target.value })} required />
          </div>
          <div>
            <label className="label">Department</label>
            <select className="input-field" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required>
              <option value="">Select department</option>
              {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Position</label>
            <select className="input-field" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required>
              <option value="">Select position</option>
              {positions.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="btn-primary">Register Employee</button>
          {success && <span className="alert-success inline-block">Employee registered successfully!</span>}
        </div>
      </form>
    </div>
  );
}
