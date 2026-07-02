import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import GuestRoute from '@/components/layout/GuestRoute';
import RoleLayout from '@/components/layout/RoleLayout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

import SuperAdminDashboard from '@/roles/super-admin/SuperAdminDashboard';
import ManageUsers from '@/roles/super-admin/ManageUsers';
import ManageRoles from '@/roles/super-admin/ManageRoles';
import SuperAdminDepartments from '@/roles/super-admin/SuperAdminDepartments';
import AllEmployees from '@/roles/super-admin/AllEmployees';
import SystemReports from '@/roles/super-admin/SystemReports';

import HROfficerDashboard from '@/roles/hr-officer/HROfficerDashboard';
import RegisterEmployee from '@/roles/hr-officer/RegisterEmployee';
import HRDepartments from '@/roles/hr-officer/HRDepartments';
import HiringOnboarding from '@/roles/hr-officer/HiringOnboarding';
import HRLeaveApproval from '@/roles/hr-officer/HRLeaveApproval';
import HRAttendanceManagement from '@/roles/hr-officer/HRAttendanceManagement';
import HRPerformanceEvaluations from '@/roles/hr-officer/HRPerformanceEvaluations';
import HRReports from '@/roles/hr-officer/HRReports';

import DepartmentHeadDashboard from '@/roles/department-head/DepartmentHeadDashboard';
import DepartmentEmployees from '@/roles/department-head/DepartmentEmployees';
import DeptAttendanceMonitoring from '@/roles/department-head/DeptAttendanceMonitoring';
import DeptLeaveRequests from '@/roles/department-head/DeptLeaveRequests';
import TaskAssignment from '@/roles/department-head/TaskAssignment';
import DeptPerformanceEvaluation from '@/roles/department-head/DeptPerformanceEvaluation';
import DepartmentReports from '@/roles/department-head/DepartmentReports';
import EmployeeRecommendations from '@/roles/department-head/EmployeeRecommendations';

import EmployeeDashboard from '@/roles/employee/EmployeeDashboard';
import PersonalProfile from '@/roles/employee/PersonalProfile';
import WorkSchedule from '@/roles/employee/WorkSchedule';
import EmployeeAttendance from '@/roles/employee/EmployeeAttendance';
import EmployeeLeaveRequests from '@/roles/employee/EmployeeLeaveRequests';
import EmployeePerformance from '@/roles/employee/EmployeePerformance';
import EmployeeDocuments from '@/roles/employee/EmployeeDocuments';
import EmployeeAnnouncements from '@/roles/employee/EmployeeAnnouncements';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes for non-authenticated users */}
      <Route element={<PublicLayout />}>
        <Route
          index
          element={
            <GuestRoute>
              <HomePage />
            </GuestRoute>
          }
        />
        <Route
          path="login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
      </Route>

      {/* Protected role routes */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute allowedRole="super-admin">
            <RoleLayout role="super-admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="roles" element={<ManageRoles />} />
        <Route path="departments" element={<SuperAdminDepartments />} />
        <Route path="employees" element={<AllEmployees />} />
        <Route path="reports" element={<SystemReports />} />
      </Route>

      <Route
        path="/hr-officer"
        element={
          <ProtectedRoute allowedRole="hr-officer">
            <RoleLayout role="hr-officer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<HROfficerDashboard />} />
        <Route path="register" element={<RegisterEmployee />} />
        <Route path="departments" element={<HRDepartments />} />
        <Route path="hiring" element={<HiringOnboarding />} />
        <Route path="leave" element={<HRLeaveApproval />} />
        <Route path="attendance" element={<HRAttendanceManagement />} />
        <Route path="performance" element={<HRPerformanceEvaluations />} />
        <Route path="reports" element={<HRReports />} />
      </Route>

      <Route
        path="/department-head"
        element={
          <ProtectedRoute allowedRole="department-head">
            <RoleLayout role="department-head" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DepartmentHeadDashboard />} />
        <Route path="employees" element={<DepartmentEmployees />} />
        <Route path="attendance" element={<DeptAttendanceMonitoring />} />
        <Route path="leave" element={<DeptLeaveRequests />} />
        <Route path="tasks" element={<TaskAssignment />} />
        <Route path="performance" element={<DeptPerformanceEvaluation />} />
        <Route path="reports" element={<DepartmentReports />} />
        <Route path="recommendations" element={<EmployeeRecommendations />} />
      </Route>

      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="employee">
            <RoleLayout role="employee" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<PersonalProfile />} />
        <Route path="schedule" element={<WorkSchedule />} />
        <Route path="attendance" element={<EmployeeAttendance />} />
        <Route path="leave" element={<EmployeeLeaveRequests />} />
        <Route path="performance" element={<EmployeePerformance />} />
        <Route path="documents" element={<EmployeeDocuments />} />
        <Route path="announcements" element={<EmployeeAnnouncements />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
