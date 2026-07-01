export type UserRole = 'super-admin' | 'hr-officer' | 'department-head' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  department?: string;
  position?: string;
  avatar?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  position?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on-leave';
  hireDate: string;
  phone: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  description: string;
}

export interface Position {
  id: string;
  title: string;
  department: string;
  level: string;
  salary: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: 'present' | 'late' | 'absent' | 'half-day';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'sick' | 'vacation' | 'personal' | 'emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface PerformanceEvaluation {
  id: string;
  employeeId: string;
  employeeName: string;
  evaluator: string;
  period: string;
  score: number;
  comments: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface RoleConfig {
  role: UserRole;
  label: string;
  basePath: string;
  dashboardPath: string;
  navItems: NavItem[];
}

export interface RoleAccount {
  user: User;
  password: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
}
