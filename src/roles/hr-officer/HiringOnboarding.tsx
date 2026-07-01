import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { statusBadge, capitalize } from '@/utils/helpers';

const onboardingSteps = ['Document Verification', 'Orientation Schedule', 'Equipment Assignment', 'System Access Setup'];

export default function HiringOnboarding() {
  const { employees } = useAppData();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean[]>>({});

  const recentHires = employees.filter((e) => {
    const hireDate = new Date(e.hireDate);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return hireDate >= sixMonthsAgo;
  });

  const toggleStep = (empId: string, stepIndex: number) => {
    setCompletedSteps((prev) => {
      const current = prev[empId] || onboardingSteps.map(() => false);
      const updated = [...current];
      updated[stepIndex] = !updated[stepIndex];
      return { ...prev, [empId]: updated };
    });
  };

  const getProgress = (empId: string) => {
    const steps = completedSteps[empId] || onboardingSteps.map(() => false);
    return Math.round((steps.filter(Boolean).length / onboardingSteps.length) * 100);
  };

  return (
    <div className="page-shell">
      <PageHeader title="Hiring & Onboarding" description="Process employee hiring and onboarding workflows" />

      <div className="mb-6">
        <label className="label">Select Employee for Onboarding</label>
        <select className="input-field max-w-md" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Choose an employee</option>
          {recentHires.map((e) => <option key={e.id} value={e.id}>{e.name} - {e.position}</option>)}
        </select>
      </div>

      {selectedEmployee && (
        <div className="card mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Onboarding Progress</h3>
            <span className="badge-info">{getProgress(selectedEmployee)}% Complete</span>
          </div>
          <div className="mb-2 h-2 rounded-full bg-primary-100">
            <div className="h-2 rounded-full bg-primary-600 transition-all" style={{ width: `${getProgress(selectedEmployee)}%` }} />
          </div>
          <div className="mt-4 space-y-2">
            {onboardingSteps.map((step, i) => {
              const done = (completedSteps[selectedEmployee] || [])[i];
              return (
                <label key={step} className="flex items-center gap-3 rounded-lg p-2 hover:bg-mint-50">
                  <input type="checkbox" checked={done || false} onChange={() => toggleStep(selectedEmployee, i)} className="h-5 w-5 rounded text-primary-600 sm:h-4 sm:w-4" />
                  <span className={`text-sm ${done ? 'text-ink-400 line-through' : 'text-ink-700'}`}>{step}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <h2 className="mb-4 text-lg font-semibold">Recent Hires</h2>
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Position</th><th>Department</th><th>Hire Date</th><th>Status</th></tr></thead>
          <tbody>
            {recentHires.map((e) => (
              <tr key={e.id}>
                <td className="font-medium">{e.name}</td>
                <td>{e.position}</td>
                <td>{e.department}</td>
                <td>{e.hireDate}</td>
                <td><span className={statusBadge(e.status)}>{capitalize(e.status)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
