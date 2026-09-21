import React, { useEffect, useState } from 'react';
import { Shield, User, Trash2, RefreshCw } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { userService } from '../../services/userService.js';
import './Admin.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.warn('API error fetching user list:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const updated = await userService.updateUserRole(userId, newRole);
      setUsers(users.map((u) => (u._id === userId ? updated : u)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Delete user account "${userName}"?`)) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="admin-page section-padding">
      <div className="container admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <div className="admin-header flex-between">
            <div>
              <h1 className="admin-title">Manage <span className="text-gold">Users</span></h1>
              <p className="admin-subtitle">User permissions, roles, and account security</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={fetchUsers}>
              <RefreshCw size={14} /> Refresh List
            </button>
          </div>

          <div className="admin-section card-glass">
            {loading ? (
              <LoadingSpinner message="Fetching Royal Accounts..." />
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Role</th>
                      <th>Registered Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td className="font-mono">{user._id.substring(0, 8)}...</td>
                          <td className="font-bold">{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${user.role === 'admin' ? 'badge-gold' : 'badge-burgundy'}`}>
                              {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />} {user.role}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', marginRight: '0.4rem' }}
                              onClick={() => handleRoleToggle(user._id, user.role)}
                            >
                              Toggle Role
                            </button>
                            <button
                              className="icon-action-btn delete-btn"
                              onClick={() => handleDeleteUser(user._id, user.name)}
                              title="Delete Account"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          No user accounts recorded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
