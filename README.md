# School Employees Management System

A TypeScript React + Tailwind CSS application for managing school employee information, attendance, leave, performance, and more across 4 role-based dashboards.

**Developer:** **Raminder Jangao** — Lead Developer & System Architect

Crafted with the Candy Green design system, SAGE AI chatbot, 4 role portals, and 30 feature pages.

## Roles

| Role | Dashboard Path | Features |
|------|---------------|----------|
| Super Admin | `/super-admin/dashboard` | Users, roles, departments, reports |
| HR Officer | `/hr-officer/dashboard` | Register employees, hiring, leave approval, attendance, performance |
| Department Head | `/department-head/dashboard` | Team view, tasks, leave recommendations, department reports |
| Employee | `/employee/dashboard` | Profile, schedule, leave requests, documents, announcements |

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel

This project is configured for Vercel with SPA routing (React Router).

1. Push the repo to GitHub, GitLab, or Bitbucket
2. Import the project in [Vercel](https://vercel.com/new)
3. Vercel auto-detects **Vite** — settings come from `vercel.json`:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy — all routes (`/login`, `/register`, role dashboards, etc.) rewrite to `index.html`

Or deploy from the CLI:

```bash
npm i -g vercel
vercel
```

**Demo login after deploy:** use Quick Access on `/login` or any demo account with password `password123`.

## Public Pages (Non-Users)

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Landing page explaining system flow, roles, features |
| **Login** | `/login` | Sign in with credentials or quick demo access |
| **Register** | `/register` | Create a new account and select your role |

### User Journey
1. Visit **Home** (`/`) to learn how the system works
2. Click **Get Started** → `/register` or **Sign In** → `/login`
3. Use **Quick Access** on the login page for instant demo login, or register manually
4. Get routed to your **role dashboard** with sidebar navigation

### Quick Access (One-Click)
Use the **Quick Access — All Roles** cards on `/login` to instantly enter any role dashboard with pre-loaded demo data.

### Demo Accounts
All demo accounts use password: `password123`

| Role | Name | Email |
|------|------|-------|
| Super Admin | Admin User | admin@school.edu |
| HR Officer | Sarah Johnson | hr@school.edu |
| Department Head | Michael Chen | depthead@school.edu |
| Employee | Emily Davis | employee@school.edu |

You can also **Sign In** manually or **Create Account** to register a new user with any role.

### AI Assistant — SAGE 🎓
A floating AI chatbot (**S**chool **A**I **G**uide & **E**xpert) is available on every page:
- Home, Login/Register, and all 4 role dashboards
- Role-specific **Quick Questions** (8–10 per context)
- Answers about SEMS features, demo data, workflows
- General knowledge: HR trends, teacher wellness, leadership tips

Test the AI engine: `npm run test:chatbot`

```
src/
├── roles/
│   ├── super-admin/     # 6 pages (dashboard + 5 features)
│   ├── hr-officer/      # 8 pages
│   ├── department-head/ # 8 pages
│   └── employee/        # 8 pages
├── components/
│   ├── auth/            # Login/register shared UI
│   ├── chatbot/         # SAGE AI widget
│   ├── layout/          # PublicLayout, RoleHeader, RoleSidebar, ProtectedRoute
│   └── shared/          # Modal, StatCard, PageHeader, DeveloperCredit
├── context/             # Auth, AppData, Sidebar, Chatbot state
├── config/              # Role navigation, developer info, theme
├── data/                # Mock data, chatbot knowledge
├── pages/               # Home, Login, Register
└── routes/              # App routing
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
