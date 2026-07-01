import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    schoolName: 'Springfield High School',
    emailNotifications: true,
    attendanceReminder: true,
    leaveAutoApprove: false,
    sessionTimeout: '30',
    backupFrequency: 'daily',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-shell">
      <PageHeader title="System Settings" description="Configure system-wide settings" />

      <form onSubmit={handleSave} className="card max-w-2xl space-y-6">
        <div>
          <label className="label">School Name</label>
          <input
            className="input-field"
            value={settings.schoolName}
            onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="h-5 w-5 rounded border-primary-300 text-primary-600 sm:h-4 sm:w-4"
            />
            <span className="text-sm text-ink-700">Enable email notifications</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.attendanceReminder}
              onChange={(e) => setSettings({ ...settings, attendanceReminder: e.target.checked })}
              className="h-5 w-5 rounded border-primary-300 text-primary-600 sm:h-4 sm:w-4"
            />
            <span className="text-sm text-ink-700">Send attendance reminders</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.leaveAutoApprove}
              onChange={(e) => setSettings({ ...settings, leaveAutoApprove: e.target.checked })}
              className="h-5 w-5 rounded border-primary-300 text-primary-600 sm:h-4 sm:w-4"
            />
            <span className="text-sm text-ink-700">Auto-approve leave requests</span>
          </label>
        </div>

        <div>
          <label className="label">Session Timeout (minutes)</label>
          <select
            className="input-field"
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>

        <div>
          <label className="label">Backup Frequency</label>
          <select
            className="input-field"
            value={settings.backupFrequency}
            onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary">Save Settings</button>
          {saved && <span className="alert-success inline-block">Settings saved successfully!</span>}
        </div>
      </form>
    </div>
  );
}
