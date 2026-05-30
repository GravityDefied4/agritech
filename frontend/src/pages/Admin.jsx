import { useEffect, useState } from 'react';
import api from '../services/api';
export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'seed', price: '', description: '' });
  useEffect(() => { api.get('/products').then(r => setProducts(r.data)); }, []);
  const handleAdd = async (e) => { e.preventDefault(); await api.post('/products', form); setForm({ name: '', category: 'seed', price: '', description: '' }); api.get('/products').then(r => setProducts(r.data)); };
  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Add Resource</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <select className="input" value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
            <option value="seed">Seed</option><option value="fertilizer">Fertilizer</option><option value="pesticide">Pesticide</option><option value="equipment">Equipment</option>
          </select>
          <input className="input" type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} required />
          <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
          <button className="btn" style={{ gridColumn: 'span 2' }}>Add Product</button>
        </form>
      </div>
      <h3 style={{ marginTop: 20 }}>Inventory</h3>
      <table><thead><tr><th>Name</th><th>Category</th><th>Price</th></tr></thead>
      <tbody>{products.map(p => <tr key={p._id}><td>{p.name}</td><td>{p.category}</td><td>${p.price}</td></tr>)}</tbody></table>
    </div>
  );
}