interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const colorMap = {
  blue:   { bg: 'from-primary-400/15 to-mint-400/10', icon: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow-sm', ring: 'ring-primary-100' },
  green:  { bg: 'from-accent-400/15 to-primary-400/10', icon: 'bg-gradient-to-br from-accent-400 to-primary-600 text-white shadow-glow-accent', ring: 'ring-accent-100' },
  yellow: { bg: 'from-lime-400/15 to-accent-400/10', icon: 'bg-gradient-to-br from-lime-400 to-accent-500 text-white shadow-glow-candy', ring: 'ring-lime-100' },
  red:    { bg: 'from-red-400/15 to-rose-400/10', icon: 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-glow-sm', ring: 'ring-red-100' },
  purple: { bg: 'from-emerald-400/15 to-teal-400/10', icon: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-glow-sm', ring: 'ring-emerald-100' },
};

export default function StatCard({ title, value, icon, trend, trendUp, color = 'blue' }: StatCardProps) {
  const c = colorMap[color];

  return (
    <div className={`card-hover relative overflow-hidden bg-gradient-to-br ${c.bg}`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-4 sm:h-12 sm:w-12 ${c.icon} ${c.ring}`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs font-semibold uppercase leading-snug tracking-wide text-ink-500">{title}</p>
          <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-ink-900 sm:mt-1 sm:text-3xl">{value}</p>
          {trend && (
            <p className={`mt-1 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
