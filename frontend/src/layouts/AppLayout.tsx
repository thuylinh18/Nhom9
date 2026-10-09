import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Sparkles,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { User, UserRole } from '../types';
import { Badge } from '../components/ui/Badge';

export interface AppLayoutProps {
  user: User;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  pageTitle: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  user,
  currentRoute,
  onNavigate,
  onLogout,
  pageTitle,
  eyebrow,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const role = (user.role || 'RESEARCHER').toUpperCase() as UserRole;

  const defaultEyebrows: Record<UserRole, string> = {
    ADMIN: 'SYSTEM ADMINISTRATION',
    RESEARCHER: 'RESEARCH WORKSPACE',
    RESPONDENT: 'CUSTOMER FEEDBACK',
    MANAGER: 'ANALYTICS WORKSPACE'
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    };
    if (avatarDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [avatarDropdownOpen]);

  const navItems = React.useMemo(() => {
    if (role === 'ADMIN') {
      return [
        { id: '/admin/users', label: 'User Management', icon: <Users size={18} /> },
        { id: '/manager/dashboard', label: 'Overview Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: '/researcher/surveys', label: 'Surveys Explorer', icon: <ClipboardList size={18} /> }
      ];
    }
    if (role === 'RESEARCHER') {
      return [
        { id: '/researcher/surveys', label: 'My Surveys', icon: <ClipboardList size={18} /> }
      ];
    }
    if (role === 'RESPONDENT') {
      return [
        { id: '/respondent/surveys', label: 'Available Surveys', icon: <ClipboardList size={18} /> }
      ];
    }
    // Manager
    return [
      { id: '/manager/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      { id: '/manager/surveys/results', label: 'Survey Results', icon: <BarChart3 size={18} /> },
      { id: '/manager/surveys/ai-analysis', label: 'AI Analysis', icon: <Sparkles size={18} /> }
    ];
  }, [role]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const userInitial = user.full_name ? user.full_name[0].toUpperCase() : user.email[0].toUpperCase();

  return (
    <div className="app-container">
      {/* Sidebar Desktop */}
      <aside className={`app-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="sidebar-brand">
            <span className="brand-icon-box">
              <MessageSquare size={20} />
            </span>
            <span>InsightFlow</span>
          </div>
          {mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="sidebar-role-badge">
          {role}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = currentRoute.startsWith(item.id);
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info */}
        <div className="sidebar-user">
          <div className="user-profile-summary">
            <div className="avatar-circle">{userInitial}</div>
            <div className="user-details">
              <span className="user-name">{user.full_name || user.email}</span>
              <span className="user-role-label">{user.email}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="app-main">
        <header className="app-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-primary)'
              }}
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>
            <div>
              <p className="eyebrow">{eyebrow || defaultEyebrows[role]}</p>
              <h1>{pageTitle}</h1>
            </div>
          </div>

          {/* Interactive Avatar with Dropdown Options */}
          <div className="header-avatar-container" ref={dropdownRef}>
            <button
              className={`header-avatar-btn ${avatarDropdownOpen ? 'active' : ''}`}
              onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
              aria-label="User account options menu"
              aria-expanded={avatarDropdownOpen}
            >
              <div className="header-avatar-circle">{userInitial}</div>
              <ChevronDown size={16} color="var(--color-text-secondary)" />
            </button>

            {avatarDropdownOpen && (
              <div className="avatar-dropdown-menu">
                <div className="dropdown-user-header">
                  <div className="dropdown-user-name">{user.full_name || 'User Account'}</div>
                  <div className="dropdown-user-email">{user.email}</div>
                  <Badge type={role} size="sm" />
                </div>

                <div className="dropdown-options-list">
                  <div
                    style={{
                      padding: '8px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    <ShieldCheck size={16} color="var(--color-secondary)" />
                    <span>Role: <b>{role}</b></span>
                  </div>

                  <div className="dropdown-divider" />

                  <button
                    className="dropdown-item-btn danger-action"
                    onClick={() => {
                      setAvatarDropdownOpen(false);
                      onLogout();
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="app-content">{children}</div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block !important;
          }
          .app-sidebar {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            width: 280px;
          }
          .app-sidebar.mobile-open {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
};
