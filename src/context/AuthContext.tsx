import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, RegisterData } from '@/types';
import { mockUsers } from '@/data/mockData';
import { getRoleDashboardPath } from '@/config/roleConfig';
import { getAccountByEmail } from '@/config/roleAccounts';

const USERS_KEY = 'sems_users';
const SESSION_KEY = 'sems_user';

function loadUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    const parsed: User[] = JSON.parse(stored);
    const demoEmails = new Set(mockUsers.map((u) => u.email));
    const custom = parsed.filter((u) => !demoEmails.has(u.email));
    return [...mockUsers, ...custom];
  }
  return [...mockUsers];
}

function saveCustomUsers(users: User[]) {
  const demoEmails = new Set(mockUsers.map((u) => u.email));
  const custom = users.filter((u) => !demoEmails.has(u.email));
  localStorage.setItem(USERS_KEY, JSON.stringify(custom));
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string; user?: User };
  register: (data: RegisterData) => { success: boolean; error?: string };
  quickAccess: (email: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(loadUsers);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const setSession = useCallback((u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!found) {
      return { success: false, error: 'No account found with this email.' };
    }

    if (found.password && found.password !== password) {
      return { success: false, error: 'Incorrect password. Try password123 for demo accounts.' };
    }

    setSession(found);
    return { success: true, user: found };
  }, [users, setSession]);

  const register = useCallback((data: RegisterData) => {
    const normalizedEmail = data.email.trim().toLowerCase();
    const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail);

    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name.trim(),
      email: normalizedEmail,
      password: data.password,
      role: data.role,
      department: data.department,
      position: data.position,
    };

    setUsers((prev) => {
      const updated = [...prev, newUser];
      saveCustomUsers(updated);
      return updated;
    });

    setSession(newUser);
    return { success: true };
  }, [users, setSession]);

  const quickAccess = useCallback((email: string) => {
    const account = getAccountByEmail(email);
    if (!account) {
      return { success: false, error: 'Demo account not found.' };
    }

    const found = users.find((u) => u.email === account.user.email);
    if (found) {
      setSession(found);
      return { success: true };
    }

    setSession({ ...account.user, password: account.password });
    return { success: true };
  }, [users, setSession]);

  const logout = useCallback(() => {
    setSession(null);
  }, [setSession]);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      setUsers((all) => {
        const next = all.map((u) => (u.id === prev.id ? { ...u, ...updates } : u));
        saveCustomUsers(next);
        return next;
      });
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        users,
        login,
        register,
        quickAccess,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { getRoleDashboardPath };
