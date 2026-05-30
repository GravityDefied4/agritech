import { useEffect, useState } from 'react';
import api from '../services/api';
export default function Resources() {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.get('/products').then(r => setProducts(r.data)).catch(()=>{}); }, []);
  return (
    <div className="container">
      <h2>Resource Marketplace</h2>
      <div className="grid" style={{ marginTop: 20 }}>
        {products.map(p => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3><p style={{ color: '#666', margin: '5px 0' }}>{p.category}</p>
            <p style={{ margin: '5px 0' }}>{p.description || 'No description'}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 18 }}>${p.price}</span>
              <button className="btn">Purchase</button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p>No resources available. Admins can add products via the Admin panel.</p>}
      </div>
    </div>
  );
}