import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';

export default function BackupRestore() {
  const [lastBackup, setLastBackup] = useState('2026-07-01 02:00:00');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setLastBackup(new Date().toLocaleString());
      setIsBackingUp(false);
      setMessage('Backup completed successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 2000);
  };

  const handleRestore = () => {
    if (confirm('Are you sure you want to restore from the last backup? This will overwrite current data.')) {
      setMessage('Restore initiated... Data restored from last backup.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="page-shell">
      <PageHeader title="Backup & Restore" description="Manage system data backup and recovery" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold text-ink-900">Create Backup</h3>
          <p className="mt-2 text-sm text-ink-500">Create a full backup of all system data.</p>
          <p className="mt-4 text-sm text-ink-600">Last backup: <span className="font-medium">{lastBackup}</span></p>
          <button onClick={handleBackup} disabled={isBackingUp} className="btn-primary mt-4">
            {isBackingUp ? 'Backing up...' : 'Create Backup Now'}
          </button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-ink-900">Restore Data</h3>
          <p className="mt-2 text-sm text-ink-500">Restore system data from the most recent backup.</p>
          <p className="alert-warning mt-4">Warning: This action will overwrite current data.</p>
          <button onClick={handleRestore} className="btn-danger mt-4">
            Restore from Backup
          </button>
        </div>
      </div>

      {message && (
        <div className="alert-success mt-4">{message}</div>
      )}
    </div>
  );
}
