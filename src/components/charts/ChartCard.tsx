import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
  glow?: 'primary' | 'accent' | 'none';
}

const glowMap = {
  primary: 'chart-glow-primary',
  accent: 'chart-glow-accent',
  none: '',
};

export default function ChartCard({
  title,
  subtitle,
  badge,
  children,
  className = '',
  glow = 'primary',
}: ChartCardProps) {
  return (
    <div className={`chart-card ${glowMap[glow]} ${className}`}>
      <div className="chart-card-header">
        <div className="min-w-0">
          <h3 className="chart-card-title">{title}</h3>
          {subtitle && <p className="chart-card-subtitle">{subtitle}</p>}
        </div>
        {badge && <span className="chart-badge">{badge}</span>}
      </div>
      <div className="chart-card-body">{children}</div>
    </div>
  );
}
