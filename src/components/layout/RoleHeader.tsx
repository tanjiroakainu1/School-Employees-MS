import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { roleConfigs } from '@/config/roleConfig';
import { roleGradients } from '@/config/navIcons';
import type { UserRole } from '@/types';

interface RoleHeaderProps {
  role: UserRole;
}

export default function RoleHeader({ role }: RoleHeaderProps) {
  const { user, logout } = useAuth();
  const { toggleSidebar, isCollapsed, isMobile, isOpen, closeSidebar } = useSidebar();
  const navigate = useNavigate();
  const config = roleConfigs[role];
  const gradient = roleGradients[role];

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate('/');
  };

  return (
    <header className="role-header">
      <div className="flex h-14 items-center justify-between gap-3 px-3 sm:h-16 sm:px-5 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <button
            onClick={toggleSidebar}
            className="sidebar-toggle flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary-100 bg-white text-ink-700 shadow-soft transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 active:scale-95"
            aria-label={isMobile ? 'Open menu' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={isMobile ? isOpen : !isCollapsed}
            aria-controls="role-sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0 lg:hidden">
            <p className="truncate text-sm font-extrabold text-ink-900 sm:text-base">{config.label}</p>
            <p className="truncate text-xs font-medium text-ink-500">School Employees MS</p>
          </div>

          <div className="hidden min-w-0 lg:block">
            <p className="truncate text-base font-extrabold text-ink-900">{config.label} Portal</p>
            <p className="truncate text-xs font-medium text-ink-500">Navigate using the sidebar menu</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden min-w-0 text-right sm:block">
            <p className="truncate text-sm font-bold text-ink-900">{user?.name}</p>
            <p className="truncate text-xs font-medium text-ink-500">{user?.position || user?.role.replace('-', ' ')}</p>
          </div>

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-glow-sm ring-2 ring-white sm:h-10 sm:w-10`}
            title={user?.name}
          >
            {user?.name?.charAt(0) || 'U'}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="header-logout-btn"
            aria-label="Logout"
            title="Logout"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
