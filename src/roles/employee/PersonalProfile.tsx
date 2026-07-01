import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useAuth } from '@/context/AuthContext';

export default function PersonalProfile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '555-0101',
    address: '123 School Street, Springfield',
    department: user?.department || '',
    position: user?.position || '',
  });
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: form.name, email: form.email, department: form.department, position: form.position });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-shell">
      <PageHeader
        title="My Profile"
        description="View and update your personal information"
        actions={!editing ? <button onClick={() => setEditing(true)} className="btn-primary">Edit Profile</button> : undefined}
      />

      <form onSubmit={handleSave} className="card max-w-2xl space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
            {form.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{form.name}</h2>
            <p className="text-sm text-ink-500">{form.position} · {form.department}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Full Name</label><input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={!editing} /></div>
          <div><label className="label">Email</label><input className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={!editing} /></div>
          <div><label className="label">Phone</label><input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!editing} /></div>
          <div><label className="label">Address</label><input className="input-field" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} disabled={!editing} /></div>
          <div><label className="label">Department</label><input className="input-field" value={form.department} disabled /></div>
          <div><label className="label">Position</label><input className="input-field" value={form.position} disabled /></div>
        </div>

        {editing && (
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-primary">Save Changes</button>
            <button type="button" onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
          </div>
        )}
        {saved && <p className="alert-success">Profile updated successfully!</p>}
      </form>
    </div>
  );
}
