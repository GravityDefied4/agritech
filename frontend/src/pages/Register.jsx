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
      nav('/dashboard');
    } catch (err) { alert(err.response?.data?.message || 'Failed'); }
  };
  return (
    <div className="container"><div className="card" style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2 style={{ marginBottom: 20 }}>Register</h2>
      <form onSubmit={submit}>
        <input className="input" placeholder="Name" onChange={e=>setForm({...form, name: e.target.value})} required />
        <input className="input" type="email" placeholder="Email" onChange={e=>setForm({...form, email: e.target.value})} required />
        <input className="input" type="password" placeholder="Password" onChange={e=>setForm({...form, password: e.target.value})} required />
        <button className="btn" style={{ width: '100%' }}>Register</button>
      </form>
      <p style={{ marginTop: 15 }}>Have an account? <Link to="/login">Login</Link></p>
    </div></div>
  );
}