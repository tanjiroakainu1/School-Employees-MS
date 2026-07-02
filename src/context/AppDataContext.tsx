import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  Employee,
  Department,
  Position,
  AttendanceRecord,
  LeaveRequest,
  PerformanceEvaluation,
  Task,
  Announcement,
} from '@/types';
import {
  mockEmployees,
  mockDepartments,
  mockPositions,
  mockAttendance,
  mockLeaveRequests,
  mockPerformance,
  mockTasks,
  mockAnnouncements,
  mockAuditLogs,
} from '@/data/mockData';

interface AppDataContextType {
  employees: Employee[];
  departments: Department[];
  positions: Position[];
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  performance: PerformanceEvaluation[];
  tasks: Task[];
  announcements: Announcement[];
  auditLogs: typeof mockAuditLogs;
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addDepartment: (dept: Omit<Department, 'id' | 'employeeCount'>) => void;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  addPosition: (pos: Omit<Position, 'id'>) => void;
  updatePosition: (id: string, updates: Partial<Position>) => void;
  deletePosition: (id: string) => void;
  recordAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  submitLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>) => void;
  updateLeaveRequest: (id: string, updates: Partial<Pick<LeaveRequest, 'type' | 'startDate' | 'endDate' | 'reason'>>) => void;
  deleteLeaveRequest: (id: string) => void;
  updateLeaveStatus: (id: string, status: 'approved' | 'rejected') => void;
  addPerformanceEvaluation: (eval_: Omit<PerformanceEvaluation, 'id'>) => void;
  updatePerformanceEvaluation: (id: string, updates: Partial<PerformanceEvaluation>) => void;
  deletePerformanceEvaluation: (id: string) => void;
  assignTask: (task: Omit<Task, 'id' | 'status'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  addAnnouncement: (ann: Omit<Announcement, 'id'>) => void;
}

const AppDataContext = createContext<AppDataContextType | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState(mockEmployees);
  const [departments, setDepartments] = useState(mockDepartments);
  const [positions, setPositions] = useState(mockPositions);
  const [attendance, setAttendance] = useState(mockAttendance);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [performance, setPerformance] = useState(mockPerformance);
  const [tasks, setTasks] = useState(mockTasks);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [auditLogs] = useState(mockAuditLogs);

  const addEmployee = useCallback((emp: Omit<Employee, 'id'>) => {
    const id = `E${String(employees.length + 1).padStart(3, '0')}`;
    setEmployees((prev) => [...prev, { ...emp, id }]);
  }, [employees.length]);

  const updateEmployee = useCallback((id: string, updates: Partial<Employee>) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const addDepartment = useCallback((dept: Omit<Department, 'id' | 'employeeCount'>) => {
    const id = `D${String(departments.length + 1).padStart(3, '0')}`;
    setDepartments((prev) => [...prev, { ...dept, id, employeeCount: 0 }]);
  }, [departments.length]);

  const updateDepartment = useCallback((id: string, updates: Partial<Department>) => {
    setDepartments((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  }, []);

  const deleteDepartment = useCallback((id: string) => {
    setDepartments((prev) => {
      const dept = prev.find((d) => d.id === id);
      if (dept) {
        setPositions((posPrev) => posPrev.filter((p) => p.department !== dept.name));
      }
      return prev.filter((d) => d.id !== id);
    });
  }, []);

  const addPosition = useCallback((pos: Omit<Position, 'id'>) => {
    const id = `P${String(positions.length + 1).padStart(3, '0')}`;
    setPositions((prev) => [...prev, { ...pos, id }]);
  }, [positions.length]);

  const updatePosition = useCallback((id: string, updates: Partial<Position>) => {
    setPositions((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deletePosition = useCallback((id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const recordAttendance = useCallback((record: Omit<AttendanceRecord, 'id'>) => {
    const id = `A${String(attendance.length + 1).padStart(3, '0')}`;
    setAttendance((prev) => [...prev, { ...record, id }]);
  }, [attendance.length]);

  const submitLeaveRequest = useCallback((req: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>) => {
    const id = `L${String(leaveRequests.length + 1).padStart(3, '0')}`;
    setLeaveRequests((prev) => [
      ...prev,
      { ...req, id, status: 'pending', submittedAt: new Date().toISOString().split('T')[0] },
    ]);
  }, [leaveRequests.length]);

  const updateLeaveRequest = useCallback((id: string, updates: Partial<Pick<LeaveRequest, 'type' | 'startDate' | 'endDate' | 'reason'>>) => {
    setLeaveRequests((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  }, []);

  const deleteLeaveRequest = useCallback((id: string) => {
    setLeaveRequests((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateLeaveStatus = useCallback((id: string, status: 'approved' | 'rejected') => {
    setLeaveRequests((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }, []);

  const addPerformanceEvaluation = useCallback((eval_: Omit<PerformanceEvaluation, 'id'>) => {
    const id = `PE${String(performance.length + 1).padStart(3, '0')}`;
    setPerformance((prev) => [...prev, { ...eval_, id }]);
  }, [performance.length]);

  const updatePerformanceEvaluation = useCallback((id: string, updates: Partial<PerformanceEvaluation>) => {
    setPerformance((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deletePerformanceEvaluation = useCallback((id: string) => {
    setPerformance((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const assignTask = useCallback((task: Omit<Task, 'id' | 'status'>) => {
    const id = `T${String(tasks.length + 1).padStart(3, '0')}`;
    setTasks((prev) => [...prev, { ...task, id, status: 'pending' }]);
  }, [tasks.length]);

  const updateTaskStatus = useCallback((id: string, status: Task['status']) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  const addAnnouncement = useCallback((ann: Omit<Announcement, 'id'>) => {
    const id = `AN${String(announcements.length + 1).padStart(3, '0')}`;
    setAnnouncements((prev) => [...prev, { ...ann, id }]);
  }, [announcements.length]);

  return (
    <AppDataContext.Provider
      value={{
        employees,
        departments,
        positions,
        attendance,
        leaveRequests,
        performance,
        tasks,
        announcements,
        auditLogs,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addPosition,
        updatePosition,
        deletePosition,
        recordAttendance,
        submitLeaveRequest,
        updateLeaveRequest,
        deleteLeaveRequest,
        updateLeaveStatus,
        addPerformanceEvaluation,
        updatePerformanceEvaluation,
        deletePerformanceEvaluation,
        assignTask,
        updateTaskStatus,
        addAnnouncement,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
