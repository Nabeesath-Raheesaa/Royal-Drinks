import React, { useEffect, useState } from 'react';
import { RefreshCw, CheckCircle, Package, Truck, AlertCircle } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { orderService } from '../../services/orderService.js';
import './Admin.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.warn('API error fetching orders:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((o) => (o._id === orderId ? updated : o)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-page section-padding">
      <div className="container admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <div className="admin-header flex-between">
            <div>
              <h1 className="admin-title">Manage <span className="text-gold">Orders</span></h1>
              <p className="admin-subtitle">Track customer shipments and manage fulfillment stages</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={fetchOrders}>
              <RefreshCw size={14} /> Refresh List
            </button>
          </div>

          <div className="admin-section card-glass">
            {loading ? (
              <LoadingSpinner message="Fetching Customer Orders..." />
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Details</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Current Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td className="font-mono">{order._id.substring(0, 8)}...</td>
                          <td>
                            <div className="font-bold">{order.shippingAddress?.fullName || 'Guest Customer'}</div>
                            <div className="text-muted text-xs">{order.shippingAddress?.city}, {order.shippingAddress?.phone}</div>
                          </td>
                          <td>
                            {order.items?.map((item, i) => (
                              <div key={i} className="text-xs">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </td>
                          <td className="font-bold text-gold">₹{order.totalAmount}</td>
                          <td>
                            <span className={`badge ${order.isPaid ? 'badge-gold' : 'badge-burgundy'}`}>
                              {order.isPaid ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-pill ${order.orderStatus?.toLowerCase()}`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td>
                            <select
                              value={order.orderStatus}
                              disabled={updatingId === order._id}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className="status-select-input"
                              style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-main)',
                                border: '1px solid var(--border-subtle)',
                                padding: '0.4rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                              }}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">
                          No customer orders recorded yet.
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

export default ManageOrders;
