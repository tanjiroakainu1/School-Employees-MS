/** Candy Green chart palette — aligned with SEMS theme */
export const CHART_COLORS = {
  primary: '#22c55e',
  primaryDark: '#16a34a',
  primaryLight: '#86efac',
  accent: '#84cc16',
  accentLight: '#a3e635',
  mint: '#34d399',
  teal: '#14b8a6',
  amber: '#f59e0b',
  red: '#ef4444',
  ink: '#5f7d6e',
  inkLight: '#8aa898',
} as const;

export const CHART_GRADIENTS = {
  primary: ['#4ade80', '#16a34a'],
  accent: ['#a3e635', '#65a30d'],
  ocean: ['#34d399', '#14b8a6'],
  sunset: ['#fbbf24', '#f59e0b'],
} as const;

export const PIE_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.mint,
  CHART_COLORS.teal,
  CHART_COLORS.amber,
  CHART_COLORS.primaryDark,
];

export const tooltipStyle = {
  contentStyle: {
    borderRadius: '12px',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    boxShadow: '0 4px 16px -2px rgba(34, 197, 94, 0.15)',
    fontSize: '12px',
    fontWeight: 600,
  },
  labelStyle: { color: '#1a2620', fontWeight: 700 },
  itemStyle: { color: '#3d5248' },
};

export const axisStyle = {
  tick: { fill: '#8aa898', fontSize: 11, fontWeight: 500 },
  axisLine: { stroke: '#dce8e0' },
  tickLine: false as const,
};
