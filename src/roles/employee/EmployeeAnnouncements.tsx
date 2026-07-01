import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useAppData } from '@/context/AppDataContext';

export default function EmployeeAnnouncements() {
  const { announcements } = useAppData();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="page-shell">
      <PageHeader title="School Announcements" description="Stay updated with the latest school announcements" />

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="card cursor-pointer" onClick={() => setExpanded(expanded === ann.id ? null : ann.id)}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-ink-900">{ann.title}</h3>
                <p className="text-sm text-ink-500">{ann.author} · {ann.date}</p>
              </div>
              <svg className={`h-5 w-5 text-ink-400 transition ${expanded === ann.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expanded === ann.id && (
              <p className="mt-3 text-sm text-ink-600 border-t pt-3">{ann.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
