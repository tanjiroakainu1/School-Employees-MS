import type {
  AttendanceRecord,
  Department,
  Employee,
  LeaveRequest,
  PerformanceEvaluation,
} from '@/types';
import { CHART_COLORS } from '@/config/chartTheme';

export function getWorkforceTrendData(employeeCount: number) {
  const base = Math.max(employeeCount, 5);
  return [
    { month: 'Jan', workforce: base - 4, hires: 2, turnover: 1 },
    { month: 'Feb', workforce: base - 3, hires: 3, turnover: 0 },
    { month: 'Mar', workforce: base - 2, hires: 1, turnover: 1 },
    { month: 'Apr', workforce: base - 1, hires: 4, turnover: 0 },
    { month: 'May', workforce: base, hires: 2, turnover: 1 },
    { month: 'Jun', workforce: base + 1, hires: 3, turnover: 0 },
    { month: 'Jul', workforce: base + 2, hires: 1, turnover: 1 },
  ];
}

export function getDepartmentChartData(employees: Employee[], departments: Department[]) {
  return departments.map((dept) => ({
    name: dept.name.length > 10 ? `${dept.name.slice(0, 9)}…` : dept.name,
    fullName: dept.name,
    active: employees.filter((e) => e.department === dept.name && e.status === 'active').length,
    onLeave: employees.filter((e) => e.department === dept.name && e.status === 'on-leave').length,
    capacity: dept.employeeCount,
  }));
}

export function getLeaveStatusData(leaveRequests: LeaveRequest[]) {
  const pending = leaveRequests.filter((l) => l.status === 'pending').length;
  const approved = leaveRequests.filter((l) => l.status === 'approved').length;
  const rejected = leaveRequests.filter((l) => l.status === 'rejected').length;

  return [
    { name: 'Pending', value: pending || 1, color: CHART_COLORS.amber },
    { name: 'Approved', value: approved || 1, color: CHART_COLORS.primary },
    { name: 'Rejected', value: rejected || 0, color: CHART_COLORS.red },
  ].filter((d) => d.value > 0);
}

export function getLeaveTypeData(leaveRequests: LeaveRequest[]) {
  const types = ['vacation', 'sick', 'personal', 'emergency'] as const;
  return types.map((type, i) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    count: leaveRequests.filter((l) => l.type === type).length,
    fill: [CHART_COLORS.primary, CHART_COLORS.accent, CHART_COLORS.mint, CHART_COLORS.teal][i],
  }));
}

export function getAttendanceStatusData(attendance: AttendanceRecord[]) {
  const statuses = ['present', 'late', 'absent', 'half-day'] as const;
  const labels = ['Present', 'Late', 'Absent', 'Half Day'];
  const colors = [CHART_COLORS.primary, CHART_COLORS.amber, CHART_COLORS.red, CHART_COLORS.teal];

  return statuses.map((status, i) => ({
    name: labels[i],
    value: attendance.filter((a) => a.status === status).length,
    fill: colors[i],
  }));
}

export function getAttendanceRadialData(attendance: AttendanceRecord[]) {
  const total = attendance.length || 1;
  const present = attendance.filter((a) => a.status === 'present').length;
  const late = attendance.filter((a) => a.status === 'late').length;
  const rate = Math.round(((present + late * 0.5) / total) * 100);

  return [
    { name: 'Attendance', value: rate, fill: CHART_COLORS.primary },
    { name: 'Remaining', value: 100 - rate, fill: '#e8fff0' },
  ];
}

export function getPerformanceChartData(performance: PerformanceEvaluation[]) {
  if (performance.length === 0) {
    return [
      { name: 'Emily D.', score: 92, target: 85 },
      { name: 'Maria G.', score: 85, target: 85 },
      { name: 'James W.', score: 88, target: 85 },
      { name: 'Lisa A.', score: 79, target: 85 },
    ];
  }
  return performance.map((p) => ({
    name: p.employeeName.split(' ')[0],
    score: p.score,
    target: 85,
  }));
}

export function getEmployeeStatusData(employees: Employee[]) {
  return [
    {
      name: 'Active',
      value: employees.filter((e) => e.status === 'active').length,
      color: CHART_COLORS.primary,
    },
    {
      name: 'On Leave',
      value: employees.filter((e) => e.status === 'on-leave').length,
      color: CHART_COLORS.amber,
    },
    {
      name: 'Inactive',
      value: employees.filter((e) => e.status === 'inactive').length,
      color: CHART_COLORS.inkLight,
    },
  ].filter((d) => d.value > 0);
}

export function getWeeklyActivityData() {
  return [
    { day: 'Mon', logins: 42, actions: 28, reports: 6 },
    { day: 'Tue', logins: 38, actions: 35, reports: 8 },
    { day: 'Wed', logins: 45, actions: 31, reports: 5 },
    { day: 'Thu', logins: 40, actions: 42, reports: 11 },
    { day: 'Fri', logins: 36, actions: 25, reports: 9 },
    { day: 'Sat', logins: 8, actions: 4, reports: 2 },
    { day: 'Sun', logins: 5, actions: 2, reports: 1 },
  ];
}
