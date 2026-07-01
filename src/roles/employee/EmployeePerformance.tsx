import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

export default function EmployeePerformance() {
  const { performance } = useAppData();
  const { user } = useAuth();
  const myEvaluations = performance.filter((p) => p.employeeName === user?.name);

  return (
    <div className="page-shell">
      <PageHeader title="Performance Evaluations" description="View your performance evaluation history" />

      {myEvaluations.length > 0 ? (
        <div className="space-y-4">
          {myEvaluations.map((eval_) => (
            <div key={eval_.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{eval_.period}</h3>
                  <p className="text-sm text-ink-500">Evaluator: {eval_.evaluator} · {eval_.date}</p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold ${eval_.score >= 90 ? 'bg-primary-100 text-primary-700' : eval_.score >= 75 ? 'bg-accent-100 text-accent-700' : 'bg-amber-100 text-amber-700'}`}>
                  {eval_.score}
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-mint-50 p-4">
                <p className="text-sm font-medium text-ink-700">Supervisor Comments</p>
                <p className="mt-1 text-sm text-ink-600">{eval_.comments}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-8">
          <p className="text-ink-500">No performance evaluations available yet.</p>
        </div>
      )}
    </div>
  );
}
