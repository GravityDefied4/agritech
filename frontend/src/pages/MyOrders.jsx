import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
      }
      setLoading(false);
    };
    loadOrders();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#2c5e2e';
      case 'shipped': return '#f39c12';
      default: return '#3498db';
    }
  };

  if (loading) return <div className="container"><p>Loading orders...</p></div>;

  return (
    <div className="container">
      <h2>My Orders</h2>
      <p style={{ margin: '15px 0', color: '#666' }}>
        Track your agricultural resource purchases
      </p>

      {orders.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>No orders yet</p>
          <p style={{ color: '#999' }}>Visit the Resources page to make your first purchase</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {orders.map(order => (
            <div className="card" key={order._id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{order.productName}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Quantity:</strong> {order.quantity} units
                  </p>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Price per unit:</strong> ${order.price.toFixed(2)}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold', color: '#2c5e2e' }}>
                    <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '10px 20px', 
                  background: getStatusColor(order.status) + '20',
                  border: `2px solid ${getStatusColor(order.status)}`,
                  borderRadius: '8px',
                  textAlign: 'center',
                  minWidth: '120px'
                }}>
                  <p style={{ margin: 0, color: getStatusColor(order.status), fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}