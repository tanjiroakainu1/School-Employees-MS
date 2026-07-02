import type { ChatContext, QuickQuestion } from '@/types/chatbot';

export const chatbotIdentity = {
  name: 'SAGE',
  fullName: 'School AI Guide & Expert',
  tagline: 'Your intelligent assistant for SEMS & beyond',
  avatar: '🎓',
};

export const quickQuestionsByContext: Record<ChatContext, QuickQuestion[]> = {
  home: [
    { id: 'h1', label: 'What is SEMS?', question: 'What is the School Employees Management System and what does it do?', category: 'System' },
    { id: 'h2', label: 'How to start?', question: 'How do I get started with this system as a new user?', category: 'Getting Started' },
    { id: 'h3', label: 'Available roles?', question: 'What user roles are available in the system and what can each one do?', category: 'Roles' },
    { id: 'h4', label: 'Leave workflow?', question: 'Explain the leave request approval workflow in this system', category: 'Workflow' },
    { id: 'h5', label: 'Demo login?', question: 'What are the demo account credentials for testing all roles?', category: 'Demo' },
    { id: 'h6', label: 'Key features?', question: 'What are the main features and modules of this system?', category: 'Features' },
    { id: 'h7', label: 'Attendance module?', question: 'How does attendance tracking work in SEMS?', category: 'Features' },
    { id: 'h8', label: 'Performance reviews?', question: 'How do performance evaluations work in this system?', category: 'Features' },
    { id: 'h9', label: 'Who is SAGE?', question: 'Who are you and what can SAGE help me with?', category: 'Help' },
    { id: 'h10', label: 'Mobile friendly?', question: 'Is SEMS responsive and how does mobile navigation work?', category: 'System' },
    { id: 'h11', label: 'Demo data stats?', question: 'How many employees and departments are in the demo data?', category: 'Data' },
    { id: 'h12', label: 'Is it secure?', question: 'What security features does SEMS have for school data?', category: 'Security' },
    { id: 'h13', label: 'HR trends 2026?', question: 'What are the latest HR trends in education for 2026?', category: 'World' },
    { id: 'h14', label: 'Teacher burnout?', question: 'What are tips to prevent teacher burnout in schools worldwide?', category: 'World' },
    { id: 'h15', label: 'Who built SEMS?', question: 'Who is the developer of the School Employees Management System?', category: 'Developer' },
  ],
  login: [
    { id: 'l1', label: 'How to sign in?', question: 'How do I sign in to the system step by step?', category: 'Auth' },
    { id: 'l2', label: 'Create account?', question: 'How do I register and create a new account?', category: 'Auth' },
    { id: 'l3', label: 'Demo password?', question: 'What is the demo password for all test accounts?', category: 'Demo' },
    { id: 'l4', label: 'Quick access?', question: 'How does quick access demo login work for all roles?', category: 'Demo' },
    { id: 'l5', label: 'Which role?', question: 'How do I know which role to select when logging in?', category: 'Roles' },
    { id: 'l6', label: 'All demo emails?', question: 'List all demo account emails for Super Admin, HR, Department Head, and Employee', category: 'Demo' },
    { id: 'l7', label: 'Super Admin demo?', question: 'What is the Super Admin demo email and password?', category: 'Demo' },
    { id: 'l8', label: 'HR demo login?', question: 'What is the HR Officer demo email and how do I log in quickly?', category: 'Demo' },
    { id: 'l9', label: 'Employee demo?', question: 'What is the Employee demo account email and password?', category: 'Demo' },
    { id: 'l10', label: 'Register fields?', question: 'What fields are required when registering a new account?', category: 'Auth' },
    { id: 'l11', label: 'After login?', question: 'Where do I go after signing in successfully?', category: 'Auth' },
    { id: 'l12', label: 'Forgot password?', question: 'What should I do if I forgot my password in this demo system?', category: 'Help' },
    { id: 'l13', label: 'Sidebar nav?', question: 'How does sidebar navigation work after I log in?', category: 'System' },
    { id: 'l14', label: 'Who is SAGE?', question: 'Who is SAGE and how can the AI assistant help me?', category: 'Help' },
  ],
  register: [
    { id: 'r1', label: 'How to register?', question: 'How do I register and create a new account step by step?', category: 'Auth' },
    { id: 'r2', label: 'Required fields?', question: 'What fields are required when registering a new account?', category: 'Auth' },
    { id: 'r3', label: 'Which role?', question: 'How do I choose the right role when registering?', category: 'Roles' },
    { id: 'r4', label: 'After register?', question: 'Where do I go after creating an account successfully?', category: 'Auth' },
    { id: 'r5', label: 'Already have account?', question: 'How do I sign in if I already have an account?', category: 'Auth' },
    { id: 'r6', label: 'Demo access?', question: 'Can I try demo accounts without registering?', category: 'Demo' },
    { id: 'r7', label: 'Demo password?', question: 'What is the demo password for all test accounts?', category: 'Demo' },
    { id: 'r8', label: 'Available roles?', question: 'What user roles can I register as in SEMS?', category: 'Roles' },
    { id: 'r9', label: 'Password rules?', question: 'What are the password requirements for registration?', category: 'Auth' },
    { id: 'r10', label: 'Who is SAGE?', question: 'Who is SAGE and how can the AI assistant help me?', category: 'Help' },
  ],
  guest: [
    { id: 'g1', label: 'Help me navigate', question: 'Can you help me navigate this School Employees Management System?', category: 'Help' },
    { id: 'g2', label: 'System overview', question: 'Give me a complete overview of the SEMS platform', category: 'System' },
    { id: 'g3', label: 'Demo credentials', question: 'What are all demo login credentials for every role?', category: 'Demo' },
    { id: 'g4', label: 'Available roles', question: 'What roles exist in SEMS and what can each role do?', category: 'Roles' },
    { id: 'g5', label: 'Leave workflow', question: 'Explain the leave approval workflow from employee to HR', category: 'Workflow' },
    { id: 'g6', label: 'How to login', question: 'How do I sign in or use quick access demo login?', category: 'Auth' },
    { id: 'g7', label: 'Key features', question: 'What are the main SEMS modules and features?', category: 'Features' },
    { id: 'g8', label: 'Who is SAGE?', question: 'Who are you and what questions can I ask you?', category: 'Help' },
  ],
  'super-admin': [
    { id: 'sa1', label: 'Dashboard?', question: 'What can I see and do on the Super Admin dashboard?', category: 'Dashboard' },
    { id: 'sa2', label: 'Manage users?', question: 'How do I manage users and add new accounts as Super Admin?', category: 'Users' },
    { id: 'sa3', label: 'Delete users?', question: 'How do I remove or delete a user as Super Admin?', category: 'Users' },
    { id: 'sa4', label: 'Manage roles?', question: 'How do I manage roles and permissions as Super Admin?', category: 'Security' },
    { id: 'sa5', label: 'Analytics charts?', question: 'What analytics charts are available on the Super Admin dashboard and reports?', category: 'Reports' },
    { id: 'sa6', label: 'Departments?', question: 'How do I create and manage departments as Super Admin?', category: 'Departments' },
    { id: 'sa7', label: 'All employees?', question: 'How can Super Admin view and manage all employee records?', category: 'Employees' },
    { id: 'sa8', label: 'System reports?', question: 'What system-wide reports can Super Admin generate?', category: 'Reports' },
    { id: 'sa9', label: 'Export reports?', question: 'How do I export system reports as Super Admin?', category: 'Reports' },
    { id: 'sa10', label: 'Audit logs?', question: 'Does the system track audit logs and activity monitoring?', category: 'Security' },
    { id: 'sa11', label: 'Workforce charts?', question: 'What workforce analytics charts are on the Super Admin dashboard?', category: 'Reports' },
    { id: 'sa12', label: 'Departments overview?', question: 'How does Super Admin manage school departments and employee counts?', category: 'Departments' },
    { id: 'sa13', label: 'Demo data stats?', question: 'How many employees and departments are in the demo data?', category: 'Data' },
    { id: 'sa14', label: 'Sidebar features?', question: 'List all Super Admin sidebar features and what each one does', category: 'Navigation' },
    { id: 'sa15', label: 'Cybersecurity tips?', question: 'What are best practices for school data security in 2026?', category: 'World' },
    { id: 'sa16', label: 'Cloud vs on-prem?', question: 'What are pros and cons of cloud vs on-premise school management systems?', category: 'World' },
  ],
  'hr-officer': [
    { id: 'hr1', label: 'HR dashboard?', question: 'What can I see and do on the HR Officer dashboard?', category: 'Dashboard' },
    { id: 'hr2', label: 'Register employee?', question: 'How do I register a new employee as HR Officer?', category: 'HR' },
    { id: 'hr3', label: 'Departments?', question: 'How do I manage departments and job positions as HR?', category: 'HR' },
    { id: 'hr4', label: 'Onboarding?', question: 'Explain the hiring and onboarding process in the HR module', category: 'HR' },
    { id: 'hr5', label: 'Onboarding steps?', question: 'What are the onboarding checklist steps for new hires?', category: 'HR' },
    { id: 'hr6', label: 'Approve leave?', question: 'How do I approve or reject leave requests as HR?', category: 'Leave' },
    { id: 'hr7', label: 'Leave types?', question: 'What leave types can employees request in SEMS?', category: 'Leave' },
    { id: 'hr8', label: 'Pending leaves?', question: 'How many leave requests are currently pending in the demo data?', category: 'Data' },
    { id: 'hr9', label: 'Record attendance?', question: 'How do I record and manage employee attendance as HR?', category: 'Attendance' },
    { id: 'hr10', label: 'Attendance statuses?', question: 'What attendance statuses can HR record in the system?', category: 'Attendance' },
    { id: 'hr11', label: 'Performance eval?', question: 'How do I conduct performance evaluations as HR Officer?', category: 'Performance' },
    { id: 'hr12', label: 'HR reports?', question: 'What HR reports can I generate in the system?', category: 'Reports' },
    { id: 'hr13', label: 'Recent hires?', question: 'How do I view recent hires in the hiring and onboarding module?', category: 'HR' },
    { id: 'hr14', label: 'Sidebar features?', question: 'List all HR Officer sidebar features and what each one does', category: 'Navigation' },
    { id: 'hr15', label: 'HR best practices?', question: 'What are global HR best practices for school employee management?', category: 'World' },
    { id: 'hr16', label: 'Interview tips?', question: 'What are effective teacher interview questions used worldwide?', category: 'World' },
  ],
  'department-head': [
    { id: 'dh1', label: 'Dept dashboard?', question: 'What can I see on the Department Head dashboard?', category: 'Dashboard' },
    { id: 'dh2', label: 'View my team?', question: 'How do I view employees in my department as Department Head?', category: 'Team' },
    { id: 'dh3', label: 'Monitor attendance?', question: 'How do I monitor department attendance as Department Head?', category: 'Attendance' },
    { id: 'dh4', label: 'Attendance stats?', question: 'What attendance statistics can I see for my department?', category: 'Attendance' },
    { id: 'dh5', label: 'Review leave?', question: 'How do I approve or recommend leave requests for my department?', category: 'Leave' },
    { id: 'dh6', label: 'Assign tasks?', question: 'How do I assign tasks to department employees?', category: 'Tasks' },
    { id: 'dh7', label: 'Task priorities?', question: 'What task priority levels can I set when assigning tasks?', category: 'Tasks' },
    { id: 'dh8', label: 'Evaluate staff?', question: 'How do I evaluate employee performance in my department?', category: 'Performance' },
    { id: 'dh9', label: 'Dept reports?', question: 'What department reports are available for Department Head?', category: 'Reports' },
    { id: 'dh10', label: 'Export reports?', question: 'How do I export department employee and attendance reports?', category: 'Reports' },
    { id: 'dh11', label: 'Recommendations?', question: 'How do I submit employee recommendations as Department Head?', category: 'HR' },
    { id: 'dh12', label: 'Science dept info?', question: 'Tell me about the Science department in the demo data', category: 'Data' },
    { id: 'dh13', label: 'Sidebar features?', question: 'List all Department Head sidebar features and what each one does', category: 'Navigation' },
    { id: 'dh14', label: 'Leadership tips?', question: 'What are effective department head leadership strategies in schools?', category: 'World' },
    { id: 'dh15', label: 'Team motivation?', question: 'How can department heads motivate teachers effectively?', category: 'World' },
    { id: 'dh16', label: 'Conflict resolution?', question: 'How should department heads handle staff conflicts in schools?', category: 'World' },
  ],
  employee: [
    { id: 'em1', label: 'My dashboard?', question: 'What can I see on the Employee dashboard?', category: 'Dashboard' },
    { id: 'em2', label: 'Update profile?', question: 'How do I view and update my personal profile as an employee?', category: 'Profile' },
    { id: 'em3', label: 'Work schedule?', question: 'Where can I see my work schedule and today\'s classes?', category: 'Schedule' },
    { id: 'em4', label: 'Check attendance?', question: 'How do I view my attendance records and stats?', category: 'Attendance' },
    { id: 'em5', label: 'Submit leave?', question: 'How do I submit a leave request as an employee?', category: 'Leave' },
    { id: 'em6', label: 'Leave types?', question: 'What leave types can I request as an employee?', category: 'Leave' },
    { id: 'em7', label: 'Leave status?', question: 'How do I check the status of my leave requests?', category: 'Leave' },
    { id: 'em8', label: 'Performance reviews?', question: 'How do I view my performance evaluations and scores?', category: 'Performance' },
    { id: 'em9', label: 'Download docs?', question: 'How do I download my employment documents?', category: 'Documents' },
    { id: 'em10', label: 'Announcements?', question: 'Where do I see school announcements and news?', category: 'News' },
    { id: 'em11', label: 'My tasks?', question: 'How do I see tasks assigned to me by my department head?', category: 'Tasks' },
    { id: 'em12', label: 'Edit contact info?', question: 'Can I update my phone number and address in my profile?', category: 'Profile' },
    { id: 'em13', label: 'Sidebar features?', question: 'List all Employee sidebar features and what each one does', category: 'Navigation' },
    { id: 'em14', label: 'Work-life balance?', question: 'What are tips for teachers to maintain work-life balance?', category: 'World' },
    { id: 'em15', label: 'Professional growth?', question: 'What professional development opportunities exist for school teachers globally?', category: 'World' },
    { id: 'em16', label: 'Classroom tips?', question: 'What are effective classroom management tips for teachers?', category: 'World' },
  ],
};

export function getQuickQuestions(context: ChatContext): QuickQuestion[] {
  return quickQuestionsByContext[context] || quickQuestionsByContext.guest;
}

export function detectChatContext(pathname: string, userRole?: string | null): ChatContext {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname.startsWith('/register')) return 'register';
  if (pathname.startsWith('/login')) return 'login';
  if (userRole === 'super-admin') return 'super-admin';
  if (userRole === 'hr-officer') return 'hr-officer';
  if (userRole === 'department-head') return 'department-head';
  if (userRole === 'employee') return 'employee';
  return 'guest';
}

/** Group quick questions by category for display */
export function groupQuickQuestions(questions: QuickQuestion[]): { category: string; items: QuickQuestion[] }[] {
  const map = new Map<string, QuickQuestion[]>();
  for (const q of questions) {
    const cat = q.category || 'General';
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(q);
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
}
