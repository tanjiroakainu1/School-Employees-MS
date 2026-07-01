import type { KnowledgeEntry } from '@/types/chatbot';
import { DEMO_PASSWORD, roleAccounts } from '@/config/roleAccounts';
import { roleConfigs } from '@/config/roleConfig';
import { systemFeatures, systemFlowSteps, roleSummaries } from '@/config/systemInfo';
import { mockEmployees, mockDepartments, mockLeaveRequests, mockAttendance } from '@/data/mockData';

function sidebarList(role: keyof typeof roleConfigs): string {
  return roleConfigs[role].navItems.map((n, i) => `${i + 1}. **${n.label}**`).join('\n');
}

export const knowledgeBase: KnowledgeEntry[] = [
  // === SYSTEM OVERVIEW ===
  {
    keywords: ['what is sems', 'what is this system', 'school employees management', 'about the system', 'platform overview'],
    category: 'system',
    answer: `**School Employees Management System (SEMS)** is a comprehensive platform for managing school personnel. It handles:\n\n• Employee registration & profiles\n• Daily attendance tracking\n• Leave request workflows\n• Performance evaluations\n• Department management\n• Document storage\n• Role-based dashboards\n• Reports & analytics\n\nBuilt with React, TypeScript, and Tailwind CSS — it supports **4 roles**: Super Admin, HR Officer, Department Head, and Employee.\n\n🚀 **Developed by Raminder Jangao** — Lead Developer & System Architect.`,
  },
  {
    keywords: ['features', 'modules', 'main features', 'what can', 'capabilities'],
    category: 'system',
    answer: `**SEMS Modules:**\n\n${systemFeatures.map((f, i) => `${i + 1}. **${f.title}** — ${f.description}`).join('\n')}\n\nEach module is accessible through role-specific sidebar navigation with full CRUD interactions.`,
  },
  {
    keywords: ['how to get started', 'get started', 'new user', 'begin', 'first time'],
    category: 'system',
    answer: `**Getting Started with SEMS:**\n\n${systemFlowSteps.map((s) => `**Step ${s.step}: ${s.title}**\n${s.description}`).join('\n\n')}\n\n👉 Visit **Home** → Click **Get Started** → Register or use **Quick Access** demo login!`,
  },
  {
    keywords: ['leave workflow', 'leave approval', 'leave process', 'how leave works'],
    category: 'system',
    answer: `**Leave Request Workflow:**\n\n1️⃣ **Employee** submits leave request (type, dates, reason)\n2️⃣ **Department Head** reviews & recommends approve/reject\n3️⃣ **HR Officer** gives final approval or rejection\n4️⃣ **System** updates status & notifies all parties\n\nStatuses: \`pending\` → \`approved\` or \`rejected\`\n\nDemo data: ${mockLeaveRequests.filter(l => l.status === 'pending').length} pending, ${mockLeaveRequests.filter(l => l.status === 'approved').length} approved requests.`,
  },
  {
    keywords: ['roles', 'user roles', 'four roles', 'available roles', 'which role'],
    category: 'system',
    answer: `**4 User Roles in SEMS:**\n\n${roleSummaries.map((r) => `🎯 **${r.label}**\n${r.features.map(f => `   • ${f}`).join('\n')}`).join('\n\n')}\n\nEach role has a dedicated dashboard, sidebar navigation, and permission set.`,
  },
  {
    keywords: ['demo', 'demo password', 'demo account', 'demo login', 'test account', 'credentials'],
    category: 'system',
    answer: `**Demo Accounts** (password: \`${DEMO_PASSWORD}\` for all):\n\n${roleAccounts.map((a) => `• **${a.user.name}** (${roleSummaries.find(r => r.role === a.user.role)?.label})\n  📧 ${a.user.email}\n  🏢 ${a.user.department} · ${a.user.position}`).join('\n\n')}\n\nUse **Quick Access** on the login page for one-click dashboard entry!`,
  },
  {
    keywords: ['demo emails', 'all demo', 'list demo', 'email addresses'],
    category: 'system',
    answer: `**All Demo Emails:**\n\n• Super Admin: admin@school.edu\n• HR Officer: hr@school.edu\n• Department Head: depthead@school.edu\n• Employee: employee@school.edu\n\nPassword for all: \`${DEMO_PASSWORD}\``,
  },
  {
    keywords: ['sign in', 'login', 'how to login', 'how do i sign'],
    category: 'system',
    answer: `**How to Sign In:**\n\n1. Go to **/login**\n2. Enter your email & password\n3. Select your **role**\n4. Click **Sign In to Dashboard**\n\n**Or** use Quick Access cards for instant demo login!\n\nDemo password: \`${DEMO_PASSWORD}\``,
  },
  {
    keywords: ['register', 'create account', 'sign up', 'new account'],
    category: 'system',
    answer: `**Create Account:**\n\n1. Go to **/register**\n2. Fill in: Name, Email, Password\n3. Optionally add Department & Position\n4. Select your **Role**\n5. Click **Create Account & Continue**\n\nYou'll be auto-routed to your role dashboard!`,
  },
  {
    keywords: ['forgot password', 'reset password', 'lost password'],
    category: 'system',
    answer: `In this **demo system**, all accounts use password: \`${DEMO_PASSWORD}\`\n\nFor registered accounts, passwords are stored locally. In production, you'd integrate email-based password reset. Contact your Super Admin for account recovery.`,
  },
  {
    keywords: ['navigate', 'navigation', 'sidebar', 'hamburger', 'menu'],
    category: 'system',
    answer: `**Navigation Guide:**\n\n• **Public pages**: Top navbar (Home, How It Works, Roles, Features)\n• **Role dashboards**: Left **sidebar** with all features\n• **Mobile**: Tap **☰ hamburger** to open/close sidebar\n• **Desktop**: Sidebar always visible; hamburger collapses it\n\nI'm SAGE — always here in the bottom-right corner! 💬`,
  },
  {
    keywords: ['quick access', 'one click', 'instant login'],
    category: 'system',
    answer: `**Quick Access** lets you enter any role dashboard instantly:\n\n1. Go to **/login**\n2. Click any role card (Super Admin, HR, Dept Head, Employee)\n3. You're logged in with pre-loaded demo data!\n\nNo typing needed — perfect for demos and testing.`,
  },

  // === SUPER ADMIN ===
  {
    keywords: ['manage users', 'add user', 'users admin', 'create user'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Manage Users (Super Admin):**\n\n📍 Sidebar → **Manage Users**\n\n• View all system users in a table\n• Click **Add User** to create new accounts\n• Set name, email, and role\n• Delete users with the Remove button\n\nDemo users: ${roleAccounts.length} pre-configured accounts.`,
  },
  {
    keywords: ['system settings', 'configure settings', 'settings admin'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**System Settings (Super Admin):**\n\n📍 Sidebar → **System Settings**\n\nConfigure:\n• School name\n• Email notifications\n• Attendance reminders\n• Leave auto-approve\n• Session timeout (15/30/60 min)\n• Backup frequency (daily/weekly/monthly)`,
  },
  {
    keywords: ['backup', 'restore', 'backup data'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Backup & Restore (Super Admin):**\n\n📍 Sidebar → **Backup & Restore**\n\n• **Create Backup** — Full system data snapshot\n• **Restore** — Recover from last backup\n• Shows last backup timestamp\n\n⚠️ Restore overwrites current data — use carefully!`,
  },
  {
    keywords: ['manage roles', 'permissions', 'access control', 'rbac'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Manage Roles (Super Admin):**\n\n📍 Sidebar → **Manage Roles**\n\nView all 4 roles with their permissions:\n• Super Admin — Full system access\n• HR Officer — Employee & HR management\n• Department Head — Team oversight\n• Employee — Personal portal\n\nClick any role card to view detailed permissions.`,
  },
  {
    keywords: ['audit log', 'activity monitoring', 'audit'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Audit Logs:**\n\nThe Super Admin dashboard shows **Recent Activity** including:\n• User logins\n• Employee creation\n• Leave approvals\n• Settings updates\n\nFull audit log module tracks all system actions with timestamps.`,
  },
  {
    keywords: ['all employees admin', 'employee records admin'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**All Employees (Super Admin):**\n\n📍 Sidebar → **All Employees**\n\nView system-wide employee table:\n• ${mockEmployees.length} employees in demo data\n• ${mockEmployees.filter(e => e.status === 'active').length} active, ${mockEmployees.filter(e => e.status === 'on-leave').length} on leave\n• Filter by department, remove employees\n\nDepartments: ${mockDepartments.map(d => d.name).join(', ')}`,
  },

  // === HR OFFICER ===
  {
    keywords: ['register employee', 'add employee', 'new employee hr'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Register Employee (HR):**\n\n📍 Sidebar → **Register Employee**\n\nFill in:\n• Full name & email\n• Phone number\n• Hire date\n• Department (dropdown)\n• Position (dropdown)\n\nClick **Register Employee** — they appear in the system immediately!`,
  },
  {
    keywords: ['approve leave', 'reject leave', 'leave approval hr'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Leave Approval (HR):**\n\n📍 Sidebar → **Leave Approval**\n\n• View all leave requests in table\n• See employee, type, dates, reason, status\n• Click **Approve** or **Reject** for pending requests\n\nCurrently pending: ${mockLeaveRequests.filter(l => l.status === 'pending').length} requests in demo.`,
  },
  {
    keywords: ['onboarding', 'hiring', 'hire process'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Hiring & Onboarding (HR):**\n\n📍 Sidebar → **Hiring & Onboarding**\n\n• View recent hires (last 6 months)\n• Select employee for onboarding checklist:\n  ✅ Document Verification\n  ✅ Orientation Schedule\n  ✅ Equipment Assignment\n  ✅ System Access Setup\n• Track progress percentage`,
  },
  {
    keywords: ['record attendance', 'attendance hr', 'manage attendance'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Attendance Management (HR):**\n\n📍 Sidebar → **Attendance**\n\n• Click **Record Attendance** to add new entry\n• Select employee, date, time in/out, status\n• Statuses: Present, Late, Absent, Half Day\n\nToday demo: ${mockAttendance.filter(a => a.status === 'present').length} present, ${mockAttendance.filter(a => a.status === 'late').length} late, ${mockAttendance.filter(a => a.status === 'absent').length} absent`,
  },
  {
    keywords: ['performance evaluation hr', 'conduct evaluation', 'evaluate employee hr'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Performance Evaluations (HR):**\n\n📍 Sidebar → **Performance**\n\n• View evaluation cards with scores\n• Click **New Evaluation**\n• Select employee, period, score (0-100), comments\n• Color-coded: 90+ green, 75+ blue, below yellow`,
  },
  {
    keywords: ['hr reports', 'generate hr report'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**HR Reports:**\n\n📍 Sidebar → **HR Reports**\n\nGenerate reports for:\n• Employee Directory (${mockEmployees.length} records)\n• Attendance Summary (${mockAttendance.length} records)\n• Leave Report (${mockLeaveRequests.length} records)\n• Performance Report\n\nClick **Generate Report** on any card.`,
  },
  {
    keywords: ['pending leave', 'how many leave', 'leave pending'],
    category: 'system',
    answer: `**Current Leave Status (Demo Data):**\n\n• Pending: ${mockLeaveRequests.filter(l => l.status === 'pending').length} requests\n• Approved: ${mockLeaveRequests.filter(l => l.status === 'approved').length} requests\n\nPending:\n${mockLeaveRequests.filter(l => l.status === 'pending').map(l => `• ${l.employeeName} — ${l.type} leave (${l.startDate} to ${l.endDate})`).join('\n')}`,
  },

  // === DEPARTMENT HEAD ===
  {
    keywords: ['view team', 'department employees', 'my team', 'team members'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Department Employees:**\n\n📍 Sidebar → **Employees**\n\nView your department team:\n• Name, email, position, phone\n• Status badges (active, on-leave)\n• Hire dates\n\nScience dept demo: Emily Davis (Teacher), Maria Garcia (Lab Assistant)`,
  },
  {
    keywords: ['assign task', 'create task', 'task assignment'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Assign Tasks:**\n\n📍 Sidebar → **Assign Tasks**\n\n• Click **Assign New Task**\n• Set title, description, assignee\n• Set due date & priority (low/medium/high)\n• Update status: pending → in-progress → completed\n\nDemo tasks: Lab Equipment setup, Grade Assignments`,
  },
  {
    keywords: ['review leave dept', 'department leave', 'recommend leave'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Leave Requests (Dept Head):**\n\n📍 Sidebar → **Leave Requests**\n\n• View leave from YOUR department only\n• See type, dates, reason\n• **Recommend Approve** or **Reject**\n• Final approval goes to HR Officer`,
  },
  {
    keywords: ['science department', 'my department info'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Science Department (Demo):**\n\n• Head: Michael Chen\n• Employees: 12\n• Description: Physics, chemistry, and biology\n• Team: Emily Davis (Teacher), Maria Garcia (Lab Assistant)\n\nOther departments: Mathematics, English, Administration`,
  },
  {
    keywords: ['department reports', 'dept analytics'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Department Reports:**\n\n📍 Sidebar → **Reports**\n\nMetrics shown:\n• Total & active employees\n• Attendance rate %\n• Average performance score\n\nExport: Employee Summary, Attendance, Leave, Performance reports.`,
  },
  {
    keywords: ['recommendations', 'employee recommendation', 'promotion'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Employee Recommendations:**\n\n📍 Sidebar → **Recommendations**\n\n• Select department employee\n• Choose type: Promotion, Training, Recognition, Transfer\n• Add detailed notes\n• Submit for HR review`,
  },

  // === EMPLOYEE ===
  {
    keywords: ['update profile', 'my profile', 'edit profile', 'personal info'],
    category: 'role',
    roles: ['employee'],
    answer: `**My Profile (Employee):**\n\n📍 Sidebar → **My Profile**\n\n• View your profile with avatar\n• Click **Edit Profile** to update:\n  Name, email, phone, address\n• Department & position are read-only\n• Click **Save Changes**`,
  },
  {
    keywords: ['submit leave', 'request leave', 'apply leave', 'leave request employee'],
    category: 'role',
    roles: ['employee'],
    answer: `**Submit Leave Request:**\n\n📍 Sidebar → **Leave Requests**\n\n1. Click **New Leave Request**\n2. Select type: Vacation, Sick, Personal, Emergency\n3. Set start & end dates\n4. Write reason\n5. Submit — track status (pending/approved/rejected)`,
  },
  {
    keywords: ['my attendance', 'view attendance', 'attendance record'],
    category: 'role',
    roles: ['employee'],
    answer: `**My Attendance:**\n\n📍 Sidebar → **Attendance**\n\n• Stats: Present, Late, Absent counts\n• Table with date, time in/out, status\n• Color-coded status badges`,
  },
  {
    keywords: ['work schedule', 'my schedule', 'timetable'],
    category: 'role',
    roles: ['employee'],
    answer: `**Work Schedule:**\n\n📍 Sidebar → **Work Schedule**\n\nWeekly schedule showing:\n• Mon-Fri work days\n• Time in/out (7:30 AM - 4:00 PM)\n• Subject assignments\n• Today highlighted with badge`,
  },
  {
    keywords: ['my performance', 'performance review', 'evaluation score'],
    category: 'role',
    roles: ['employee'],
    answer: `**My Performance:**\n\n📍 Sidebar → **Performance**\n\n• View evaluation history\n• See period, evaluator, score\n• Read supervisor comments\n• Color-coded score circles\n\nDemo: Emily Davis scored 92/100 in Q2 2026!`,
  },
  {
    keywords: ['documents', 'download', 'employment documents', 'certificates'],
    category: 'role',
    roles: ['employee'],
    answer: `**Employment Documents:**\n\n📍 Sidebar → **Documents**\n\nAvailable docs:\n• Employment Contract (245 KB)\n• Teaching Certificate (180 KB)\n• Background Check (120 KB)\n\nClick **Download** on any document.`,
  },
  {
    keywords: ['announcements', 'school news', 'notices'],
    category: 'role',
    roles: ['employee'],
    answer: `**School Announcements:**\n\n📍 Sidebar → **Announcements**\n\n• Opening Ceremony — Aug 15, 2026\n• New Health Protocols — updated handbook\n• Professional Development Workshop — August\n\nClick to expand full announcement content.`,
  },
  {
    keywords: ['my tasks', 'assigned tasks', 'task list'],
    category: 'role',
    roles: ['employee'],
    answer: `**Your Tasks:**\n\nCheck your dashboard for active task count.\n\nDemo tasks for Emily Davis:\n• Grade Assignments (pending, medium priority)\n• Due: July 8, 2026`,
  },

  // === GENERAL / WORLD KNOWLEDGE ===
  {
    keywords: ['hr trends', 'hr 2026', 'human resources trends'],
    category: 'world',
    answer: `**HR Trends in Education (2026):**\n\n🌍 **Global trends:**\n• AI-powered HR analytics & chatbots (like me!)\n• Hybrid work policies for admin staff\n• Mental health & wellbeing programs\n• Skills-based hiring over credentials\n• Automated onboarding workflows\n• Real-time performance dashboards\n• DEI (Diversity, Equity, Inclusion) metrics\n• Employee self-service portals\n\nSEMS implements many of these! 🎓`,
  },
  {
    keywords: ['teacher burnout', 'burnout prevention', 'stress teachers'],
    category: 'world',
    answer: `**Preventing Teacher Burnout:**\n\n🧘 **Evidence-based strategies:**\n• Set clear work-life boundaries\n• Use leave entitlements (SEMS makes this easy!)\n• Peer support networks\n• Reasonable class sizes\n• Professional development time\n• Mental health resources\n• Admin task automation\n• Regular performance feedback (not just criticism)\n\nWHO reports teacher burnout affects 50%+ of educators globally.`,
  },
  {
    keywords: ['work life balance', 'balance tips', 'teacher wellness'],
    category: 'world',
    answer: `**Work-Life Balance for Teachers:**\n\n⚖️ **Tips:**\n• Use SEMS to submit leave early — plan breaks\n• Batch grading into dedicated time blocks\n• Say no to non-essential committees\n• Use weekends for rest, not catch-up\n• Connect with colleagues for support\n• Exercise & sleep — non-negotiable!\n• Set email boundaries after school hours\n\nRemember: You can't pour from an empty cup! ☕`,
  },
  {
    keywords: ['leadership', 'department head tips', 'leadership strategies'],
    category: 'world',
    answer: `**Department Head Leadership:**\n\n👑 **Effective strategies:**\n• Lead by example in attendance & professionalism\n• Regular 1-on-1 check-ins with staff\n• Clear task delegation (use SEMS Assign Tasks!)\n• Celebrate team wins publicly\n• Address conflicts early & fairly\n• Advocate for your team's resources\n• Data-driven decisions from department reports\n• Foster collaborative culture\n\nGreat leaders create more leaders, not followers.`,
  },
  {
    keywords: ['motivate teachers', 'team motivation', 'staff morale'],
    category: 'world',
    answer: `**Motivating Teachers:**\n\n🌟 **Proven approaches:**\n• Recognition programs (SEMS Recommendations feature!)\n• Professional growth opportunities\n• Autonomy in teaching methods\n• Fair workload distribution\n• Competitive compensation\n• Modern tools & resources\n• Open communication channels\n• Team building activities\n\nGallup research: Engaged teachers = better student outcomes.`,
  },
  {
    keywords: ['interview questions', 'teacher interview', 'hiring teachers'],
    category: 'world',
    answer: `**Teacher Interview Questions (Global Best Practices):**\n\n📝 **Key questions:**\n• "Describe your classroom management philosophy"\n• "How do you differentiate instruction?"\n• "Tell us about a challenging student situation"\n• "How do you integrate technology?"\n• "What is your approach to parent communication?"\n• "How do you assess student progress?"\n• "Why do you want to work at our school?"\n\nUse SEMS Hiring & Onboarding to track new hires!`,
  },
  {
    keywords: ['professional development', 'teacher growth', 'career development'],
    category: 'world',
    answer: `**Professional Development for Teachers:**\n\n📚 **Global opportunities:**\n• Micro-credentials & online courses (Coursera, edX)\n• International conferences (ISTE, ASCD)\n• Peer observation & coaching programs\n• Action research projects\n• Advanced degrees & certifications\n• Cross-cultural exchange programs\n• Technology integration workshops\n• Leadership pipeline programs\n\nSEMS tracks performance to identify growth areas!`,
  },
  {
    keywords: ['cybersecurity', 'data security', 'school security'],
    category: 'world',
    answer: `**School Data Security (2026):**\n\n🔒 **Best practices:**\n• Role-based access control (SEMS has this!)\n• Regular data backups (Super Admin feature)\n• Strong password policies\n• Session timeout configuration\n• Audit logging for all actions\n• Encrypt data at rest & in transit\n• Employee security training\n• GDPR/FERPA compliance for student data\n\nNever share admin credentials!`,
  },
  {
    keywords: ['cloud on-premise', 'cloud vs', 'hosting school system'],
    category: 'world',
    answer: `**Cloud vs On-Premise School Systems:**\n\n☁️ **Cloud (SaaS):**\n• Lower upfront cost\n• Automatic updates\n• Access anywhere\n• Scalable\n\n🏢 **On-Premise:**\n• Full data control\n• Customizable\n• No internet dependency\n• Higher maintenance\n\nSEMS is built as a modern web app — deployable either way!`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings'],
    category: 'general',
    answer: `Hello! 👋 I'm **SAGE** — your School AI Guide & Expert!\n\nI can help you with:\n• 🏫 SEMS system questions\n• 👤 Role-specific guidance\n• 📊 Demo data & workflows\n• 🌍 HR & education topics worldwide\n\nTry a **quick question** below or ask me anything!`,
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    category: 'general',
    answer: `You're welcome! 😊 I'm always here to help.\n\nFeel free to ask more about SEMS, your role, or anything about education and HR worldwide. Happy to assist! 🎓`,
  },
  {
    keywords: ['who are you', 'your name', 'what are you', 'sage'],
    category: 'general',
    answer: `I'm **SAGE** — **S**chool **A**I **G**uide & **E**xpert! 🎓\n\nI'm the built-in AI assistant for the School Employees Management System. I know everything about:\n\n• All 4 roles & their features\n• System workflows & demo data\n• HR best practices globally\n• Education trends & teacher wellness\n\nAsk me anything — system or world! 🌍`,
  },
  {
    keywords: ['help', 'what can you do', 'assist', 'support'],
    category: 'general',
    answer: `**I can help with:**\n\n🏫 **System Help**\n• Navigation & features\n• Role-specific how-to guides\n• Demo data & credentials\n• Workflow explanations\n\n🌍 **World Knowledge**\n• HR & education trends\n• Teacher wellness tips\n• Leadership strategies\n• Interview & hiring advice\n• Cybersecurity best practices\n\nTap any **quick question** chip for instant answers!`,
  },
  {
    keywords: ['weather', 'today weather'],
    category: 'world',
    answer: `I don't have live weather data, but here's a tip! 🌤️\n\nFor schools, weather affects:\n• Attendance rates (track in SEMS!)\n• Outdoor activity scheduling\n• Emergency closure protocols\n\nCheck your local weather service for real-time data. Stay prepared! ☔`,
  },
  {
    keywords: ['education system', 'schools worldwide', 'global education'],
    category: 'world',
    answer: `**Global Education Landscape:**\n\n🌍 **Key facts:**\n• UNESCO: 250M+ children out of school globally\n• Finland: Top-ranked for teacher autonomy\n• Singapore: Excellence in STEM education\n• Japan: Strong discipline & respect culture\n• Finland: No standardized testing until 16\n• Digital transformation accelerating post-2020\n\nEmployee management systems like SEMS help schools focus on teaching, not paperwork! 📚`,
  },
  {
    keywords: ['employee count', 'how many employees', 'staff count', 'demo data', 'demo data stats'],
    category: 'system',
    answer: `**Demo Data Summary:**\n\n👥 Employees: ${mockEmployees.length} total\n• Active: ${mockEmployees.filter(e => e.status === 'active').length}\n• On Leave: ${mockEmployees.filter(e => e.status === 'on-leave').length}\n\n🏢 Departments: ${mockDepartments.length}\n${mockDepartments.map(d => `• ${d.name} (${d.employeeCount} staff)`).join('\n')}\n\n📅 Attendance records: ${mockAttendance.length}\n📋 Leave requests: ${mockLeaveRequests.length}`,
  },

  // === DASHBOARDS & NAVIGATION ===
  {
    keywords: ['super admin dashboard', 'admin dashboard', 'dashboard super admin', 'dashboard overview admin'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Super Admin Dashboard:**\n\n📍 Sidebar → **Dashboard**\n\nOverview includes:\n• Total & active employee stats\n• Department count\n• Pending leave requests\n• Quick action links to all modules\n• Recent system activity / audit feed\n\nUse it as your command center for school-wide administration!`,
  },
  {
    keywords: ['hr dashboard', 'hr officer dashboard', 'dashboard hr'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**HR Officer Dashboard:**\n\n📍 Sidebar → **Dashboard**\n\nOverview includes:\n• Employee & department counts\n• Pending leave approvals\n• Recent hires & onboarding status\n• Quick links to Register Employee, Leave Approval, Attendance\n\nStart here for daily HR operations!`,
  },
  {
    keywords: ['department head dashboard', 'dept dashboard', 'dashboard department head'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Department Head Dashboard:**\n\n📍 Sidebar → **Dashboard**\n\nOverview includes:\n• Your department team size\n• Attendance summary for your dept\n• Pending leave requests to review\n• Active tasks & performance metrics\n• Quick links to Employees, Tasks, Reports`,
  },
  {
    keywords: ['employee dashboard', 'my dashboard', 'dashboard employee'],
    category: 'role',
    roles: ['employee'],
    answer: `**Employee Dashboard:**\n\n📍 Sidebar → **Dashboard**\n\nYour personal overview:\n• Attendance summary (present/late/absent)\n• Pending leave requests\n• Active tasks assigned to you\n• Latest performance score\n• Quick links to Profile, Schedule, Leave, Documents`,
  },
  {
    keywords: ['sidebar features super admin', 'super admin sidebar', 'list super admin', 'all super admin features'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Super Admin Sidebar Features:**\n\n${sidebarList('super-admin')}\n\nEach page supports full CRUD interactions for school-wide administration.`,
  },
  {
    keywords: ['sidebar features hr', 'hr sidebar', 'list hr officer', 'all hr features'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**HR Officer Sidebar Features:**\n\n${sidebarList('hr-officer')}\n\nCovers the full employee lifecycle — hiring through performance reporting.`,
  },
  {
    keywords: ['sidebar features department', 'dept head sidebar', 'list department head', 'all department head features'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Department Head Sidebar Features:**\n\n${sidebarList('department-head')}\n\nFocused on your team's daily operations, tasks, and department analytics.`,
  },
  {
    keywords: ['sidebar features employee', 'employee sidebar', 'list employee features', 'all employee features'],
    category: 'role',
    roles: ['employee'],
    answer: `**Employee Sidebar Features:**\n\n${sidebarList('employee')}\n\nYour self-service portal for profile, schedule, leave, performance, and documents.`,
  },
  {
    keywords: ['mobile friendly', 'responsive', 'mobile navigation', 'mobile hamburger', 'phone tablet'],
    category: 'system',
    answer: `**Mobile & Responsive Design:**\n\nSEMS is fully responsive across phone, tablet, and desktop:\n\n📱 **Mobile/Tablet**: Tap **☰ hamburger** to open slide-in sidebar with overlay\n💻 **Desktop**: Persistent sidebar; hamburger collapses to icon-only mode\n\nAll pages, tables, forms, and SAGE chatbot adapt to your screen size!`,
  },
  {
    keywords: ['after login', 'after sign in', 'redirect after login', 'where after login'],
    category: 'system',
    answer: `**After Login:**\n\nYou're automatically routed to your **role dashboard**:\n\n• Super Admin → \`/super-admin/dashboard\`\n• HR Officer → \`/hr-officer/dashboard\`\n• Department Head → \`/department-head/dashboard\`\n• Employee → \`/employee/dashboard\`\n\nUse the sidebar from there to access all your features!`,
  },
  {
    keywords: ['register fields', 'required fields', 'registration fields', 'sign up fields'],
    category: 'system',
    answer: `**Registration Required Fields:**\n\n✅ **Required:**\n• Full Name\n• Email\n• Password & Confirm Password\n• Role selection\n\n📝 **Optional:**\n• Department\n• Position\n\nAfter registration you're logged in and routed to your role dashboard automatically!`,
  },
  {
    keywords: ['super admin demo', 'admin demo email', 'admin@school'],
    category: 'system',
    answer: `**Super Admin Demo Account:**\n\n📧 Email: **admin@school.edu**\n🔑 Password: \`${DEMO_PASSWORD}\`\n\nUse **Quick Access** on the login page for one-click entry, or sign in manually with role **Super Admin** selected.`,
  },
  {
    keywords: ['hr demo', 'hr demo login', 'hr@school'],
    category: 'system',
    answer: `**HR Officer Demo Account:**\n\n📧 Email: **hr@school.edu**\n🔑 Password: \`${DEMO_PASSWORD}\`\n\nQuick Access on the login page logs you in instantly with full HR module access!`,
  },
  {
    keywords: ['employee demo', 'employee demo account', 'employee@school'],
    category: 'system',
    answer: `**Employee Demo Account:**\n\n📧 Email: **employee@school.edu**\n🔑 Password: \`${DEMO_PASSWORD}\`\n\nDemo user: **Emily Davis** — Science department teacher with schedule, leave, tasks, and performance data.`,
  },

  // === ATTENDANCE & LEAVE ===
  {
    keywords: ['attendance tracking', 'attendance module', 'how attendance works', 'attendance system'],
    category: 'system',
    answer: `**Attendance Tracking in SEMS:**\n\n• **HR** records daily time-in/out for all employees\n• **Department Heads** monitor dept attendance stats\n• **Employees** view personal attendance history\n• **Super Admin** sees system-wide reports\n\nStatuses: Present, Late, Absent, Half Day\n\nDemo today: ${mockAttendance.filter(a => a.status === 'present').length} present, ${mockAttendance.filter(a => a.status === 'late').length} late, ${mockAttendance.filter(a => a.status === 'absent').length} absent`,
  },
  {
    keywords: ['attendance statuses', 'attendance status types', 'present late absent'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Attendance Statuses (HR):**\n\nWhen recording attendance, select:\n\n• **Present** — On time\n• **Late** — Arrived after scheduled time\n• **Absent** — Did not attend\n• **Half Day** — Partial attendance\n\nDepartment Heads see aggregated counts; employees see their personal records.`,
  },
  {
    keywords: ['monitor attendance', 'department attendance', 'attendance monitoring', 'dept attendance stats'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Department Attendance Monitoring:**\n\n📍 Sidebar → **Attendance**\n\n• Stats cards: Present, Late, Absent, Half Day counts\n• Full table: employee, date, time in/out, status\n• Filtered to YOUR department only\n\nUse this to spot patterns and follow up with team members.`,
  },
  {
    keywords: ['attendance statistics', 'attendance stats department', 'attendance rate dept'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Department Attendance Statistics:**\n\nOn the **Attendance** page you'll see:\n• Count by status (present/late/absent/half-day)\n• Detailed daily records per employee\n\n**Reports** page also shows your department **attendance rate %** for broader analytics.`,
  },
  {
    keywords: ['leave types', 'types of leave', 'vacation sick personal', 'leave categories'],
    category: 'system',
    answer: `**Leave Types in SEMS:**\n\nEmployees can request:\n\n• **Vacation** — Planned time off\n• **Sick** — Illness or medical\n• **Personal** — Personal matters\n• **Emergency** — Urgent situations\n\nWorkflow: Employee submits → Dept Head recommends → HR approves/rejects`,
  },
  {
    keywords: ['leave status', 'check leave status', 'my leave status', 'track leave request'],
    category: 'role',
    roles: ['employee'],
    answer: `**Check Leave Status:**\n\n📍 Sidebar → **Leave Requests**\n\n• View all your submitted requests in a table\n• Status badges: **Pending**, **Approved**, or **Rejected**\n• See type, dates, reason, and submission date\n\nSubmit new requests with the **New Leave Request** button!`,
  },
  {
    keywords: ['performance reviews system', 'performance evaluations system', 'how performance works'],
    category: 'system',
    answer: `**Performance Evaluations in SEMS:**\n\n• **HR & Dept Heads** create evaluations with scores (0–100) and comments\n• **Employees** view their evaluation history\n• Color-coded scores: 90+ excellent, 75+ good, below needs improvement\n• Tracked by period (e.g., Q1 2026, Q2 2026)\n\nDemo: Emily Davis scored 92/100 in Q2 2026!`,
  },
  {
    keywords: ['delete user', 'remove user', 'delete users admin'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Delete Users (Super Admin):**\n\n📍 Sidebar → **Manage Users**\n\n• Find the user in the table\n• Click **Delete** on their row\n• Confirm the removal\n\n⚠️ Demo data resets on page refresh for some accounts. In production, deletion is permanent!`,
  },
  {
    keywords: ['system reports', 'system wide reports', 'generate system report', 'export system report'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**System Reports (Super Admin):**\n\n📍 Sidebar → **Reports**\n\nAvailable reports:\n• **Employee Summary** — Total & active counts\n• **Attendance Today** — Present/late/absent breakdown\n• **Leave Requests** — Pending & approved stats\n• **Department Overview** — Dept count & averages\n\nClick **Export Report** on any card (demo mode).`,
  },
  {
    keywords: ['session timeout', 'timeout settings', 'auto logout'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Session Timeout:**\n\n📍 Sidebar → **System Settings**\n\nConfigure auto-logout after inactivity:\n• 15 minutes\n• 30 minutes (default)\n• 60 minutes\n\nClick **Save Settings** to apply. Helps protect school data on shared devices!`,
  },
  {
    keywords: ['email notifications', 'enable notifications', 'attendance reminders settings'],
    category: 'role',
    roles: ['super-admin'],
    answer: `**Notifications Settings:**\n\n📍 Sidebar → **System Settings**\n\nToggle options:\n• ✅ **Email notifications** — System alerts via email\n• ✅ **Attendance reminders** — Daily check-in prompts\n• Leave auto-approve (optional)\n\nSave settings to apply across the system.`,
  },
  {
    keywords: ['departments positions', 'manage positions', 'job positions hr', 'positions hr'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Departments & Positions (HR):**\n\n📍 Sidebar → **Departments**\n\n• View all departments with heads & employee counts\n• Manage **job positions** with title, department, level, salary\n• Positions appear in **Register Employee** dropdown\n\nDemo departments: ${mockDepartments.map(d => d.name).join(', ')}`,
  },
  {
    keywords: ['onboarding steps', 'onboarding checklist', 'checklist steps', 'new hire checklist'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Onboarding Checklist Steps:**\n\n📍 Sidebar → **Hiring & Onboarding**\n\nFor each new hire, track:\n1. ✅ Document Verification\n2. ✅ Orientation Schedule\n3. ✅ Equipment Assignment\n4. ✅ System Access Setup\n\nCheck off steps to track progress percentage!`,
  },
  {
    keywords: ['recent hires', 'view recent hires', 'new hires list'],
    category: 'role',
    roles: ['hr-officer'],
    answer: `**Recent Hires (HR):**\n\n📍 Sidebar → **Hiring & Onboarding**\n\n• View employees hired in the last 6 months\n• Select any hire to open their onboarding checklist\n• Track completion percentage per employee\n\nPair with **Register Employee** for adding new staff!`,
  },
  {
    keywords: ['task priority', 'task priorities', 'priority levels tasks', 'high medium low priority'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Task Priority Levels:**\n\nWhen assigning tasks, set priority:\n\n• 🔴 **High** — Urgent, immediate attention\n• 🟡 **Medium** — Standard priority\n• 🟢 **Low** — Can wait\n\nAlso set title, description, assignee, and due date. Update status: pending → in-progress → completed.`,
  },
  {
    keywords: ['export department report', 'export dept report', 'download department report'],
    category: 'role',
    roles: ['department-head'],
    answer: `**Export Department Reports:**\n\n📍 Sidebar → **Reports**\n\nExport options:\n• Employee Summary\n• Attendance Report\n• Leave Report\n• Performance Report\n\nClick **Export** on any report card. Demo mode shows an export confirmation alert.`,
  },
  {
    keywords: ['edit contact', 'update phone', 'update address', 'edit contact info', 'phone number address'],
    category: 'role',
    roles: ['employee'],
    answer: `**Edit Contact Info:**\n\n📍 Sidebar → **My Profile**\n\nClick **Edit Profile** to update:\n• Name\n• Email\n• Phone number\n• Address\n\nDepartment & position are **read-only** (managed by HR). Click **Save Changes** when done!`,
  },
  {
    keywords: ['today schedule', 'today classes', 'todays schedule'],
    category: 'role',
    roles: ['employee'],
    answer: `**Today's Schedule:**\n\n📍 Sidebar → **Work Schedule**\n\n• Weekly Mon–Fri schedule with subjects\n• Today is **highlighted** with a "Today" badge\n• Time: 7:30 AM – 4:00 PM (Fri until 3:00 PM)\n\nDemo: Physics 101, Chemistry Lab, Science Club assignments!`,
  },
  {
    keywords: ['conflict resolution', 'staff conflicts', 'handle conflicts', 'team conflict'],
    category: 'world',
    answer: `**Handling Staff Conflicts (Schools):**\n\n🤝 **Best practices for Department Heads:**\n• Address issues privately, not publicly\n• Listen to all parties without bias\n• Focus on behaviors, not personalities\n• Document conversations if needed\n• Involve HR for serious or repeated issues\n• Follow school policy & labor regulations\n• Use SEMS Recommendations to formally recognize positive contributions too!\n\nEarly intervention prevents escalation.`,
  },
  {
    keywords: ['classroom management', 'classroom tips', 'classroom management tips', 'effective classroom'],
    category: 'world',
    answer: `**Classroom Management Tips:**\n\n📚 **Proven strategies for teachers:**\n• Establish clear routines from day one\n• Use positive reinforcement over punishment\n• Keep students engaged with varied activities\n• Set consistent boundaries fairly\n• Build relationships — know your students\n• Use visual schedules and timers\n• Address disruptions calmly and quickly\n• Collaborate with department heads on support\n\nGreat management = more time for teaching!`,
  },
  {
    keywords: ['is it secure', 'security features', 'sems secure', 'data protection sems'],
    category: 'system',
    answer: `**SEMS Security Features:**\n\n🔒 Built-in protections:\n• Role-based access control (4 permission levels)\n• Protected routes — login required\n• Session timeout configuration\n• Audit activity logging\n• Backup & restore (Super Admin)\n\nBest practice: Never share admin credentials. Use strong passwords in production!`,
  },
  {
    keywords: ['developer', 'who built', 'who made', 'who created', 'raminder', 'jangao', 'raminder jangao', 'built sems', 'who developed'],
    category: 'system',
    answer: `**Meet the Developer** 🚀\n\n**Raminder Jangao**\n_Lead Developer & System Architect_\n\nRaminder designed and built the entire **School Employees Management System** from the ground up:\n\n• 🎨 **Candy Green UI** — custom theme & design system\n• 🤖 **SAGE AI** — intelligent chatbot with 50+ knowledge entries\n• 👥 **4 Role Portals** — 32 interactive feature pages\n• 📱 **Fully Responsive** — mobile-first across every screen\n\nBuilt with React, TypeScript, Tailwind CSS & Vite.\n\nVisit the **Developer** section on the Home page to see the full showcase! ✨`,
  },
];
