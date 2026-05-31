import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'farmer', phone: '', address: '' });

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data);
    } catch (err) {
      alert('Failed to load users');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      address: user.address || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${editingUser}`, form);
      setEditingUser(null);
      setForm({ name: '', email: '', role: 'farmer', phone: '', address: '' });
      loadUsers();
      alert('User updated successfully');
    } catch (err) {
      alert('Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      loadUsers();
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', role: 'farmer', phone: '', address: '' });
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <p style={{ margin: '15px 0', color: '#666' }}>Manage registered users</p>

      {editingUser && (
        <div className="card" style={{ marginTop: 20 }}>
          <h3>Edit User</h3>
          <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
            <input className="input" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
            <select className="input" value={form.role} onChange={e=>setForm({...form, role: e.target.value})}>
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
            <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
            <input className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} style={{ gridColumn: 'span 2' }} />
            
            <button className="btn" style={{ gridColumn: 'span 2' }}>Update User</button>
            <button type="button" className="btn" onClick={handleCancel} style={{ gridColumn: 'span 2', background: '#666' }}>Cancel</button>
          </form>
        </div>
      )}

      <div className="card" style={{ marginTop: 20 }}>
        <h3>All Users ({users.length})</h3>
        <table style={{ marginTop: 15 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={{ fontSize: 12 }}>{user._id.slice(-8)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                <td>{user.phone || '-'}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(user)} style={{ marginRight: '5px', padding: '5px 10px' }}>Edit</button>
                  <button className="btn" onClick={() => handleDelete(user._id)} style={{ background: '#e74c3c', padding: '5px 10px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}