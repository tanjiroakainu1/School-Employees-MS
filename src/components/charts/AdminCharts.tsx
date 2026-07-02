import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from './ChartCard';
import { CHART_COLORS, axisStyle, tooltipStyle } from '@/config/chartTheme';
import type {
  AttendanceRecord,
  Department,
  Employee,
  LeaveRequest,
  PerformanceEvaluation,
} from '@/types';
import {
  getAttendanceRadialData,
  getAttendanceStatusData,
  getDepartmentChartData,
  getEmployeeStatusData,
  getLeaveStatusData,
  getLeaveTypeData,
  getPerformanceChartData,
  getWeeklyActivityData,
  getWorkforceTrendData,
} from '@/utils/chartData';

interface DashboardChartsProps {
  employees: Employee[];
  departments: Department[];
  leaveRequests: LeaveRequest[];
  attendance: AttendanceRecord[];
  performance: PerformanceEvaluation[];
  variant?: 'dashboard' | 'reports';
}

export function WorkforceTrendChart({ employees }: { employees: Employee[] }) {
  const data = getWorkforceTrendData(employees.length);

  return (
    <ChartCard
      title="Workforce Growth"
      subtitle="7-month headcount & hiring velocity"
      badge="Live"
      glow="primary"
    >
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="workforceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.45} />
              <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="hiresGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.accent} stopOpacity={0.35} />
              <stop offset="100%" stopColor={CHART_COLORS.accent} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8fff0" vertical={false} />
          <XAxis dataKey="month" {...axisStyle} />
          <YAxis {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          <Area
            type="monotone"
            dataKey="workforce"
            name="Workforce"
            stroke={CHART_COLORS.primaryDark}
            strokeWidth={3}
            fill="url(#workforceGrad)"
            animationDuration={1200}
          />
          <Area
            type="monotone"
            dataKey="hires"
            name="New Hires"
            stroke={CHART_COLORS.accent}
            strokeWidth={2}
            fill="url(#hiresGrad)"
            animationDuration={1400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function DepartmentBarChart({
  employees,
  departments,
}: {
  employees: Employee[];
  departments: Department[];
}) {
  const data = getDepartmentChartData(employees, departments);

  return (
    <ChartCard
      title="Department Breakdown"
      subtitle="Active staff vs capacity by department"
      badge="By Dept"
      glow="accent"
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barGap={4}>
          <defs>
            <linearGradient id="activeBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="capacityBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9f99d" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8fff0" vertical={false} />
          <XAxis dataKey="name" {...axisStyle} />
          <YAxis {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
          <Bar dataKey="active" name="Active" fill="url(#activeBar)" radius={[8, 8, 0, 0]} animationDuration={1000} />
          <Bar dataKey="capacity" name="Capacity" fill="url(#capacityBar)" radius={[8, 8, 0, 0]} animationDuration={1200} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function LeaveStatusDonut({ leaveRequests }: { leaveRequests: LeaveRequest[] }) {
  const data = getLeaveStatusData(leaveRequests);
  const total = leaveRequests.length;

  return (
    <ChartCard
      title="Leave Pipeline"
      subtitle={`${total} total requests in system`}
      badge="HR"
      glow="primary"
    >
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <defs>
            {data.map((entry, i) => (
              <linearGradient key={entry.name} id={`leaveGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
            animationDuration={1100}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            labelLine={{ stroke: CHART_COLORS.inkLight, strokeWidth: 1 }}
          >
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={`url(#leaveGrad${i})`} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function AttendanceRadialChart({ attendance }: { attendance: AttendanceRecord[] }) {
  const radialData = getAttendanceRadialData(attendance);
  const rate = radialData[0]?.value ?? 0;

  return (
    <ChartCard
      title="Attendance Pulse"
      subtitle="Today's workforce presence rate"
      badge={`${rate}%`}
      glow="accent"
    >
      <ResponsiveContainer width="100%" height={280}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="58%"
          outerRadius="95%"
          barSize={18}
          data={radialData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background={{ fill: '#f0fdf4' }}
            dataKey="value"
            cornerRadius={12}
            animationDuration={1300}
          />
          <Tooltip {...tooltipStyle} />
          <text x="50%" y="48%" textAnchor="middle" className="fill-ink-900 text-3xl font-extrabold">
            {rate}%
          </text>
          <text x="50%" y="58%" textAnchor="middle" className="fill-ink-500 text-xs font-semibold">
            Present Rate
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function WeeklyActivityChart() {
  const data = getWeeklyActivityData();

  return (
    <ChartCard
      title="System Activity"
      subtitle="Logins, actions & reports this week"
      badge="7 Days"
      glow="primary"
    >
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="loginBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8fff0" vertical={false} />
          <XAxis dataKey="day" {...axisStyle} />
          <YAxis {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
          <Bar dataKey="logins" name="Logins" fill="url(#loginBar)" radius={[6, 6, 0, 0]} />
          <Line
            type="monotone"
            dataKey="actions"
            name="Actions"
            stroke={CHART_COLORS.accent}
            strokeWidth={3}
            dot={{ fill: CHART_COLORS.accent, r: 4, strokeWidth: 2, stroke: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="reports"
            name="Reports"
            stroke={CHART_COLORS.teal}
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={{ fill: CHART_COLORS.teal, r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function PerformanceRadarChart({ performance }: { performance: PerformanceEvaluation[] }) {
  const data = getPerformanceChartData(performance);

  return (
    <ChartCard
      title="Performance Radar"
      subtitle="Employee scores vs 85% target"
      badge="Q2 2026"
      glow="accent"
    >
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="#dce8e0" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#5f7d6e', fontSize: 11, fontWeight: 600 }} />
          <Radar
            name="Score"
            dataKey="score"
            stroke={CHART_COLORS.primary}
            fill={CHART_COLORS.primary}
            fillOpacity={0.35}
            strokeWidth={2}
            animationDuration={1200}
          />
          <Radar
            name="Target"
            dataKey="target"
            stroke={CHART_COLORS.accent}
            fill={CHART_COLORS.accent}
            fillOpacity={0.12}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function LeaveTypeBarChart({ leaveRequests }: { leaveRequests: LeaveRequest[] }) {
  const data = getLeaveTypeData(leaveRequests);

  return (
    <ChartCard title="Leave Types" subtitle="Distribution by category" badge="Types">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8fff0" horizontal={false} />
          <XAxis type="number" {...axisStyle} />
          <YAxis type="category" dataKey="name" width={72} {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="count" name="Requests" radius={[0, 8, 8, 0]} animationDuration={1000}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function EmployeeStatusPie({ employees }: { employees: Employee[] }) {
  const data = getEmployeeStatusData(employees);

  return (
    <ChartCard title="Employee Status" subtitle="Active, on leave & inactive" badge="Status">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={88}
            dataKey="value"
            animationDuration={1000}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function AttendanceBreakdownChart({ attendance }: { attendance: AttendanceRecord[] }) {
  const data = getAttendanceStatusData(attendance);

  return (
    <ChartCard title="Attendance Breakdown" subtitle="Today's check-in status" badge="Today">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8fff0" vertical={false} />
          <XAxis dataKey="name" {...axisStyle} />
          <YAxis allowDecimals={false} {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="value" name="Employees" radius={[8, 8, 0, 0]} animationDuration={1000}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default function AdminAnalyticsCharts({
  employees,
  departments,
  leaveRequests,
  attendance,
  performance,
  variant = 'dashboard',
}: DashboardChartsProps) {
  if (variant === 'dashboard') {
    return (
      <div className="chart-grid">
        <div className="chart-span-2">
          <WorkforceTrendChart employees={employees} />
        </div>
        <LeaveStatusDonut leaveRequests={leaveRequests} />
        <DepartmentBarChart employees={employees} departments={departments} />
        <AttendanceRadialChart attendance={attendance} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="chart-grid">
        <div className="chart-span-2">
          <WorkforceTrendChart employees={employees} />
        </div>
        <WeeklyActivityChart />
      </div>

      <div className="chart-grid">
        <DepartmentBarChart employees={employees} departments={departments} />
        <LeaveStatusDonut leaveRequests={leaveRequests} />
        <AttendanceRadialChart attendance={attendance} />
        <PerformanceRadarChart performance={performance} />
      </div>

      <div className="chart-grid chart-grid-3">
        <LeaveTypeBarChart leaveRequests={leaveRequests} />
        <EmployeeStatusPie employees={employees} />
        <AttendanceBreakdownChart attendance={attendance} />
      </div>
    </div>
  );
}
