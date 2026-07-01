import PageHeader from '@/components/shared/PageHeader';

const schedule = [
  { day: 'Monday', timeIn: '07:30 AM', timeOut: '04:00 PM', subject: 'Physics 101' },
  { day: 'Tuesday', timeIn: '07:30 AM', timeOut: '04:00 PM', subject: 'Chemistry Lab' },
  { day: 'Wednesday', timeIn: '07:30 AM', timeOut: '04:00 PM', subject: 'Physics 101' },
  { day: 'Thursday', timeIn: '07:30 AM', timeOut: '04:00 PM', subject: 'Science Club' },
  { day: 'Friday', timeIn: '07:30 AM', timeOut: '03:00 PM', subject: 'Physics 101' },
];

export default function WorkSchedule() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="page-shell">
      <PageHeader
        title="Work Schedule"
        description="Your weekly work schedule and assignments"
        badge="Employee"
      />

      <div className="grid gap-4">
        {schedule.map((item) => (
          <div
            key={item.day}
            className={`card-hover flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
              item.day === today ? 'border-primary-300 bg-gradient-to-r from-primary-50/80 to-accent-50/50 ring-2 ring-primary-400/40' : ''
            }`}
          >
            <div>
              <h3 className="flex flex-wrap items-center gap-2 font-semibold text-ink-900">
                {item.day}
                {item.day === today && <span className="badge-info">Today</span>}
              </h3>
              <p className="text-sm text-ink-500">{item.subject}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm font-semibold text-ink-800">
                {item.timeIn} – {item.timeOut}
              </p>
              <p className="text-xs text-ink-500">8 hours</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
