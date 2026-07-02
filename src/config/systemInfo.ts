export const systemFlowSteps = [
  {
    step: 1,
    title: 'Register or Sign In',
    description: 'Create an account or sign in with your school email. Select your role — Super Admin, HR Officer, Department Head, or Employee.',
    icon: 'login',
  },
  {
    step: 2,
    title: 'Role-Based Routing',
    description: 'The system automatically routes you to your role-specific dashboard with tailored navigation and permissions.',
    icon: 'route',
  },
  {
    step: 3,
    title: 'Manage Daily Operations',
    description: 'Use your sidebar to access features — manage employees, track attendance, process leave, evaluate performance, and more.',
    icon: 'work',
  },
  {
    step: 4,
    title: 'Workflows & Approvals',
    description: 'Employees submit requests → Department Heads review → HR Officers approve → System notifies all parties.',
    icon: 'flow',
  },
  {
    step: 5,
    title: 'Reports & Analytics',
    description: 'Generate reports, view dashboards, and monitor school-wide or department-level metrics in real time.',
    icon: 'chart',
  },
];

export const systemFeatures = [
  { title: 'User Management', description: 'Registration, login, role-based access control, and profile management.', icon: 'users' },
  { title: 'Employee Records', description: 'Register staff, manage profiles, employment history, and department assignments.', icon: 'id' },
  { title: 'Attendance Tracking', description: 'Daily time-in/out, late & absence monitoring, and attendance reports.', icon: 'clock' },
  { title: 'Leave Management', description: 'Submit, approve, and track leave requests with balance and history.', icon: 'calendar' },
  { title: 'Performance Reviews', description: 'Conduct evaluations, scoring, supervisor comments, and history.', icon: 'star' },
  { title: 'Department Management', description: 'Create departments, assign employees, and view department reports.', icon: 'building' },
  { title: 'Document Storage', description: 'Employment contracts, certificates, and digital file management.', icon: 'doc' },
  { title: 'Notifications', description: 'Leave approvals, attendance reminders, and school announcements.', icon: 'bell' },
];

export const roleSummaries = [
  {
    role: 'super-admin',
    label: 'Super Admin',
    gradient: 'from-green-600 to-emerald-700',
    features: ['Full system access', 'Manage users & roles', 'Departments & employees', 'Analytics & reports'],
  },
  {
    role: 'hr-officer',
    label: 'HR Officer',
    gradient: 'from-lime-500 to-green-600',
    features: ['Register employees', 'Hiring & onboarding', 'Approve leave', 'Attendance records', 'HR reports'],
  },
  {
    role: 'department-head',
    label: 'Department Head',
    gradient: 'from-emerald-400 to-teal-500',
    features: ['View team members', 'Monitor attendance', 'Review leave', 'Assign tasks', 'Department reports'],
  },
  {
    role: 'employee',
    label: 'Employee',
    gradient: 'from-primary-400 to-accent-500',
    features: ['Personal profile', 'Work schedule', 'Submit leave', 'View performance', 'Download documents'],
  },
];
