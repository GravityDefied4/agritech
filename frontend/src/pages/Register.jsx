import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'farmer' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      const redirectPath = data.user.role === 'admin' ? '/admin' : '/dashboard';
      nav(redirectPath);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 400, margin: '50px auto' }}>
        <h2 style={{ marginBottom: 20 }}>Create Account</h2>
        <form onSubmit={submit}>
          <input
            className="input"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />

          <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Register as:</label>
          <select
            className="input"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            style={{ marginBottom: 15 }}
          >
            <option value="farmer">🌾 Farmer</option>
            <option value="admin">👨‍ Administrator</option>
          </select>

          <button className="btn" style={{ width: '100%' }}>Register</button>
        </form>
        <p style={{ marginTop: 15, textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}