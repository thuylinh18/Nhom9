import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Alert } from '../../components/ui/Alert';
import { LoadingSkeleton, EmptyState } from '../../components/ui/MetricsAndStates';
import { User, UserRole } from '../../types';
import { api } from '../../services/api';
import { UserPlus, Search, Edit2, Trash2, Users, RefreshCw } from 'lucide-react';

export const AdminUserManagementScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Create User Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newPassword, setNewPassword] = useState('password123');
  const [newRole, setNewRole] = useState<UserRole>('RESEARCHER');
  const [createLoading, setCreateLoading] = useState(false);

  // Edit Role Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState<UserRole>('RESEARCHER');
  const [editLoading, setEditLoading] = useState(false);

  // Delete User Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const list = await api.getUsers(search, roleFilter);
      setUsers(list);
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to load user accounts.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search, roleFilter]);

  // Handle Create User
  const handleCreateUser = async () => {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      setNotice({ type: 'error', message: 'Valid email address is required.' });
      return;
    }

    try {
      setCreateLoading(true);
      await api.createUser({
        email: newEmail.trim(),
        full_name: newFullName.trim(),
        password: newPassword,
        role: newRole
      });

      setIsCreateModalOpen(false);
      setNewEmail('');
      setNewFullName('');
      setNewPassword('password123');
      setNotice({ type: 'success', message: `User account created successfully with role ${newRole}.` });
      await loadUsers();
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to create user account.' });
    } finally {
      setCreateLoading(false);
    }
  };

  // Handle Edit User Role
  const handleUpdateRole = async () => {
    if (!editingUser) return;
    try {
      setEditLoading(true);
      await api.updateUserRole(editingUser.id, editRole);
      setIsEditModalOpen(false);
      setEditingUser(null);
      setNotice({ type: 'success', message: 'User role updated successfully.' });
      await loadUsers();
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to update user role.' });
    } finally {
      setEditLoading(false);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    try {
      setDeleteLoading(true);
      await api.deleteUser(deletingUser.id);
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
      setNotice({ type: 'success', message: 'User account has been deleted.' });
      await loadUsers();
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to delete user.' });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {/* Top Banner Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            User Management & Permissions
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '4px' }}>
            Administrator console to create, manage roles, and maintain user access for Researchers, Managers, and Respondents.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<UserPlus size={18} />}
          onClick={() => setIsCreateModalOpen(true)}
          style={{ padding: '12px 20px', fontSize: '15px' }}
        >
          Create User Account
        </Button>
      </div>

      {notice && <Alert type={notice.type} message={notice.message} onClose={() => setNotice(null)} />}

      {/* Search and Filters */}
      <Card style={{ padding: '20px 24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }}
              />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '42px', height: '46px' }}
              />
            </div>
          </div>

          <div style={{ width: '200px' }}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-select"
              style={{ height: '46px' }}
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="RESEARCHER">Researcher</option>
              <option value="MANAGER">Manager</option>
              <option value="RESPONDENT">Respondent</option>
            </select>
          </div>

          <Button variant="secondary" icon={<RefreshCw size={16} />} onClick={loadUsers}>
            Refresh
          </Button>
        </div>
      </Card>

      {/* User List Table */}
      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : users.length === 0 ? (
        <EmptyState
          icon={<Users size={32} />}
          title="No users found"
          description={search || roleFilter ? 'No accounts match your search filters.' : 'There are currently no users.'}
          actionText="Create User"
          onAction={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <Card style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f7faf8', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    USER
                  </th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    ROLE
                  </th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    CREATED AT
                  </th>
                  <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'right' }}>
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const initial = u.full_name ? u.full_name[0].toUpperCase() : u.email[0].toUpperCase();
                  return (
                    <tr
                      key={u.id}
                      style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background-color 0.15s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfa')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: 'var(--radius-pill)',
                              backgroundColor: 'var(--color-secondary)',
                              color: 'var(--color-white)',
                              display: 'grid',
                              placeItems: 'center',
                              fontWeight: 700,
                              fontSize: '14px',
                              flexShrink: 0
                            }}
                          >
                            {initial}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>
                              {u.full_name || 'No Name'}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '16px 24px' }}>
                        <Badge type={u.role} />
                      </td>

                      <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Active'}
                      </td>

                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={<Edit2 size={13} />}
                            onClick={() => {
                              setEditingUser(u);
                              setEditRole(u.role);
                              setIsEditModalOpen(true);
                            }}
                          >
                            Edit Role
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={<Trash2 size={13} />}
                            onClick={() => {
                              setDeletingUser(u);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* MODAL: CREATE USER */}
      <Modal
        isOpen={isCreateModalOpen}
        title="Create New User Account"
        description="Administrators can generate accounts for Researchers, Managers, or Respondents with specific system access."
        confirmText="Create User"
        loading={createLoading}
        onConfirm={handleCreateUser}
        onCancel={() => setIsCreateModalOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}>
          <Input
            label="Full Name"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            placeholder="e.g. Dr. Jane Doe"
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="user@insightflow.com"
          />

          <Input
            label="Initial Password"
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="password123"
          />

          <Select
            label="System Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as UserRole)}
            options={[
              { label: 'Researcher (Can create, edit & publish surveys)', value: 'RESEARCHER' },
              { label: 'Manager (Can view dashboard, results & AI analysis)', value: 'MANAGER' },
              { label: 'Respondent (Can answer published surveys)', value: 'RESPONDENT' },
              { label: 'Admin (Full user management & administrative rights)', value: 'ADMIN' }
            ]}
          />
        </div>
      </Modal>

      {/* MODAL: EDIT ROLE */}
      <Modal
        isOpen={isEditModalOpen}
        title={`Change Role for ${editingUser?.full_name || editingUser?.email}`}
        description="Update the designated permissions and workspace access for this account."
        confirmText="Save Role"
        loading={editLoading}
        onConfirm={handleUpdateRole}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <div style={{ margin: '20px 0' }}>
          <Select
            label="Assigned Role"
            value={editRole}
            onChange={(e) => setEditRole(e.target.value as UserRole)}
            options={[
              { label: 'Researcher', value: 'RESEARCHER' },
              { label: 'Manager', value: 'MANAGER' },
              { label: 'Respondent', value: 'RESPONDENT' },
              { label: 'Admin', value: 'ADMIN' }
            ]}
          />
        </div>
      </Modal>

      {/* MODAL: DELETE USER */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete User Account?"
        description={`Are you sure you want to delete the account for ${deletingUser?.email}? This action cannot be undone.`}
        confirmText="Delete Account"
        confirmVariant="danger"
        loading={deleteLoading}
        onConfirm={handleDeleteUser}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
