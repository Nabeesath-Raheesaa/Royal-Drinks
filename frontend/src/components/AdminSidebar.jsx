import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wine, PlusCircle, ShoppingCart, Users, ArrowLeft } from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar card-glass">
      <div className="sidebar-header">
        <span className="sidebar-badge badge-gold">Admin Portal</span>
        <h3 className="sidebar-title">Royal Control Hub</h3>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard Overview</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Wine size={18} />
          <span>Manage Products</span>
        </NavLink>

        <NavLink
          to="/admin/products/add"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <PlusCircle size={18} />
          <span>Add New Product</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <ShoppingCart size={18} />
          <span>Manage Orders</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Users size={18} />
          <span>Manage Users</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/" className="btn-back-store">
          <ArrowLeft size={16} /> Back to Storefront
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
