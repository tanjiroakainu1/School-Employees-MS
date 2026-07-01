import type {
  Employee,
  Department,
  Position,
  AttendanceRecord,
  LeaveRequest,
  PerformanceEvaluation,
  Task,
  Announcement,
  Document,
  AuditLog,
  User,
} from '@/types';
import { roleAccounts, DEMO_PASSWORD } from '@/config/roleAccounts';

export const mockUsers: User[] = roleAccounts.map((a) => ({
  ...a.user,
  password: a.password,
}));

export const defaultPassword = DEMO_PASSWORD;

export const mockEmployees: Employee[] = [
  { id: 'E001', name: 'Emily Davis', email: 'employee@school.edu', department: 'Science', position: 'Teacher', status: 'active', hireDate: '2020-08-15', phone: '555-0101' },
  { id: 'E002', name: 'James Wilson', email: 'james@school.edu', department: 'Mathematics', position: 'Teacher', status: 'active', hireDate: '2019-01-10', phone: '555-0102' },
  { id: 'E003', name: 'Lisa Anderson', email: 'lisa@school.edu', department: 'English', position: 'Teacher', status: 'on-leave', hireDate: '2021-03-22', phone: '555-0103' },
  { id: 'E004', name: 'Robert Brown', email: 'robert@school.edu', department: 'Administration', position: 'Clerk', status: 'active', hireDate: '2018-06-01', phone: '555-0104' },
  { id: 'E005', name: 'Maria Garcia', email: 'maria@school.edu', department: 'Science', position: 'Lab Assistant', status: 'active', hireDate: '2022-09-05', phone: '555-0105' },
];

export const mockDepartments: Department[] = [
  { id: 'D001', name: 'Science', head: 'Michael Chen', employeeCount: 12, description: 'Science department covering physics, chemistry, and biology.' },
  { id: 'D002', name: 'Mathematics', head: 'James Wilson', employeeCount: 8, description: 'Mathematics and statistics department.' },
  { id: 'D003', name: 'English', head: 'Lisa Anderson', employeeCount: 10, description: 'English language and literature department.' },
  { id: 'D004', name: 'Administration', head: 'Robert Brown', employeeCount: 15, description: 'School administrative and support staff.' },
];

export const mockPositions: Position[] = [
  { id: 'P001', title: 'Teacher', department: 'Science', level: 'Senior', salary: 55000 },
  { id: 'P002', title: 'Lab Assistant', department: 'Science', level: 'Junior', salary: 35000 },
  { id: 'P003', title: 'Department Head', department: 'Science', level: 'Lead', salary: 75000 },
  { id: 'P004', title: 'Clerk', department: 'Administration', level: 'Junior', salary: 30000 },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'A001', employeeId: 'E001', employeeName: 'Emily Davis', date: '2026-07-01', timeIn: '07:45', timeOut: '16:30', status: 'present' },
  { id: 'A002', employeeId: 'E002', employeeName: 'James Wilson', date: '2026-07-01', timeIn: '08:15', timeOut: '16:00', status: 'late' },
  { id: 'A003', employeeId: 'E003', employeeName: 'Lisa Anderson', date: '2026-07-01', timeIn: '-', timeOut: '-', status: 'absent' },
  { id: 'A004', employeeId: 'E004', employeeName: 'Robert Brown', date: '2026-07-01', timeIn: '07:30', timeOut: '16:45', status: 'present' },
  { id: 'A005', employeeId: 'E005', employeeName: 'Maria Garcia', date: '2026-07-01', timeIn: '07:50', timeOut: '12:00', status: 'half-day' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: 'L001', employeeId: 'E001', employeeName: 'Emily Davis', type: 'vacation', startDate: '2026-07-10', endDate: '2026-07-15', reason: 'Family vacation', status: 'pending', submittedAt: '2026-06-28' },
  { id: 'L002', employeeId: 'E003', employeeName: 'Lisa Anderson', type: 'sick', startDate: '2026-07-01', endDate: '2026-07-05', reason: 'Medical recovery', status: 'approved', submittedAt: '2026-06-30' },
  { id: 'L003', employeeId: 'E002', employeeName: 'James Wilson', type: 'personal', startDate: '2026-07-20', endDate: '2026-07-21', reason: 'Personal matters', status: 'pending', submittedAt: '2026-07-01' },
];

export const mockPerformance: PerformanceEvaluation[] = [
  { id: 'PE001', employeeId: 'E001', employeeName: 'Emily Davis', evaluator: 'Michael Chen', period: 'Q2 2026', score: 92, comments: 'Excellent teaching performance and student engagement.', date: '2026-06-30' },
  { id: 'PE002', employeeId: 'E005', employeeName: 'Maria Garcia', evaluator: 'Michael Chen', period: 'Q2 2026', score: 85, comments: 'Good lab management skills, room for improvement in documentation.', date: '2026-06-28' },
];

export const mockTasks: Task[] = [
  { id: 'T001', title: 'Prepare Lab Equipment', description: 'Set up chemistry lab for next week experiments', assignedTo: 'Maria Garcia', assignedBy: 'Michael Chen', dueDate: '2026-07-05', status: 'in-progress', priority: 'high' },
  { id: 'T002', title: 'Grade Assignments', description: 'Grade and submit midterm exam results', assignedTo: 'Emily Davis', assignedBy: 'Michael Chen', dueDate: '2026-07-08', status: 'pending', priority: 'medium' },
];

export const mockAnnouncements: Announcement[] = [
  { id: 'AN001', title: 'School Year Opening Ceremony', content: 'The opening ceremony will be held on August 15, 2026. All employees are required to attend.', date: '2026-07-01', author: 'Administration' },
  { id: 'AN002', title: 'New Health Protocols', content: 'Updated health and safety protocols are now in effect. Please review the employee handbook.', date: '2026-06-28', author: 'HR Department' },
  { id: 'AN003', title: 'Professional Development Workshop', content: 'Registration is open for the August professional development workshop on classroom technology.', date: '2026-06-25', author: 'HR Department' },
];

export const mockDocuments: Document[] = [
  { id: 'DOC001', name: 'Employment Contract', type: 'PDF', uploadDate: '2020-08-15', size: '245 KB' },
  { id: 'DOC002', name: 'Teaching Certificate', type: 'PDF', uploadDate: '2020-08-10', size: '180 KB' },
  { id: 'DOC003', name: 'Background Check', type: 'PDF', uploadDate: '2020-08-01', size: '120 KB' },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'AL001', action: 'User Login', user: 'Admin User', timestamp: '2026-07-02 08:00:00', details: 'Successful login from 192.168.1.1' },
  { id: 'AL002', action: 'Employee Created', user: 'Sarah Johnson', timestamp: '2026-07-01 14:30:00', details: 'Created employee Maria Garcia (E005)' },
  { id: 'AL003', action: 'Leave Approved', user: 'Sarah Johnson', timestamp: '2026-06-30 10:15:00', details: 'Approved leave request L002 for Lisa Anderson' },
  { id: 'AL004', action: 'Settings Updated', user: 'Admin User', timestamp: '2026-06-29 16:45:00', details: 'Updated system notification settings' },
];
