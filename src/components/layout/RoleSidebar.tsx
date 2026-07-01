import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { roleConfigs } from '@/config/roleConfig';
import { getNavIcon, roleGradients } from '@/config/navIcons';
import DeveloperCredit from '@/components/shared/DeveloperCredit';
import type { UserRole } from '@/types';

interface RoleSidebarProps {
  role: UserRole;
}

export default function RoleSidebar({ role }: RoleSidebarProps) {
  const { user } = useAuth();
  const { isOpen, isCollapsed, isMobile, closeSidebar } = useSidebar();
  const config = roleConfigs[role];
  const gradient = roleGradients[role];

  const showLabels = isMobile || !isCollapsed;

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        id="role-sidebar"
        aria-label="Role navigation"
        className={`sidebar-panel sidebar-dark fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out ${
          isMobile
            ? isOpen
              ? 'translate-x-0 w-72'
              : '-translate-x-full w-72'
            : isCollapsed
              ? 'translate-x-0 w-[4.5rem] lg:translate-x-0'
              : 'translate-x-0 w-64 lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className={`flex shrink-0 items-center gap-3 border-b border-white/10 p-4 ${!showLabels ? 'justify-center px-2' : ''}`}>
          <div className={`logo-badge h-10 w-10 shrink-0 shadow-glow-accent ${!showLabels ? '' : ''}`}>
            SE
          </div>
          {showLabels && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">School Employees</p>
              <p className="truncate text-xs text-primary-200/80">{config.label}</p>
            </div>
          )}
          {isMobile && (
            <button
              onClick={closeSidebar}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary-200/70 hover:bg-white/10 hover:text-white"
              aria-label="Close sidebar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* User */}
        <div className={`shrink-0 border-b border-white/10 p-4 ${!showLabels ? 'flex justify-center px-2' : ''}`}>
          {showLabels ? (
            <div className="sidebar-user-card flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white ring-2 ring-white/20`}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                <p className="truncate text-xs text-primary-200/70">{user?.email}</p>
                {user?.department && (
                  <p className="mt-0.5 truncate text-[10px] text-primary-300/80">{user.department}</p>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white ring-2 ring-white/20`}
              title={user?.name}
            >
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="sidebar-nav flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {config.navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path.endsWith('/dashboard')}
                  onClick={closeSidebar}
                  title={!showLabels ? item.label : undefined}
                  className={({ isActive }) =>
                    `sidebar-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                      !showLabels ? 'justify-center px-2' : ''
                    } ${
                      isActive
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg shadow-black/20`
                        : 'sidebar-link-idle'
                    }`
                  }
                >
                  {getNavIcon(item.label)}
                  {showLabels && <span className="truncate">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className={`shrink-0 border-t border-white/10 p-3 ${!showLabels ? 'flex justify-center px-2' : ''}`}>
          <DeveloperCredit variant="sidebar" collapsed={!showLabels} />
        </div>
      </aside>
    </>
  );
}
