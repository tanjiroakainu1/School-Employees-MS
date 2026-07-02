import type {
  AttendanceRecord,
  Department,
  Employee,
  LeaveRequest,
  PerformanceEvaluation,
} from '@/types';
import {
  AttendanceBreakdownChart,
  AttendanceRadialChart,
  DepartmentBarChart,
  EmployeeStatusPie,
  LeaveStatusDonut,
  LeaveTypeBarChart,
  PerformanceRadarChart,
  WeeklyActivityChart,
  WorkforceTrendChart,
} from './AdminCharts';

interface PortalChartsProps {
  variant: 'hr-dashboard' | 'hr-reports' | 'dept-dashboard' | 'dept-reports' | 'employee-dashboard';
  employees: Employee[];
  departments: Department[];
  leaveRequests: LeaveRequest[];
  attendance: AttendanceRecord[];
  performance: PerformanceEvaluation[];
  departmentName?: string;
  employeeName?: string;
}

function scopeByDepartment(
  employees: Employee[],
  leaveRequests: LeaveRequest[],
  attendance: AttendanceRecord[],
  performance: PerformanceEvaluation[],
  departmentName?: string,
) {
  if (!departmentName) {
    return { employees, leaveRequests, attendance, performance };
  }

  const deptEmployees = employees.filter((e) => e.department === departmentName);
  const names = new Set(deptEmployees.map((e) => e.name));

  return {
    employees: deptEmployees,
    leaveRequests: leaveRequests.filter((l) => names.has(l.employeeName)),
    attendance: attendance.filter((a) => names.has(a.employeeName)),
    performance: performance.filter((p) => names.has(p.employeeName)),
  };
}

function scopeByEmployee(
  employees: Employee[],
  leaveRequests: LeaveRequest[],
  attendance: AttendanceRecord[],
  performance: PerformanceEvaluation[],
  employeeName?: string,
) {
  if (!employeeName) {
    return { employees, leaveRequests, attendance, performance };
  }

  return {
    employees: employees.filter((e) => e.name === employeeName),
    leaveRequests: leaveRequests.filter((l) => l.employeeName === employeeName),
    attendance: attendance.filter((a) => a.employeeName === employeeName),
    performance: performance.filter((p) => p.employeeName === employeeName),
  };
}

export default function PortalCharts({
  variant,
  employees,
  departments,
  leaveRequests,
  attendance,
  performance,
  departmentName,
  employeeName,
}: PortalChartsProps) {
  const scoped = employeeName
    ? scopeByEmployee(employees, leaveRequests, attendance, performance, employeeName)
    : scopeByDepartment(employees, leaveRequests, attendance, performance, departmentName);

  if (variant === 'employee-dashboard') {
    return (
      <div className="space-y-6">
        <div className="chart-grid">
          <div className="chart-span-2">
            <WeeklyActivityChart />
          </div>
          <LeaveStatusDonut leaveRequests={scoped.leaveRequests} />
        </div>
        <div className="chart-grid">
          <AttendanceRadialChart attendance={scoped.attendance} />
          <PerformanceRadarChart performance={scoped.performance} />
          <AttendanceBreakdownChart attendance={scoped.attendance} />
          <LeaveTypeBarChart leaveRequests={scoped.leaveRequests} />
        </div>
      </div>
    );
  }

  if (variant === 'hr-dashboard') {
    return (
      <div className="chart-grid">
        <div className="chart-span-2">
          <WorkforceTrendChart employees={scoped.employees} />
        </div>
        <LeaveStatusDonut leaveRequests={scoped.leaveRequests} />
        <DepartmentBarChart employees={scoped.employees} departments={departments} />
        <AttendanceRadialChart attendance={scoped.attendance} />
      </div>
    );
  }

  if (variant === 'hr-reports') {
    return (
      <div className="space-y-6">
        <div className="chart-grid">
          <div className="chart-span-2">
            <WorkforceTrendChart employees={scoped.employees} />
          </div>
          <WeeklyActivityChart />
        </div>
        <div className="chart-grid">
          <DepartmentBarChart employees={scoped.employees} departments={departments} />
          <LeaveStatusDonut leaveRequests={scoped.leaveRequests} />
          <AttendanceRadialChart attendance={scoped.attendance} />
          <PerformanceRadarChart performance={scoped.performance} />
        </div>
        <div className="chart-grid chart-grid-3">
          <LeaveTypeBarChart leaveRequests={scoped.leaveRequests} />
          <EmployeeStatusPie employees={scoped.employees} />
          <AttendanceBreakdownChart attendance={scoped.attendance} />
        </div>
      </div>
    );
  }

  if (variant === 'dept-dashboard') {
    return (
      <div className="chart-grid">
        <div className="chart-span-2">
          <WorkforceTrendChart employees={scoped.employees} />
        </div>
        <LeaveStatusDonut leaveRequests={scoped.leaveRequests} />
        <PerformanceRadarChart performance={scoped.performance} />
        <AttendanceRadialChart attendance={scoped.attendance} />
      </div>
    );
  }

  if (variant === 'dept-reports') {
    return (
      <div className="space-y-6">
        <div className="chart-grid">
          <div className="chart-span-2">
            <WorkforceTrendChart employees={scoped.employees} />
          </div>
          <AttendanceRadialChart attendance={scoped.attendance} />
        </div>
        <div className="chart-grid">
          <LeaveStatusDonut leaveRequests={scoped.leaveRequests} />
          <PerformanceRadarChart performance={scoped.performance} />
          <EmployeeStatusPie employees={scoped.employees} />
          <AttendanceBreakdownChart attendance={scoped.attendance} />
        </div>
        <div className="chart-grid chart-grid-3">
          <LeaveTypeBarChart leaveRequests={scoped.leaveRequests} />
          <WeeklyActivityChart />
        </div>
      </div>
    );
  }

  return null;
}
