import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import RoleHeader from './RoleHeader';
import RoleSidebar from './RoleSidebar';
import type { UserRole } from '@/types';

interface RoleLayoutProps {
  role: UserRole;
}

function RoleLayoutContent({ role }: RoleLayoutProps) {
  const { isCollapsed, isMobile } = useSidebar();

  const mainMargin = isMobile
    ? 'lg:ml-0'
    : isCollapsed
      ? 'lg:ml-[4.5rem]'
      : 'lg:ml-64';

  return (
    <div className="role-shell">
      <RoleSidebar role={role} />

      <div className={`flex min-h-screen flex-col transition-all duration-300 ${mainMargin}`}>
        <RoleHeader role={role} />
        <main className="page-container mx-auto w-full min-w-0 max-w-7xl flex-1 px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function RoleLayout({ role }: RoleLayoutProps) {
  return (
    <SidebarProvider>
      <RoleLayoutContent role={role} />
    </SidebarProvider>
  );
}
