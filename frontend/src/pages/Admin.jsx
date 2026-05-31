import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'seed', price: '', description: '', imageUrl: '', stock: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
      } else {
        await api.post('/products', form);
      }
      setForm({ name: '', category: 'seed', price: '', description: '', imageUrl: '', stock: '' });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      stock: product.stock || ''
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleCancel = () => {
    setForm({ name: '', category: 'seed', price: '', description: '', imageUrl: '', stock: '' });
    setEditingId(null);
  };

  return (
    <div className="container">
      <h2>Admin Panel - Product Management</h2>
      
      <div className="card" style={{ marginTop: 20 }}>
        <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          <input className="input" placeholder="Product Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <select className="input" value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
            <option value="seed">Seed</option>
            <option value="fertilizer">Fertilizer</option>
            <option value="pesticide">Pesticide</option>
            <option value="equipment">Equipment</option>
          </select>
          <input className="input" type="number" placeholder="Price ($)" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} required />
          <input className="input" type="number" placeholder="Stock Quantity" value={form.stock} onChange={e=>setForm({...form, stock: e.target.value})} required />
          <input className="input" placeholder="Image URL" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl: e.target.value})} />
          <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
          
          <button className="btn" style={{ gridColumn: 'span 2' }}>
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" className="btn" onClick={handleCancel} style={{ gridColumn: 'span 2', background: '#666' }}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <h3 style={{ marginTop: 30 }}>Product Inventory</h3>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <div style={{ width: '50px', height: '50px', background: '#ddd', borderRadius: '4px' }} />
                )}
              </td>
              <td>{p.name}</td>
              <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.stock || 0}</td>
              <td>
                <button className="btn" onClick={() => handleEdit(p)} style={{ marginRight: '5px', padding: '5px 10px' }}>Edit</button>
                <button className="btn" onClick={() => handleDelete(p._id)} style={{ background: '#e74c3c', padding: '5px 10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}