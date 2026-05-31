import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const COLORS = ['#2c5e2e', '#3498db', '#f39c12', '#9b59b6'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get('/admin/analytics'),
          api.get('/orders') // Fetch all orders for management
        ]);
        setStats(statsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error('Failed to load data:', err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      // Update local state
      setOrders(prev => prev.map(o => o._id === orderId ? {...o, status: newStatus} : o));
    } catch {
      alert('Failed to update order status');
    }
  };

  if (loading) return <div className="container"><p>Loading analytics...</p></div>;
  if (!stats) return <div className="container"><p>Failed to load data</p></div>;

  const overviewData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Farms', value: stats.totalFarms },
    { name: 'Products', value: stats.totalProducts },
    { name: 'Orders', value: stats.totalOrders }
  ];

  const roleData = [
    { name: 'Farmers', value: stats.farmers },
    { name: 'Admins', value: stats.admins }
  ];

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p style={{ margin: '15px 0', color: '#666' }}>System analytics and overview</p>

      {/* Stat Cards */}
      <div className="grid" style={{ marginTop: 20 }}>
        <div className="card" style={{ borderLeft: '4px solid #2c5e2e' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: 36, fontWeight: 'bold', margin: '10px 0', color: '#2c5e2e' }}>{stats.totalUsers}</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #3498db' }}>
          <h3>Total Farms</h3>
          <p style={{ fontSize: 36, fontWeight: 'bold', margin: '10px 0', color: '#3498db' }}>{stats.totalFarms}</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #f39c12' }}>
          <h3>Total Products</h3>
          <p style={{ fontSize: 36, fontWeight: 'bold', margin: '10px 0', color: '#f39c12' }}>{stats.totalProducts}</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #9b59b6' }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: 36, fontWeight: 'bold', margin: '10px 0', color: '#9b59b6' }}>{stats.totalOrders}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid" style={{ marginTop: 30 }}>
        <div className="card">
          <h3>Platform Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2c5e2e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>User Roles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={roleData} cx="50%" cy="50%" labelLine={false} 
                label={({ name, value }) => `${name}: ${value}`} 
                outerRadius={80} fill="#8884d8" dataKey="value"
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Management Section */}
      <div className="card" style={{ marginTop: 30 }}>
        <h3>Order Management</h3>
        {orders.length === 0 ? (
          <p style={{ color: '#666', marginTop: 10 }}>No orders placed yet.</p>
        ) : (
          <table style={{ marginTop: 15 }}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status (Admin Update)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>{order.product?.name || order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      style={{
                        padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc',
                        background: order.status === 'delivered' ? '#e8f5e9' : order.status === 'shipped' ? '#fff3cd' : '#f8f9fa',
                        fontWeight: 'bold'
                      }}
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="shipped">🚚 Shipped</option>
                      <option value="delivered">✅ Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}